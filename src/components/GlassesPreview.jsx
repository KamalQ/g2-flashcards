import { Card, Button } from 'even-toolkit/web';

export default function GlassesPreview({ quiz, glasses }) {
  const LETTERS = ['A', 'B', 'C', 'D'];

  // Build a text preview of what's showing on glasses
  function getPreviewText() {
    const q = quiz;
    switch (q.phase) {
      case 'menu':
        return `${q.deck.name}\n${q.deck.questions.length} questions\n\nTap to start`;
      case 'question':
        if (!q.currentQuestion) return 'Loading...';
        return [
          `Q${q.questionIndex + 1}/${q.totalQuestions}`,
          '',
          q.currentQuestion.question,
          '',
          ...q.currentQuestion.options.map((opt, i) =>
            `${i === q.selectedOption ? '►' : ' '} ${LETTERS[i]}) ${opt}`
          ),
        ].join('\n');
      case 'result': {
        const last = q.answers[q.answers.length - 1];
        if (!last || !q.currentQuestion) return 'Loading...';
        return last.isCorrect
          ? `● Correct!\n\n${LETTERS[last.correct]}) ${q.currentQuestion.options[last.correct]}`
          : `○ Incorrect\n\nYou chose: ${LETTERS[last.chosen]}) ${q.currentQuestion.options[last.chosen]}\nCorrect: ${LETTERS[last.correct]}) ${q.currentQuestion.options[last.correct]}`;
      }
      case 'summary': {
        const correct = q.answers.filter(a => a.isCorrect).length;
        const pct = Math.round((correct / q.totalQuestions) * 100);
        return `Quiz Complete!\n\nScore: ${correct}/${q.totalQuestions} (${pct}%)`;
      }
      default:
        return '';
    }
  }

  return (
    <Card padding="default">
      <p style={{
        fontSize: 11,
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--color-text-dim)',
        marginBottom: 10,
      }}>
        Glasses Display
      </p>

      <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginBottom: 8 }}>
        {glasses.status}
      </div>

      {/* Mini preview */}
      <div style={{
        background: '#1a2a1a',
        color: '#4aff4a',
        fontFamily: 'monospace',
        fontSize: 10,
        lineHeight: 1.4,
        padding: 12,
        borderRadius: 6,
        whiteSpace: 'pre-wrap',
        minHeight: 80,
        maxHeight: 120,
        overflow: 'hidden',
      }}>
        {getPreviewText()}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Button variant="highlight" onClick={glasses.showDisplay} style={{ flex: 1 }}>
          Refresh Display
        </Button>
        <Button variant="ghost" onClick={glasses.shutdownGlasses}>
          Exit
        </Button>
      </div>

      {/* Interaction guide */}
      <div style={{
        fontSize: 11,
        color: 'var(--color-text-dim)',
        marginTop: 10,
        lineHeight: 1.6,
      }}>
        <strong>Controls:</strong><br />
        Scroll — move between A/B/C/D<br />
        Tap — select answer / continue<br />
        Double-tap — exit app
      </div>
    </Card>
  );
}
