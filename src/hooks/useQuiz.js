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

  // Current deck index
  const [deckIndex, setDeckIndex] = useState(() => loadFromStorage(DECK_KEY, 0));
  const deck = allDecks[deckIndex] || allDecks[0];

  // Quiz state
  const [phase, setPhase] = useState('menu'); // 'menu' | 'question' | 'result' | 'summary'
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0); // Cursor position 0-3
  const [chosenAnswer, setChosenAnswer] = useState(null);  // What user picked
  const [answers, setAnswers] = useState([]); // Array of { questionIdx, chosen, correct, isCorrect }
  const [shuffledOrder, setShuffledOrder] = useState(null); // Shuffled question indices

  // Persistent stats per deck + full session history
  const [stats, setStats] = useState(() => loadFromStorage(STATS_KEY, {}));
  const [history, setHistory] = useState(() => loadFromStorage(HISTORY_KEY, []));

  // Bridge ref for syncing stats
  const bridgeRef = useRef(null);
  const setBridge = useCallback((bridge) => { bridgeRef.current = bridge; }, []);

  // Save all data to localStorage whenever it changes
  useEffect(() => { saveToStorage(STATS_KEY, stats); }, [stats]);
  useEffect(() => { saveToStorage(HISTORY_KEY, history); }, [history]);
  useEffect(() => { saveToStorage(CUSTOM_DECKS_KEY, customDecks); }, [customDecks]);
  useEffect(() => { saveToStorage(DECK_KEY, deckIndex); }, [deckIndex]);

  // Also sync to bridge storage (persists on phone across app restarts)
  useEffect(() => {
    const bridge = bridgeRef.current;
    if (bridge) {
      bridge.setLocalStorage(STATS_KEY, JSON.stringify(stats)).catch(() => {});
      bridge.setLocalStorage(HISTORY_KEY, JSON.stringify(history)).catch(() => {});
      bridge.setLocalStorage(CUSTOM_DECKS_KEY, JSON.stringify(customDecks)).catch(() => {});
    }
  }, [stats, history, customDecks]);

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
    setCustomDecks((prev) => prev.filter((_, i) => i !== customIdx));
    if (deckIndex >= idx) {
      setDeckIndex(Math.max(0, deckIndex - 1));
    }
  }, [deckIndex]);

  const selectDeck = useCallback((idx) => {
    setDeckIndex(idx);
    setPhase('menu');
    setQuestionIndex(0);
    setSelectedOption(0);
    setAnswers([]);
    setShuffledOrder(null);
  }, []);

  // ── Quiz flow ───────────────────────────────────────────────────────────
  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = useCallback(() => {
    const order = shuffleArray(deck.questions.map((_, i) => i));
    setShuffledOrder(order);
    setQuestionIndex(0);
    setSelectedOption(0);
    setChosenAnswer(null);
    setAnswers([]);
    setPhase('question');
  }, [deck]);

  const currentQuestion = deck && shuffledOrder
    ? deck.questions[shuffledOrder[questionIndex]]
    : deck?.questions[questionIndex];

  const moveOption = useCallback((direction) => {
    if (phase !== 'question') return;
    setSelectedOption((prev) => {
      if (direction === 'up') return prev > 0 ? prev - 1 : 3;
      return prev < 3 ? prev + 1 : 0;
    });
  }, [phase]);

  const confirmAnswer = useCallback(() => {
    if (phase === 'menu') {
      startQuiz();
      return;
    }

    if (phase === 'question' && currentQuestion) {
      const isCorrect = selectedOption === currentQuestion.answer;
      setChosenAnswer(selectedOption);
      setAnswers((prev) => [...prev, {
        questionIdx: shuffledOrder ? shuffledOrder[questionIndex] : questionIndex,
        chosen: selectedOption,
        correct: currentQuestion.answer,
        isCorrect,
      }]);
      setPhase('result');
      return;
    }

    if (phase === 'result') {
      const totalQuestions = deck.questions.length;
      if (questionIndex + 1 >= totalQuestions) {
        // Quiz complete — update aggregate stats + save full session
        setPhase('summary');
        const deckKey = deck.name;
        const finalCorrect = answers.filter(a => a.isCorrect).length;
        const pct = Math.round((finalCorrect / totalQuestions) * 100);
        const now = new Date().toISOString();

        // Aggregate stats
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

        // Full session history — store per-question detail
        setHistory((prev) => {
          const session = {
            id: Date.now(),
            date: now,
            deckName: deckKey,
            score: finalCorrect,
            total: totalQuestions,
            pct,
            durationMs: null, // could add timing later
            answers: answers.map(a => ({
              questionIdx: a.questionIdx,
              question: deck.questions[a.questionIdx]?.question ?? '',
              chosen: a.chosen,
              correct: a.correct,
              isCorrect: a.isCorrect,
            })),
          };
          // Keep last 100 sessions to avoid unbounded growth
          const next = [session, ...prev];
          return next.length > 100 ? next.slice(0, 100) : next;
        });
      } else {
        setQuestionIndex((prev) => prev + 1);
        setSelectedOption(0);
        setChosenAnswer(null);
        setPhase('question');
      }
      return;
    }

    if (phase === 'summary') {
      setPhase('menu');
      return;
    }
  }, [phase, selectedOption, currentQuestion, questionIndex, deck, answers, shuffledOrder, startQuiz]);

  const getDeckStats = useCallback((deckName) => {
    return stats[deckName] || { totalAttempts: 0, totalCorrect: 0, totalQuestions: 0, bestScore: 0, lastPlayed: null };
  }, [stats]);

  const resetStats = useCallback((deckName) => {
    setStats((prev) => {
      const next = { ...prev };
      delete next[deckName];
      return next;
    });
    // Also remove history for this deck
    setHistory((prev) => prev.filter(s => s.deckName !== deckName));
  }, []);

  const clearAllHistory = useCallback(() => {
    setHistory([]);
    setStats({});
  }, []);

  // Get sessions for a specific deck, most recent first
  const getDeckHistory = useCallback((deckName) => {
    return history.filter(s => s.deckName === deckName);
  }, [history]);

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
    questionIndex,
    selectedOption,
    chosenAnswer,
    answers,
    currentQuestion,
    totalQuestions: deck?.questions.length ?? 0,

    // Actions
    startQuiz,
    moveOption,
    confirmAnswer,
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
