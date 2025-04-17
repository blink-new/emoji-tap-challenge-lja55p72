
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
  gameOver: false,
  lastTapCorrect: null,
  powerUpActive: false,
  powerUpTimeLeft: 0,
  shakingEmojis: false,
  emojiSize: 'normal',
  perfectTaps: 0,
  totalTaps: 0
};

// Calculate how many emojis to show based on level
const getEmojiCount = (level: number): number => {
  return Math.min(Math.floor(level * 1.5) + 3, 16);
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [timer, setTimer] = useState<number | null>(null);
  const [powerUpTimer, setPowerUpTimer] = useState<number | null>(null);
  const [shakeTimer, setShakeTimer] = useState<number | null>(null);

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
    if (powerUpTimer) {
      clearInterval(powerUpTimer);
      setPowerUpTimer(null);
    }
    if (shakeTimer) {
      clearTimeout(shakeTimer);
      setShakeTimer(null);
    }
  }, [timer, powerUpTimer, shakeTimer]);

  // Activate power-up (slows down time)
  const activatePowerUp = useCallback(() => {
    if (gameState.powerUpActive) return;
    
    setGameState(prev => ({
      ...prev,
      powerUpActive: true,
      powerUpTimeLeft: 5, // 5 seconds of power-up
      emojiSize: 'large' // Make emojis larger during power-up
    }));
    
    // Clear existing power-up timer if any
    if (powerUpTimer) {
      clearInterval(powerUpTimer);
    }
    
    // Start power-up countdown
    const interval = setInterval(() => {
      setGameState(prev => {
        const newPowerUpTime = prev.powerUpTimeLeft - 0.1;
        
        if (newPowerUpTime <= 0) {
          clearInterval(interval);
          return {
            ...prev,
            powerUpActive: false,
            powerUpTimeLeft: 0,
            emojiSize: 'normal'
          };
        }
        
        return {
          ...prev,
          powerUpTimeLeft: newPowerUpTime
        };
      });
    }, 100);
    
    setPowerUpTimer(interval);
  }, [gameState.powerUpActive, powerUpTimer]);

  // Trigger shaking emojis effect
  const triggerShake = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      shakingEmojis: true
    }));
    
    // Clear existing shake timer if any
    if (shakeTimer) {
      clearTimeout(shakeTimer);
    }
    
    // Reset shake after 500ms
    const timeout = setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        shakingEmojis: false
      }));
    }, 500);
    
    setShakeTimer(timeout);
  }, [shakeTimer]);

  // Handle emoji tap
  const handleTap = useCallback((emoji: string) => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    setGameState(prev => {
      // Check if tapped emoji matches target
      const isCorrect = emoji === prev.targetEmoji;
      const newTotalTaps = prev.totalTaps + 1;
      
      if (isCorrect) {
        // Calculate new level based on score
        const comboMultiplier = prev.combo + 1;
        const basePoints = 10;
        const levelBonus = prev.level * 2;
        const powerUpBonus = prev.powerUpActive ? 2 : 1;
        
        const pointsEarned = basePoints * comboMultiplier * powerUpBonus + levelBonus;
        const newScore = prev.score + pointsEarned;
        const newCombo = prev.combo + 1;
        const newMaxCombo = Math.max(newCombo, prev.maxCombo);
        const newLevel = Math.floor(newScore / 100) + 1;
        
        // Get new emojis for next round
        const newEmojiCount = getEmojiCount(newLevel);
        const newEmojis = getRandomEmojis(newLevel, newEmojiCount);
        const newTargetEmoji = getRandomEmoji(newEmojis);
        
        // Add time bonus for correct tap
        const timeBonus = Math.max(0.5, 3 - (newLevel * 0.2));
        
        // Check for perfect taps (every 5 consecutive correct taps)
        const newPerfectTaps = prev.perfectTaps + 1;
        const shouldActivatePowerUp = newPerfectTaps % 5 === 0 && newPerfectTaps > 0;
        
        // If power-up should activate, do it outside this function to avoid state issues
        if (shouldActivatePowerUp) {
          setTimeout(() => activatePowerUp(), 0);
        }
        
        return {
          ...prev,
          score: newScore,
          combo: newCombo,
          maxCombo: newMaxCombo,
          level: newLevel,
          targetEmoji: newTargetEmoji,
          emojis: newEmojis,
          timeLeft: Math.min(prev.timeLeft + timeBonus, 30),
          lastTapCorrect: true,
          perfectTaps: newPerfectTaps,
          totalTaps: newTotalTaps
        };
      } else {
        // Trigger shake effect for wrong tap
        setTimeout(() => triggerShake(), 0);
        
        // Reset combo on incorrect tap
        return {
          ...prev,
          combo: 0,
          timeLeft: Math.max(prev.timeLeft - 2, 0), // Penalty for wrong tap
          lastTapCorrect: false,
          perfectTaps: 0,
          totalTaps: newTotalTaps
        };
      }
    });
  }, [gameState.isPlaying, gameState.gameOver, activatePowerUp, triggerShake]);

  // Game timer
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver && !timer) {
      const interval = setInterval(() => {
        setGameState(prev => {
          // Time decreases slower during power-up
          const timeDecrement = prev.powerUpActive ? 0.05 : 0.1;
          const newTimeLeft = prev.timeLeft - timeDecrement;
          
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