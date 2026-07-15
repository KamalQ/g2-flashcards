import useQuiz from './hooks/useQuiz';
import useGlasses from './hooks/useGlasses';
import DeckList from './components/DeckList';
import DeckImport from './components/DeckImport';
import QuizStats from './components/QuizStats';
import GlassesPreview from './components/GlassesPreview';
import { Card, Button } from 'even-toolkit/web';
import './App.css';

export default function App() {
  const quiz = useQuiz();
  const glasses = useGlasses({ quiz });

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
