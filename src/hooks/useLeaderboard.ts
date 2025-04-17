
import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types/game';

const LEADERBOARD_KEY = 'emoji-tap-leaderboard';

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);
    if (savedLeaderboard) {
      try {
        setLeaderboard(JSON.parse(savedLeaderboard));
      } catch (e) {
        console.error('Failed to parse leaderboard data', e);
        setLeaderboard([]);
      }
    }
  }, []);

  // Add a new entry to the leaderboard
  const addEntry = (name: string, score: number, maxCombo: number) => {
    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      name,
      score,
      maxCombo,
      date: new Date().toISOString()
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep only top 10

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
    
    return updatedLeaderboard;
  };

  return {
    leaderboard,
    addEntry
  };
};