import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader } from '@heroui/modal';
import { motion } from 'framer-motion';
import { Wheel } from 'react-custom-roulette';
import { useVoxTokens, SPIN_COST } from '@/context/VoxTokenContext';
import characters from '@/config/characters';
import { getWheelSegments, WheelSegment } from './prizeWheelConfig';
import { CharacterUnlockModal } from './CharacterUnlockModal';
import { VoxTokenDisplay } from './VoxTokenDisplay';
import { soundService } from '@/services/soundService';
import { IoClose } from 'react-icons/io5';
import './PrizeWheel.css';

interface PrizeWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WheelData {
  option: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
}

export function PrizeWheel({ isOpen, onClose }: PrizeWheelProps) {
  const { spendTokens, unlockCharacter, isCharacterUnlocked, addTokens, unlockedCharacters } = useVoxTokens();
  const [segments, setSegments] = useState<WheelSegment[]>([]);
  const [wheelData, setWheelData] = useState<WheelData[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [wonCharacter, setWonCharacter] = useState<typeof characters[string] | null>(null);
  const [isNewUnlock, setIsNewUnlock] = useState(false);
  const [tokenReward, setTokenReward] = useState<number | undefined>();

  // Initialize wheel segments
  useEffect(() => {
    if (isOpen) {
      const newSegments = getWheelSegments(unlockedCharacters);
      setSegments(newSegments);
      
      // Convert segments to wheel data format
      const data: WheelData[] = newSegments.map(seg => ({
        option: seg.segmentText,
        style: {
          backgroundColor: seg.segColor,
          textColor: '#ffffff'
        }
      }));
      setWheelData(data);
    }
  }, [isOpen, unlockedCharacters]);

  const handleSpinClick = () => {
    if (!mustSpin && spendTokens(SPIN_COST)) {
      const newPrizeNumber = Math.floor(Math.random() * segments.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      soundService.playSound('spin');
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    
    const wonSegment = segments[prizeNumber];
    
    // Handle character win
    if (wonSegment.characterId) {
      const character = characters[wonSegment.characterId];
      const alreadyUnlocked = isCharacterUnlocked(wonSegment.characterId);
      
      if (!alreadyUnlocked) {
        unlockCharacter(wonSegment.characterId);
        setIsNewUnlock(true);
      } else {
        setIsNewUnlock(false);
      }
      
      setWonCharacter(character);
      setTokenReward(undefined);
      soundService.playSound(alreadyUnlocked ? 'error' : 'success');
    } 
    // Handle token rewards
    else if (wonSegment.isSpecial) {
      const amount = parseInt(wonSegment.segmentText.match(/\d+/)?.[0] || '0');
      if (amount > 0) {
        addTokens(amount);
        setTokenReward(amount);
        setWonCharacter(null);
        soundService.playSound('coins');
      }
    }
    // Handle "Try Again"
    else {
      setWonCharacter(null);
      setTokenReward(undefined);
      soundService.playSound('error');
    }
    
    // Show result modal after a short delay
    setTimeout(() => {
      setShowUnlockModal(true);
    }, 500);
  };

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="4xl"
        backdrop="blur"
        hideCloseButton
        classNames={{
          base: "bg-black/95 border border-white/20",
          body: "p-0"
        }}
      >
        <ModalContent>
          <ModalHeader className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              Prize Wheel of Fortune
            </h2>
            <div className="flex items-center gap-4">
              <VoxTokenDisplay />
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>
          </ModalHeader>
          
          <ModalBody className="relative p-8">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 80%, #FFD700 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 20%, #FF1493 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 50%, #00CED1 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 80%, #FFD700 0%, transparent 50%)',
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ mixBlendMode: 'screen', opacity: 0.3 }}
              />
              
              {/* Casino lights effect */}
              <div className="absolute inset-0 casino-lights" />
            </div>

            {/* Wheel container */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.7 }}
                className="relative"
              >
                {/* Wheel glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-3xl opacity-40"
                  animate={{
                    scale: mustSpin ? [1, 1.2, 1] : 1,
                    opacity: mustSpin ? [0.4, 0.7, 0.4] : 0.4
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ 
                    width: '350px', 
                    height: '350px',
                    marginLeft: '-25px',
                    marginTop: '-25px'
                  }}
                />
                
                {/* The wheel component */}
                {wheelData.length > 0 && (
                  <div className="wheel-wrapper">
                    <Wheel
                      mustStartSpinning={mustSpin}
                      prizeNumber={prizeNumber}
                      data={wheelData}
                      onStopSpinning={handleStopSpinning}
                      backgroundColors={['#FFD700', '#FF1493']}
                      textColors={['#ffffff']}
                      fontSize={16}
                      outerBorderColor="#FFD700"
                      outerBorderWidth={5}
                      innerRadius={30}
                      innerBorderColor="#FFD700"
                      innerBorderWidth={3}
                      radiusLineColor="#FFD700"
                      radiusLineWidth={2}
                      perpendicularText
                      textDistance={65}
                    />
                  </div>
                )}
              </motion.div>

              {/* Spin Button */}
              <motion.button
                onClick={handleSpinClick}
                disabled={mustSpin || wheelData.length === 0}
                className={`
                  px-12 py-4 rounded-full text-2xl font-bold
                  bg-gradient-to-r from-yellow-500 to-orange-500
                  text-black border-4 border-white
                  shadow-lg transform transition-all duration-200
                  ${mustSpin ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'}
                `}
                whileHover={!mustSpin ? { scale: 1.05 } : {}}
                whileTap={!mustSpin ? { scale: 0.95 } : {}}
              >
                {mustSpin ? 'SPINNING...' : 'SPIN TO WIN!'}
              </motion.button>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="text-white/80 text-lg">
                  Spin the wheel to unlock new characters or win tokens!
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Cost: {SPIN_COST} tokens per spin
                </p>
              </motion.div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Character Unlock Modal */}
      <CharacterUnlockModal
        isOpen={showUnlockModal}
        onClose={() => {
          setShowUnlockModal(false);
          // Reset for next spin
          const newSegments = getWheelSegments(unlockedCharacters);
          setSegments(newSegments);
          const data: WheelData[] = newSegments.map(seg => ({
            option: seg.segmentText,
            style: {
              backgroundColor: seg.segColor,
              textColor: '#ffffff'
            }
          }));
          setWheelData(data);
        }}
        character={wonCharacter}
        isNewUnlock={isNewUnlock}
        tokenReward={tokenReward}
      />
    </>
  );
}