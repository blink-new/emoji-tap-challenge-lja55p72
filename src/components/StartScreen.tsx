
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

interface StartScreenProps {
  onStart: () => void;
  onShowLeaderboard: () => void;
}

export const StartScreen = ({ onStart, onShowLeaderboard }: StartScreenProps) => {
  // Random emojis for decoration
  const [emojis, setEmojis] = useState(['😀', '🎮', '⚡', '🎯', '🏆', '🔥', '⏱️', '🎪']);
  
  // Rotate emojis every few seconds for fun
  useEffect(() => {
    const interval = setInterval(() => {
      const allEmojis = [
        '😀', '🎮', '⚡', '🎯', '🏆', '🔥', '⏱️', '🎪',
        '🎭', '🎨', '🎬', '🎤', '🎧', '🎸', '🎹', '🎺',
        '🎻', '🎲', '🎯', '🎪', '🌈', '⭐', '✨', '💫',
        '🌟', '🔥', '💥', '🎇', '🎆', '🏆', '🥇'
      ];
      
      // Replace one random emoji
      const newEmojis = [...emojis];
      const randomIndex = Math.floor(Math.random() * emojis.length);
      const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
      newEmojis[randomIndex] = randomEmoji;
      
      setEmojis(newEmojis);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [emojis]);
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated emoji circle */}
      <motion.div 
        className="relative mb-8 w-48 h-48"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {emojis.map((emoji, index) => {
          const angle = (index / emojis.length) * Math.PI * 2;
          const x = Math.cos(angle) * 60;
          const y = Math.sin(angle) * 60;
          
          return (
            <motion.div
              key={`emoji-${index}-${emoji}`}
              className="absolute text-4xl"
              style={{ 
                left: 'calc(50% - 20px)',
                top: 'calc(50% - 20px)',
              }}
              initial={{ x, y, opacity: 0 }}
              animate={{ 
                x, 
                y,
                opacity: 1,
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2 + index * 0.5,
                  ease: "easeInOut"
                },
                scale: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5 + index * 0.3,
                  ease: "easeInOut"
                }
              }}
            >
              {emoji}
            </motion.div>
          );
        })}
        
        {/* Center emoji */}
        <motion.div
          className="absolute text-6xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          🎯
        </motion.div>
      </motion.div>
      
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
      >
        Emoji Tap Challenge
      </motion.h1>
      
      <motion.p 
        className="text-lg opacity-80 mb-6 max-w-xs"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Tap the correct emoji as fast as you can! Build combos and beat the clock!
      </motion.p>
      
      <motion.div
        className="mb-10 bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-xs border border-white/10 shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <h3 className="font-bold mb-2">Pro Tips:</h3>
        <ul className="text-sm text-left space-y-1">
          <li className="flex items-center">
            <span className="mr-2">✨</span>
            <span>Get 5 perfect taps in a row for a power-up!</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">⏱️</span>
            <span>Power-ups slow down time and boost points</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">🔥</span>
            <span>Build combos for massive score multipliers</span>
          </li>
        </ul>
      </motion.div>
      
      <div className="space-y-4 w-full max-w-xs">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
        >
          <Button 
            className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/30 relative overflow-hidden"
            onClick={onStart}
          >
            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-md"
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            
            <motion.span
              className="relative z-10"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Start Game
            </motion.span>
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
        >
          <Button 
            variant="outline" 
            className="w-full text-lg py-6 border-white/20 backdrop-blur-sm hover:bg-white/10"
            onClick={onShowLeaderboard}
          >
            Leaderboard
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};