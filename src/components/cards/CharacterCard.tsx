import { Card, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Image } from '@heroui/image';
import { motion } from 'framer-motion';
import { HiMicrophone } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Character } from '@/config/characters';
import { playSound, playVoiceClip } from '@/services/soundService';
import CardGradientOverlay from './CardGradientOverlay';

interface CharacterCardProps {
  character: Character;
  variant?: 'default' | 'compact' | 'featured';
  index?: number;
}

const CharacterCard = ({ character, variant = 'default', index = 0 }: CharacterCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    playSound('select');
    navigate(`/character/${character.id}`);
  };

  const handleMouseEnter = () => {
    playSound('hover');
    if (character.voiceClip) {
      playVoiceClip(character.voiceClip);
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1, 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      layoutId={`character-${character.id}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={handleMouseEnter}
      className="relative"
    >
      <Card 
        isPressable
        onPress={handleCardClick}
        className="bg-zinc-500/30 backdrop-blur-md border-zinc-600/20 hover:bg-zinc-500/50 transition-all duration-300 group relative overflow-hidden h-full"
        style={{
          '--character-color': character.color || '#3B82F6',
          '--character-secondary': character.secondaryColor || '#60A5FA',
        } as React.CSSProperties}
      >
        {/* Gradient overlay effect */}
        <CardGradientOverlay 
          primaryColor={character.color}
          secondaryColor={character.secondaryColor}
        />
        
        <CardBody className="p-0 relative z-10">
          <motion.div 
            className="relative h-48 overflow-hidden"
            layoutId={`character-${character.id}-image-container`}
          >
            <motion.div
              layoutId={`character-${character.id}-image`}
              className="w-full h-full"
            >
              <Image
                src={character.background?.slides?.[0]?.src || ''}
                alt={character.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                removeWrapper
              />
            </motion.div>
            
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
          </motion.div>
        </CardBody>
        
        <CardFooter className="flex flex-col items-start p-4 relative z-10">
          <div className="w-full flex items-start justify-between mb-3">
            <div className="flex-1">
              <motion.h3 
                layoutId={`character-${character.id}-title`}
                className="text-xl font-bold text-white mb-1"
              >
                {character.name}
              </motion.h3>
              <p className="text-sm text-white/70">
                {character.personality.split('.')[0]}
              </p>
            </div>
            
            {/* Microphone Icon Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3"
            >
              <Button
                isIconOnly
                size="lg"
                variant="flat"
                className="relative overflow-hidden group/mic transition-all duration-300 bg-white/10 backdrop-blur-sm"
                style={{ 
                  borderColor: `${character.color}60`,
                  borderWidth: '2px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick();
                }}
              >
                {/* Pulse animation ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: character.color }}
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.3, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                
                {/* Inner glow on hover */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover/mic:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${character.color}40 0%, transparent 70%)`,
                    filter: 'blur(8px)'
                  }}
                />
                
                <HiMicrophone 
                  size={24} 
                  className="relative z-10 transition-all duration-300 group-hover/mic:scale-110 text-white"
                />
              </Button>
            </motion.div>
          </div>
          
          {/* Talk button - only show on default variant */}
          {variant === 'default' && (
            <Button
              size="sm"
              variant="flat"
              className="w-full group-hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-white/10 backdrop-blur-sm text-white"
              style={{ 
                borderColor: character.color,
                borderWidth: '1px'
              }}
            >
              Talk to {character.name}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CharacterCard;