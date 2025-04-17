
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { useLeaderboard } from './hooks/useLeaderboard';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { GameHUD } from './components/GameHUD';
import { GameOverScreen } from './components/GameOverScreen';
import { Leaderboard } from './components/Leaderboard';
import './App.css';

function App() {
  const { gameState, startGame, resetGame, handleTap } = useGameState();
  const { leaderboard, addEntry } = useLeaderboard();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [bgParticles, setBgParticles] = useState<Array<{x: number, y: number, size: number, emoji: string, speed: number}>>([]);
  
  // Generate background particles on mount
  useEffect(() => {
    const emojis = ['😀', '🎮', '⚡', '🎯', '🏆', '🔥', '⏱️', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧'];
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.5 + 0.5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      speed: Math.random() * 20 + 15
    }));
    setBgParticles(particles);
  }, []);
  
  const handleSaveScore = (name: string) => {
    addEntry(name, gameState.score, gameState.maxCombo);
  };
  
  const handleStartGame = () => {
    setShowLeaderboard(false);
    startGame();
  };
  
  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };
  
  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white overflow-hidden">
      {/* Animated background with gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-800/80 to-blue-900/80 z-0"></div>
        
        {/* Pattern background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 z-0"></div>
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-gradient-x z-0"></div>
        
        {/* Floating emoji bubbles */}
        {bgParticles.map((particle, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute text-3xl opacity-10 pointer-events-none"
            initial={{ 
              x: `${particle.x}%`, 
              y: `${particle.y}%`,
              scale: particle.size
            }}
            animate={{ 
              y: [`${particle.y}%`, `${(particle.y + 30) % 100}%`],
              x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: particle.speed,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>
      
      {/* Light effect */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl z-0"
        animate={{
          x: [0, 20, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl z-0"
        animate={{
          x: [0, -20, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Main container with fixed width and centered */}
      <div className="relative w-full max-w-md mx-auto min-h-[600px] flex flex-col items-center justify-center p-4 z-10">
        {/* Glass panel effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl z-0"></div>
        
        <AnimatePresence mode="wait">
          {!gameState.isPlaying && !gameState.gameOver && !showLeaderboard && (
            <motion.div 
              key="start-screen"
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StartScreen 
                onStart={handleStartGame} 
                onShowLeaderboard={handleShowLeaderboard} />
            </motion.div>
          )}
          
          {showLeaderboard && (
            <motion.div 
              key="leaderboard"
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Leaderboard 
                entries={leaderboard} 
                onClose={handleCloseLeaderboard}
              />
            </motion.div>
          )}
          
          {gameState.isPlaying && !gameState.gameOver && (
            <motion.div 
              key="game-screen"
              className="absolute inset-0 flex flex-col items-center justify-center py-8 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GameHUD gameState={gameState} />
              <GameBoard gameState={gameState} onEmojiTap={handleTap} />
            </motion.div>
          )}
          
          {gameState.gameOver && (
            <motion.div 
              key="game-over"
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GameOverScreen 
                score={gameState.score}
                maxCombo={gameState.maxCombo}
                level={gameState.level}
                onRestart={handleStartGame}
                onSaveScore={handleSaveScore}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <footer className="w-full mt-auto py-4 text-center text-sm opacity-70 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          Emoji Tap Challenge | Tap fast, score high!
        </motion.div>
      </footer>
    </div>
  );
}

export default App;