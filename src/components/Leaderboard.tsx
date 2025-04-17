
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { LeaderboardEntry } from '../types/game';
import { formatDistanceToNow } from 'date-fns';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClose: () => void;
}

export const Leaderboard = ({ entries, onClose }: LeaderboardProps) => {
  // Trophy emojis for top 3
  const trophies = ['🏆', '🥈', '🥉'];
  
  return (
    <motion.div 
      className="flex flex-col items-center w-full h-full justify-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex items-center mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.span 
          className="text-4xl mr-2"
          animate={{ 
            rotate: [0, 10, -10, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🏆
        </motion.span>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600">Leaderboard</h2>
      </motion.div>
      
      {entries.length === 0 ? (
        <div className="text-center py-12 opacity-70 bg-white/5 backdrop-blur-sm rounded-xl w-full mb-8">
          <div className="text-5xl mb-4">🏆</div>
          <div>No scores yet. Be the first to play!</div>
        </div>
      ) : (
        <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden mb-8 shadow-xl">
          <div className="grid grid-cols-12 gap-2 p-3 border-b border-white/10 font-semibold text-sm bg-white/5">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Name</div>
            <div className="col-span-2 text-right">Score</div>
            <div className="col-span-2 text-right">Combo</div>
            <div className="col-span-3 text-right">When</div>
          </div>
          
          <AnimatePresence>
            {entries.map((entry, index) => (
              <motion.div 
                key={entry.id}
                className={`grid grid-cols-12 gap-2 p-3 border-b border-white/5 text-sm ${
                  index === 0 ? 'bg-yellow-500/20' : 
                  index === 1 ? 'bg-gray-400/10' : 
                  index === 2 ? 'bg-amber-700/10' : ''
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="col-span-1 font-bold">
                  {index < 3 ? (
                    <motion.span
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: index === 0 ? [0, 5, -5, 0] : 0
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {trophies[index]}
                    </motion.span>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="col-span-4 truncate">{entry.name}</div>
                <div className="col-span-2 text-right font-semibold">
                  {index === 0 ? (
                    <motion.span
                      animate={{ 
                        color: ['#ffffff', '#ffcc00', '#ffffff']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      {entry.score}
                    </motion.span>
                  ) : (
                    entry.score
                  )}
                </div>
                <div className="col-span-2 text-right">{entry.maxCombo}x</div>
                <div className="col-span-3 text-right text-xs opacity-70">
                  {formatDistanceToNow(new Date(entry.date), { addSuffix: true })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        className="w-full max-w-xs"
      >
        <Button 
          variant="outline" 
          className="w-full py-4 border-white/20 backdrop-blur-sm hover:bg-white/10"
          onClick={onClose}
        >
          Back to Menu
        </Button>
      </motion.div>
    </motion.div>
  );
};