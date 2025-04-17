
import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types/game';
import { getRandomEmojis, getRandomEmoji } from '../data/emojis';

// Initial game state
const initialState: GameState = {
  isPlaying: false,
  score: 0,
  combo: 0,
  maxCombo: 0,
  timeLeft: 30,
  level: 1,
  targetEmoji: '',
  emojis: [],
  gameOver: false
};

// Calculate how many emojis to show based on level
const getEmojiCount = (level: number): number => {
  return Math.min(Math.floor(level * 1.5) + 3, 16);
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [timer, setTimer] = useState<number | null>(null);

  // Initialize a new game
  const startGame = useCallback(() => {
    // Get initial emojis
    const emojis = getRandomEmojis(1, getEmojiCount(1));
    const targetEmoji = getRandomEmoji(emojis);

    setGameState({
      ...initialState,
      isPlaying: true,
      targetEmoji,
      emojis,
      timeLeft: 30,
    });
  }, []);

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState(initialState);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [timer]);

  // Handle emoji tap
  const handleTap = useCallback((emoji: string) => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    setGameState(prev => {
      // Check if tapped emoji matches target
      const isCorrect = emoji === prev.targetEmoji;
      
      if (isCorrect) {
        // Calculate new level based on score
        const newScore = prev.score + (10 * (prev.combo + 1));
        const newCombo = prev.combo + 1;
        const newMaxCombo = Math.max(newCombo, prev.maxCombo);
        const newLevel = Math.floor(newScore / 100) + 1;
        
        // Get new emojis for next round
        const newEmojiCount = getEmojiCount(newLevel);
        const newEmojis = getRandomEmojis(newLevel, newEmojiCount);
        const newTargetEmoji = getRandomEmoji(newEmojis);
        
        // Add time bonus for correct tap
        const timeBonus = Math.max(0.5, 3 - (newLevel * 0.2));
        
        return {
          ...prev,
          score: newScore,
          combo: newCombo,
          maxCombo: newMaxCombo,
          level: newLevel,
          targetEmoji: newTargetEmoji,
          emojis: newEmojis,
          timeLeft: Math.min(prev.timeLeft + timeBonus, 30)
        };
      } else {
        // Reset combo on incorrect tap
        return {
          ...prev,
          combo: 0,
          timeLeft: Math.max(prev.timeLeft - 2, 0) // Penalty for wrong tap
        };
      }
    });
  }, [gameState.isPlaying, gameState.gameOver]);

  // Game timer
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver && !timer) {
      const interval = setInterval(() => {
        setGameState(prev => {
          const newTimeLeft = prev.timeLeft - 0.1;
          
          // Check if time is up
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            return {
              ...prev,
              timeLeft: 0,
              gameOver: true,
              isPlaying: false
            };
          }
          
          return {
            ...prev,
            timeLeft: newTimeLeft
          };
        });
      }, 100);
      
      setTimer(interval);
      
      return () => {
        clearInterval(interval);
      };
    }
    
    if (!gameState.isPlaying && timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [gameState.isPlaying, gameState.gameOver, timer]);

  return {
    gameState,
    startGame,
    resetGame,
    handleTap
  };
};