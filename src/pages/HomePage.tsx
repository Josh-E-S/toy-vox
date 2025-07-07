import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';
import { motion } from 'framer-motion';
import DynamicBackground from '../components/DynamicBackground';
import { useCharacter } from '../context/CharacterContext';
import Logo from '../components/Logo';
import MainLayout from '../layouts/MainLayout';
import { FiSettings } from 'react-icons/fi';
import SettingsModal from '../components/SettingsModal';
import vapiService from '../services/vapiService';
import characters from '../config/characters';

const HomePage = () => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // End any active Vapi calls when returning to home page
  useEffect(() => {
    vapiService.endVapiCall();
  }, []);

  // Get character data
  const characterList = Object.values(characters);
  
  return (
    <MainLayout 
      background={<DynamicBackground type="particles" intensity="high" />}
    >
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="w-full py-6 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="large" className="drop-shadow-lg" />
            <Button
              isIconOnly
              variant="flat"
              className="bg-white/20 backdrop-blur-sm"
              onClick={() => setIsSettingsOpen(true)}
            >
              <FiSettings size={20} />
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Talk to Your Toys
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Choose a character and start a magical conversation
            </p>
          </motion.div>

          {/* Character Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
            {characterList.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card 
                  isPressable
                  onPress={() => navigate(`/character/${character.id}`)}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <CardBody className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={character.background?.slides?.[0]?.src || ''}
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start p-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {character.name}
                    </h3>
                    <p className="text-sm text-white/70 mb-3">
                      {character.personality.split('.')[0]}
                    </p>
                    <Button
                      size="sm"
                      variant="flat"
                      className="w-full"
                      style={{ 
                        backgroundColor: `${character.color}40`,
                        color: character.color,
                        borderColor: character.color
                      }}
                    >
                      Talk to {character.name}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      </div>
    </MainLayout>
  );
};

export default HomePage;
