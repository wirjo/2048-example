/**
 * Props for the HistoryToggleButton component
 */
interface HistoryToggleButtonProps {
  /** Callback when button is clicked */
  onClick: () => void;
}

/**
 * HistoryToggleButton component to open score history sidebar
 *
 * @param props - Component props
 * @returns The history toggle button component
 */
export const HistoryToggleButton = ({ onClick }: HistoryToggleButtonProps) => {
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
      aria-label="View score history"
    >
      <span>📊</span>
      <span>Score History</span>
    </button>
  );
};
