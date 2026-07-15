# Quiz Cards — G2 Glasses App

Multiple-choice flashcard quiz app for the [Even Realities G2](https://www.evenrealities.com/) smart glasses. Study for AWS certifications, language exams, or anything else — import your own decks and track progress over time.

## Features

- **4-option multiple choice** — A/B/C/D questions displayed on the G2 HUD (576x288)
- **Import custom decks** — JSON, CSV, or plain text format
- **311 AWS Certified Developer Associate (DVA-C02) questions** included as sample decks, split into 16 sets of ~19-20 questions each
- **On-glasses deck browser** — scroll to cycle through decks without touching the phone
- **Resume in-progress quizzes** — back out mid-quiz and pick up right where you left off, no lost progress
- **Score tracking** — per-deck stats: attempts, best/avg score, lifetime accuracy
- **Per-question timer** — time per question and total time, shown in the summary and session history
- **Session history** — expandable log of every past session with per-question breakdown
- **Shuffled order** — questions randomized each attempt for better retention (resume reuses the same shuffle, only fresh starts reshuffle)
- **Practice missed questions** — an auto-generated retry deck of just the questions you got wrong, offered right after finishing, on glasses or phone
- **All data stored locally** — localStorage + bridge storage, nothing leaves the device

## Glasses Controls

| Action | Effect |
|--------|--------|
| **Scroll** | Move cursor between A/B/C/D, or browse decks/choices on menu screens |
| **Tap** | Select / confirm / continue |
| **Double-tap** | Mid-quiz: back to deck menu (progress auto-saved) · Resume/restart prompt: back to deck browsing · At the deck menu or summary: exit app |

There's no long-press/long-hold gesture on this hardware (the G2 firmware only reports tap, double-tap, and scroll), so "back" and "exit" share the double-tap gesture contextually rather than needing a fourth gesture.

## Getting Started

```bash
npm install
npm run dev
```

Then scan the QR code from Even Hub TestFlight, or run in the simulator:

```bash
npm run sim
```

## Deck Import Formats

### JSON

```json
{
  "name": "My Quiz Deck",
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "Paris", "Madrid", "Rome"],
      "answer": 1
    }
  ]
}
```

`answer` is 0-based: 0=A, 1=B, 2=C, 3=D.

### CSV

```csv
question,optionA,optionB,optionC,optionD,answer
"What is 2+2?","1","2","3","4",D
"Capital of France?","Berlin","Paris","Madrid","Rome",B
```

First row must be the header. Answer column uses A/B/C/D.

### Plain Text

```
Q: What is 2+2?
A) 1
B) 2
C) 3
D) 4
Answer: D

Q: Capital of France?
A) Berlin
B) Paris
C) Madrid
D) Rome
Answer: B
```

Separate questions with a blank line.

## Packaging for Even Hub

```bash
npm run build
npx evenhub pack app.json dist -o dist/quiz-cards.ehpk
```

## Tech Stack

- React 19 + Vite 5
- Even Hub SDK 0.0.11
- even-toolkit 1.7.7 (design system)
- Tailwind CSS 4
