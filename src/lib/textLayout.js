// ─── Shared text layout helpers for the glasses display + phone preview ────
// Used by useGlasses.js (real push to the glasses) and GlassesPreview.jsx
// (phone-side approximation), so both stay in sync.

export const LETTERS = ['A', 'B', 'C', 'D'];

// Calibrated empirically against the Even Hub simulator for the main
// content container (564x244, 4px padding) — rendered numbered test lines
// and divider runs of varying length, then screenshotted to find the break
// point. There's no programmatic text-measurement API on this firmware
// (see docs/display.md / g2-text-measurement skill), so these are
// simulator-measured, not computed.
export const MAIN_MAX_CHARS_PER_LINE = 42; // prose fit cleanly up to ~46+3 chars in testing
export const MAIN_MAX_VISIBLE_LINES = 8;   // lines 1-8 rendered fully, line 9 was clipped

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

// Returns the window start (row index) that keeps the selected option
// visible while showing as much of the question as still fits. Always
// re-anchors to the top first: if the current selection fits within the
// budget starting from row 0, the window snaps back to 0, re-revealing the
// question. Only scrolls down the minimum needed to keep the selected
// option in view. Pure/stateless — no persisted scroll offset, so
// scrolling back up always re-shows as much of the question as space
// allows (previously a "sticky" prevWindowStart meant scrolling down to a
// wrapped option and back up could leave the question permanently hidden).
export function selectVisibleWindow(rows, selectedOption, maxVisibleLines = MAIN_MAX_VISIBLE_LINES) {
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

export function formatDuration(ms) {
  if (ms == null || !Number.isFinite(ms) || ms < 0) return '--:--';
  const totalSeconds = Math.round(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
