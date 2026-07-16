// ─── Shared text layout helpers for the glasses display + phone preview ────
// Used by useGlasses.js (real push to the glasses) and GlassesPreview.jsx
// (phone-side approximation), so both stay in sync.

export const LETTERS = ['A', 'B', 'C', 'D'];

// Calibrated empirically against the Even Hub simulator for the main
// content container (564x244, 4px padding) — rendered test lines of known
// character length, screenshotted to find the break point. There's no
// programmatic text-measurement API on this firmware (see docs/display.md
// / g2-text-measurement skill), so these are simulator-measured, not
// computed. Digit-heavy strings render noticeably WIDER per character than
// prose in this font (a 43-char digit string already overflowed) — always
// calibrate with realistic mixed-case prose, not digits. Beyond ~59-60
// prose characters the firmware silently auto-wraps the line itself
// (breaking mid-word, ignoring our indent scheme), which desyncs our own
// row-counted scroll window from what's actually on screen. 58 sits just
// under that edge — verified against the worst case (the longest
// prefix+text combined line on the result screen) with no overflow, but
// there's little slack left; don't raise this further without re-testing
// in the simulator.
export const MAIN_MAX_CHARS_PER_LINE = 58;
export const MAIN_MAX_VISIBLE_LINES = 8;   // lines 1-8 rendered fully, line 9 was clipped

// Scroll step for paging through content that doesn't fit the visible
// budget (long questions, long result text) — a page at a time rather
// than one row at a time, with a couple of lines of overlap between pages
// so context isn't lost.
export const PAGE_STEP = MAIN_MAX_VISIBLE_LINES - 2;

// Box-drawing glyphs (━) render noticeably wider than prose characters on
// this firmware — a run of 28 already wraps mid-string while 24 renders
// cleanly on one line. Keep dividers well under the prose char budget.
export const DIVIDER_WIDTH = 24;
export function divider() {
  return '━'.repeat(DIVIDER_WIDTH);
}

export function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 2) + '..';
}

