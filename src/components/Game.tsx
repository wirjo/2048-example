import { useState, useEffect, useRef } from 'react';
import { useGame } from '../hooks/useGame';
import { Board } from './Board';
import { GameOver } from './GameOver';
import { LeaderboardButton } from './LeaderboardButton';
import { LeaderboardPopup } from './LeaderboardPopup';
import { HistoryToggleButton } from './HistoryToggleButton';
import { ScoreHistorySidebar } from './ScoreHistorySidebar';
import { useScoreHistory } from '../hooks/useScoreHistory';

export const Game = () => {
  const { gameState, resetGame, lastDirection } = useGame();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHowToPlayExpanded, setIsHowToPlayExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? saved === 'true' : true; // Dark by default
  });
  const { saveEntry } = useScoreHistory();
  const previousGameOverRef = useRef(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('darkMode', String(newValue));
      return newValue;
    });
  };

  // Auto-save score when game ends
  useEffect(() => {
    const wasNotGameOver = !previousGameOverRef.current;
    const isNowGameOver = gameState.gameOver;

    if (wasNotGameOver && isNowGameOver && gameState.score > 0) {
      saveEntry(gameState.score);
    }

    previousGameOverRef.current = gameState.gameOver;
  }, [gameState.gameOver, gameState.score, saveEntry]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#0F1419' : '#EAEDED',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        transition: 'background-color 0.3s',
      }}
    >
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '12px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: isDarkMode ? '#232F3E' : '#FF9900',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1000,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = isDarkMode
            ? '#37475A'
            : '#EC7211';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = isDarkMode
            ? '#232F3E'
            : '#FF9900';
        }}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span>{isDarkMode ? '☀️' : '🌙'}</span>
        <span>{isDarkMode ? 'Light' : 'Dark'}</span>
      </button>
      <div
        style={{
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: isDarkMode ? '#EAEDED' : '#232F3E',
            margin: '0 0 10px 0',
            transition: 'color 0.3s',
          }}
        >
          2048
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#FF9900',
            margin: '0',
            fontWeight: '600',
          }}
        >
          Use arrow keys to join tiles and reach 2048!
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '450px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: isDarkMode ? '#1A1F29' : '#232F3E',
            padding: '15px 25px',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'background-color 0.3s',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#FF9900',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            Score
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            {gameState.score}
          </div>
        </div>

        <button
          onClick={resetGame}
          style={{
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#FF9900',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#EC7211';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#FF9900';
          }}
        >
          <span>🎮</span>
          <span>New Game</span>
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 50px)',
            gridTemplateRows: 'repeat(2, 50px)',
            gap: '8px',
          }}
        >
          <div style={{ gridColumn: '2' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: lastDirection === 'UP' ? '#FF9900' : '#D5DBDB',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                transition: 'all 0.3s',
                border: lastDirection === 'UP' ? '2px solid #EC7211' : 'none',
              }}
            >
              ↑
            </div>
          </div>
          <div style={{ gridColumn: '1', gridRow: '2' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundColor:
                  lastDirection === 'LEFT' ? '#FF9900' : '#D5DBDB',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                transition: 'all 0.3s',
                border: lastDirection === 'LEFT' ? '2px solid #EC7211' : 'none',
              }}
            >
              ←
            </div>
          </div>
          <div style={{ gridColumn: '2', gridRow: '2' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundColor:
                  lastDirection === 'DOWN' ? '#FF9900' : '#D5DBDB',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                transition: 'all 0.3s',
                border: lastDirection === 'DOWN' ? '2px solid #EC7211' : 'none',
              }}
            >
              ↓
            </div>
          </div>
          <div style={{ gridColumn: '3', gridRow: '2' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundColor:
                  lastDirection === 'RIGHT' ? '#FF9900' : '#D5DBDB',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                transition: 'all 0.3s',
                border:
                  lastDirection === 'RIGHT' ? '2px solid #EC7211' : 'none',
              }}
            >
              →
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <Board tiles={gameState.tiles} />
          {(gameState.gameOver || gameState.win) && (
            <GameOver
              score={gameState.score}
              win={gameState.win}
              onRestart={resetGame}
            />
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: '30px',
          maxWidth: '500px',
          backgroundColor: 'transparent',
          padding: '15px',
          borderRadius: '8px',
          border: `1px solid ${isDarkMode ? '#37475A40' : '#D5DBDB80'}`,
          transition: 'all 0.3s',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setIsHowToPlayExpanded(!isHowToPlayExpanded)}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDarkMode ? '#AAB7B8' : '#37475A',
              margin: 0,
              transition: 'color 0.3s',
            }}
          >
            How to Play
          </h2>
          <span
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#AAB7B8' : '#37475A',
              transition: 'transform 0.2s',
              transform: isHowToPlayExpanded
                ? 'rotate(180deg)'
                : 'rotate(0deg)',
            }}
          >
            ▼
          </span>
        </div>
        {isHowToPlayExpanded && (
          <div
            style={{
              color: isDarkMode ? '#85929E' : '#5D6D7E',
              fontSize: '13px',
              lineHeight: '1.5',
              textAlign: 'left',
              marginTop: '12px',
              transition: 'color 0.3s',
              opacity: 0.9,
            }}
          >
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>How to Play:</strong> Press an arrow key (↑ ↓ ← →) and{' '}
              <strong>ALL tiles move together</strong> in that direction. You
              don't select individual tiles!
            </p>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>What happens:</strong> All tiles slide as far as they can
              in the direction you chose. When two tiles with the same number
              collide, they merge into one (2 + 2 = 4, 4 + 4 = 8, etc.).
            </p>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>Goal:</strong> Keep combining tiles to create larger
              numbers. Reach the 2048 tile to win!
            </p>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>New tiles:</strong> After each move, a new tile (2 or 4)
              appears randomly on the board.
            </p>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>Game Over:</strong> The game ends when the board is full
              and no more merges are possible.
            </p>
            <p style={{ margin: '0' }}>
              <strong>Tip:</strong> Keep your highest tile in a corner and build
              around it!
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          marginTop: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <LeaderboardButton onClick={() => setIsLeaderboardOpen(true)} />
        <HistoryToggleButton onClick={() => setIsHistoryOpen(true)} />
      </div>

      <LeaderboardPopup
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentScore={gameState.score}
      />

      <ScoreHistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        currentScore={gameState.score}
      />

      <div
        style={{
          marginTop: '40px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: isDarkMode ? '#AAB7B8' : '#37475A',
            margin: '0',
            fontStyle: 'italic',
            transition: 'color 0.3s',
          }}
        >
          Built with ❤️ with Claude Code
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: isDarkMode ? '#AAB7B8' : '#37475A',
              transition: 'color 0.3s',
            }}
          >
            Powered by
          </span>
          <svg
            width="50"
            height="30"
            viewBox="0 0 304 182"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2s-7.4-11.2-7.4-19.2c0-8.5 3-15.4 9.1-20.6s14.2-7.8 24.5-7.8c3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5 4.9-1.3 10.1-1.9 15.6-1.9 11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4zm-40.6 15.2c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9s1.9-1 3.7-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9s-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1s-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4s-2.1 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1s4.2-6 7.2-8.2c3-2.3 6.4-4 10.4-5.2s8.2-1.7 12.6-1.7c2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z"
                fill="#FF9900"
              />
              <path
                d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z"
                fill="#FF9900"
              />
              <path
                d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z"
                fill="#FF9900"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
