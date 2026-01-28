/**
 * Props for the LeaderboardButton component
 */
interface LeaderboardButtonProps {
  /** Callback when the button is clicked */
  onClick: () => void;
}

/**
 * LeaderboardButton component displays a button to open the leaderboard
 *
 * @param props - Component props
 * @returns The leaderboard button component
 */
export const LeaderboardButton = ({ onClick }: LeaderboardButtonProps) => {
  return (
    <button
      onClick={onClick}
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
      aria-label="View leaderboard"
    >
      <span>🏆</span>
      <span>Leaderboard</span>
    </button>
  );
};
