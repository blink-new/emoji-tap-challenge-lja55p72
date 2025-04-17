
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import confetti from 'canvas-confetti';

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
      
      // Trigger confetti when score is saved
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };
  
  // Get achievement based on score
  const getAchievement = () => {
    if (score >= 1000) return { title: "EMOJI MASTER", emoji: "👑" };
    if (score >= 500) return { title: "EMOJI PRO", emoji: "🏆" };
    if (score >= 300) return { title: "EMOJI EXPERT", emoji: "🥇" };
    if (score >= 100) return { title: "EMOJI APPRENTICE", emoji: "🥈" };
    return { title: "EMOJI NOVICE", emoji: "🥉" };
  };
  
  const achievement = getAchievement();
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        // Initial confetti burst when game over screen appears
        if (score > 200) {
          confetti({
            particleCount: 50,
            spread: 90,
            origin: { y: 0.3 }
          });
        }
      }}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      >
        Game Over!
      </motion.h2>
      
      <motion.div
        className="mb-6 flex flex-col items-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div className="text-5xl mb-2">{achievement.emoji}</div>
        <div className="text-xl font-bold text-yellow-400">{achievement.title}</div>
      </motion.div>
      
      <div className="grid grid-cols-3 gap-4 w-full mb-8">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Score</div>
          <div className="text-2xl font-bold">{score}</div>
        </motion.div>
        
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Max Combo</div>
          <div className="text-2xl font-bold">{maxCombo}x</div>
        </motion.div>
        
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Level</div>
          <div className="text-2xl font-bold">{level}</div>
        </motion.div>
      </div>
      
      {!saved ? (
        <motion.div 
          className="w-full mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <div className="flex space-x-2">
            <Input
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 placeholder:text-white/50"
            />
            <Button 
              onClick={handleSave} 
              disabled={!playerName.trim()}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Save Score
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="text-green-400 mb-8 font-semibold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Score saved to leaderboard! 🎉
        </motion.div>
      )}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
        className="w-full max-w-xs"
      >
        <Button 
          className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-900/30"
          onClick={onRestart}
        >
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  );
};