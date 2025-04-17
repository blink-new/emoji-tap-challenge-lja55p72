
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { LeaderboardEntry } from '../types/game';
import { formatDistanceToNow } from 'date-fns';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClose: () => void;
}

export const Leaderboard = ({ entries, onClose }: LeaderboardProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center w-full max-w-md mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      
      {entries.length === 0 ? (
        <div className="text-center py-8 opacity-70">
          No scores yet. Be the first to play!
        </div>
      ) : (
        <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden mb-6">
          <div className="grid grid-cols-12 gap-2 p-3 border-b border-white/10 font-semibold text-sm">
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
                className="grid grid-cols-12 gap-2 p-3 border-b border-white/5 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="col-span-1 font-bold">{index + 1}</div>
                <div className="col-span-4 truncate">{entry.name}</div>
                <div className="col-span-2 text-right">{entry.score}</div>
                <div className="col-span-2 text-right">{entry.maxCombo}x</div>
                <div className="col-span-3 text-right text-xs opacity-70">
                  {formatDistanceToNow(new Date(entry.date), { addSuffix: true })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onClose}
      >
        Back
      </Button>
    </motion.div>
  );
};