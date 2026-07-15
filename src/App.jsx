import { useCallback, useEffect, useRef } from 'react';
import useQuiz from './hooks/useQuiz';
import useGlasses from './hooks/useGlasses';
import DeckList from './components/DeckList';
import DeckImport from './components/DeckImport';
import QuizStats from './components/QuizStats';
import GlassesPreview from './components/GlassesPreview';
import { Card, Button, Badge, Progress, SectionHeader } from 'even-toolkit/web';
import { formatDuration } from './lib/textLayout';
import './App.css';

export default function App() {
  const quiz = useQuiz();

  const getQuizData = useCallback(() => ({
    phase: quiz.phase,
    menuStep: quiz.menuStep,
    questionIndex: quiz.questionIndex,
    selectedOption: quiz.selectedOption,
    chosenAnswer: quiz.chosenAnswer,
    answers: quiz.answers,
    currentQuestion: quiz.currentQuestion,
    totalQuestions: quiz.totalQuestions,
    deck: quiz.deck,
    deckIndex: quiz.deckIndex,
    deckCount: quiz.allDecks.length,
    deckStats: quiz.getDeckStats(quiz.deck?.name),
    inProgressSnapshot: quiz.deck ? quiz.inProgress[quiz.deck.name] ?? null : null,
    missedCount: quiz.missedCount,
    totalDurationMs: quiz.totalDurationMs,
    confirmAnswer: quiz.confirmAnswer,
    moveOption: quiz.moveOption,
    backToMenu: quiz.backToMenu,
    backToBrowse: quiz.backToBrowse,
    pauseTimer: quiz.pauseTimer,
    resumeTimer: quiz.resumeTimer,
    saveInProgressSnapshot: quiz.saveInProgressSnapshot,
  }), [quiz.phase, quiz.menuStep, quiz.questionIndex, quiz.selectedOption, quiz.chosenAnswer,
       quiz.answers, quiz.currentQuestion, quiz.totalQuestions, quiz.deck, quiz.deckIndex,
       quiz.allDecks.length, quiz.inProgress, quiz.missedCount, quiz.totalDurationMs,
       quiz.confirmAnswer, quiz.moveOption, quiz.getDeckStats, quiz.backToMenu, quiz.backToBrowse,
       quiz.pauseTimer, quiz.resumeTimer, quiz.saveInProgressSnapshot]);

  const glasses = useGlasses({ getQuizData, setBridge: quiz.setBridge });

  // Periodic push interval (critical for real hardware)
  const pushContentRef = useRef(glasses.pushContent);
  useEffect(() => { pushContentRef.current = glasses.pushContent; }, [glasses.pushContent]);

  useEffect(() => {
    const id = setInterval(() => { pushContentRef.current?.(); }, 1000);
    pushContentRef.current?.();
    return () => clearInterval(id);
  }, []);

  // Force push on quiz state changes
  const isFirstMountRef = useRef(true);
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    glasses.triggerPush();
  }, [quiz.phase, quiz.menuStep, quiz.deckIndex, quiz.questionIndex, quiz.selectedOption,
      quiz.chosenAnswer, glasses.triggerPush]);

  const correctCount = quiz.answers.filter(a => a.isCorrect).length;
  const progressPct = quiz.totalQuestions > 0 ? ((quiz.questionIndex + 1) / quiz.totalQuestions) * 100 : 0;

  return (
    <div id="app-container">
      {/* ── Hero ── */}
      <div className="app-hero">
        <h1>Quiz Cards</h1>
        <div className="subtitle">Study with your G2 glasses</div>
      </div>

      {/* ── Glasses preview ── */}
      <GlassesPreview quiz={quiz} glasses={glasses} />

      {/* ── Active quiz card ── */}
      {quiz.phase !== 'menu' && (
        <Card padding="default">
          <SectionHeader
            title="Active Quiz"
            action={
              <Badge variant={quiz.phase === 'summary' ? 'positive' : 'accent'}>
                {quiz.phase === 'summary' ? 'Complete' : `Q${quiz.questionIndex + 1}/${quiz.totalQuestions}`}
              </Badge>
            }
          />

          <div style={{ fontSize: 14, color: 'var(--color-text)', marginBottom: 4 }}>
            {quiz.deck.name}
          </div>

          <div style={{
            fontSize: 12,
            color: 'var(--color-text-dim)',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span>Correct: {correctCount}/{quiz.answers.length}</span>
            {quiz.answers.length > 0 && (
              <Badge variant={correctCount / quiz.answers.length >= 0.7 ? 'positive' : 'negative'}>
                {Math.round((correctCount / quiz.answers.length) * 100)}%
              </Badge>
            )}
            {quiz.phase === 'summary' && (
              <>
                <span style={{ opacity: 0.3 }}>·</span>
                <span>Time: {formatDuration(quiz.totalDurationMs)}</span>
              </>
            )}
          </div>

          <Progress value={progressPct} />

          {quiz.phase === 'summary' && quiz.missedCount > 0 && (
            <Button
              variant="highlight"
              onClick={quiz.startMissedQuiz}
              style={{ width: '100%', marginTop: 12 }}
            >
              Practice {quiz.missedCount} missed question{quiz.missedCount > 1 ? 's' : ''}
            </Button>
          )}
        </Card>
      )}

      {/* ── Decks ── */}
      <DeckList
        allDecks={quiz.allDecks}
        deckIndex={quiz.deckIndex}
        onSelect={quiz.selectDeck}
        onRemove={quiz.removeDeck}
        getDeckStats={quiz.getDeckStats}
        inProgress={quiz.inProgress}
        folders={quiz.folders}
        folderAssignments={quiz.folderAssignments}
        collapsedFolders={quiz.collapsedFolders}
        onCreateFolder={quiz.createFolder}
        onRenameFolder={quiz.renameFolder}
        onDeleteFolder={quiz.deleteFolder}
        onMoveDeck={quiz.moveDeckToFolder}
        onToggleFolder={quiz.toggleFolderCollapsed}
      />

      {/* ── Stats & history ── */}
      <QuizStats
        deck={quiz.deck}
        stats={quiz.stats}
        history={quiz.history}
        onReset={quiz.resetStats}
        getDeckHistory={quiz.getDeckHistory}
      />

      {/* ── Import ── */}
      <DeckImport onImport={quiz.importDeck} />

      {/* ── Event log (collapsible debug) ── */}
      {glasses.eventLog.length > 0 && (
        <Card padding="default">
          <SectionHeader title="Event Log" />
          <div className="event-log">
            {glasses.eventLog.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
