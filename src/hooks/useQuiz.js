import { useState, useCallback, useRef, useEffect } from 'react';
import { SAMPLE_DECKS } from '../data/sampleDecks';

// ─── Deck parser ────────────────────────────────────────────────────────────
function parseJSON(text) {
  const data = JSON.parse(text);
  if (!data.name || !Array.isArray(data.questions)) {
    throw new Error('JSON must have "name" and "questions" array');
  }
  for (const q of data.questions) {
    if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || q.answer == null) {
      throw new Error('Each question needs: question, options (4), answer (0-3)');
    }
    q.answer = Number(q.answer);
    if (q.answer < 0 || q.answer > 3) throw new Error('answer must be 0-3');
  }
  return data;
}

function parseCSV(text) {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error('CSV must have a header row and at least one question');

  // Skip header row
  const questions = [];
  for (let i = 1; i < lines.length; i++) {
    // Parse CSV line respecting quoted fields
    const fields = parseCSVLine(lines[i]);
    if (fields.length < 6) throw new Error(`Row ${i + 1}: need 6 columns (question, A, B, C, D, answer)`);

    const answerStr = fields[5].trim().toUpperCase();
    const answerMap = { A: 0, B: 1, C: 2, D: 3 };
    const answer = answerMap[answerStr];
    if (answer == null) throw new Error(`Row ${i + 1}: answer must be A, B, C, or D`);

    questions.push({
      question: fields[0].trim(),
      options: [fields[1].trim(), fields[2].trim(), fields[3].trim(), fields[4].trim()],
      answer,
    });
  }
  return { name: 'Imported CSV Deck', questions };
}

function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function parseText(text) {
  const blocks = text.trim().split(/\n\s*\n/);
  const questions = [];

  for (const block of blocks) {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 6) continue; // Need: Q, A, B, C, D, Answer

    let questionLine = lines.find(l => /^Q:/i.test(l));
    if (!questionLine) continue;
    const question = questionLine.replace(/^Q:\s*/i, '').trim();

    const options = [];
    for (const letter of ['A', 'B', 'C', 'D']) {
      const optLine = lines.find(l => new RegExp(`^${letter}[)\\.]`, 'i').test(l));
      if (!optLine) throw new Error(`Missing option ${letter} for: "${question.slice(0, 30)}..."`);
      options.push(optLine.replace(/^[A-Da-d][).]\s*/, '').trim());
    }

    const answerLine = lines.find(l => /^Answer:/i.test(l));
    if (!answerLine) throw new Error(`Missing "Answer:" for: "${question.slice(0, 30)}..."`);
    const answerLetter = answerLine.replace(/^Answer:\s*/i, '').trim().toUpperCase();
    const answerMap = { A: 0, B: 1, C: 2, D: 3 };
    const answer = answerMap[answerLetter];
    if (answer == null) throw new Error(`Answer must be A-D for: "${question.slice(0, 30)}..."`);

    questions.push({ question, options, answer });
  }

  if (questions.length === 0) throw new Error('No valid questions found in text');
  return { name: 'Imported Text Deck', questions };
}

export function parseDeck(text) {
  text = text.trim();

  // Try JSON first
  if (text.startsWith('{') || text.startsWith('[')) {
    return parseJSON(text);
  }

  // Try CSV (first line has commas and looks like a header)
  const firstLine = text.split('\n')[0].toLowerCase();
  if (firstLine.includes('question') && firstLine.includes(',')) {
    return parseCSV(text);
  }

  // Try text format
  if (/^Q:/im.test(text)) {
    return parseText(text);
  }

  throw new Error('Could not detect format. Start with { for JSON, a CSV header row, or "Q:" for text format.');
}

