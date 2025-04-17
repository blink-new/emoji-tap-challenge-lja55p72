
import { useState } from 'react';
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
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        
        {/* Floating emoji bubbles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute text-3xl opacity-10 pointer-events-none"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            {['😀', '🎮', '⚡', '🎯', '🏆', '🔥', '⏱️', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎸', '🎹', '🎺', '🎻', '🎲', '🎯', '🎪', '🌈', '⭐', '✨', '💫', '🌟', '🔥', '💥', '⚡', '🎇', '🎆', '🏆', '🥇'][Math.floor(Math.random() * 32)]}
          </motion.div>
        ))}
      </div>
      
      {/* Main container with fixed width and centered */}
      <div className="relative w-full max-w-md mx-auto min-h-[600px] flex flex-col items-center justify-center p-4 z-10">
        <AnimatePresence mode="wait">
          {!gameState.isPlaying && !gameState.gameOver && !showLeaderboard && (
            <motion.div 
              key="start-screen"
              className="absolute inset-0 flex items-center justify-center"
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
              className="absolute inset-0 flex items-center justify-center"
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
              className="absolute inset-0 flex flex-col items-center justify-center py-8"
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
              className="absolute inset-0 flex items-center justify-center"
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
      
      <footer className="w-full mt-auto py-4 text-center text-sm opacity-70">
        Emoji Tap Challenge | Tap fast, score high!
      </footer>
    </div>
  );
}

export default App;