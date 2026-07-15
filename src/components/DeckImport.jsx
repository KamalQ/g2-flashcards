import { useState, useRef } from 'react';
import { Card, Button, Textarea, SectionHeader } from 'even-toolkit/web';
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
      <SectionHeader
        title="Import Deck"
        action={
          <Button
            variant="ghost"
            onClick={() => setShowFormat((v) => !v)}
            style={{ fontSize: 11, padding: '4px 8px' }}
          >
            {showFormat ? 'Hide guide' : 'Format guide'}
          </Button>
        }
      />

      {showFormat && (
        <pre className="format-guide">{FORMAT_INSTRUCTIONS}</pre>
      )}

      {/* Text input */}
      <Textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setError(null); setSuccess(null); }}
        placeholder="Paste JSON, CSV, or text format here..."
        rows={5}
        error={error || false}
      />

      {/* Error / success messages */}
      {error && (
        <p style={{ color: 'var(--color-accent-warning)', fontSize: 12, marginTop: 6 }}>
          {error}
        </p>
      )}
      {success && (
        <p style={{ color: 'var(--color-accent)', fontSize: 12, marginTop: 6 }}>
          {success}
        </p>
      )}

      {/* Actions */}
      <div className="btn-row" style={{ marginTop: 10 }}>
        <Button variant="highlight" onClick={handleImport}>
          Import Deck
        </Button>
        <Button variant="default" onClick={() => fileInputRef.current?.click()}>
          Upload File
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.csv,.txt"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <Button
        variant="ghost"
        onClick={() => { setText(sampleJSON); setError(null); setSuccess(null); }}
        style={{ width: '100%', marginTop: 4, fontSize: 12 }}
      >
        Load sample JSON
      </Button>
    </Card>
  );
}
