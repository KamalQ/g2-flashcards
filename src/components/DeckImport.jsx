import { useState, useRef } from 'react';
import { Card, Button } from 'even-toolkit/web';
import { FORMAT_INSTRUCTIONS } from '../data/sampleDecks';

export default function DeckImport({ onImport }) {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showFormat, setShowFormat] = useState(false);
  const fileInputRef = useRef(null);

  function handleImport() {
    if (!text.trim()) {
      setError('Please paste or upload quiz content');
      return;
    }
    try {
      const deck = onImport(text.trim());
      setSuccess(`Imported "${deck.name}" with ${deck.questions.length} questions`);
      setError(null);
      setText('');
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setText(reader.result);
      setError(null);
      setSuccess(null);
    };
    reader.readAsText(file);
    // Reset input so re-uploading same file works
    e.target.value = '';
  }

  const sampleJSON = JSON.stringify({
    name: 'My Custom Quiz',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        answer: 1,
      },
      {
        question: 'Which planet is closest to the Sun?',
        options: ['Venus', 'Earth', 'Mercury', 'Mars'],
        answer: 2,
      },
    ],
  }, null, 2);

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
        Import Deck
      </p>

      {/* Format toggle */}
      <Button
        variant="ghost"
        onClick={() => setShowFormat((v) => !v)}
        style={{ width: '100%', marginBottom: 8, fontSize: 13 }}
      >
        {showFormat ? 'Hide format guide' : 'Show format guide'}
      </Button>

      {showFormat && (
        <pre style={{
          fontSize: 11,
          lineHeight: 1.5,
          background: 'var(--color-surface-raised)',
          padding: 12,
          borderRadius: 6,
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
          color: 'var(--color-text-dim)',
          marginBottom: 12,
          border: '1px solid var(--color-border)',
        }}>
          {FORMAT_INSTRUCTIONS}
        </pre>
      )}

      {/* Text input */}
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setError(null); setSuccess(null); }}
        placeholder="Paste JSON, CSV, or text format here..."
        rows={6}
        style={{
          width: '100%',
          fontFamily: 'monospace',
          fontSize: 12,
          padding: 10,
          borderRadius: 6,
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Button variant="highlight" onClick={handleImport} style={{ flex: 1 }}>
          Import Deck
        </Button>
        <Button variant="default" onClick={() => fileInputRef.current?.click()}>
          Upload File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.csv,.txt"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Sample button */}
      <Button
        variant="ghost"
        onClick={() => { setText(sampleJSON); setError(null); setSuccess(null); }}
        style={{ width: '100%', marginTop: 4, fontSize: 12 }}
      >
        Load sample JSON
      </Button>

      {/* Status messages */}
      {error && (
        <p style={{ color: 'var(--color-accent-warning)', fontSize: 12, marginTop: 8 }}>
          {error}
        </p>
      )}
      {success && (
        <p style={{ color: 'var(--color-accent)', fontSize: 12, marginTop: 8 }}>
          {success}
        </p>
      )}
    </Card>
  );
}
