import type { Tile as TileType } from '../types/game';

interface TileProps {
  tile: TileType;
}

const getTileColor = (value: number): string => {
  const colors: Record<number, string> = {
    2: '#EAEDED',
    4: '#D5DBDB',
    8: '#AAB7B8',
    16: '#85929E',
    32: '#5D6D7E',
    64: '#34495E',
    128: '#FFD699',
    256: '#FFCC80',
    512: '#FFB84D',
    1024: '#FF9900',
    2048: '#EC7211',
  };
  return colors[value] || '#232F3E';
};

const getTextColor = (value: number): string => {
  return value <= 4 ? '#232F3E' : '#ffffff';
};

export const Tile = ({ tile }: TileProps) => {
  const { value, position, isNew, isMerged } = tile;

  // Determine animation based on tile state
  const getAnimation = () => {
    if (isNew && !isMerged) return 'appear 0.2s ease-in-out';
    if (isMerged) return 'merge 0.3s ease-in-out';
    return 'none';
  };

  const style = {
    position: 'absolute' as const,
    top: `${position.row * 110 + 10}px`,
    left: `${position.col * 110 + 10}px`,
    width: '100px',
    height: '100px',
    backgroundColor: getTileColor(value),
    color: getTextColor(value),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: value >= 1000 ? '24px' : value >= 100 ? '32px' : '40px',
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'top 0.15s ease-in-out, left 0.15s ease-in-out',
    animation: getAnimation(),
  };

  return <div style={style}>{value}</div>;
};
