export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  id: string;
  value: number;
  position: Position;
  isNew: boolean;
  isMerged: boolean;
}

export type Board = (number | null)[][];

export interface GameState {
  board: Board;
  tiles: Tile[];
  score: number;
  gameOver: boolean;
  win: boolean;
}
