import { Card, Badge, SectionHeader } from 'even-toolkit/web';
import { SAMPLE_DECKS } from '../data/sampleDecks';

export default function DeckList({ allDecks, deckIndex, onSelect, onRemove, getDeckStats, inProgress }) {
  return (
    <Card padding="default">
      <SectionHeader title="Decks" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {allDecks.map((deck, idx) => {
          const isActive = idx === deckIndex;
          const isSample = idx < SAMPLE_DECKS.length;
          const stats = getDeckStats(deck.name);

          return (
            <div
              key={idx}
              className={`deck-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(idx)}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="deck-name">{deck.name}</div>
                <div className="deck-meta">
                  <span>{deck.questions.length} questions</span>
                  {stats.totalAttempts > 0 && (
                    <>
                      <span style={{ opacity: 0.3 }}>·</span>
                      <Badge variant="positive">Best: {stats.bestScore}%</Badge>
                    </>
                  )}
                  {stats.totalAttempts > 0 && (
                    <>
                      <span style={{ opacity: 0.3 }}>·</span>
                      <span>{stats.totalAttempts} run{stats.totalAttempts > 1 ? 's' : ''}</span>
                    </>
                  )}
                  {inProgress?.[deck.name] && (
                    <>
                      <span style={{ opacity: 0.3 }}>·</span>
                      <Badge variant="accent">Resumable</Badge>
                    </>
                  )}
                </div>
              </div>

              {isActive && (
                <Badge variant="accent" style={{ flexShrink: 0, marginLeft: 8 }}>
                  Active
                </Badge>
              )}

              {!isSample && (
                <button
                  className="deck-remove"
                  onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
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
