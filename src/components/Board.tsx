import type { Tile as TileType } from '../types/game';
import { Tile } from './Tile';

interface BoardProps {
  tiles: TileType[];
}

export const Board = ({ tiles }: BoardProps) => {
  const gridCells = Array(16)
    .fill(null)
    .map((_, idx) => (
      <div
        key={idx}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#D5DBDB',
          borderRadius: '8px',
        }}
      />
    ));

  return (
    <div
      style={{
        position: 'relative',
        width: '450px',
        height: '450px',
        backgroundColor: '#37475A',
        borderRadius: '12px',
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
      }}
    >
      {gridCells}
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </div>
  );
};
