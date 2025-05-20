import React from 'react';
import DynamicBackground from '../components/DynamicBackground';
import { useCharacter } from '../context/CharacterContext';

const HomePage: React.FC = () => {
  const { message } = useCharacter();
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic Background */}
      <DynamicBackground />
      
      {/* Main App UI */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen p-4">
        {/* Status bar */}
        <div className="w-full flex justify-between items-center py-2">
          <div className="text-white text-lg font-semibold opacity-80">ToyVox</div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
          {/* Waiting for toy state */}
          <div className="text-center">
            <div className="animate-pulse mb-6">
              <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                <div className="w-32 h-32 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <div className="text-gray-800">Place Toy Here</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white text-xl">{message}</p>
          </div>
        </div>
        
        {/* Bottom status area - always visible */}
        <div className="w-full py-4">
          <p className="text-white text-center text-sm opacity-60">
            Ready for toy interaction
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
