
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface GameOverScreenProps {
  score: number;
  maxCombo: number;
  level: number;
  onRestart: () => void;
  onSaveScore: (name: string) => void;
}

export const GameOverScreen = ({ 
  score, 
  maxCombo, 
  level, 
  onRestart, 
  onSaveScore 
}: GameOverScreenProps) => {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    if (playerName.trim()) {
      onSaveScore(playerName);
      setSaved(true);
    }
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      >
        Game Over!
      </motion.h2>
      
      <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Score</div>
          <div className="text-2xl font-bold">{score}</div>
        </motion.div>
        
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Max Combo</div>
          <div className="text-2xl font-bold">{maxCombo}x</div>
        </motion.div>
        
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Level</div>
          <div className="text-2xl font-bold">{level}</div>
        </motion.div>
      </div>
      
      {!saved ? (
        <motion.div 
          className="w-full max-w-md mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className="flex space-x-2">
            <Input
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSave} disabled={!playerName.trim()}>
              Save Score
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="text-green-400 mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Score saved to leaderboard!
        </motion.div>
      )}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
      >
        <Button 
          className="w-full max-w-md text-lg py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          onClick={onRestart}
        >
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  );
};