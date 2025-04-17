
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
    powerUpTimeLeft,
    totalTaps,
    perfectTaps
  } = gameState;
  
  // Calculate time percentage for progress bar
  const timePercentage = (timeLeft / 30) * 100;
  const powerUpPercentage = (powerUpTimeLeft / 5) * 100;
  
  // Get category name based on level
  const categoryName = getEmojiCategoryName(level);
  
  // Calculate accuracy percentage
  const accuracy = totalTaps > 0 ? Math.round((perfectTaps / totalTaps) * 100) : 0;
  
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
            className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
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
            className={`text-2xl font-bold ${combo > 5 ? 'bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500' : combo > 0 ? 'text-yellow-400' : 'text-white'}`}
            initial={{ scale: 1.2 }}
            animate={{ 
              scale: combo > 5 ? [1, 1.1, 1] : 1,
              rotate: combo > 8 ? [0, 2, -2, 0] : 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              scale: {
                repeat: combo > 5 ? Infinity : 0,
                repeatType: "reverse",
                duration: 1
              },
              rotate: {
                repeat: combo > 8 ? Infinity : 0,
                repeatType: "reverse",
                duration: 0.5
              }
            }}
          >
            {combo}x
          </motion.span>
        </div>
      </div>
      
      {/* Accuracy indicator */}
      <div className="flex justify-between items-center text-xs mb-2">
        <span className="opacity-70">Accuracy: {accuracy}%</span>
        <span className="opacity-70">Perfect Taps: {perfectTaps}</span>
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
          {powerUpActive ? (
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
          ) : (
            <motion.div 
              className="absolute inset-0 rounded-full bg-white/20 filter blur-lg z-0"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
          
          <motion.span 
            className="relative z-10"
            animate={{ 
              rotate: powerUpActive ? [0, 5, -5, 0] : 0,
              scale: powerUpActive ? [1, 1.05, 1] : 1
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {targetEmoji}
          </motion.span>
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
            <motion.span 
              className="text-xs font-semibold text-yellow-400"
              animate={{
                scale: [1, 1.05, 1],
                color: ['#facc15', '#fef08a', '#facc15']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ⚡ POWER-UP ACTIVE! ⚡
            </motion.span>
            <span className="text-xs font-semibold text-yellow-400">{powerUpTimeLeft.toFixed(1)}s</span>
          </div>
          <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
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
      <div className="w-full h-4 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
        <motion.div 
          className={`h-full ${
            powerUpActive 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
              : timePercentage < 30
                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                : 'bg-gradient-to-r from-green-400 to-emerald-500'
          }`}
          style={{ width: `${timePercentage}%` }}
          animate={{ 
            width: `${timePercentage}%`
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Pulsing effect when time is low */}
          {timePercentage < 20 && !powerUpActive && (
            <motion.div 
              className="absolute inset-0 bg-red-500/50"
              animate={{ 
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
        </motion.div>
      </div>
      
      {/* Time indicator */}
      <div className="flex justify-end mt-1">
        <motion.span 
          className="text-xs opacity-70"
          animate={{ 
            color: timePercentage < 30 ? "#ef4444" : "#ffffff"
          }}
        >
          {timeLeft.toFixed(1)}s
        </motion.span>
      </div>
    </div>
  );
};