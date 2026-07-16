import { useState } from 'react';
import { Card, Badge, SectionHeader, Button } from 'even-toolkit/web';
import { SAMPLE_DECKS } from '../data/sampleDecks';

function DeckItem({ deck, idx, isActive, isSample, stats, inProgress, onSelect, onRemove, folders, folderAssignments, onMoveDeck }) {
  const [showMove, setShowMove] = useState(false);
  const currentFolder = folderAssignments[deck.name] ?? null;

  return (
    <div className={`deck-item ${isActive ? 'active' : ''}`} onClick={() => onSelect(idx)}>
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

        {/* Folder move dropdown */}
        {showMove && (
          <div className="folder-move-menu" onClick={(e) => e.stopPropagation()}>
            <div
              className={`folder-move-option ${currentFolder == null ? 'current' : ''}`}
              onClick={() => { onMoveDeck(deck.name, null); setShowMove(false); }}
            >
              No folder
            </div>
            {folders.map((f) => (
              <div
                key={f.id}
                className={`folder-move-option ${currentFolder === f.id ? 'current' : ''}`}
                onClick={() => { onMoveDeck(deck.name, f.id); setShowMove(false); }}
              >
                {f.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {isActive && (
          <Badge variant="accent" style={{ marginLeft: 4 }}>Active</Badge>
        )}

        <button
          className="deck-move-btn"
          onClick={(e) => { e.stopPropagation(); setShowMove(!showMove); }}
          title="Move to folder"
        >
          &#x21C5;
        </button>

        {!isSample && (
          <button
            className="deck-remove"
            onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
            title="Remove deck"
          >
            &#x2715;
          </button>
        )}
      </div>
    </div>
  );
}

export default function DeckList({
  allDecks, deckIndex, onSelect, onRemove, getDeckStats, inProgress,
  folders, folderAssignments, collapsedFolders,
  onCreateFolder, onRenameFolder, onDeleteFolder, onMoveDeck, onToggleFolder,
}) {
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState(null);
  const [editName, setEditName] = useState('');

  // Group decks by folder
  const folderGroups = {};
  const unfolderedDecks = [];

  allDecks.forEach((deck, idx) => {
    const folderId = folderAssignments[deck.name] ?? null;
    if (folderId && folders.some((f) => f.id === folderId)) {
      if (!folderGroups[folderId]) folderGroups[folderId] = [];
      folderGroups[folderId].push({ deck, idx });
    } else {
      unfolderedDecks.push({ deck, idx });
    }
  });

  function renderDeckItem({ deck, idx }) {
    const isActive = idx === deckIndex;
    const isSample = idx < SAMPLE_DECKS.length;
    const stats = getDeckStats(deck.name);
    return (
      <DeckItem
        key={idx}
        deck={deck}
        idx={idx}
        isActive={isActive}
        isSample={isSample}
        stats={stats}
        inProgress={inProgress}
        onSelect={onSelect}
        onRemove={onRemove}
        folders={folders}
        folderAssignments={folderAssignments}
        onMoveDeck={onMoveDeck}
      />
    );
  }

  function handleCreateFolder() {
    const name = newFolderName.trim();
    if (!name) return;
    onCreateFolder(name);
    setNewFolderName('');
  }

  function startEditFolder(folder) {
    setEditingFolder(folder.id);
    setEditName(folder.name);
  }

  function saveEditFolder() {
    if (editName.trim() && editingFolder) {
      onRenameFolder(editingFolder, editName.trim());
    }
    setEditingFolder(null);
    setEditName('');
  }

  return (
    <Card padding="sm">
      <SectionHeader title="Decks" className="mt-0" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* ── Folders ── */}
        {folders.map((folder) => {
          const isCollapsed = collapsedFolders[folder.id] ?? false;
          const decksInFolder = folderGroups[folder.id] || [];
          const totalQuestions = decksInFolder.reduce((s, d) => s + d.deck.questions.length, 0);

          return (
            <div key={folder.id} className="folder-group">
              {/* Folder header */}
              <div
                className="folder-header"
                onClick={() => onToggleFolder(folder.id)}
              >
                <div className="folder-header-left">
                  <span className={`folder-chevron ${isCollapsed ? '' : 'open'}`}>&#x25B8;</span>
                  {editingFolder === folder.id ? (
                    <input
                      className="folder-rename-input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={saveEditFolder}
                      onKeyDown={(e) => { if (e.key === 'Enter') saveEditFolder(); if (e.key === 'Escape') setEditingFolder(null); }}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                    />
                  ) : (
                    <span className="folder-name">{folder.name}</span>
                  )}
                  <span className="folder-count">{decksInFolder.length} set{decksInFolder.length !== 1 ? 's' : ''} · {totalQuestions} Q</span>
                </div>
                <div className="folder-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="folder-action-btn"
                    onClick={() => startEditFolder(folder)}
                    title="Rename folder"
                  >
                    &#x270E;
                  </button>
                  <button
                    className="folder-action-btn"
                    onClick={() => { if (confirm(`Delete folder "${folder.name}"? Sets will be moved out.`)) onDeleteFolder(folder.id); }}
                    title="Delete folder"
                  >
                    &#x2715;
                  </button>
                </div>
              </div>

              {/* Folder contents */}
              {!isCollapsed && (
                <div className="folder-contents">
                  {decksInFolder.length === 0 ? (
                    <div className="folder-empty">No sets in this folder</div>
                  ) : (
                    decksInFolder.map(renderDeckItem)
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* ── Unfoldered decks ── */}
        {unfolderedDecks.length > 0 && folders.length > 0 && (
          <div className="folder-divider-label">Unorganized</div>
        )}
        {unfolderedDecks.map(renderDeckItem)}

        {/* ── New folder ── */}
        <div className="new-folder-row">
          <input
            className="new-folder-input"
            placeholder="New folder name..."
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleCreateFolder(); }}
          />
          <Button
            variant="highlight"
            onClick={handleCreateFolder}
            style={{ flexShrink: 0, fontSize: 12, padding: '6px 12px' }}
          >
            + Folder
          </Button>
        </div>
      </div>
    </Card>
  );
}
