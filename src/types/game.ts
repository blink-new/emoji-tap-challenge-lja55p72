
export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface GameState {
  isPlaying: boolean;
  score: number;
  combo: number;
  maxCombo: number;
  timeLeft: number;
  level: number;
  targetEmoji: string;
  emojis: string[];
  gameOver: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  maxCombo: number;
  date: string;
}