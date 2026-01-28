import type { Board, Direction, Tile, Position } from '../types/game';

const GRID_SIZE = 4;
const WIN_VALUE = 2048;

export const createEmptyBoard = (): Board => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
};

export const getEmptyPositions = (board: Board): Position[] => {
  const emptyPositions: Position[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === null) {
        emptyPositions.push({ row, col });
      }
    }
  }
  return emptyPositions;
};

export const addRandomTile = (board: Board): Board => {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) {
    return board;
  }

  const randomPosition =
    emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((row) => [...row]);
  newBoard[randomPosition.row][randomPosition.col] = value;
  return newBoard;
};

export const initializeGame = (): Board => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

const slideRow = (row: (number | null)[]): [number[], number, boolean] => {
  const filtered = row.filter((val) => val !== null) as number[];
  const merged: number[] = [];
  let score = 0;
  let hasMerged = false;

  for (let i = 0; i < filtered.length; i++) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      const mergedValue = filtered[i] * 2;
      merged.push(mergedValue);
      score += mergedValue;
      hasMerged = true;
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }

  while (merged.length < GRID_SIZE) {
    merged.push(0);
  }

  return [merged, score, hasMerged];
};

export const move = (
  board: Board,
  direction: Direction
): { board: Board; score: number; moved: boolean } => {
  let rotatedBoard = rotateBoard(board, direction);
  let totalScore = 0;
  let moved = false;

  const newBoard = rotatedBoard.map((row) => {
    const [newRow, score, hasMoved] = slideRow(row);
    totalScore += score;
    if (hasMoved || !arraysEqual(row, newRow)) {
      moved = true;
    }
    return newRow.map((val) => (val === 0 ? null : val));
  });

  rotatedBoard = unrotateBoard(newBoard, direction);

  return {
    board: rotatedBoard,
    score: totalScore,
    moved,
  };
};

const arraysEqual = (a: (number | null)[], b: (number | null)[]): boolean => {
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
};

const rotateBoard = (board: Board, direction: Direction): Board => {
  switch (direction) {
    case 'LEFT':
      return board;
    case 'RIGHT':
      return board.map((row) => [...row].reverse());
    case 'UP':
      return transpose(board);
    case 'DOWN':
      return transpose(board).map((row) => [...row].reverse());
    default:
      return board;
  }
};

const unrotateBoard = (board: Board, direction: Direction): Board => {
  switch (direction) {
    case 'LEFT':
      return board;
    case 'RIGHT':
      return board.map((row) => [...row].reverse());
    case 'UP':
      return transpose(board);
    case 'DOWN':
      return transpose(board.map((row) => [...row].reverse()));
    default:
      return board;
  }
};

const transpose = (board: Board): Board => {
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
};

export const canMove = (board: Board): boolean => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === null) {
        return true;
      }

      const current = board[row][col];
      if (col < GRID_SIZE - 1 && board[row][col + 1] === current) {
        return true;
      }
      if (row < GRID_SIZE - 1 && board[row + 1][col] === current) {
        return true;
      }
    }
  }
  return false;
};

export const hasWon = (board: Board): boolean => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === WIN_VALUE) {
        return true;
      }
    }
  }
  return false;
};

let tileIdCounter = 0;

export const generateTileId = (): string => {
  return `tile-${tileIdCounter++}`;
};

export const boardToTiles = (board: Board, previousTiles?: Tile[]): Tile[] => {
  const tiles: Tile[] = [];
  const tileMap = new Map<string, Tile>();

  // Create map of previous tiles by position
  if (previousTiles) {
    previousTiles.forEach((tile) => {
      const key = `${tile.position.row}-${tile.position.col}`;
      tileMap.set(key, tile);
    });
  }

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const value = board[row][col];
      if (value !== null) {
        const key = `${row}-${col}`;
        const previousTile = tileMap.get(key);

        // Reuse ID if tile exists at same position, otherwise generate new
        const id =
          previousTile?.value === value ? previousTile.id : generateTileId();

        tiles.push({
          id,
          value,
          position: { row, col },
          isNew: !previousTile || previousTile.value !== value,
          isMerged:
            previousTile !== undefined && previousTile.value * 2 === value,
        });
      }
    }
  }
  return tiles;
};
