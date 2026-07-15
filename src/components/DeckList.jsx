import { Card, Button } from 'even-toolkit/web';
import { SAMPLE_DECKS } from '../data/sampleDecks';

export default function DeckList({ allDecks, deckIndex, onSelect, onRemove, getDeckStats }) {
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
        Decks
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {allDecks.map((deck, idx) => {
          const isActive = idx === deckIndex;
          const isSample = idx < SAMPLE_DECKS.length;
          const stats = getDeckStats(deck.name);

          return (
            <div
              key={idx}
              onClick={() => onSelect(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 6,
                border: isActive
                  ? '2px solid var(--color-accent)'
                  : '1px solid var(--color-border)',
                background: isActive ? 'var(--color-surface-raised)' : 'var(--color-surface)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: isActive ? 400 : 300,
                  color: 'var(--color-text)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {isActive && '● '}{deck.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--color-text-dim)', marginTop: 2 }}>
                  {deck.questions.length} questions
                  {stats.totalAttempts > 0 && ` · Best: ${stats.bestScore}%`}
                  {stats.totalAttempts > 0 && ` · ${stats.totalAttempts} attempt${stats.totalAttempts > 1 ? 's' : ''}`}
                </div>
              </div>

              {!isSample && (
                <button
                  onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-dim)',
                    fontSize: 16,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 4,
                    flexShrink: 0,
                    marginLeft: 8,
                  }}
                  title="Remove deck"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
