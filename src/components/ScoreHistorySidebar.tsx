import { useEffect } from 'react';
import { useScoreHistory } from '../hooks/useScoreHistory';

/**
 * Props for the ScoreHistorySidebar component
 */
interface ScoreHistorySidebarProps {
  /** Whether the sidebar is currently visible */
  isOpen: boolean;
  /** Callback to close the sidebar */
  onClose: () => void;
  /** Current game score to display */
  currentScore?: number;
}

/**
 * ScoreHistorySidebar component displays a sidebar with score history
 * Stores history in localStorage with 100-entry limit
 *
 * @param props - Component props
 * @returns The score history sidebar component
 */
export const ScoreHistorySidebar = ({
  isOpen,
  onClose,
  currentScore,
}: ScoreHistorySidebarProps) => {
  const { entries, isLoading, loadHistory, saveEntry, clearHistory } =
    useScoreHistory();

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen, loadHistory]);

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
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Unknown';
    }
  };

  /**
   * Saves the current score to history
   */
  const handleSaveScore = async () => {
    if (currentScore && currentScore > 0) {
      await saveEntry(currentScore);
    }
  };

  /**
   * Clears all history with user confirmation
   */
  const handleClearHistory = async () => {
    if (window.confirm('Clear all score history? This cannot be undone.')) {
      await clearHistory();
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
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        zIndex: 1000,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-title"
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '400px',
          overflowY: 'auto',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
          animation: 'slideInRight 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '30px',
          }}
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
              id="history-title"
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#776e65',
                margin: 0,
              }}
            >
              Score History
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
              aria-label="Close score history"
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
                onClick={handleSaveScore}
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
                Save to History
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
              <p>
                No games played yet. Start playing and your scores will appear
                here!
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  marginBottom: '15px',
                  fontSize: '14px',
                  color: '#8f7a66',
                }}
              >
                {entries.length} game{entries.length === 1 ? '' : 's'} played
              </div>
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
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={handleClearHistory}
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
                  Clear History
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
