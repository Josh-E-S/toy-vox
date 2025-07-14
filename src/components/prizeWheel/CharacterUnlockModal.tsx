import { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody } from '@heroui/modal';
import { Button } from '@heroui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';
import { Character } from '@/config/characters';
import { FaStar } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { soundService } from '@/services/soundService';

interface CharacterUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character | null;
  isNewUnlock: boolean;
  tokenReward?: number;
}

export function CharacterUnlockModal({ 
  isOpen, 
  onClose, 
  character, 
  isNewUnlock,
  tokenReward
}: CharacterUnlockModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && isNewUnlock) {
      setShowConfetti(true);
      // Play celebration sound
      soundService.playSound('celebration');
      
      // Reset confetti after animation
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isNewUnlock]);

  const title = tokenReward 
    ? `You Won ${tokenReward} Tokens!` 
    : isNewUnlock 
      ? 'New Character Unlocked!' 
      : character 
        ? 'You already have this character!' 
        : 'Try Again!';

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      backdrop="blur"
      classNames={{
        base: "bg-black/90 border border-white/20",
        body: "p-0"
      }}
    >
      <ModalContent>
        <ModalBody className="relative overflow-hidden p-8">
          {/* Confetti Effect */}
          <AnimatePresence>
            {showConfetti && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <ConfettiExplosion
                  force={0.8}
                  duration={3000}
                  particleCount={100}
                  width={1600}
                  colors={['#FFD700', '#FF1493', '#00CED1', '#FF6347', '#32CD32']}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Background Effects */}
          <div className="absolute inset-0">
            {/* Radial gradient background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at center, ${
                  character?.color || '#FFD700'
                } 0%, transparent 70%)`
              }}
            />
            
            {/* Floating sparkles */}
            {isNewUnlock && [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  x: [-10, 10],
                  rotate: 360,
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <IoSparkles className="text-2xl" />
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            {/* Title */}
            <motion.h2
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-4xl font-bold text-white"
              style={{
                textShadow: isNewUnlock 
                  ? '0 0 30px rgba(255, 215, 0, 0.8)' 
                  : 'none'
              }}
            >
              {title}
            </motion.h2>

            {/* Character Display */}
            {character && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* Character orb */}
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/30">
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${character.color} 0%, ${character.secondaryColor} 100%)`
                    }}
                  />
                  {character.background?.slides?.[0] && (
                    <img 
                      src={character.background.slides[0].src}
                      alt={character.name}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    />
                  )}
                </div>

                {/* Character name */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-2xl font-bold text-white"
                >
                  {character.name}
                </motion.h3>

                {/* Stars */}
                {isNewUnlock && (
                  <div className="flex justify-center gap-2 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      >
                        <FaStar className="text-yellow-400 text-2xl" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Token Reward Display */}
            {tokenReward && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="flex items-center gap-3 bg-yellow-500/20 px-6 py-3 rounded-full"
              >
                <IoSparkles className="text-yellow-400 text-3xl" />
                <span className="text-3xl font-bold text-yellow-400">+{tokenReward}</span>
                <span className="text-xl text-yellow-300">Tokens</span>
              </motion.div>
            )}

            {/* Description */}
            {character && isNewUnlock && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/80 max-w-md"
              >
                {character.description}
              </motion.p>
            )}

            {/* Close Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                onPress={onClose}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                endContent={<IoSparkles />}
              >
                {isNewUnlock && character ? 'Chat Now!' : 'Continue'}
              </Button>
            </motion.div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}