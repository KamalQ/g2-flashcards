import { useCallback, useEffect, useRef } from 'react';
import useQuiz from './hooks/useQuiz';
import useGlasses from './hooks/useGlasses';
import DeckList from './components/DeckList';
import DeckImport from './components/DeckImport';
import QuizStats from './components/QuizStats';
import GlassesPreview from './components/GlassesPreview';
import { Card } from 'even-toolkit/web';
import './App.css';

export default function App() {
  const quiz = useQuiz();

  // ── Stable getter so the glasses hook always reads fresh quiz state ──
  // (Same pattern as world-clock's getCityData)
  const getQuizData = useCallback(() => ({
    phase: quiz.phase,
    questionIndex: quiz.questionIndex,
    selectedOption: quiz.selectedOption,
    chosenAnswer: quiz.chosenAnswer,
    answers: quiz.answers,
    currentQuestion: quiz.currentQuestion,
    totalQuestions: quiz.totalQuestions,
    deck: quiz.deck,
    deckStats: quiz.getDeckStats(quiz.deck?.name),
    // Pass action functions so event handlers can call them
    confirmAnswer: quiz.confirmAnswer,
    moveOption: quiz.moveOption,
  }), [quiz.phase, quiz.questionIndex, quiz.selectedOption, quiz.chosenAnswer,
       quiz.answers, quiz.currentQuestion, quiz.totalQuestions, quiz.deck,
       quiz.confirmAnswer, quiz.moveOption, quiz.getDeckStats]);

  const glasses = useGlasses({ getQuizData });

  // ── Periodic push interval (critical for real hardware) ──
  // Retries if initial display creation failed, and keeps glasses in sync.
  // Same pattern as world-clock: 1-second interval.
  const pushContentRef = useRef(glasses.pushContent);
  useEffect(() => { pushContentRef.current = glasses.pushContent; }, [glasses.pushContent]);

  useEffect(() => {
    const id = setInterval(() => { pushContentRef.current?.(); }, 1000);
    pushContentRef.current?.();
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Force push when quiz state changes ──
  const isFirstMountRef = useRef(true);
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    glasses.triggerPush();
  }, [quiz.phase, quiz.questionIndex, quiz.selectedOption, quiz.chosenAnswer, glasses.triggerPush]);

  return (
    <div id="app-container">
      {/* ── Title bar ── */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 400, color: 'var(--color-text)' }}>
          Quiz Cards
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginTop: 2 }}>
          Study with your G2 glasses
        </div>
      </div>

      {/* ── Glasses preview & controls ── */}
      <GlassesPreview quiz={quiz} glasses={glasses} />

      {/* ── Current quiz status (when active) ── */}
      {quiz.phase !== 'menu' && (
        <Card padding="default">
          <p style={{
            fontSize: 11,
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-text-dim)',
            marginBottom: 6,
          }}>
            Active Quiz
          </p>
          <div style={{ fontSize: 14, color: 'var(--color-text)' }}>
            {quiz.deck.name} — Question {quiz.questionIndex + 1}/{quiz.totalQuestions}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginTop: 2 }}>
            Correct so far: {quiz.answers.filter(a => a.isCorrect).length}/{quiz.answers.length}
          </div>

          {/* Progress bar */}
          <div style={{
            height: 6,
            borderRadius: 3,
            background: 'var(--color-border)',
            marginTop: 8,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${((quiz.questionIndex + 1) / quiz.totalQuestions) * 100}%`,
              borderRadius: 3,
              background: 'var(--color-accent)',
              transition: 'width 0.3s',
            }} />
          </div>
        </Card>
      )}

      {/* ── Deck selector ── */}
      <DeckList
        allDecks={quiz.allDecks}
        deckIndex={quiz.deckIndex}
        onSelect={quiz.selectDeck}
        onRemove={quiz.removeDeck}
        getDeckStats={quiz.getDeckStats}
      />

      {/* ── Stats & session history ── */}
      <QuizStats
        deck={quiz.deck}
        stats={quiz.stats}
        history={quiz.history}
        onReset={quiz.resetStats}
        getDeckHistory={quiz.getDeckHistory}
      />

      {/* ── Import ── */}
      <DeckImport onImport={quiz.importDeck} />

      {/* ── Event log (debug) ── */}
      {glasses.eventLog.length > 0 && (
        <Card padding="default">
          <p style={{
            fontSize: 11,
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-text-dim)',
            marginBottom: 6,
          }}>
            Event Log
          </p>
          <div
            className="event-log"
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: 'var(--color-text-dim)',
              maxHeight: 120,
              overflowY: 'auto',
              lineHeight: 1.5,
            }}
          >
            {glasses.eventLog.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
