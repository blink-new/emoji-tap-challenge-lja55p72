
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface StartScreenProps {
  onStart: () => void;
  onShowLeaderboard: () => void;
}

export const StartScreen = ({ onStart, onShowLeaderboard }: StartScreenProps) => {
  // Random emojis for decoration
  const decorationEmojis = ['😀', '🎮', '⚡', '🎯', '🏆', '🔥', '⏱️', '🎪'];
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex justify-center">
        {decorationEmojis.map((emoji, index) => (
          <motion.div
            key={index}
            className="text-4xl mx-1"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
      
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
      >
        Emoji Tap Challenge
      </motion.h1>
      
      <motion.p 
        className="text-lg opacity-80 mb-8 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Tap the correct emoji as fast as you can! Build combos and beat the clock!
      </motion.p>
      
      <div className="space-y-4 w-full max-w-xs">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
        >
          <Button 
            className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={onStart}
          >
            Start Game
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
        >
          <Button 
            variant="outline" 
            className="w-full text-lg py-6"
            onClick={onShowLeaderboard}
          >
            Leaderboard
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};