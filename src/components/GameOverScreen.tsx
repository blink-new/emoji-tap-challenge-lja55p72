
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showAchievement, setShowAchievement] = useState(false);
  
  // Show achievement with delay for dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAchievement(true);
      
      // Trigger confetti for high scores
      if (score > 200) {
        confetti({
          particleCount: 50,
          spread: 90,
          origin: { y: 0.3 }
        });
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  const handleSave = () => {
    if (playerName.trim()) {
      onSaveScore(playerName);
      setSaved(true);
      
      // Trigger confetti when score is saved
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1']
      });
    }
  };
  
  // Get achievement based on score
  const getAchievement = () => {
    if (score >= 1000) return { title: "EMOJI MASTER", emoji: "👑", color: "from-yellow-400 to-amber-600" };
    if (score >= 500) return { title: "EMOJI PRO", emoji: "🏆", color: "from-blue-400 to-indigo-600" };
    if (score >= 300) return { title: "EMOJI EXPERT", emoji: "🥇", color: "from-green-400 to-emerald-600" };
    if (score >= 100) return { title: "EMOJI APPRENTICE", emoji: "🥈", color: "from-purple-400 to-pink-600" };
    return { title: "EMOJI NOVICE", emoji: "🥉", color: "from-gray-400 to-slate-600" };
  };
  
  const achievement = getAchievement();
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      >
        Game Over!
      </motion.h2>
      
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="mb-6 flex flex-col items-center"
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
          >
            <motion.div 
              className="text-6xl mb-2"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {achievement.emoji}
            </motion.div>
            <motion.div 
              className={`text-xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent px-4 py-1 rounded-full`}
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {achievement.title}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-3 gap-4 w-full mb-8">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Score</div>
          <motion.div 
            className="text-2xl font-bold"
            animate={{ 
              color: score > 500 ? ['#ffffff', '#ffcc00', '#ffffff'] : '#ffffff'
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {score}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Max Combo</div>
          <motion.div 
            className="text-2xl font-bold"
            animate={{ 
              color: maxCombo > 10 ? ['#ffffff', '#ff6b6b', '#ffffff'] : '#ffffff'
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {maxCombo}x
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className="text-sm opacity-70">Level</div>
          <motion.div 
            className="text-2xl font-bold"
            animate={{ 
              color: level > 5 ? ['#ffffff', '#48dbfb', '#ffffff'] : '#ffffff'
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {level}
          </motion.div>
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
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 relative overflow-hidden"
            >
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-white/20"
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
              <span className="relative z-10">Save Score</span>
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
          <motion.div
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Score saved to leaderboard! 🎉
          </motion.div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
        className="w-full max-w-xs"
      >
        <Button 
          className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-900/30 relative overflow-hidden"
          onClick={onRestart}
        >
          {/* Button glow effect */}
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-md"
            animate={{ 
              opacity: [0, 0.3, 0],
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          <span className="relative z-10">Play Again</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};