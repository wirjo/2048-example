import { useEffect, useState } from 'react';
import type { LeaderboardEntry } from '../types/leaderboard';

/**
 * Props for the LeaderboardPopup component
 */
interface LeaderboardPopupProps {
  /** Whether the popup is currently visible */
  isOpen: boolean;
  /** Callback to close the popup */
  onClose: () => void;
  /** Current game score to potentially add to leaderboard */
  currentScore?: number;
}

/**
 * LeaderboardPopup component displays a modal with top scores
 * Stores leaderboard data in localStorage
 *
 * @param props - Component props
 * @returns The leaderboard popup component
 */
export const LeaderboardPopup = ({
  isOpen,
  onClose,
  currentScore,
}: LeaderboardPopupProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadLeaderboard();
    }
  }, [isOpen]);

  /**
   * Loads leaderboard entries from localStorage
   */
  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem('leaderboard');
      const parsed: LeaderboardEntry[] = stored ? JSON.parse(stored) : [];
      const sorted = parsed.sort((a, b) => b.score - a.score).slice(0, 10);
      setEntries(sorted);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Saves a new score to the leaderboard
   */
  const saveScore = async () => {
    if (!currentScore || currentScore === 0) return;

    try {
      const newEntry: LeaderboardEntry = {
        id: `${Date.now()}-${Math.random()}`,
        score: currentScore,
        date: new Date().toISOString(),
      };

      const stored = localStorage.getItem('leaderboard');
      const parsed: LeaderboardEntry[] = stored ? JSON.parse(stored) : [];
      parsed.push(newEntry);
      const sorted = parsed.sort((a, b) => b.score - a.score).slice(0, 10);

      localStorage.setItem('leaderboard', JSON.stringify(sorted));
      setEntries(sorted);
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  };

  /**
   * Clears all leaderboard entries
   */
  const clearLeaderboard = async () => {
    try {
      localStorage.removeItem('leaderboard');
      setEntries([]);
    } catch (error) {
      console.error('Failed to clear leaderboard:', error);
    }
  };

  /**
   * Formats a date string for display
   */
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Unknown';
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leaderboard-title"
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h2
            id="leaderboard-title"
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#776e65',
              margin: 0,
            }}
          >
            Leaderboard
          </h2>
          <button
            onClick={onClose}
            style={{
              fontSize: '24px',
              color: '#776e65',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px 10px',
              lineHeight: 1,
            }}
            aria-label="Close leaderboard"
          >
            ×
          </button>
        </div>

        {currentScore && currentScore > 0 && (
          <div
            style={{
              backgroundColor: '#eee4da',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: '0 0 10px 0',
                color: '#776e65',
                fontSize: '14px',
              }}
            >
              Current Score: <strong>{currentScore}</strong>
            </p>
            <button
              onClick={saveScore}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 'bold',
                backgroundColor: '#8f7a66',
                color: '#f9f6f2',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Save to Leaderboard
            </button>
          </div>
        )}

        {isLoading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              color: '#776e65',
            }}
          >
            Loading...
          </div>
        ) : entries.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              color: '#776e65',
            }}
          >
            <p>No scores yet. Play a game and save your score!</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '15px' }}>
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 15px',
                    backgroundColor: index % 2 === 0 ? '#faf8ef' : '#ffffff',
                    borderRadius: '6px',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: index < 3 ? '#f59f42' : '#776e65',
                        minWidth: '30px',
                      }}
                    >
                      #{index + 1}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: '#776e65',
                        }}
                      >
                        {entry.score}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#8f7a66',
                        }}
                      >
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={clearLeaderboard}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: '#dc3545',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Clear Leaderboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
