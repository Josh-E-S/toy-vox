import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DynamicBackground from '../components/DynamicBackground';
import SparkleEffect from '../components/SparkleEffect';
import { useCharacter } from '../context/CharacterContext';
import characters from '../config/characters';
import vapiService from '../services/vapiService';

const CharacterPage: React.FC = () => {
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

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic Background */}
      <DynamicBackground character={character} />
      
      {/* Main App UI */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen p-4">
        {/* Status bar */}
        <div className="w-full flex justify-between items-center py-2">
          <div className="text-white text-lg font-semibold opacity-80">ToyVox</div>
          {status !== 'waiting' && (
            <button 
              onClick={handleReset}
              className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm"
            >
              Reset
            </button>
          )}
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
          {status === 'detecting' || status === 'connecting' ? (
            /* Detecting/connecting state */
            <div className="text-center">
              <div className="mb-6 relative">
                <div className="w-40 h-40 mx-auto relative">
                  <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-20 border-t-white animate-spin" />
                  {status === 'connecting' && <SparkleEffect active={true} />}
                </div>
              </div>
              <p className="text-white text-xl">{message}</p>
            </div>
          ) : status === 'active' && character ? (
            /* Active conversation state */
            <div className="text-center w-full">
              <h2 className="text-white text-3xl font-bold mb-6">{character.name}</h2>
              
              {/* Character circle */}
              <div 
                className="mx-auto mb-6 relative cursor-pointer"
                onClick={handleTapToTalk}
              >
                <div 
                  className={`w-48 h-48 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${isListening ? 'scale-105' : 'scale-100'}`}
                  style={{ 
                    backgroundColor: character.color,
                    boxShadow: `0 0 ${20 + audioLevel * 50}px ${character.color}`
                  }}
                >
                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center">
                    <div 
                      className={`text-xl font-medium transition-all duration-300 ${isListening ? 'scale-110' : 'scale-100'}`}
                      style={{ color: character.color }}
                    >
                      {isListening ? 'Listening...' : 'Tap to Talk'}
                    </div>
                  </div>
                </div>
                
                {/* Audio visualization rings */}
                {isListening && (
                  <>
                    <div 
                      className="absolute top-0 left-0 w-full h-full rounded-full animate-ping opacity-20"
                      style={{ 
                        backgroundColor: character.color,
                        animationDuration: '1s'
                      }}
                    />
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute top-0 left-0 w-full h-full rounded-full opacity-0"
                        style={{ 
                          backgroundColor: character.color,
                          transform: `scale(${1 + ((i + 1) * 0.15)})`,
                          opacity: isListening ? Math.max(0, audioLevel - (i * 0.2)) : 0,
                          transition: 'opacity 0.1s ease-out'
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
              
              {/* Transcript display */}
              {transcript && (
                <div className="bg-white bg-opacity-10 p-4 rounded-lg text-white mb-6 max-w-sm mx-auto">
                  <p>"{transcript}"</p>
                </div>
              )}
              
              <p className="text-white text-lg max-w-sm mx-auto">{message}</p>
            </div>
          ) : null}
        </div>
        
        {/* Bottom status area - always visible */}
        <div className="w-full py-4">
          <p className="text-white text-center text-sm opacity-60">
            {status === 'active' && character
              ? `Character: ${character.name} | Personality: ${character.personality}`
              : 'Ready for toy interaction'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
