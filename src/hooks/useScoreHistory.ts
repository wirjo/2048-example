import { useState, useCallback } from 'react';
import type { ScoreHistoryEntry } from '../types/leaderboard';

const STORAGE_KEY = 'scoreHistory';
const MAX_ENTRIES = 100;

/**
 * Custom hook for managing score history with localStorage persistence
 * Automatically limits history to last 100 games
 */
export const useScoreHistory = () => {
  const [entries, setEntries] = useState<ScoreHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Loads score history from localStorage
   */
  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed: ScoreHistoryEntry[] = stored ? JSON.parse(stored) : [];
      // Sort by date descending (newest first)
      const sorted = parsed.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEntries(sorted);
    } catch (error) {
      console.error('Failed to load score history:', error);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Saves a new score to history
   * Automatically prunes to last 100 entries
   */
  const saveEntry = useCallback(async (score: number) => {
    if (score === 0) return;

    try {
      const newEntry: ScoreHistoryEntry = {
        id: `${Date.now()}-${Math.random()}`,
        score,
        date: new Date().toISOString(),
      };

      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed: ScoreHistoryEntry[] = stored ? JSON.parse(stored) : [];
      parsed.push(newEntry);

      // Sort by date descending and limit to MAX_ENTRIES
      const sorted = parsed
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, MAX_ENTRIES);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
      setEntries(sorted);
    } catch (error) {
      // Handle QuotaExceededError by pruning more aggressively
      if (
        error instanceof DOMException &&
        error.name === 'QuotaExceededError'
      ) {
        console.error('localStorage quota exceeded, pruning to 50 entries');
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          const parsed: ScoreHistoryEntry[] = stored ? JSON.parse(stored) : [];
          const pruned = parsed
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 50);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
          setEntries(pruned);
        } catch (retryError) {
          console.error('Failed to prune history:', retryError);
        }
      } else {
        console.error('Failed to save score:', error);
      }
    }
  }, []);

  /**
   * Clears all score history
   */
  const clearHistory = useCallback(async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setEntries([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }, []);

  return {
    entries,
    isLoading,
    loadHistory,
    saveEntry,
    clearHistory,
  };
};
