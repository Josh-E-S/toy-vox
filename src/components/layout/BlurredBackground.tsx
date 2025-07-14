import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Character } from '@/config/characters';

interface BlurredBackgroundProps {
  character?: Character;
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

const BlurredBackground = ({ 
  character, 
  children, 
  intensity = 'medium',
  animated = true 
}: BlurredBackgroundProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const blurMap = {
    low: 'blur(10px)',
    medium: 'blur(20px)',
    high: 'blur(30px)'
  };

  // Animate through character backgrounds if animated is true
  useEffect(() => {
    if (!animated || !character?.background?.slides) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        (prev + 1) % (character.background?.slides?.length || 1)
      );
    }, character.background.slideDuration || 2400);

    return () => clearInterval(interval);
  }, [character, animated]);

  const backgroundImage = character?.background?.slides?.[currentSlide]?.src;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic blurred background */}
      <AnimatePresence mode="wait">
        {backgroundImage && (
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: character?.background?.fadeDuration || 1.2 }}
            className="absolute inset-0 z-0"
          >
            <motion.img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover scale-110"
              style={{
                filter: blurMap[intensity],
              }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 10, ease: "linear" }}
            />
            
            {/* Color overlay with character theme */}
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-30"
              style={{
                background: character ? 
                  `linear-gradient(135deg, ${character.color}40, ${character.secondaryColor}40)` : 
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(96, 165, 250, 0.4))'
              }}
            />
            
            {/* Dark gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback gradient when no character/image */}
      {!backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          }}
        />
      )}

      {/* Ambient light effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: character ? character.color : '#3B82F6',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: character ? character.secondaryColor : '#60A5FA',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BlurredBackground;