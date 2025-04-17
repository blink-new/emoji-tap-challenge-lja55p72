
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from '../types/game';
import { getEmojiCategoryName } from '../data/emojis';

interface GameHUDProps {
  gameState: GameState;
}

export const GameHUD = ({ gameState }: GameHUDProps) => {
  const { 
    score, 
    combo, 
    level, 
    timeLeft, 
    targetEmoji, 
    lastTapCorrect, 
    powerUpActive,
    powerUpTimeLeft
  } = gameState;
  
  // Calculate time percentage for progress bar
  const timePercentage = (timeLeft / 30) * 100;
  const powerUpPercentage = (powerUpTimeLeft / 5) * 100;
  
  // Get category name based on level
  const categoryName = getEmojiCategoryName(level);
  
  return (
    <div className="w-full mx-auto mb-4 px-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="text-sm font-semibold opacity-80">SCORE</span>
          <motion.span 
            key={score}
            className="text-2xl font-bold"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {score}
          </motion.span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold opacity-80">LEVEL {level}</span>
          <motion.span 
            key={level}
            className="text-lg font-medium"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {categoryName}
          </motion.span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold opacity-80">COMBO</span>
          <motion.span 
            key={combo}
            className="text-2xl font-bold"
            initial={{ scale: 1.2, color: combo > 0 ? "#ffcc00" : "#ffffff" }}
            animate={{ scale: 1, color: combo > 0 ? "#ffcc00" : "#ffffff" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {combo}x
          </motion.span>
        </div>
      </div>
      
      {/* Feedback message */}
      <AnimatePresence>
        {lastTapCorrect !== null && (
          <motion.div 
            key={`feedback-${Date.now()}`}
            className={`text-center text-sm font-bold mb-1 ${lastTapCorrect ? 'text-green-400' : 'text-red-400'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {lastTapCorrect ? 
              (combo > 3 ? '🔥 AWESOME! 🔥' : 'CORRECT!') : 
              'WRONG!'}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Target emoji to tap */}
      <div className="mb-6 text-center relative">
        <span className="text-sm font-semibold opacity-80 block">TAP THIS EMOJI</span>
        <motion.div
          key={targetEmoji}
          className="text-6xl sm:text-7xl mt-2 relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Glow effect for target emoji */}
          {powerUpActive && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-yellow-400/30 filter blur-xl z-0"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
          
          <span className="relative z-10">{targetEmoji}</span>
        </motion.div>
      </div>
      
      {/* Power-up indicator */}
      {powerUpActive && (
        <motion.div 
          className="mb-2 w-full"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-yellow-400">POWER-UP ACTIVE!</span>
            <span className="text-xs font-semibold text-yellow-400">{powerUpTimeLeft.toFixed(1)}s</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
              style={{ width: `${powerUpPercentage}%` }}
              animate={{ width: `${powerUpPercentage}%` }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </motion.div>
      )}
      
      {/* Time bar */}
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${
            powerUpActive 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
              : 'bg-gradient-to-r from-red-500 to-yellow-400'
          }`}
          style={{ width: `${timePercentage}%` }}
          animate={{ 
            width: `${timePercentage}%`,
            backgroundColor: timePercentage < 30 ? "#ef4444" : "#22c55e"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
    </div>
  );
};