import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/button';
import { HiX, HiVolumeUp } from 'react-icons/hi';
import BlurredBackground from '../components/layout/BlurredBackground';
import PageTransition from '../components/layout/PageTransition';
import AudioVisualizer from '../components/AudioVisualizer';
import { useCharacter } from '../context/CharacterContext';
import { useCharacterTheme } from '../hooks/useCharacterTheme';
import characters from '../config/characters';
import vapiService from '../services/vapiService';
import { playSound } from '../services/soundService';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const CharacterPageEnhanced = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const { 
    setCharacter, 
    message, 
    setMessage, 
    status, 
    setStatus,
    audioLevel,
    setAudioLevel
  } = useCharacter();
  
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  
  // Character data
  const characterData = characterId ? characters[characterId] : undefined;
  useCharacterTheme(characterData);
  
  // Initialize character connection
  useEffect(() => {
    if (!characterId || !characterData) {
      navigate('/');
      return;
    }
    
    setStatus('detecting');
    setMessage('Preparing your conversation...');
    
    const connectingTimeout = setTimeout(() => {
      setStatus('connecting');
      setMessage(`Connecting to ${characterData.name}...`);
      
      const callPromise = characterData.voiceId 
        ? vapiService.switchAssistant({
            characterId,
            onVolumeLevel: (volume: number) => {
              setAudioLevel(volume);
            }
          })
        : vapiService.initiateVapiCall({ 
            characterId,
            onVolumeLevel: (volume: number) => {
              setAudioLevel(volume);
            }
          });
      
      callPromise
        .then(response => {
          if (response.success) {
            setCharacter(characterData);
            setStatus('active');
            setMessage(response.message || characterData.greeting);
            playSound('connect');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          } else {
            setMessage(`Error: ${response.error}`);
            setTimeout(() => navigate('/'), 3000);
          }
        })
        .catch(error => {
          setMessage(`Connection error: ${error.message}`);
          setTimeout(() => navigate('/'), 3000);
        });
    }, 1000);
    
    return () => {
      clearTimeout(connectingTimeout);
    };
  }, [characterId, navigate, setCharacter, setMessage, setStatus, setAudioLevel]);

  const handleEndConversation = () => {
    playSound('disconnect');
    vapiService.endVapiCall();
    navigate('/');
  };

  return (
    <PageTransition>
      <BlurredBackground character={characterData} intensity="medium">
        {/* Confetti Effect */}
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.1}
            colors={characterData ? [
              characterData.color, 
              characterData.secondaryColor, 
              '#FFD700', 
              '#FFF'
            ] : ['#FFD700', '#FFF']}
          />
        )}

        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center p-6"
          >
            <Button
              variant="flat"
              className="bg-white/10 backdrop-blur-sm text-white"
              onClick={() => navigate('/')}
            >
              ← Back
            </Button>
            
            {status === 'active' && (
              <Button
                variant="flat"
                color="danger"
                className="bg-red-500/20 backdrop-blur-sm"
                onClick={handleEndConversation}
                startContent={<HiX />}
              >
                End Call
              </Button>
            )}
          </motion.header>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              {(status === 'detecting' || status === 'connecting') ? (
                /* Loading State */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <motion.div
                    layoutId={`character-${characterId}-image`}
                    className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white/20"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <img
                      src={characterData?.background?.slides?.[0]?.src || ''}
                      alt={characterData?.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <motion.h2
                    layoutId={`character-${characterId}-title`}
                    className="text-3xl font-bold text-white mb-4"
                  >
                    {characterData?.name}
                  </motion.h2>
                  
                  <p className="text-white/80 text-lg">
                    {message}
                  </p>
                  
                  {/* Loading dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full bg-white/60"
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : status === 'active' && characterData ? (
                /* Active Conversation */
                <motion.div
                  key="active"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-4xl mx-auto"
                >
                  {/* Character Info Section */}
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      layoutId={`character-${characterId}-image`}
                      className="w-48 h-48 mx-auto mb-4 rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <img
                        src={characterData.background?.slides?.[0]?.src || ''}
                        alt={characterData.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    <motion.h1
                      layoutId={`character-${characterId}-title`}
                      className="text-4xl font-bold text-white mb-2"
                    >
                      {characterData.name}
                    </motion.h1>
                    
                    <p className="text-white/70 text-lg">
                      {characterData.personality}
                    </p>
                  </motion.div>

                  {/* Audio Visualizer Section */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <div className="backdrop-blur-xl bg-black/20 rounded-3xl p-8 shadow-2xl">
                      <AudioVisualizer 
                        character={characterData} 
                        audioLevel={audioLevel} 
                        className="mx-auto"
                        onAudioLevel={setAudioLevel}
                      />
                      
                      {/* Status Indicator */}
                      <div className="flex items-center justify-center mt-6 gap-2">
                        <motion.div
                          animate={{
                            scale: audioLevel > 0 ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            repeat: audioLevel > 0 ? Infinity : 0,
                            duration: 0.5,
                          }}
                        >
                          <HiVolumeUp className="text-white/60" size={24} />
                        </motion.div>
                        <span className="text-white/60">
                          {audioLevel > 0 ? 'Speaking...' : 'Listening...'}
                        </span>
                      </div>
                      
                      {/* Conversation Message */}
                      {message && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center text-white/80 mt-4 text-lg"
                        >
                          "{message}"
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </BlurredBackground>
    </PageTransition>
  );
};

export default CharacterPageEnhanced;