export function wordWrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if (line && (line + ' ' + word).length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = line ? line + ' ' + word : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Builds a flat list of rows for a question + its 4 options. Each row is
// tagged with the option index it belongs to (null for question text and
// the separator), so the caller can compute a scroll window that keeps the
// selected option in view without ever exceeding the container's visible
// line budget.
export function buildQuestionRows(question, selectedOption, maxChars = MAIN_MAX_CHARS_PER_LINE) {
  const rows = [];

  for (const line of wordWrap(question.question, maxChars)) {
    rows.push({ text: `  ${line}`, optionIndex: null });
  }
  rows.push({ text: '', optionIndex: null });

  for (let i = 0; i < 4; i++) {
    const prefixTemplate = `${LETTERS[i]}) `;
    // Indent sized off the fixed template (not the cursor glyph), so
    // continuation lines never shift horizontally as the cursor moves.
    const indent = ' '.repeat(prefixTemplate.length + 2);
    const cursor = i === selectedOption ? '▶' : ' ';
    const wrapWidth = Math.max(8, maxChars - indent.length);
    const optionLines = wordWrap(question.options[i] ?? '', wrapWidth);
    if (optionLines.length === 0) optionLines.push('');

    optionLines.forEach((line, idx) => {
      const text = idx === 0 ? ` ${cursor} ${prefixTemplate}${line}` : `${indent}${line}`;
      rows.push({ text, optionIndex: i });
    });
  }

  return rows;
}

// How far the window can page down through the question+separator (while
// selectedOption is A) and still eventually land with option A's own
// row(s) visible. 0 means the question+A already fit together from the
// top — no paging needed, A behaves exactly as before.
export function maxReadOffsetForOptionA(rows, maxVisibleLines = MAIN_MAX_VISIBLE_LINES) {
  const aRows = rows.reduce((acc, r, i) => {
    if (r.optionIndex === 0) acc.push(i);
    return acc;
  }, []);
  if (aRows.length === 0) return 0;
  const aEnd = aRows[aRows.length - 1];
  return Math.max(0, aEnd - maxVisibleLines + 1);
}

// Returns the window start (row index) that keeps the selected option
// visible while showing as much of the question as still fits. Always
// re-anchors to the top first: if the current selection fits within the
// budget starting from row 0, the window snaps back to 0, re-revealing the
// question. Only scrolls down the minimum needed to keep the selected
// option in view. Pure/stateless — no persisted scroll offset, so
// scrolling back up always re-shows as much of the question as space
// allows (previously a "sticky" prevWindowStart meant scrolling down to a
// wrapped option and back up could leave the question permanently hidden).
//
// `readOffset` (only meaningful while selectedOption === 0) lets the
// caller page further down through a question that's too long to fit
// alongside option A — see maxReadOffsetForOptionA(). Without it, option A
// always anchors to row 0, which is correct for short questions but means
// a long question's tail is never reachable.
export function selectVisibleWindow(rows, selectedOption, readOffset = 0, maxVisibleLines = MAIN_MAX_VISIBLE_LINES) {
  const optionRows = rows.reduce((acc, r, i) => {
    if (r.optionIndex === selectedOption) acc.push(i);
    return acc;
  }, []);
  if (optionRows.length === 0) return 0;

  const selStart = optionRows[0];
  const selEnd = optionRows[optionRows.length - 1];

  // Degrade path: this option's own wrapped span alone exceeds the budget.
  // Anchor the window to its start; renderRows() appends a truncation cue.
  if (selEnd - selStart + 1 > maxVisibleLines) {
    return selStart;
  }

  // Option A always means "top of the screen" by default — show from row
  // 0 (the start of the question), even if that pushes option A's own
  // cursor row below the fold on very long questions. `readOffset` (paged
  // in by the caller via moveOption) lets the user page further down
  // through the question before landing on A; it's clamped here so it can
  // never scroll past the point where A's row would be visible.
  if (selectedOption === 0) {
    return Math.min(Math.max(0, readOffset), maxReadOffsetForOptionA(rows, maxVisibleLines));
  }

  let start = 0;
  if (selEnd > maxVisibleLines - 1) {
    start = selEnd - maxVisibleLines + 1;
  }
  if (selStart < start) {
    start = selStart;
  }

  const maxStart = Math.max(0, rows.length - maxVisibleLines);
  return Math.min(Math.max(0, start), maxStart);
}

// Renders the visible slice of rows starting at windowStart. If the
// selected option's content runs past the visible window (the degrade
// path above), appends a truncation cue to the last visible line instead
// of silently cutting it off.
export function renderRows(rows, windowStart, selectedOption, maxVisibleLines = MAIN_MAX_VISIBLE_LINES) {
  const windowEnd = windowStart + maxVisibleLines;
  const visible = rows.slice(windowStart, windowEnd);
  const lines = visible.map((r) => r.text);

  const optionRows = rows.reduce((acc, r, i) => {
    if (r.optionIndex === selectedOption) acc.push(i);
    return acc;
  }, []);
  const selEnd = optionRows[optionRows.length - 1];

  if (selEnd != null && selEnd >= windowEnd && lines.length > 0) {
    lines[lines.length - 1] = `${lines[lines.length - 1].trimEnd()} …`;
  }

  return lines.join('\n');
}

// Builds a flat, scrollable list of rows for the post-answer result screen:
// verdict, then the full (word-wrapped, untruncated) chosen/correct option
// text, then a trailing "Tap to continue" row. Tagged with a constant
// optionIndex so renderResultRows() can reuse renderRows()'s slicing and
// "more below" cue as a document-scoped (not option-scoped) window.
const RESULT_ROW_TAG = 0;

export function buildResultRows(question, chosen, isCorrect, maxChars = MAIN_MAX_CHARS_PER_LINE) {
  const rows = [];
  const push = (text) => rows.push({ text, optionIndex: RESULT_ROW_TAG });

  push(`  ${isCorrect ? '●' : '○'} ${isCorrect ? 'Correct!' : 'Incorrect'}`);
  push('');

  const addAnswerBlock = (label, letterIndex) => {
    // Label + letter share the first line (matches the original single-line
    // format for short answers); only wraps onto its own indented
    // continuation lines once the full option text doesn't fit.
    const prefixTemplate = `${label} ${LETTERS[letterIndex]}) `;
    const indent = ' '.repeat(2 + prefixTemplate.length);
    const wrapWidth = Math.max(8, maxChars - indent.length);
    const lines = wordWrap(question.options[letterIndex] ?? '', wrapWidth);
    if (lines.length === 0) lines.push('');
    lines.forEach((line, idx) => {
      push(idx === 0 ? `  ${prefixTemplate}${line}` : `${indent}${line}`);
    });
  };

  if (!isCorrect) {
    addAnswerBlock('You chose:', chosen);
    push('');
    addAnswerBlock('Correct:', question.answer);
  } else {
    addAnswerBlock('Correct:', question.answer);
  }

  push('');
  push('  Tap to continue ▶');

  return rows;
}

export function maxResultScrollOffset(rows, maxVisibleLines = MAIN_MAX_VISIBLE_LINES) {
  return Math.max(0, rows.length - maxVisibleLines);
}

export function renderResultRows(rows, windowStart, maxVisibleLines = MAIN_MAX_VISIBLE_LINES) {
  return renderRows(rows, windowStart, RESULT_ROW_TAG, maxVisibleLines);
}

export function formatDuration(ms) {
  if (ms == null || !Number.isFinite(ms) || ms < 0) return '--:--';
  const totalSeconds = Math.round(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
