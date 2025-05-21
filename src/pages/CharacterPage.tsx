import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import DynamicBackground from '../components/DynamicBackground';
import SparkleEffect from '../components/SparkleEffect';
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
  
  // Animation variants for pulsing elements
  const audioVisualizationVariants: Variants = {
    inactive: { scale: 1, opacity: 0 },
    active: { 
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.7, 0.3],
      transition: { 
        repeat: Infinity, 
        duration: 2,
        ease: "easeInOut" 
      }
    }
  };
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
    setTranscript, 
    audioLevel, 
    setAudioLevel,
    handleReset
  } = useCharacter();

  // Simulate audio levels when listening
  useEffect(() => {
    if (isListening) {
      const audioSimulation = setInterval(() => {
        setAudioLevel(Math.random() * 0.8);
      }, 100);
      
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
    
    return () => clearTimeout(connectingTimeout);
  }, [characterId, navigate, setCharacter, setMessage, setStatus, setIsListening]);

  // Handle tap to talk
  const handleTapToTalk = () => {
    if (status !== 'active' || !character) return;
    
    if (!isListening) {
      // Start listening
      setIsListening(true);
      setMessage('Listening...');
      
      // Simulate receiving transcript after 3 seconds
      setTimeout(() => {
        const sampleQuestions = [
          "Tell me about your adventures!",
          "What's your favorite game?",
          "Can you tell me a story?",
          "Do you have any friends?"
        ];
        const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
        setTranscript(randomQuestion);
        setIsListening(false);
        
        // Simulate character responding
        setTimeout(() => {
          setMessage(`${character.name} is responding...`);
          
          // Call Vapi API with the transcript
          vapiService.sendMessageToVapi({ 
            characterId: character.id, 
            message: randomQuestion 
          })
            .then(response => {
              if (response.success && response.message) {
                setMessage(response.message);
              } else {
                setMessage(`Error: ${response.error}`);
              }
              setTranscript('');
              
              // Ready for next interaction
              setTimeout(() => {
                setMessage(`Tap to talk with ${character.name}`);
              }, 5000);
            })
            .catch(error => {
              setMessage(`Error: ${error.message}`);
              setTranscript('');
              
              // Ready for next interaction
              setTimeout(() => {
                setMessage(`Tap to talk with ${character.name}`);
              }, 3000);
            });
        }, 500);
      }, 3000);
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
      {/* Dynamic Background */}
      <DynamicBackground 
        key={`bg-${character?.id || 'default'}-${Date.now()}`} 
        character={character} 
      />
      
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
                
                {/* Character circle */}
                <motion.div 
                  className="mx-auto mb-6 relative cursor-pointer"
                  onClick={handleTapToTalk}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div 
                    className="w-48 h-48 rounded-full mx-auto flex items-center justify-center"
                    animate={{
                      scale: isListening ? [1, 1.05, 1] : 1,
                      boxShadow: `0 0 ${20 + audioLevel * 50}px ${character.color}`
                    }}
                    transition={isListening ? { 
                      scale: {
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "easeInOut"
                      }
                    } : {}}
                    style={{ backgroundColor: character.color }}
                  >
                    <motion.div 
                      className="w-40 h-40 bg-white rounded-full flex items-center justify-center"
                      animate={{ scale: isListening ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div 
                        className="text-xl font-medium"
                        animate={{ scale: isListening ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ color: character.color }}
                      >
                        {isListening ? 'Listening...' : 'Tap to Talk'}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Audio visualization rings */}
                  <AnimatePresence>
                    {isListening && (
                      <>
                        <motion.div 
                          initial="inactive"
                          animate="active"
                          exit={{ opacity: 0 }}
                          variants={audioVisualizationVariants}
                          className="absolute top-0 left-0 w-full h-full rounded-full"
                          style={{ backgroundColor: character.color }}
                        />
                        {[...Array(3)].map((_, i) => (
                          <motion.div 
                            key={i}
                            className="absolute top-0 left-0 w-full h-full rounded-full"
                            initial={{ scale: 1 + ((i + 1) * 0.15), opacity: 0 }}
                            animate={{ 
                              opacity: isListening ? Math.max(0, audioLevel - (i * 0.2)) : 0 
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{ backgroundColor: character.color }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
                
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
