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
    transcript, 
    // We're not manually setting transcript anymore as Vapi handles it
    // setTranscript, 
    audioLevel, 
    setAudioLevel,
    handleReset
  } = useCharacter();

  // Simulate audio levels when listening - with smoother transitions
  useEffect(() => {
    if (isListening) {
      // Use a more stable audio level simulation with less variance
      let currentLevel = 0.3; // Start with a moderate level
      
      const audioSimulation = setInterval(() => {
        // Small random adjustment to current level (max ±0.1)
        const adjustment = (Math.random() * 0.2) - 0.1;
        // Ensure level stays between 0.2 and 0.6 for stability
        currentLevel = Math.max(0.2, Math.min(0.6, currentLevel + adjustment));
        setAudioLevel(currentLevel);
      }, 300); // Slower updates (300ms instead of 100ms)
      
      return () => clearInterval(audioSimulation);
    } else {
      setAudioLevel(0);
    }
  }, [isListening, setAudioLevel]);

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
      
      // Call Vapi API
      vapiService.initiateVapiCall({ characterId })
        .then(response => {
          if (response.success) {
            setCharacter(characterData);
            setStatus('active');
            setMessage(response.message || characterData.greeting);
            vapiService.audioEffects.magic();
            
            // Start listening after brief delay
            setTimeout(() => {
              setIsListening(true);
              setMessage(`Tap to talk with ${characterData.name}`);
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
  }, [characterId, navigate, setCharacter, setMessage, setStatus, setIsListening]);

  // Handle tap to talk
  const handleTapToTalk = () => {
    if (status !== 'active' || !character) return;
    
    if (!isListening) {
      // Start listening - Vapi SDK handles the voice interaction
      setIsListening(true);
      setMessage('Listening...');
      
      // The Vapi SDK will handle the voice interaction automatically
      // We just need to update the UI based on the interaction state
      
      // After a short delay, show the ready message
      // In a real implementation, this would be triggered by Vapi events
      setTimeout(() => {
        setIsListening(false);
        setMessage(`Tap to talk with ${character.name}`);
      }, 10000); // Just a fallback timeout
    } else {
      // Cancel listening
      setIsListening(false);
      setMessage(`Tap to talk with ${character.name}`);
    }
  };

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
      
      {/* Audio Visualizer - shown when character is active */}
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
          <AnimatePresence>
            {status !== 'waiting' && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm"
              >
                Reset
              </motion.button>
            )}
          </AnimatePresence>
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
                
                {/* Character circle - text only version, no colored oval */}
                <div 
                  className="mx-auto mb-6 relative cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  onClick={handleTapToTalk}
                >
                  <div 
                    className="w-48 h-48 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg"
                  >
                    <div 
                      className="text-xl font-medium"
                      style={{ color: character?.color || '#4a90e2' }}
                    >
                      {isListening ? 'Listening...' : 'Tap to Talk'}
                    </div>
                  </div>
                  
                  {/* Small dot indicator for listening state */}
                  {isListening && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                  )}
                </div>
                
                {/* Transcript display */}
                <AnimatePresence>
                  {transcript && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="bg-white bg-opacity-10 p-4 rounded-lg text-white mb-6 max-w-sm mx-auto"
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        "{transcript}"
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
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
              ? `Character: ${character.name} | Personality: ${character.personality}`
              : 'Ready for toy interaction'}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CharacterPage;
