
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
  lastTapCorrect: boolean | null;
  powerUpActive: boolean;
  powerUpTimeLeft: number;
  shakingEmojis: boolean;
  emojiSize: 'small' | 'normal' | 'large';
  perfectTaps: number;
  totalTaps: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  maxCombo: number;
  date: string;
}