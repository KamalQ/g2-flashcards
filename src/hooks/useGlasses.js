import { useState, useCallback, useRef, useEffect } from 'react';
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
import {
  truncate,
  divider,
  buildQuestionRows,
  selectVisibleWindow,
  renderRows,
  buildResultRows,
  maxReadOffsetForOptionA,
  maxResultScrollOffset,
  renderResultRows,
  formatDuration,
  PAGE_STEP,
} from '../lib/textLayout';

// ─── Glasses display formatters (576×288) ───────────────────────────────────
// 2-container layout:
//   Container 1 (top bar):  question # and score
//   Container 2 (main):     question + options or results

function formatMenu(deck, stats, deckIndex, deckCount, inProgressSnapshot) {
  const s = stats || {};
  const lines = [
    '',
    `  ${truncate(deck.name, 40)}`,
    `  ${divider()}`,
    `  ${deck.questions.length} questions`,
  ];

  if (s.totalAttempts > 0) {
    const avgPct = Math.round((s.totalCorrect / s.totalQuestions) * 100);
    lines.push(`  Best ${s.bestScore}% · Avg ${avgPct}% · ${s.totalAttempts} run${s.totalAttempts > 1 ? 's' : ''}`);
  }

  lines.push('');
  lines.push(inProgressSnapshot ? '  ▶ Tap to resume or restart' : '  ▶ Tap to start quiz');
  return lines.join('\n');
}

function formatMenuConfirm(deck, snapshot, cursor) {
  const total = deck?.questions.length ?? 0;
  const resumeLabel = snapshot ? `Resume  Q${snapshot.questionIndex + 1}/${total}` : 'Resume';
  const lines = [
    '',
    `  ${truncate(deck?.name ?? '', 40)}`,
    `  ${divider()}`,
    `  ${cursor === 0 ? '▶' : ' '} ${resumeLabel}`,
    `  ${cursor === 1 ? '▶' : ' '} Start New`,
    '',
    '  Tap to confirm ▶',
  ];
  return lines.join('\n');
}

function formatSummary(answers, totalQuestions, totalDurationMs, missedCount, cursor) {
  const correct = answers.filter(a => a.isCorrect).length;
  const pct = Math.round((correct / totalQuestions) * 100);

  let grade = '';
  if (pct >= 90) grade = '★ Excellent!';
  else if (pct >= 70) grade = '● Great job!';
  else if (pct >= 50) grade = '○ Keep studying';
  else grade = '△ Needs practice';

  const lines = [
    '',
    '  Quiz Complete!',
    `  ${divider()}`,
    `  ${correct}/${totalQuestions} (${pct}%) · ${formatDuration(totalDurationMs)}`,
    `  ${grade}`,
    '',
  ];

  if (missedCount > 0) {
    lines.push(`  ${cursor === 0 ? '▶' : ' '} Return to menu`);
    lines.push(`  ${cursor === 1 ? '▶' : ' '} Practice ${missedCount} missed`);
  } else {
    lines.push('  Tap to return ▶');
  }

  return lines.join('\n');
}

function formatHeader(phase, menuStep, qIndex, totalQ, answers, deckIndex, deckCount) {
  if (phase === 'menu') {
    if (menuStep === 'confirm') return '  RESUME OR START NEW?';
    return deckCount > 1 ? `  Deck ${deckIndex + 1}/${deckCount}` : '  QUIZ CARDS';
  }
  if (phase === 'summary') return '  RESULTS';

  const correct = answers.filter(a => a.isCorrect).length;
  const qNum = `Q${qIndex + 1}/${totalQ}`;
  const score = `Score: ${correct}/${answers.length}`;
  const spacing = ' '.repeat(Math.max(1, 46 - qNum.length - score.length));
  return `  ${qNum}${spacing}${score}`;
}

