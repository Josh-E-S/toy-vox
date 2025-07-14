import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Icon } from '@iconify/react';
import AppLayout from '../layouts/AppLayout';
import { TriviaGame } from '../components/games';
import { useVoxTokens } from '../context/VoxTokenContext';
import { VoxTokenDisplay } from '../components/prizeWheel';

const gameCategories = [
  {
    key: "trivia",
    title: "Trivia Challenge",
    description: "Test your knowledge and earn tokens!",
    icon: <Icon className="h-full w-full" icon="solar:lightbulb-linear" />,
    color: "from-purple-500 to-blue-500",
    available: true
  },
  {
    key: "memory",
    title: "Memory Match",
    description: "Match character pairs in this classic game",
    icon: <Icon className="h-full w-full" icon="solar:square-academic-cap-2-linear" />,
    color: "from-pink-500 to-red-500",
    available: false
  },
  {
    key: "puzzle",
    title: "Character Puzzle",
    description: "Solve puzzles featuring your favorite characters",
    icon: <Icon className="h-full w-full" icon="solar:puzzle-piece-linear" />,
    color: "from-green-500 to-teal-500",
    available: false
  },
];

const GamesPage = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const { tokens } = useVoxTokens();

  const handleGameSelect = (gameKey: string) => {
    if (gameCategories.find(g => g.key === gameKey)?.available) {
      setSelectedGame(gameKey);
    }
  };

  return (
    <AppLayout
      background={
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
      }
    >
      <div className="flex flex-col min-h-screen">
        {/* Token Display - Top Right */}
        <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-20">
          <VoxTokenDisplay />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 lg:px-8 py-8 pt-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mini Games
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Play fun games, test your knowledge, and earn Vox Tokens!
            </p>
          </motion.div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {gameCategories.map((game, index) => (
              <motion.div
                key={game.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  isPressable={game.available}
                  onPress={() => handleGameSelect(game.key)}
                  className={`
                    relative min-h-[280px] p-6 
                    ${game.available 
                      ? 'bg-white/10 backdrop-blur hover:bg-white/20 cursor-pointer' 
                      : 'bg-white/5 backdrop-blur opacity-60 cursor-not-allowed'
                    }
                    border border-white/20 transition-all duration-300
                  `}
                >
                  {!game.available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg z-10">
                      <span className="text-xl font-bold text-white/80">Coming Soon</span>
                    </div>
                  )}
                  
                  <CardHeader className="flex flex-col gap-4 p-0">
                    <div className={`
                      w-16 h-16 rounded-xl bg-gradient-to-r ${game.color} 
                      flex items-center justify-center text-white p-3
                    `}>
                      {game.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {game.title}
                      </h3>
                      <p className="text-white/70">
                        {game.description}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardBody className="flex flex-col items-start justify-end p-0 mt-6">
                    {game.available && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 text-sm text-white/80"
                      >
                        <span>Play Now</span>
                        <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                      </motion.div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur rounded-full px-8 py-4">
              <div>
                <p className="text-sm text-white/60">Your Tokens</p>
                <p className="text-2xl font-bold text-yellow-400">{tokens}</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-sm text-white/60">Games Played</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-sm text-white/60">High Score</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Game Modals */}
      <TriviaGame 
        isOpen={selectedGame === 'trivia'} 
        onClose={() => setSelectedGame(null)} 
      />
    </AppLayout>
  );
};

export default GamesPage;