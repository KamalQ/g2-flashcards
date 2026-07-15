import { useState } from 'react';
import { Card, Button } from 'even-toolkit/web';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizStats({ deck, stats, history, onReset, getDeckHistory }) {
  const [expandedSession, setExpandedSession] = useState(null);

  if (!deck) return null;

  const deckStats = stats[deck.name];
  const sessions = getDeckHistory(deck.name);

  if ((!deckStats || deckStats.totalAttempts === 0) && sessions.length === 0) {
    return (
      <Card padding="default">
        <p style={sectionTitle}>Stats — {deck.name}</p>
        <p style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>
          No attempts yet. Start a quiz on your glasses!
        </p>
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
    <Card padding="default">
      <p style={sectionTitle}>Stats — {deck.name}</p>

      {/* ── Aggregate stats grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <StatBox label="Attempts" value={deckStats?.totalAttempts ?? 0} />
        <StatBox label="Best Score" value={`${deckStats?.bestScore ?? 0}%`} />
        <StatBox label="Avg Score" value={`${avgPct}%`} />
        <StatBox label="Last Played" value={lastPlayed} small />
      </div>

      {/* ── Lifetime accuracy bar ── */}
      {deckStats && (
        <div style={{ marginTop: 12 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'var(--color-text-dim)',
            marginBottom: 4,
          }}>
            <span>Lifetime accuracy</span>
            <span>{deckStats.totalCorrect}/{deckStats.totalQuestions} correct</span>
          </div>
          <div style={barTrack}>
            <div style={{
              ...barFill,
              width: `${avgPct}%`,
              background: avgPct >= 70 ? 'var(--color-accent)' : 'var(--color-accent-warning)',
            }} />
          </div>
        </div>
      )}

      {/* ── Session history ── */}
      {sessions.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ ...sectionTitle, marginBottom: 8 }}>Session History</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sessions.map((session) => {
              const isExpanded = expandedSession === session.id;
              const dateStr = new Date(session.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
              });

              return (
                <div key={session.id}>
                  {/* Session summary row */}
                  <div
                    onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 6,
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>
                        {dateStr}
                      </div>
                    </div>

                    {/* Score badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: session.pct >= 70 ? 'var(--color-accent)' : 'var(--color-accent-warning)',
                      }}>
                        {session.score}/{session.total}
                      </div>
                      <div style={{
                        fontSize: 12,
                        fontWeight: 400,
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: session.pct >= 70 ? 'rgba(52,199,89,0.12)' : 'rgba(255,149,0,0.12)',
                        color: session.pct >= 70 ? 'var(--color-accent)' : 'var(--color-accent-warning)',
                      }}>
                        {session.pct}%
                      </div>
                      <span style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded detail — per-question breakdown */}
                  {isExpanded && session.answers && (
                    <div style={{
                      padding: '8px 10px',
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderTop: 'none',
                      borderRadius: '0 0 6px 6px',
                      fontSize: 11,
                      lineHeight: 1.8,
                    }}>
                      {session.answers.map((a, i) => {
                        const qText = a.question.length > 50
                          ? a.question.slice(0, 48) + '..'
                          : a.question;
                        return (
                          <div key={i} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 6,
                            paddingBottom: 4,
                            borderBottom: i < session.answers.length - 1
                              ? '1px solid var(--color-border)' : 'none',
                            marginBottom: 4,
                          }}>
                            <span style={{
                              flexShrink: 0,
                              color: a.isCorrect ? 'var(--color-accent)' : 'var(--color-accent-warning)',
                            }}>
                              {a.isCorrect ? '●' : '○'}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ color: 'var(--color-text)' }}>{qText}</div>
                              {!a.isCorrect && (
                                <div style={{ color: 'var(--color-text-dim)', fontSize: 10 }}>
                                  Chose {LETTERS[a.chosen]} — Correct: {LETTERS[a.correct]}
                                </div>
                              )}
                            </div>
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
        style={{ width: '100%', marginTop: 10, fontSize: 12 }}
      >
        Reset stats & history
      </Button>
    </Card>
  );
}

// ── Shared styles ───────────────────────────────────────────────────────────
const sectionTitle = {
  fontSize: 11,
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--color-text-dim)',
  marginBottom: 10,
};

const barTrack = {
  height: 8,
  borderRadius: 4,
  background: 'var(--color-border)',
  overflow: 'hidden',
};

const barFill = {
  height: '100%',
  borderRadius: 4,
  transition: 'width 0.3s',
};

function StatBox({ label, value, small = false }) {
  return (
    <div style={{
      padding: '8px 10px',
      borderRadius: 6,
      background: 'var(--color-surface-raised)',
      border: '1px solid var(--color-border)',
    }}>
      <div style={{
        fontSize: 11,
        color: 'var(--color-text-dim)',
        marginBottom: 2,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: small ? 12 : 16,
        fontWeight: 400,
        color: 'var(--color-text)',
      }}>
        {value}
      </div>
    </div>
  );
}
