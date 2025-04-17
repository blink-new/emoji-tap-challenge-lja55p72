
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from '../types/game';
import { useEffect, useState } from 'react';

interface GameBoardProps {
  gameState: GameState;
  onEmojiTap: (emoji: string) => void;
}

export const GameBoard = ({ gameState, onEmojiTap }: GameBoardProps) => {
  const { emojis, targetEmoji, shakingEmojis, emojiSize, powerUpActive, lastTapCorrect } = gameState;
  const [confetti, setConfetti] = useState<{x: number, y: number, emoji: string}[]>([]);
  const [tapEffect, setTapEffect] = useState<{x: number, y: number, correct: boolean, time: number} | null>(null);
  
  // Calculate grid columns based on emoji count
  const getGridCols = () => {
    const count = emojis.length;
    if (count <= 4) return 'grid-cols-2';
    if (count <= 9) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  // Get emoji size based on game state
  const getEmojiSize = () => {
    switch (emojiSize) {
      case 'small': return 'text-3xl sm:text-4xl';
      case 'large': return 'text-5xl sm:text-6xl';
      default: return 'text-4xl sm:text-5xl';
    }
  };

  // Add confetti effect when power-up activates
  useEffect(() => {
    if (powerUpActive) {
      // Create random confetti emojis
      const newConfetti = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ['✨', '⭐', '🌟', '💫', '🎉'][Math.floor(Math.random() * 5)]
      }));
      
      setConfetti(newConfetti);
      
      // Clear confetti after animation
      const timer = setTimeout(() => {
        setConfetti([]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [powerUpActive]);

  // Handle emoji tap with visual feedback
  const handleEmojiTap = (emoji: string, event: React.MouseEvent) => {
    // Create tap effect at cursor position
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setTapEffect({
      x,
      y,
      correct: emoji === targetEmoji,
      time: Date.now()
    });
    
    // Clear tap effect after animation
    setTimeout(() => {
      setTapEffect(null);
    }, 500);
    
    onEmojiTap(emoji);
  };

  return (
    <div className="w-full mx-auto px-4 flex-1 flex items-center justify-center relative">
      {/* Confetti effect */}
      {confetti.map((item, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute text-xl z-10 pointer-events-none"
          initial={{ 
            x: `${50}%`, 
            y: `${50}%`, 
            opacity: 1,
            scale: 0
          }}
          animate={{ 
            x: `${item.x}%`, 
            y: `${item.y}%`, 
            opacity: 0,
            scale: 1.5,
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: 1.5 + Math.random(),
            ease: "easeOut" 
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
      
      {/* Tap effect */}
      {tapEffect && (
        <motion.div
          className={`absolute rounded-full pointer-events-none z-20 ${
            tapEffect.correct ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{
            left: tapEffect.x,
            top: tapEffect.y,
          }}
          initial={{ opacity: 0.7, scale: 0 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Power-up effect */}
      {powerUpActive && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl z-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      )}
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={targetEmoji}
          className={`grid ${getGridCols()} gap-3 w-full relative z-10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {emojis.map((emoji, index) => (
            <motion.button
              key={`${emoji}-${index}`}
              className={`aspect-square flex items-center justify-center ${getEmojiSize()}
                        bg-white/10 backdrop-blur-sm rounded-xl shadow-lg
                        hover:bg-white/20 active:scale-95 transition-all
                        ${powerUpActive ? 'border-2 border-yellow-400/50 shadow-yellow-400/30' : ''}
                        relative overflow-hidden btn-hover-effect`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={shakingEmojis ? {
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 }
              } : {}}
              onClick={(e) => handleEmojiTap(emoji, e)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                boxShadow: powerUpActive ? '0 0 15px rgba(255, 215, 0, 0.5)' : 'none'
              }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.03,
                type: "spring",
                stiffness: 300
              }}
            >
              {/* Glow effect for emojis during power-up */}
              {powerUpActive && (
                <motion.div 
                  className="absolute inset-0 bg-yellow-400/20 rounded-xl z-0"
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.1
                  }}
                />
              )}
              
              {/* Emoji with potential animation */}
              <motion.span
                className="relative z-10"
                animate={
                  lastTapCorrect !== null && emoji === targetEmoji && lastTapCorrect
                    ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                {emoji}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};