// ─── Quiz State ─────────────────────────────────────────────────────────────
const STATS_KEY = 'quiz_stats';
const HISTORY_KEY = 'quiz_history';
const DECK_KEY = 'quiz_deck';
const CUSTOM_DECKS_KEY = 'quiz_custom_decks';
const INPROGRESS_KEY = 'quiz_inprogress';

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export default function useQuiz() {
  // Load saved custom decks
  const [customDecks, setCustomDecks] = useState(() => loadFromStorage(CUSTOM_DECKS_KEY, []));
  const allDecks = [...SAMPLE_DECKS, ...customDecks];

  // Current deck index — also doubles as the glasses-side "browse cursor"
  const [deckIndex, setDeckIndex] = useState(() => loadFromStorage(DECK_KEY, 0));

  // Ephemeral deck (e.g. a "missed questions" practice deck) that overrides
  // the committed deckIndex without touching it — never persisted.
  const [activeDeckOverride, setActiveDeckOverride] = useState(null);
  const deck = activeDeckOverride || allDecks[deckIndex] || allDecks[0];

  // Quiz state
  const [phase, setPhase] = useState('menu'); // 'menu' | 'question' | 'result' | 'summary'
  const [menuStep, setMenuStep] = useState('browse'); // 'browse' | 'confirm' — sub-state while phase==='menu'
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0); // Cursor: A-D on question screen, reused as a generic 2-item cursor on menu-confirm/summary screens
  const [chosenAnswer, setChosenAnswer] = useState(null);  // What user picked
  const [answers, setAnswers] = useState([]); // Array of { questionIdx, chosen, correct, isCorrect, durationMs }
  const [shuffledOrder, setShuffledOrder] = useState(null); // Shuffled question indices

  // Persistent stats per deck + full session history + resumable in-progress snapshots
  const [stats, setStats] = useState(() => loadFromStorage(STATS_KEY, {}));
  const [history, setHistory] = useState(() => loadFromStorage(HISTORY_KEY, []));
  const [inProgress, setInProgress] = useState(() => loadFromStorage(INPROGRESS_KEY, {})); // { [deckName]: snapshot }

  // Bridge ref for syncing stats
  const bridgeRef = useRef(null);
  const setBridge = useCallback((bridge) => { bridgeRef.current = bridge; }, []);

  // Per-question timer — plain refs (not state) so ticking doesn't cause re-renders
  const questionElapsedRef = useRef(0);
  const questionRunningStartRef = useRef(null);

  const startQuestionTimer = useCallback(() => {
    questionElapsedRef.current = 0;
    questionRunningStartRef.current = Date.now();
  }, []);

  const stopQuestionTimer = useCallback(() => {
    if (questionRunningStartRef.current != null) {
      questionElapsedRef.current += Date.now() - questionRunningStartRef.current;
      questionRunningStartRef.current = null;
    }
    return questionElapsedRef.current;
  }, []);

  // Pause/resume for backgrounding (FOREGROUND_EXIT_EVENT / FOREGROUND_ENTER_EVENT)
  const pauseTimer = useCallback(() => {
    if (questionRunningStartRef.current != null) {
      questionElapsedRef.current += Date.now() - questionRunningStartRef.current;
      questionRunningStartRef.current = null;
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (phase === 'question' && questionRunningStartRef.current == null) {
      questionRunningStartRef.current = Date.now();
    }
  }, [phase]);

  // Save all data to localStorage whenever it changes
  useEffect(() => { saveToStorage(STATS_KEY, stats); }, [stats]);
  useEffect(() => { saveToStorage(HISTORY_KEY, history); }, [history]);
  useEffect(() => { saveToStorage(CUSTOM_DECKS_KEY, customDecks); }, [customDecks]);
  useEffect(() => { saveToStorage(DECK_KEY, deckIndex); }, [deckIndex]);
  useEffect(() => { saveToStorage(INPROGRESS_KEY, inProgress); }, [inProgress]);

  // Also sync to bridge storage (persists on phone across app restarts)
  useEffect(() => {
    const bridge = bridgeRef.current;
    if (bridge) {
      bridge.setLocalStorage(STATS_KEY, JSON.stringify(stats)).catch(() => {});
      bridge.setLocalStorage(HISTORY_KEY, JSON.stringify(history)).catch(() => {});
      bridge.setLocalStorage(CUSTOM_DECKS_KEY, JSON.stringify(customDecks)).catch(() => {});
      bridge.setLocalStorage(INPROGRESS_KEY, JSON.stringify(inProgress)).catch(() => {});
    }
  }, [stats, history, customDecks, inProgress]);

  // ── Deck management ─────────────────────────────────────────────────────
  const importDeck = useCallback((text) => {
    const newDeck = parseDeck(text);
    setCustomDecks((prev) => {
      const next = [...prev, newDeck];
      return next;
    });
    // Auto-select the new deck
    setDeckIndex(SAMPLE_DECKS.length + customDecks.length);
    return newDeck;
  }, [customDecks.length]);

  const removeDeck = useCallback((idx) => {
    if (idx < SAMPLE_DECKS.length) return; // Can't remove sample decks
    const customIdx = idx - SAMPLE_DECKS.length;
    const removedName = customDecks[customIdx]?.name;
    setCustomDecks((prev) => prev.filter((_, i) => i !== customIdx));
    if (removedName) {
      setInProgress((prev) => {
        if (!prev[removedName]) return prev;
        const next = { ...prev };
        delete next[removedName];
        return next;
      });
    }
    if (deckIndex >= idx) {
      setDeckIndex(Math.max(0, deckIndex - 1));
    }
  }, [deckIndex, customDecks]);

  // Save a resumable snapshot of the current quiz, if one is in flight and
  // not an ephemeral (missed-questions) deck, which is never resumable.
  const saveInProgressSnapshot = useCallback(() => {
    if ((phase === 'question' || phase === 'result') && !activeDeckOverride && deck) {
      setInProgress((prev) => ({
        ...prev,
        [deck.name]: {
          questionIndex, selectedOption, chosenAnswer, answers, shuffledOrder, phase,
          savedAt: new Date().toISOString(),
        },
      }));
    }
  }, [phase, activeDeckOverride, deck, questionIndex, selectedOption, chosenAnswer, answers, shuffledOrder]);

  const selectDeck = useCallback((idx) => {
    saveInProgressSnapshot();
    setDeckIndex(idx);
    setActiveDeckOverride(null);
    setPhase('menu');
    setMenuStep('browse');
    setQuestionIndex(0);
    setSelectedOption(0);
    setAnswers([]);
    setShuffledOrder(null);
  }, [saveInProgressSnapshot]);

  // ── Quiz flow ───────────────────────────────────────────────────────────
  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // deckOverride lets an ephemeral deck (missed-questions practice) start
  // without touching the committed deckIndex.
  const startQuiz = useCallback((deckOverride = null) => {
    const targetDeck = deckOverride || deck;
    if (!targetDeck) return;
    setActiveDeckOverride(deckOverride);
    const order = shuffleArray(targetDeck.questions.map((_, i) => i));
    setShuffledOrder(order);
    setQuestionIndex(0);
    setSelectedOption(0);
    setChosenAnswer(null);
    setAnswers([]);
    startQuestionTimer();
    setPhase('question');
  }, [deck, startQuestionTimer]);

  const startMissedQuiz = useCallback(() => {
    const missed = answers.filter((a) => !a.isCorrect);
    if (missed.length === 0 || !deck) return;
    const missedDeck = {
      name: `${deck.name} (Missed)`,
      questions: missed.map((a) => deck.questions[a.questionIdx]),
    };
    startQuiz(missedDeck);
  }, [answers, deck, startQuiz]);

  const currentQuestion = deck && shuffledOrder
    ? deck.questions[shuffledOrder[questionIndex]]
    : deck?.questions[questionIndex];

  // ── Glasses-side deck browsing (menuStep === 'browse') ──────────────────
  const browseDeck = useCallback((direction) => {
    setDeckIndex((prev) => {
      const n = allDecks.length;
      if (n === 0) return prev;
      return direction === 'up' ? (prev > 0 ? prev - 1 : n - 1) : (prev < n - 1 ? prev + 1 : 0);
    });
  }, [allDecks.length]);

  const selectBrowsedDeck = useCallback(() => {
    const target = allDecks[deckIndex];
    if (!target) return;
    if (inProgress[target.name]) {
      setSelectedOption(0); // default cursor to "Resume"
      setMenuStep('confirm');
    } else {
      startQuiz();
    }
  }, [allDecks, deckIndex, inProgress, startQuiz]);

  const resumeQuiz = useCallback((snapshot) => {
    setQuestionIndex(snapshot.questionIndex);
    setSelectedOption(snapshot.selectedOption);
    setChosenAnswer(snapshot.chosenAnswer);
    setAnswers(snapshot.answers);
    setShuffledOrder(snapshot.shuffledOrder); // reuse saved order — never reshuffle on resume
    setActiveDeckOverride(null);
    if (snapshot.phase === 'question') startQuestionTimer();
    setPhase(snapshot.phase);
  }, [startQuestionTimer]);

  const confirmMenuChoice = useCallback(() => {
    const target = allDecks[deckIndex];
    const snapshot = target ? inProgress[target.name] : null;
    if (selectedOption === 0 && snapshot) {
      resumeQuiz(snapshot);
    } else {
      if (target) {
        setInProgress((prev) => {
          if (!prev[target.name]) return prev;
          const next = { ...prev };
          delete next[target.name];
          return next;
        });
      }
      startQuiz();
    }
    setMenuStep('browse');
  }, [allDecks, deckIndex, inProgress, selectedOption, resumeQuiz, startQuiz]);

  // Double-tap while on the resume/start-new confirm step steps back to
  // browsing, rather than exiting the app — there's a shallower screen to
  // back into, so a "back" gesture shouldn't surprise-exit here.
  const backToBrowse = useCallback(() => {
    setMenuStep('browse');
  }, []);

  // Double-tap mid-quiz: save progress (unless it's an ephemeral missed-deck
  // run, which isn't resumable) and return to the deck menu.
  const backToMenu = useCallback(() => {
    saveInProgressSnapshot();
    setActiveDeckOverride(null);
    setPhase('menu');
    setMenuStep('browse');
  }, [saveInProgressSnapshot]);

  const moveOption = useCallback((direction) => {
    if (phase === 'menu') {
      if (menuStep === 'browse') {
        browseDeck(direction);
      } else {
        setSelectedOption((prev) => (prev === 0 ? 1 : 0));
      }
      return;
    }

    if (phase === 'question') {
      setSelectedOption((prev) => {
        if (direction === 'up') return prev > 0 ? prev - 1 : 3;
        return prev < 3 ? prev + 1 : 0;
      });
      return;
    }

    if (phase === 'summary') {
      const missedCount = answers.filter((a) => !a.isCorrect).length;
      if (missedCount > 0) {
        setSelectedOption((prev) => (prev === 0 ? 1 : 0));
      }
      return;
    }
    // 'result' — no cursor, no-op
  }, [phase, menuStep, answers, browseDeck]);

  const confirmAnswer = useCallback(() => {
    if (phase === 'menu') {
      if (menuStep === 'browse') {
        selectBrowsedDeck();
      } else {
        confirmMenuChoice();
      }
      return;
    }

    if (phase === 'question' && currentQuestion) {
      const isCorrect = selectedOption === currentQuestion.answer;
      const durationMs = stopQuestionTimer();
      setChosenAnswer(selectedOption);
      setAnswers((prev) => [...prev, {
        questionIdx: shuffledOrder ? shuffledOrder[questionIndex] : questionIndex,
        chosen: selectedOption,
        correct: currentQuestion.answer,
        isCorrect,
        durationMs,
      }]);
      setPhase('result');
      return;
    }

    if (phase === 'result') {
      const totalQuestions = deck.questions.length;
      if (questionIndex + 1 >= totalQuestions) {
        // Quiz complete
        setPhase('summary');
        setSelectedOption(0); // cursor reused as the generic 2-item summary selector
        const deckKey = deck.name;
        const finalCorrect = answers.filter(a => a.isCorrect).length;
        const pct = Math.round((finalCorrect / totalQuestions) * 100);
        const now = new Date().toISOString();
        const totalDurationMs = answers.reduce((s, a) => s + (a.durationMs || 0), 0);

        // Ephemeral missed-question decks don't pollute long-term stats/history
        if (!activeDeckOverride) {
          setStats((prev) => {
            const existing = prev[deckKey] || { totalAttempts: 0, totalCorrect: 0, totalQuestions: 0, bestScore: 0, lastPlayed: null };
            return {
              ...prev,
              [deckKey]: {
                totalAttempts: existing.totalAttempts + 1,
                totalCorrect: existing.totalCorrect + finalCorrect,
                totalQuestions: existing.totalQuestions + totalQuestions,
                bestScore: Math.max(existing.bestScore, pct),
                lastPlayed: now,
              },
            };
          });

          setHistory((prev) => {
            const session = {
              id: Date.now(),
              date: now,
              deckName: deckKey,
              score: finalCorrect,
              total: totalQuestions,
              pct,
              durationMs: totalDurationMs,
              answers: answers.map(a => ({
                questionIdx: a.questionIdx,
                question: deck.questions[a.questionIdx]?.question ?? '',
                chosen: a.chosen,
                correct: a.correct,
                isCorrect: a.isCorrect,
                durationMs: a.durationMs ?? null,
              })),
            };
            // Keep last 100 sessions to avoid unbounded growth
            const next = [session, ...prev];
            return next.length > 100 ? next.slice(0, 100) : next;
          });
        }

        setInProgress((prev) => {
          if (!prev[deckKey]) return prev;
          const next = { ...prev };
          delete next[deckKey];
          return next;
        });
      } else {
        setQuestionIndex((prev) => prev + 1);
        setSelectedOption(0);
        setChosenAnswer(null);
        startQuestionTimer();
        setPhase('question');
      }
      return;
    }

    if (phase === 'summary') {
      const missedCount = answers.filter(a => !a.isCorrect).length;
      if (missedCount > 0 && selectedOption === 1) {
        startMissedQuiz();
      } else {
        setPhase('menu');
        setMenuStep('browse');
        setActiveDeckOverride(null);
      }
      return;
    }
  }, [phase, menuStep, selectedOption, currentQuestion, questionIndex, deck, answers, shuffledOrder,
      activeDeckOverride, selectBrowsedDeck, confirmMenuChoice, startMissedQuiz, startQuestionTimer, stopQuestionTimer]);

  const getDeckStats = useCallback((deckName) => {
    return stats[deckName] || { totalAttempts: 0, totalCorrect: 0, totalQuestions: 0, bestScore: 0, lastPlayed: null };
  }, [stats]);

  const resetStats = useCallback((deckName) => {
    setStats((prev) => {
      const next = { ...prev };
      delete next[deckName];
      return next;
    });
    // Also remove history + any resumable snapshot for this deck
    setHistory((prev) => prev.filter(s => s.deckName !== deckName));
    setInProgress((prev) => {
      if (!prev[deckName]) return prev;
      const next = { ...prev };
      delete next[deckName];
      return next;
    });
  }, []);

  const clearAllHistory = useCallback(() => {
    setHistory([]);
    setStats({});
  }, []);

  // Get sessions for a specific deck, most recent first
  const getDeckHistory = useCallback((deckName) => {
    return history.filter(s => s.deckName === deckName);
  }, [history]);

  const missedCount = phase === 'summary' ? answers.filter(a => !a.isCorrect).length : 0;
  const totalDurationMs = answers.reduce((s, a) => s + (a.durationMs || 0), 0);

  return {
    // Deck management
    allDecks,
    deck,
    deckIndex,
    selectDeck,
    importDeck,
    removeDeck,
    customDecks,

    // Quiz state
    phase,
    menuStep,
    questionIndex,
    selectedOption,
    chosenAnswer,
    answers,
    currentQuestion,
    totalQuestions: deck?.questions.length ?? 0,
    inProgress,
    missedCount,
    totalDurationMs,

    // Actions
    startQuiz,
    startMissedQuiz,
    moveOption,
    confirmAnswer,
    backToMenu,
    backToBrowse,
    pauseTimer,
    resumeTimer,
    setBridge,

    // Stats & history
    stats,
    history,
    getDeckStats,
    getDeckHistory,
    resetStats,
    clearAllHistory,
  };
}
