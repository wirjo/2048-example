# 2048 Game - React + TypeScript + Vite

A fully functional 2048 game built with React, TypeScript, and Vite.

## Features

- **Classic 2048 Gameplay**: Slide tiles to combine matching numbers and reach 2048
- **Keyboard Controls**: Use arrow keys to move tiles in any direction
- **Touch Support**: Swipe gestures for mobile devices
- **Score Tracking**: Real-time score updates as tiles merge
- **Leaderboard**: Save and view top 10 scores with persistent localStorage storage
- **Win/Loss Detection**: Automatic game over detection and win celebration
- **Smooth Animations**: CSS-based tile animations for a polished experience
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server on port 3000:

```bash
npm run dev
```

Visit http://localhost:3000 to play the game.

### Build

Build the project for production:

```bash
npm run build
```

### Lint

Run ESLint and Prettier checks:

```bash
npm run lint
```

### Type Check

Run TypeScript compiler checks:

```bash
npm run typecheck
```

## How to Play

1. Use **arrow keys** (↑ ↓ ← →) to move tiles
2. On mobile, **swipe** in any direction
3. When two tiles with the same number touch, they **merge into one**
4. Create a tile with the number **2048** to win!
5. The game is over when you can't make any more moves

## Project Structure

```
src/
├── components/
│   ├── Game.tsx                # Main game container
│   ├── Board.tsx               # Game board grid
│   ├── Tile.tsx                # Individual tile component
│   ├── GameOver.tsx            # Game over overlay
│   ├── LeaderboardButton.tsx   # Button to open leaderboard
│   ├── LeaderboardPopup.tsx    # Leaderboard modal popup
│   └── index.ts                # Component exports
├── hooks/
│   └── useGame.ts              # Custom hook for game state and logic
├── utils/
│   └── gameLogic.ts            # Core 2048 game logic
├── types/
│   ├── game.ts                 # Game type definitions
│   └── leaderboard.ts          # Leaderboard type definitions
├── App.tsx
└── main.tsx
```

## Technology Stack

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **ESLint + Prettier**: Code quality and formatting

## Game Logic

The game implements the classic 2048 rules:

- Grid starts with two random tiles (value 2 or 4)
- After each move, a new tile appears in a random empty position
- Tiles slide as far as possible in the chosen direction
- Adjacent tiles with the same value merge into one
- Score increases by the value of merged tiles
- Win condition: Create a 2048 tile
- Loss condition: No valid moves remaining

## Code Highlights

- **Pure utility functions**: Game logic is separated into testable functions
- **Custom React hook**: Encapsulates game state and event handling
- **TypeScript strict mode**: Full type safety throughout the codebase
- **Error handling**: Async operations wrapped in try-catch blocks
- **Arrow functions**: Following Airbnb style guide conventions

## License

MIT
