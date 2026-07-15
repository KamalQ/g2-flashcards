import { useState, useRef, useCallback, useEffect } from 'react';
import {
  waitForEvenAppBridge,
  CreateStartUpPageContainer,
  RebuildPageContainer,
  TextContainerProperty,
  TextContainerUpgrade,
  OsEventTypeList,
  EventSourceType,
  LAUNCH_SOURCE_GLASSES_MENU,
} from '@evenrealities/even_hub_sdk';

// ─── Glasses display formatters (576×288) ───────────────────────────────────
// 2-container layout:
//   Container 1 (top bar):  question # and score
//   Container 2 (main):     question + options or results

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

function formatQuestion(question, selectedOption) {
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

function formatSummary(answers, totalQuestions) {
  const correct = answers.filter(a => a.isCorrect).length;
  const pct = Math.round((correct / totalQuestions) * 100);

  let grade = '';
  if (pct >= 90) grade = '  ★ Excellent!';
  else if (pct >= 70) grade = '  ● Great job!';
  else if (pct >= 50) grade = '  ○ Keep studying';
  else grade = '  △ Needs practice';

  const filled = Math.round((pct / 100) * 36);
  const bar = '█'.repeat(filled) + '░'.repeat(36 - filled);

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

function formatHeader(phase, qIndex, totalQ, answers) {
  if (phase === 'menu') return '  QUIZ CARDS';
  if (phase === 'summary') return '  RESULTS';

  const correct = answers.filter(a => a.isCorrect).length;
  const qNum = `Q${qIndex + 1}/${totalQ}`;
  const score = `Score: ${correct}/${answers.length}`;
  const spacing = ' '.repeat(Math.max(1, 46 - qNum.length - score.length));
  return `  ${qNum}${spacing}${score}`;
}

// ─── Hook ───────────────────────────────────────────────────────────────────
export default function useGlasses({ getQuizData }) {
  const [status, setStatus] = useState('Waiting for bridge...');
  const [connected, setConnected] = useState(false);
  const [eventLog, setEventLog] = useState([]);

  const bridgeRef = useRef(null);
  const isStartupCreatedRef = useRef(false);
  const lastContentRef = useRef('');
  const lastScrollRef = useRef(0);
  const isPushingRef = useRef(false);
  const pushContentRef = useRef(null);
  const getQuizDataRef = useRef(getQuizData);

  // Keep getQuizDataRef current so stale closures always get fresh data
  useEffect(() => { getQuizDataRef.current = getQuizData; }, [getQuizData]);

  const logEvent = useCallback((msg) => {
    const ts = new Date().toLocaleTimeString();
    const line = `[${ts}] ${msg}`;
    console.log(line);
    setEventLog((prev) => {
      const next = [...prev, line];
      return next.length > 30 ? next.slice(-30) : next;
    });
  }, []);

  // ── Build display config from current quiz state ────────────────────────
  const buildConfig = useCallback(() => {
    const q = getQuizDataRef.current();
    const header = formatHeader(q.phase, q.questionIndex, q.totalQuestions, q.answers);

    let mainContent;
    switch (q.phase) {
      case 'question':
        mainContent = q.currentQuestion
          ? formatQuestion(q.currentQuestion, q.selectedOption)
          : '  Loading...';
        break;
      case 'result':
        mainContent = q.currentQuestion
          ? formatResult(q.currentQuestion, q.chosenAnswer, q.answers[q.answers.length - 1]?.isCorrect)
          : '  Loading...';
        break;
      case 'summary':
        mainContent = formatSummary(q.answers, q.totalQuestions);
        break;
      case 'menu':
      default:
        mainContent = formatMenu(q.deck, q.deckStats);
        break;
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

  // ── Send full page (create or rebuild) ──────────────────────────────────
  const sendPage = useCallback(async (config) => {
    const bridge = bridgeRef.current;
    if (!bridge) return;
    try {
      if (!isStartupCreatedRef.current) {
        const rc = await bridge.createStartUpPageContainer(new CreateStartUpPageContainer(config));
        if (rc === 0) {
          isStartupCreatedRef.current = true;
          logEvent('Display created');
        } else {
          logEvent(`createStartUp returned ${rc}`);
        }
      } else {
        await bridge.rebuildPageContainer(new RebuildPageContainer(config));
      }
    } catch (err) {
      console.error('sendPage error:', err);
    }
  }, [logEvent]);

  // ── Upgrade text in-place (no flicker) ──────────────────────────────────
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

  // ── Push content to glasses (called periodically + on state changes) ────
  const pushContent = useCallback(async () => {
    if (!bridgeRef.current) return;
    if (isPushingRef.current) return;
    isPushingRef.current = true;
    try {
      const config = buildConfig();

      // Fingerprint to avoid redundant pushes
      const fingerprint = config.textObject.map(t => t.content).join('|');
      if (fingerprint === lastContentRef.current) return;
      lastContentRef.current = fingerprint;

      if (!isStartupCreatedRef.current) {
        await sendPage(config);
        return;
      }

      // Try in-place upgrade first (flicker-free on real hardware)
      const ok1 = await upgradeText(config.textObject[0].content, 1, 'header');
      const ok2 = await upgradeText(config.textObject[1].content, 2, 'main');

      if (!ok1 || !ok2) {
        // Fall back to full rebuild
        await sendPage(config);
      }
    } finally {
      isPushingRef.current = false;
    }
  }, [buildConfig, sendPage, upgradeText]);

  // Keep pushContentRef current for the event handler registered in the [] useEffect
  useEffect(() => { pushContentRef.current = pushContent; }, [pushContent]);

  // ── Cache-busting push (forces refresh even if fingerprint unchanged) ───
  const triggerPush = useCallback(() => {
    lastContentRef.current = '';
    isPushingRef.current = false;
    pushContentRef.current?.();
  }, []);

  // ── Bridge initialization & event handling ──────────────────────────────
  useEffect(() => {
    let disposed = false;

    async function init() {
      try {
        const bridge = await waitForEvenAppBridge();
        bridgeRef.current = bridge;

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
        } else {
          logEvent(`Initial createStartUp returned ${rc} — will retry via interval`);
        }

        // Auto-initialize display when launched from glasses menu
        bridge.onLaunchSource((source) => {
          if (disposed) return;
          if (source === LAUNCH_SOURCE_GLASSES_MENU) {
            lastContentRef.current = '';
            isPushingRef.current = false;
            pushContentRef.current?.();
            logEvent('Auto-launch from glasses menu');
          }
        });

        // ── Shared event helpers ──
        function handleAction(q, label) {
          logEvent(`Tap (${label}) — phase: ${q.phase}, selected: ${q.selectedOption}`);
          q.confirmAnswer();
          setTimeout(() => pushContentRef.current?.(), 50);
        }

        function handleScroll(q, direction, label) {
          const now = Date.now();
          if (now - lastScrollRef.current < 300) return;
          lastScrollRef.current = now;
          logEvent(`Scroll ${direction} (${label})`);
          q.moveOption(direction);
          setTimeout(() => pushContentRef.current?.(), 50);
        }

        function handleDoubleTap(label) {
          logEvent(`Double-tap (${label}) — requesting exit`);
          bridge.shutDownPageContainer(1).catch(() => {});
        }

        // ── Event handler ──
        bridge.onEvenHubEvent((event) => {
          if (disposed) return;
          const q = getQuizDataRef.current();

          // ── Text container events ──
          if (event.textEvent) {
            const et = event.textEvent.eventType;
            if (et === OsEventTypeList.DOUBLE_CLICK_EVENT) {
              handleDoubleTap('glasses');
            } else if (et === OsEventTypeList.SCROLL_BOTTOM_EVENT) {
              handleScroll(q, 'down', 'glasses');
            } else if (et === OsEventTypeList.SCROLL_TOP_EVENT) {
              handleScroll(q, 'up', 'glasses');
            } else if (et === OsEventTypeList.CLICK_EVENT || et === undefined) {
              handleAction(q, 'glasses');
            }
            return;
          }

          // ── System events (ring, temple) ──
          if (event.sysEvent) {
            const et = event.sysEvent.eventType;

            if (et === OsEventTypeList.FOREGROUND_ENTER_EVENT) {
              lastContentRef.current = '';
              isPushingRef.current = false;
              pushContentRef.current?.();
              return;
            }
            if (et === OsEventTypeList.ABNORMAL_EXIT_EVENT) {
              isStartupCreatedRef.current = false;
              return;
            }
            if (et === OsEventTypeList.FOREGROUND_EXIT_EVENT) return;

            const src = event.sysEvent.eventSource;
            const srcLabel = src === EventSourceType.TOUCH_EVENT_FROM_RING ? 'ring'
              : src === EventSourceType.TOUCH_EVENT_FROM_GLASSES_R ? 'glasses-R'
              : src === EventSourceType.TOUCH_EVENT_FROM_GLASSES_L ? 'glasses-L'
              : 'sys';

            if (et === OsEventTypeList.DOUBLE_CLICK_EVENT) {
              handleDoubleTap(srcLabel);
            } else if (et === OsEventTypeList.SCROLL_BOTTOM_EVENT) {
              handleScroll(q, 'down', srcLabel);
            } else if (et === OsEventTypeList.SCROLL_TOP_EVENT) {
              handleScroll(q, 'up', srcLabel);
            } else if (et === OsEventTypeList.CLICK_EVENT || et === undefined) {
              handleAction(q, srcLabel);
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

  const shutdownGlasses = useCallback(async () => {
    try {
      const bridge = bridgeRef.current;
      if (!bridge) return;
      await bridge.shutDownPageContainer(1);
      setStatus('Shutdown requested');
      logEvent('Graceful shutdown requested');
    } catch (err) {
      console.error('shutdown error:', err);
    }
  }, [logEvent]);

  const showDisplay = useCallback(async () => {
    if (!bridgeRef.current) return;
    lastContentRef.current = '';
    await sendPage(buildConfig());
    setStatus('Display active');
    logEvent('Display shown');
  }, [buildConfig, sendPage, logEvent]);

  return {
    status, connected, eventLog,
    shutdownGlasses, showDisplay,
    pushContent, triggerPush,
  };
}
