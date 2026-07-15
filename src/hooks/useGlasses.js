import { useState, useRef, useCallback, useEffect } from 'react';
import {
  waitForEvenAppBridge,
  CreateStartUpPageContainer,
  RebuildPageContainer,
  TextContainerProperty,
  TextContainerUpgrade,
  OsEventTypeList,
  EventSourceType,
} from '@evenrealities/even_hub_sdk';

// ─── Glasses display formatters (576×288) ───────────────────────────────────
// We use a 2-container layout:
//   Container 1 (top): header bar with question # and score
//   Container 2 (main): question + options or results

const LETTERS = ['A', 'B', 'C', 'D'];

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 2) + '..';
}

function wordWrap(text, maxChars) {
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

function formatMenu(deck, stats) {
  const s = stats || {};
  const lines = [
    '',
    `  ${truncate(deck.name, 40)}`,
    `  ${'━'.repeat(36)}`,
    '',
    `  ${deck.questions.length} questions`,
    '',
  ];

  if (s.totalAttempts > 0) {
    lines.push(`  Attempts: ${s.totalAttempts}`);
    lines.push(`  Best score: ${s.bestScore}%`);
    const avgPct = Math.round((s.totalCorrect / s.totalQuestions) * 100);
    lines.push(`  Avg score: ${avgPct}%`);
    lines.push('');
  }

  lines.push('  ► Tap to start quiz');
  return lines.join('\n');
}

function formatQuestion(question, selectedOption, qIndex, totalQ) {
  // Wrap question text to ~48 chars per line
  const qLines = wordWrap(question.question, 48);

  const lines = [];
  for (const l of qLines) {
    lines.push(`  ${l}`);
  }
  lines.push('');

  for (let i = 0; i < 4; i++) {
    const cursor = i === selectedOption ? '►' : ' ';
    const label = `${cursor} ${LETTERS[i]}) ${truncate(question.options[i], 42)}`;
    lines.push(` ${label}`);
  }

  return lines.join('\n');
}

function formatResult(question, chosen, isCorrect) {
  const icon = isCorrect ? '●' : '○';
  const verdict = isCorrect ? 'Correct!' : 'Incorrect';

  const lines = [
    '',
    `  ${icon} ${verdict}`,
    '',
  ];

  if (!isCorrect) {
    lines.push(`  You chose: ${LETTERS[chosen]}) ${truncate(question.options[chosen], 36)}`);
    lines.push(`  Correct:   ${LETTERS[question.answer]}) ${truncate(question.options[question.answer], 36)}`);
  } else {
    lines.push(`  ${LETTERS[question.answer]}) ${truncate(question.options[question.answer], 40)}`);
  }

  lines.push('');
  lines.push('  Tap to continue ►');

  return lines.join('\n');
}

function formatSummary(answers, totalQuestions, deckName) {
  const correct = answers.filter(a => a.isCorrect).length;
  const pct = Math.round((correct / totalQuestions) * 100);

  let grade = '';
  if (pct >= 90) grade = '  ★ Excellent!';
  else if (pct >= 70) grade = '  ● Great job!';
  else if (pct >= 50) grade = '  ○ Keep studying';
  else grade = '  △ Needs practice';

  const bar = buildProgressBar(pct, 36);

  return [
    '',
    '  Quiz Complete!',
    `  ${'━'.repeat(36)}`,
    '',
    `  Score: ${correct}/${totalQuestions} (${pct}%)`,
    `  ${bar}`,
    '',
    grade,
    '',
    '  Tap to return ►',
  ].join('\n');
}

function buildProgressBar(pct, width) {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

function formatHeader(phase, qIndex, totalQ, answers) {
  if (phase === 'menu') return '  QUIZ CARDS';
  if (phase === 'summary') return '  RESULTS';

  const correct = answers.filter(a => a.isCorrect).length;
  const qNum = `Q${qIndex + 1}/${totalQ}`;
  const score = `Score: ${correct}/${answers.length}`;

  // Pad to fill ~52 chars
  const spacing = ' '.repeat(Math.max(1, 46 - qNum.length - score.length));
  return `  ${qNum}${spacing}${score}`;
}

// ─── Hook ───────────────────────────────────────────────────────────────────
export default function useGlasses({ quiz }) {
  const [status, setStatus] = useState('Waiting for bridge...');
  const [connected, setConnected] = useState(false);
  const [eventLog, setEventLog] = useState([]);

  const bridgeRef = useRef(null);
  const isStartupCreatedRef = useRef(false);
  const lastContentRef = useRef('');
  const lastScrollRef = useRef(0);
  const isPushingRef = useRef(false);

  // Keep quiz ref current so event handlers always see latest state
  const quizRef = useRef(quiz);
  useEffect(() => { quizRef.current = quiz; }, [quiz]);

  const logEvent = useCallback((msg) => {
    const ts = new Date().toLocaleTimeString();
    const line = `[${ts}] ${msg}`;
    console.log(line);
    setEventLog((prev) => {
      const next = [...prev, line];
      return next.length > 30 ? next.slice(-30) : next;
    });
  }, []);

  // ── Build display config ────────────────────────────────────────────────
  const buildConfig = useCallback(() => {
    const q = quizRef.current;
    const header = formatHeader(q.phase, q.questionIndex, q.totalQuestions, q.answers);

    let mainContent;
    switch (q.phase) {
      case 'menu':
        mainContent = formatMenu(q.deck, q.getDeckStats(q.deck.name));
        break;
      case 'question':
        mainContent = formatQuestion(q.currentQuestion, q.selectedOption, q.questionIndex, q.totalQuestions);
        break;
      case 'result':
        mainContent = formatResult(
          q.currentQuestion,
          q.chosenAnswer,
          q.answers[q.answers.length - 1]?.isCorrect,
        );
        break;
      case 'summary':
        mainContent = formatSummary(q.answers, q.totalQuestions, q.deck.name);
        break;
      default:
        mainContent = '  Loading...';
    }

    return {
      containerTotalNum: 2,
      textObject: [
        new TextContainerProperty({
          xPosition: 6,    yPosition: 2,
          width: 564,      height: 36,
          containerID: 1,  containerName: 'header',
          content: header,
          isEventCapture: 0,
          borderWidth: 1,  borderColor: 8,
          borderRdaius: 3, paddingLength: 4,
        }),
        new TextContainerProperty({
          xPosition: 6,    yPosition: 42,
          width: 564,      height: 244,
          containerID: 2,  containerName: 'main',
          content: mainContent,
          isEventCapture: 1,
          borderWidth: 1,  borderColor: 5,
          borderRdaius: 3, paddingLength: 4,
        }),
      ],
    };
  }, []);

  // ── Send / upgrade display ──────────────────────────────────────────────
  const sendPage = useCallback(async (config) => {
    const bridge = bridgeRef.current;
    if (!bridge) return;
    try {
      if (!isStartupCreatedRef.current) {
        const rc = await bridge.createStartUpPageContainer(new CreateStartUpPageContainer(config));
        if (rc === 0) {
          isStartupCreatedRef.current = true;
          logEvent('Display created');
        }
      } else {
        await bridge.rebuildPageContainer(new RebuildPageContainer(config));
      }
    } catch (err) {
      console.error('sendPage error:', err);
    }
  }, [logEvent]);

  const upgradeText = useCallback(async (text, containerId, containerName) => {
    const bridge = bridgeRef.current;
    if (!bridge) return false;
    try {
      return await bridge.textContainerUpgrade(new TextContainerUpgrade({
        containerID: containerId,
        containerName: containerName,
        contentOffset: 0,
        contentLength: 2000,
        content: text,
      }));
    } catch {
      return false;
    }
  }, []);

  const pushContent = useCallback(async () => {
    if (!bridgeRef.current || isPushingRef.current) return;
    isPushingRef.current = true;
    try {
      const config = buildConfig();
      const fingerprint = config.textObject.map(t => t.content).join('|');
      if (fingerprint === lastContentRef.current) return;
      lastContentRef.current = fingerprint;

      if (!isStartupCreatedRef.current) {
        await sendPage(config);
        return;
      }

      // Try textContainerUpgrade first (flicker-free)
      const ok1 = await upgradeText(config.textObject[0].content, 1, 'header');
      const ok2 = await upgradeText(config.textObject[1].content, 2, 'main');

      if (!ok1 || !ok2) {
        await sendPage(config);
      }
    } finally {
      isPushingRef.current = false;
    }
  }, [buildConfig, sendPage, upgradeText]);

  // Keep pushContent ref current for event handler
  const pushContentRef = useRef(pushContent);
  useEffect(() => { pushContentRef.current = pushContent; }, [pushContent]);

  // ── Bridge initialization & event handling ──────────────────────────────
  useEffect(() => {
    let disposed = false;

    async function init() {
      try {
        const bridge = await waitForEvenAppBridge();
        bridgeRef.current = bridge;
        quiz.setBridge(bridge);

        if (disposed) return;
        setStatus('Bridge connected');
        setConnected(true);

        // Create initial display
        const config = buildConfig();
        const rc = await bridge.createStartUpPageContainer(
          new CreateStartUpPageContainer(config)
        );
        if (rc === 0) {
          isStartupCreatedRef.current = true;
          lastContentRef.current = config.textObject.map(t => t.content).join('|');
          logEvent('Initial display created');
        }

        // ── Event handler ──
        bridge.onEvenHubEvent((event) => {
          if (disposed) return;
          const q = quizRef.current;

          // ── Text container events (our main container) ──
          if (event.textEvent) {
            const et = event.textEvent.eventType;

            // Double-tap: exit with confirmation
            if (et === OsEventTypeList.DOUBLE_CLICK_EVENT) {
              logEvent('Double-tap — requesting exit');
              bridge.shutDownPageContainer(1).catch(() => {});
              return;
            }

            // Click (tap): confirm/select
            if (et === OsEventTypeList.CLICK_EVENT || et === undefined) {
              logEvent(`Tap — phase: ${q.phase}, selected: ${q.selectedOption}`);
              q.confirmAnswer();
              setTimeout(() => pushContentRef.current?.(), 50);
              return;
            }

            // Scroll: move cursor in question phase
            if (et === OsEventTypeList.SCROLL_BOTTOM_EVENT) {
              const now = Date.now();
              if (now - lastScrollRef.current < 300) return;
              lastScrollRef.current = now;
              logEvent('Scroll down');
              q.moveOption('down');
              setTimeout(() => pushContentRef.current?.(), 50);
              return;
            }

            if (et === OsEventTypeList.SCROLL_TOP_EVENT) {
              const now = Date.now();
              if (now - lastScrollRef.current < 300) return;
              lastScrollRef.current = now;
              logEvent('Scroll up');
              q.moveOption('up');
              setTimeout(() => pushContentRef.current?.(), 50);
              return;
            }
          }

          // ── System events ──
          if (event.sysEvent) {
            const et = event.sysEvent.eventType;

            if (et === OsEventTypeList.FOREGROUND_ENTER_EVENT) {
              lastContentRef.current = '';
              pushContentRef.current?.();
              return;
            }

            if (et === OsEventTypeList.ABNORMAL_EXIT_EVENT) {
              isStartupCreatedRef.current = false;
              return;
            }

            if (et === OsEventTypeList.FOREGROUND_EXIT_EVENT) return;

            // Ring/temple events
            if (et === OsEventTypeList.DOUBLE_CLICK_EVENT) {
              logEvent('Double-tap (sys) — requesting exit');
              bridge.shutDownPageContainer(1).catch(() => {});
              return;
            }

            if (et === OsEventTypeList.CLICK_EVENT || et === undefined) {
              logEvent(`Tap (sys) — phase: ${q.phase}`);
              q.confirmAnswer();
              setTimeout(() => pushContentRef.current?.(), 50);
              return;
            }

            if (et === OsEventTypeList.SCROLL_BOTTOM_EVENT) {
              const now = Date.now();
              if (now - lastScrollRef.current < 300) return;
              lastScrollRef.current = now;
              q.moveOption('down');
              setTimeout(() => pushContentRef.current?.(), 50);
              return;
            }

            if (et === OsEventTypeList.SCROLL_TOP_EVENT) {
              const now = Date.now();
              if (now - lastScrollRef.current < 300) return;
              lastScrollRef.current = now;
              q.moveOption('up');
              setTimeout(() => pushContentRef.current?.(), 50);
              return;
            }
          }
        });

        // ── Device status ──
        bridge.onDeviceStatusChanged((ds) => {
          if (disposed) return;
          if (ds.isConnected?.()) {
            setStatus(`Connected — Battery: ${ds.batteryLevel ?? '?'}%`);
            setConnected(true);
          } else {
            setConnected(false);
          }
        });

      } catch (err) {
        if (disposed) return;
        setStatus('No bridge — preview mode');
      }
    }

    init();
    return () => { disposed = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Push whenever quiz state changes ────────────────────────────────────
  useEffect(() => {
    pushContentRef.current?.();
  }, [quiz.phase, quiz.questionIndex, quiz.selectedOption, quiz.chosenAnswer]);

  const shutdownGlasses = useCallback(async () => {
    const bridge = bridgeRef.current;
    if (!bridge) return;
    await bridge.shutDownPageContainer(1);
    logEvent('Shutdown requested');
  }, [logEvent]);

  const showDisplay = useCallback(async () => {
    if (!bridgeRef.current) return;
    lastContentRef.current = '';
    await sendPage(buildConfig());
    logEvent('Display refreshed');
  }, [buildConfig, sendPage, logEvent]);

  return {
    status,
    connected,
    eventLog,
    shutdownGlasses,
    showDisplay,
    pushContent,
  };
}
