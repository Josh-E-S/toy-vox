import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DynamicBackground from '../components/DynamicBackground';
import { useCharacter } from '../context/CharacterContext';
import Logo from '../components/Logo';
import MainLayout from '../layouts/MainLayout';
import { FiSettings } from 'react-icons/fi';
import SettingsModal from '../components/SettingsModal';
import vapiService from '../services/vapiService';

const HomePage = () => {
  const { message: contextMessage } = useCharacter();
  const [currentMessage, setCurrentMessage] = useState(contextMessage);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Array of engaging phrases to cycle through
  const engagingPhrases = [
    'Place a toy on the base to begin',
    'Talk with your toys, not at them',
    'Experience their world through conversation',
    "Ask them the questions you've always wondered about",
    'Every toy has a story waiting to be heard',
    'Bring your imagination to life',
    'Your toys are ready to chat with you',
    'Discover the personalities behind your favorite toys',
    'Connect with your toys in a whole new way'
  ];
  
  // End any active Vapi calls when returning to home page
  useEffect(() => {
    // End call when returning to home to reset state
    vapiService.endVapiCall();
  }, []);

  // Cycle through phrases every 5 seconds
  useEffect(() => {
    let phraseIndex = 0;
    
    // Only cycle phrases when in waiting state (using contextMessage as indicator)
    if (contextMessage === 'Place a toy on the base to begin') {
      const intervalId = setInterval(() => {
        phraseIndex = (phraseIndex + 1) % engagingPhrases.length;
        setCurrentMessage(engagingPhrases[phraseIndex]);
      }, 5000);
      
      return () => clearInterval(intervalId);
    } else {
      // If not in waiting state, use the message from context
      setCurrentMessage(contextMessage);
    }
  }, [contextMessage]);
  
  return (
    <MainLayout 
      background={<DynamicBackground type="particles" intensity="high" />}
    >
      {/* Main App UI */}
      <div className="flex flex-col items-center min-h-screen p-4">
        {/* Top spacer with settings button */}
        <div className="flex-none w-full py-5">
          {/* Settings button - top right */}
          <div className="w-full flex justify-end mb-4">
            <button 
              onClick={() => setIsSettingsOpen(true)} 
              className="mr-4 p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm text-white shadow-lg"
              aria-label="Settings"
            >
              <FiSettings size={24} />
            </button>
          </div>
          
          {/* Logo section */}
          <div className="w-full flex justify-center items-center mt-4">
            <Logo size="Xlarge" className="drop-shadow-lg" />
          </div>
        </div>
        
        {/* Temporary character navigation links for testing - moved up for mobile visibility */}
        <div className="w-full py-6 flex flex-col items-center px-4">
          <h3 className="text-white text-lg sm:text-xl mb-4 text-center">Quick Test Links:</h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link 
              to="/character/chungy001" 
              className="px-3 py-2 sm:px-4 sm:py-2 bg-[#2c4672] text-white text-sm sm:text-base rounded-full hover:opacity-80 transition-opacity"
            >
              General Chungus
            </Link>
            <Link 
              to="/character/sonic001" 
              className="px-3 py-2 sm:px-4 sm:py-2 bg-[#0066cc] text-white text-sm sm:text-base rounded-full hover:opacity-80 transition-opacity"
            >
              Sonic
            </Link>
            <Link 
              to="/character/shadow001" 
              className="px-3 py-2 sm:px-4 sm:py-2 bg-[#990000] text-white text-sm sm:text-base rounded-full hover:opacity-80 transition-opacity"
            >
              Shadow
            </Link>
            <Link 
              to="/character/sponge001" 
              className="px-3 py-2 sm:px-4 sm:py-2 bg-[#ffcc00] text-black text-sm sm:text-base rounded-full hover:opacity-80 transition-opacity"
            >
              SpongeBob
            </Link>
          </div>
        </div>

        {/* Center content - positioned higher */}
        <div className="flex-1 flex items-start justify-center w-full mt-6">
          {/* Waiting for toy state */}
          <div className="text-center">
            <div className="animate-pulse mb-6">
              <div className="w-64 h-64 sm:w-96 sm:h-96 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                <div className="w-40 h-40 sm:w-60 sm:h-60 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                  <div className="w-28 h-28 sm:w-48 sm:h-48 bg-white rounded-full flex items-center justify-center">
                    <div className="text-gray-800 text-base sm:text-2xl font-medium">Place Toy Here</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white text-base sm:text-2xl px-4">{currentMessage}</p>
          </div>
        </div>
        
        {/* Bottom status area - always visible */}
        <div className="w-full py-4 px-4">
          <p className="text-white text-center text-lg sm:text-2xl opacity-60">
            Ready for toy interaction
          </p>
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
