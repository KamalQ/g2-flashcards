import { useState } from 'react';
import { Card, Button, Badge, Progress, StatGrid, SectionHeader, EmptyState } from 'even-toolkit/web';
import { LETTERS, formatDuration } from '../lib/textLayout';

export default function QuizStats({ deck, stats, onReset, getDeckHistory }) {
  const [expandedSession, setExpandedSession] = useState(null);

  if (!deck) return null;

  const deckStats = stats[deck.name];
  const sessions = getDeckHistory(deck.name);

  if ((!deckStats || deckStats.totalAttempts === 0) && sessions.length === 0) {
    return (
      <Card padding="sm">
        <SectionHeader title="Stats" className="mt-0" />
        <EmptyState
          title="No attempts yet"
          description="Start a quiz on your glasses to track your progress."
        />
      </Card>
    );
  }

  const avgPct = deckStats ? Math.round((deckStats.totalCorrect / deckStats.totalQuestions) * 100) : 0;
  const lastPlayed = deckStats?.lastPlayed
    ? new Date(deckStats.lastPlayed).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
      })
    : 'Never';

  return (
    <Card padding="sm">
      <SectionHeader title={`Stats — ${deck.name}`} className="mt-0" />

      {/* Aggregate stats */}
      <StatGrid
        columns={2}
        stats={[
          { label: 'Attempts', value: deckStats?.totalAttempts ?? 0 },
          { label: 'Best Score', value: `${deckStats?.bestScore ?? 0}%` },
          { label: 'Avg Score', value: `${avgPct}%` },
          { label: 'Last Played', value: lastPlayed },
        ]}
      />

      {/* Accuracy progress bar */}
      {deckStats && (
        <div style={{ marginTop: 14 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'var(--color-text-dim)',
            marginBottom: 6,
          }}>
            <span>Lifetime accuracy</span>
            <span>{deckStats.totalCorrect}/{deckStats.totalQuestions} correct</span>
          </div>
          <Progress value={avgPct} />
        </div>
      )}

      {/* Session history */}
      {sessions.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <SectionHeader title="Session History" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sessions.map((session) => {
              const isExpanded = expandedSession === session.id;
              const dateStr = new Date(session.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
              });

              return (
                <div key={session.id}>
                  <div
                    className="session-row"
                    onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                  >
                    <span style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>
                      {dateStr}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--color-text)' }}>
                        {session.score}/{session.total}
                      </span>
                      <Badge variant={session.pct >= 70 ? 'positive' : 'negative'}>
                        {session.pct}%
                      </Badge>
                      {session.durationMs != null && (
                        <span style={{ fontSize: 11, color: 'var(--color-text-dim)' }}>
                          {formatDuration(session.durationMs)}
                        </span>
                      )}
                      <span style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {isExpanded && session.answers && (
                    <div className="session-detail">
                      {session.answers.map((a, i) => {
                        // Full option text was only captured into history
                        // starting with this feature — older sessions fall
                        // back to letter-only.
                        const chosenText = a.options?.[a.chosen];
                        const correctText = a.options?.[a.correct];
                        return (
                          <div key={i} className="session-detail-row">
                            <Badge
                              variant={a.isCorrect ? 'positive' : 'negative'}
                              style={{ flexShrink: 0, fontSize: 10, padding: '1px 5px' }}
                            >
                              {a.isCorrect ? '✓' : '✗'}
                            </Badge>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ color: 'var(--color-text)', fontSize: 12 }}>{a.question}</div>
                              <div style={{ color: 'var(--color-text-dim)', fontSize: 11, marginTop: 3 }}>
                                Chose: {LETTERS[a.chosen]}{chosenText ? `) ${chosenText}` : ''}
                              </div>
                              {!a.isCorrect && (
                                <div style={{ color: 'var(--color-text-dim)', fontSize: 11, marginTop: 1 }}>
                                  Correct: {LETTERS[a.correct]}{correctText ? `) ${correctText}` : ''}
                                </div>
                              )}
                            </div>
                            {a.durationMs != null && (
                              <span style={{ fontSize: 10, color: 'var(--color-text-dim)', flexShrink: 0 }}>
                                {formatDuration(a.durationMs)}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Button
        variant="ghost"
        onClick={() => onReset(deck.name)}
        style={{ width: '100%', marginTop: 12, fontSize: 12 }}
      >
        Reset stats & history
      </Button>
    </Card>
  );
}
