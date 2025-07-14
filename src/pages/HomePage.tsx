import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/button';
import Logo from '../components/Logo';
import MainLayout from '../layouts/MainLayout';
import { FiSettings } from 'react-icons/fi';
import SettingsModal from '../components/SettingsModal';
import vapiService from '../services/vapiService';
import characters from '../config/characters';
import { preloadSounds, preloadVoiceClip } from '../services/soundService';
import CharacterCard from '../components/cards/CharacterCard';
import BlurredBackground from '../components/layout/BlurredBackground';

const HomePage = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Get character data
  const characterList = Object.values(characters);
  
  // End any active Vapi calls when returning to home page
  useEffect(() => {
    vapiService.endVapiCall();
    preloadSounds();
    
    // Preload voice clips for characters that have them
    characterList.forEach(character => {
      if (character.voiceClip) {
        preloadVoiceClip(character.voiceClip);
      }
    });
  }, [characterList]);
  
  return (
    <MainLayout 
      background={
        <BlurredBackground intensity="low" animated={false}>
          <div />
        </BlurredBackground>
      }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl w-full">
            {characterList.map((character, index) => (
              <CharacterCard 
                key={character.id}
                character={character}
                index={index}
              />
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
