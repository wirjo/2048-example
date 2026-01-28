import { useState, useEffect, useCallback } from 'react';
import type { Direction, GameState } from '../types/game';
import {
  initializeGame,
  move,
  addRandomTile,
  canMove,
  hasWon,
  boardToTiles,
} from '../utils/gameLogic';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const board = initializeGame();
    return {
      board,
      tiles: boardToTiles(board),
      score: 0,
      gameOver: false,
      win: false,
    };
  });

  const [isMoving, setIsMoving] = useState(false);
  const [lastDirection, setLastDirection] = useState<Direction | null>(null);

  const handleMove = useCallback(
    async (direction: Direction) => {
      if (gameState.gameOver || isMoving) {
        return;
      }

      setIsMoving(true);
      setLastDirection(direction);

      try {
        const {
          board: newBoard,
          score: moveScore,
          moved,
        } = move(gameState.board, direction);

        if (!moved) {
          setIsMoving(false);
          setTimeout(() => setLastDirection(null), 300);
          return;
        }

        const boardWithNewTile = addRandomTile(newBoard);
        const newScore = gameState.score + moveScore;
        const win = hasWon(boardWithNewTile);
        const gameOver = !canMove(boardWithNewTile);

        setGameState({
          board: boardWithNewTile,
          tiles: boardToTiles(boardWithNewTile, gameState.tiles),
          score: newScore,
          gameOver,
          win,
        });

        setTimeout(() => {
          setIsMoving(false);
          setLastDirection(null);
        }, 300);
      } catch (error) {
        console.error('Error during move:', error);
        setIsMoving(false);
      }
    },
    [gameState, isMoving]
  );

  const resetGame = useCallback(() => {
    const board = initializeGame();
    setGameState({
      board,
      tiles: boardToTiles(board),
      score: 0,
      gameOver: false,
      win: false,
    });
    setIsMoving(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };

      const direction = keyMap[event.key];
      if (direction) {
        event.preventDefault();
        handleMove(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleMove]);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 50;

      if (
        Math.abs(deltaX) < minSwipeDistance &&
        Math.abs(deltaY) < minSwipeDistance
      ) {
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        handleMove(deltaX > 0 ? 'RIGHT' : 'LEFT');
      } else {
        handleMove(deltaY > 0 ? 'DOWN' : 'UP');
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMove]);

  return {
    gameState,
    resetGame,
    lastDirection,
  };
};