// ─── Hook ───────────────────────────────────────────────────────────────────
export default function useGlasses({ getQuizData, setBridge }) {
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
    const header = formatHeader(q.phase, q.menuStep, q.questionIndex, q.totalQuestions, q.answers, q.deckIndex, q.deckCount);

    let mainContent;
    switch (q.phase) {
      case 'question': {
        if (!q.currentQuestion) {
          mainContent = '  Loading...';
          break;
        }
        const rows = buildQuestionRows(q.currentQuestion, q.selectedOption);
        const windowStart = selectVisibleWindow(rows, q.selectedOption, q.questionReadOffset);
        mainContent = renderRows(rows, windowStart, q.selectedOption);
        break;
      }
      case 'result': {
        if (!q.currentQuestion) {
          mainContent = '  Loading...';
          break;
        }
        const isCorrect = q.answers[q.answers.length - 1]?.isCorrect;
        const resultRows = buildResultRows(q.currentQuestion, q.chosenAnswer, isCorrect);
        const resultWindowStart = Math.min(Math.max(0, q.resultScrollOffset), maxResultScrollOffset(resultRows));
        mainContent = renderResultRows(resultRows, resultWindowStart);
        break;
      }
      case 'summary':
        mainContent = formatSummary(q.answers, q.totalQuestions, q.totalDurationMs, q.missedCount, q.selectedOption);
        break;
      case 'menu':
      default:
        mainContent = q.menuStep === 'confirm'
          ? formatMenuConfirm(q.deck, q.inProgressSnapshot, q.selectedOption)
          : formatMenu(q.deck, q.deckStats, q.deckIndex, q.deckCount, q.inProgressSnapshot);
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
          borderRadius: 3, paddingLength: 4,
        }),
        new TextContainerProperty({
          xPosition: 6,    yPosition: 42,
          width: 564,      height: 244,
          containerID: 2,  containerName: 'main',
          content: mainContent,
          isEventCapture: 1,
          borderWidth: 1,  borderColor: 5,
          borderRadius: 3, paddingLength: 4,
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

        // Share bridge with useQuiz so it can persist/restore from bridge storage
        setBridge?.(bridge);

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

          // Long question/result text pages via scroll before (question) or
          // instead of (result) moving a cursor — compute how far paging is
          // allowed to go so useQuiz.js's moveOption stays layout-agnostic.
          let maxOffset = 0;
          if (q.phase === 'question' && q.currentQuestion && q.selectedOption === 0) {
            const rows = buildQuestionRows(q.currentQuestion, 0);
            maxOffset = maxReadOffsetForOptionA(rows);
          } else if (q.phase === 'result' && q.currentQuestion) {
            const isCorrect = q.answers[q.answers.length - 1]?.isCorrect;
            const resultRows = buildResultRows(q.currentQuestion, q.chosenAnswer, isCorrect);
            maxOffset = maxResultScrollOffset(resultRows);
          }

          q.moveOption(direction, { maxOffset, pageStep: PAGE_STEP });
          setTimeout(() => pushContentRef.current?.(), 50);
        }

        // Double-tap is contextual "back": mid-quiz -> deck menu (progress
        // saved); resume/start-new confirm step -> back to browsing; already
        // at the deck menu (or summary) -> exit the app. There's no
        // long-press/long-hold event on this hardware (confirmed in the SDK's
        // OsEventTypeList), so back and exit share this single gesture.
        function handleDoubleTap(q, label) {
          if (q.phase === 'menu' && q.menuStep === 'confirm') {
            logEvent(`Double-tap (${label}) — back to deck browse`);
            q.backToBrowse();
            setTimeout(() => pushContentRef.current?.(), 50);
            return;
          }
          if (q.phase === 'question' || q.phase === 'result') {
            logEvent(`Double-tap (${label}) — back to menu (progress saved)`);
            q.backToMenu();
            setTimeout(() => pushContentRef.current?.(), 50);
            return;
          }
          logEvent(`Double-tap (${label}) — requesting exit`);
          // Save any in-progress state before exiting
          q.saveInProgressSnapshot?.();
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
              handleDoubleTap(q, 'glasses');
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
              q.resumeTimer?.();
              lastContentRef.current = '';
              isPushingRef.current = false;
              pushContentRef.current?.();
              return;
            }
            if (et === OsEventTypeList.ABNORMAL_EXIT_EVENT) {
              isStartupCreatedRef.current = false;
              return;
            }
            if (et === OsEventTypeList.FOREGROUND_EXIT_EVENT) {
              q.pauseTimer?.();
              q.saveInProgressSnapshot?.();
              return;
            }

            const src = event.sysEvent.eventSource;
            const srcLabel = src === EventSourceType.TOUCH_EVENT_FROM_RING ? 'ring'
              : src === EventSourceType.TOUCH_EVENT_FROM_GLASSES_R ? 'glasses-R'
              : src === EventSourceType.TOUCH_EVENT_FROM_GLASSES_L ? 'glasses-L'
              : 'sys';

            if (et === OsEventTypeList.DOUBLE_CLICK_EVENT) {
              handleDoubleTap(q, srcLabel);
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
