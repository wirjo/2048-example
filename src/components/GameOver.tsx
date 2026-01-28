interface GameOverProps {
  score: number;
  win: boolean;
  onRestart: () => void;
}

export const GameOver = ({ score, win, onRestart }: GameOverProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(234, 237, 237, 0.95)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <h2
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#232F3E',
          marginBottom: '20px',
        }}
      >
        {win ? 'You Win!' : 'Game Over!'}
      </h2>
      <p
        style={{
          fontSize: '24px',
          color: '#37475A',
          marginBottom: '30px',
        }}
      >
        Final Score: {score}
      </p>
      <button
        onClick={onRestart}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          fontWeight: 'bold',
          backgroundColor: '#FF9900',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#EC7211';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#FF9900';
        }}
      >
        Try Again
      </button>
    </div>
  );
};
