import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import DynamicBackground from '../components/DynamicBackground';
import SparkleEffect from '../components/SparkleEffect';
import AudioVisualizer from '../components/AudioVisualizer';
import { useCharacter } from '../context/CharacterContext';
import characters from '../config/characters';
import vapiService from '../services/vapiService';

const CharacterPage = () => {
  // Animation controls
  const controls = useAnimation();
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: { when: "afterChildren" }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { y: -20, opacity: 0 }
  };
  
  // Animation variants removed as we no longer need the oval indicator
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const { 
    status, 
    setStatus, 
    character, 
    setCharacter, 
    message, 
    setMessage, 
    isListening, 
    setIsListening, 
    isTalking,
    setIsTalking,
    audioLevel, 
    setAudioLevel
  } = useCharacter();

  // Only use Vapi volume levels for visualizer - no simulation

  // Handle character detection from URL parameter
  useEffect(() => {
    if (!characterId) {
      navigate('/');
      return;
    }

    const characterData = characters[characterId];
    
    if (!characterData) {
      setMessage(`Character with ID ${characterId} not found`);
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    // Start character detection sequence
    setStatus('detecting');
    setMessage(`${characterData.name} detected!`);
    vapiService.audioEffects.detect();
    
    // Simulate connection process
    const connectingTimeout = setTimeout(() => {
      setStatus('connecting');
      setMessage(`Connecting to ${characterData.name}...`);
      vapiService.audioEffects.connect();
      
      // Call Vapi API with event handlers
      vapiService.initiateVapiCall({ 
        characterId,
        onVolumeLevel: (volume: number) => {
          console.log("🎵 Vapi volume level:", volume);
          setAudioLevel(volume);
        },
        onSpeechStart: () => {
          setIsTalking(true);
          setIsListening(false);
        },
        onSpeechEnd: () => {
          setIsTalking(false);
          // When assistant stops talking, go back to listening for user input
          setIsListening(true);
        }
      })
        .then(response => {
          if (response.success) {
            setCharacter(characterData);
            setStatus('active');
            setMessage(response.message || characterData.greeting);
            vapiService.audioEffects.magic();
            
            // Start listening immediately after connection
            setTimeout(() => {
              setIsListening(true);
              setMessage(`Listening for your voice...`);
            }, 3000);
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
    
    // Clean up function to end the Vapi call when navigating away
    return () => {
      clearTimeout(connectingTimeout);
      vapiService.endVapiCall();
    };
  }, [characterId, navigate, setCharacter, setMessage, setStatus, setAudioLevel, setIsTalking]);


  // Start animations when component mounts
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Update animation state based on listening status
  useEffect(() => {
    if (isListening) {
      controls.start('active');
    } else {
      controls.start('inactive');
    }
  }, [isListening, controls]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Character Background */}
      <DynamicBackground character={character} />
      
      {/* Original Orb Audio Visualizer - shown when character is active (as placeholder) */}
      {status === 'active' && character && (
        <AudioVisualizer 
          character={character} 
          audioLevel={audioLevel} 
          className="opacity-80"
        />
      )}
      
      
      {/* Sparkle Effect - only shown during specific states */}
      <SparkleEffect active={status === 'detecting' || status === 'connecting'} />
      
      {/* Main App UI */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-between min-h-screen p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        {/* Status bar */}
        <motion.div 
          className="w-full flex justify-between items-center py-2"
          variants={itemVariants}
        >
          <div className="text-white text-lg font-semibold opacity-0">Spacer</div>
          {/* Settings button moved to MainLayout */}
        </motion.div>
        
        {/* Main content area */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            {status === 'detecting' || status === 'connecting' ? (
              /* Detecting/connecting state */
              <motion.div 
                key="detecting"
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div 
                  className="mb-6 relative"
                  animate={{ 
                    rotate: status === 'connecting' ? [0, 360] : 0 
                  }}
                  transition={{ 
                    repeat: status === 'connecting' ? Infinity : 0,
                    duration: 3,
                    ease: "linear"
                  }}
                >
                  <motion.div 
                    className="w-40 h-40 mx-auto relative"
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        `0 0 10px rgba(255,255,255,0.5)`,
                        `0 0 20px rgba(255,255,255,0.7)`,
                        `0 0 10px rgba(255,255,255,0.5)`
                      ]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut" 
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-full border-4 border-white border-opacity-20 border-t-white" 
                      animate={{ rotate: 360 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "linear" 
                      }}
                    />
                    {status === 'connecting' && <SparkleEffect active={true} />}
                  </motion.div>
                </motion.div>
                <motion.p 
                  className="text-white text-xl"
                  animate={{ 
                    opacity: [0.7, 1, 0.7] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut" 
                  }}
                >
                  {message}
                </motion.p>
              </motion.div>
            ) : status === 'active' && character ? (
              /* Active conversation state */
              <motion.div 
                key="active"
                className="text-center w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.h2 
                  className="text-white text-3xl font-bold mb-6"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {character.name}
                </motion.h2>
                
                
                
                <motion.p 
                  className="text-white text-lg max-w-sm mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {message}
                </motion.p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
        
        {/* Bottom status area - always visible */}
        <motion.div 
          className="w-full py-4"
          variants={itemVariants}
        >
          <motion.p 
            className="text-white text-center text-sm opacity-60"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut" 
            }}
          >
            {status === 'active' && character
              ? `${character.name} | ${isTalking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready'}`
              : 'Ready for toy interaction'}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CharacterPage;
