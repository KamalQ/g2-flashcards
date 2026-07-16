import { Card, Button, Badge, SectionHeader, StatusDot } from 'even-toolkit/web';
import {
  buildQuestionRows,
  selectVisibleWindow,
  renderRows,
  buildResultRows,
  maxResultScrollOffset,
  renderResultRows,
  formatDuration,
} from '../lib/textLayout';

export default function GlassesPreview({ quiz, glasses }) {
  function getPreviewText() {
    const q = quiz;
    switch (q.phase) {
      case 'menu': {
        if (q.menuStep === 'confirm') {
          const snapshot = q.inProgress?.[q.deck.name];
          const resumeLabel = snapshot ? `Resume  Q${snapshot.questionIndex + 1}/${q.deck.questions.length}` : 'Resume';
          return [
            q.deck.name,
            '',
            `${q.selectedOption === 0 ? '▶' : ' '} ${resumeLabel}`,
            `${q.selectedOption === 1 ? '▶' : ' '} Start New`,
          ].join('\n');
        }
        const hasResume = !!q.inProgress?.[q.deck.name];
        return [
          `Deck ${q.deckIndex + 1}/${q.allDecks.length}`,
          q.deck.name,
          `${q.deck.questions.length} questions`,
          '',
          hasResume ? 'Tap to resume or restart' : 'Tap to start',
          q.allDecks.length > 1 ? 'Scroll to browse decks' : '',
        ].filter(Boolean).join('\n');
      }
      case 'question': {
        if (!q.currentQuestion) return 'Loading...';
        const rows = buildQuestionRows(q.currentQuestion, q.selectedOption);
        const windowStart = selectVisibleWindow(rows, q.selectedOption, q.questionReadOffset);
        const body = renderRows(rows, windowStart, q.selectedOption);
        return `Q${q.questionIndex + 1}/${q.totalQuestions}\n\n${body}`;
      }
      case 'result': {
        const last = q.answers[q.answers.length - 1];
        if (!last || !q.currentQuestion) return '';
        const resultRows = buildResultRows(q.currentQuestion, q.chosenAnswer, last.isCorrect);
        const resultWindowStart = Math.min(Math.max(0, q.resultScrollOffset ?? 0), maxResultScrollOffset(resultRows));
        return renderResultRows(resultRows, resultWindowStart);
      }
      case 'summary': {
        const correct = q.answers.filter(a => a.isCorrect).length;
        const pct = Math.round((correct / q.totalQuestions) * 100);
        const lines = [
          'Quiz Complete!',
          '',
          `Score: ${correct}/${q.totalQuestions} (${pct}%)`,
          `Time: ${formatDuration(q.totalDurationMs)}`,
        ];
        if (q.missedCount > 0) {
          lines.push('');
          lines.push(`${q.selectedOption === 0 ? '▶' : ' '} Return to menu`);
          lines.push(`${q.selectedOption === 1 ? '▶' : ' '} Practice ${q.missedCount} missed`);
        }
        return lines.join('\n');
      }
      default:
        return '';
    }
  }

  const isMidQuiz = quiz.phase === 'question' || quiz.phase === 'result';
  const doubleTapDesc = isMidQuiz
    ? 'Back (saves)'
    : (quiz.phase === 'menu' && quiz.menuStep === 'confirm')
      ? 'Back'
      : 'Exit';

  return (
    <Card padding="sm">
      <SectionHeader
        title="Glasses Display"
        className="mt-0"
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <StatusDot connected={glasses.connected} />
            <span style={{ fontSize: 11, color: 'var(--color-text-dim)' }}>
              {glasses.connected ? 'Connected' : 'Preview'}
            </span>
          </div>
        }
      />

      {/* Mini glasses preview */}
      <div className="glasses-preview-screen">
        {getPreviewText()}
      </div>

      {/* Controls */}
      <div className="btn-row" style={{ marginTop: 10 }}>
        <Button variant="highlight" onClick={glasses.showDisplay}>
          Refresh Display
        </Button>
        <Button variant="default" className="border border-border" onClick={glasses.shutdownGlasses}>
          Exit App
        </Button>
      </div>

      {/* Controls legend */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 6,
        marginTop: 10,
      }}>
        {[
          { label: 'Scroll', desc: 'Move / browse' },
          { label: 'Tap', desc: 'Select' },
          { label: '2x Tap', desc: doubleTapDesc },
        ].map(({ label, desc }) => (
          <div key={label} style={{
            textAlign: 'center',
            padding: '6px 4px',
            borderRadius: 6,
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 400, color: 'var(--color-text)' }}>{label}</div>
            <div style={{ fontSize: 10, color: 'var(--color-text-dim)', marginTop: 1 }}>{desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
