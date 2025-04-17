
import { motion } from 'framer-motion';
import { GameState } from '../types/game';

interface GameHUDProps {
  gameState: GameState;
}

export const GameHUD = ({ gameState }: GameHUDProps) => {
  const { score, combo, level, timeLeft, targetEmoji } = gameState;
  
  // Calculate time percentage for progress bar
  const timePercentage = (timeLeft / 30) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto mb-6 px-4">
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
          <span className="text-sm font-semibold opacity-80">LEVEL</span>
          <motion.span 
            key={level}
            className="text-2xl font-bold"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {level}
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
      
      {/* Target emoji to tap */}
      <div className="mb-4 text-center">
        <span className="text-sm font-semibold opacity-80 block">TAP THIS EMOJI</span>
        <motion.div
          key={targetEmoji}
          className="text-5xl sm:text-6xl mt-1"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {targetEmoji}
        </motion.div>
      </div>
      
      {/* Time bar */}
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-red-500 to-yellow-400"
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