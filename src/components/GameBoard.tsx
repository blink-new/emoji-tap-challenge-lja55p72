
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  onEmojiTap: (emoji: string) => void;
}

export const GameBoard = ({ gameState, onEmojiTap }: GameBoardProps) => {
  const { emojis, targetEmoji } = gameState;
  
  // Calculate grid columns based on emoji count
  const getGridCols = () => {
    const count = emojis.length;
    if (count <= 4) return 'grid-cols-2';
    if (count <= 9) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        <motion.div 
          key={targetEmoji}
          className={`grid ${getGridCols()} gap-3 p-4`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {emojis.map((emoji, index) => (
            <motion.button
              key={`${emoji}-${index}`}
              className={`aspect-square flex items-center justify-center text-4xl sm:text-5xl 
                        bg-white/10 backdrop-blur-sm rounded-xl shadow-lg
                        hover:bg-white/20 active:scale-95 transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEmojiTap(emoji)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.03,
                type: "spring",
                stiffness: 300
              }}
            >
              {emoji}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};