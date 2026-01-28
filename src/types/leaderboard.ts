/**
 * Represents a single leaderboard entry
 */
export interface LeaderboardEntry {
  id: string;
  score: number;
  date: string;
  playerName?: string;
}

/**
 * Sort order for leaderboard entries
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Represents a single score history entry
 * Reuses LeaderboardEntry structure for consistency
 */
export type ScoreHistoryEntry = LeaderboardEntry;
