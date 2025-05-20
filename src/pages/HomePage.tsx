import React from 'react';
import DynamicBackground from '../components/DynamicBackground';
import { useCharacter } from '../context/CharacterContext';
import Logo from '../components/Logo';
import MainLayout from '../layouts/MainLayout';

const HomePage: React.FC = () => {
  const { message } = useCharacter();
  
  return (
    <MainLayout 
      background={<DynamicBackground type="particles" intensity="high" />}
    >
      {/* Main App UI */}
      <div className="flex flex-col items-center min-h-screen p-4">
        {/* Top spacer */}
        <div className="flex-none w-full py-5">
          {/* Logo section */}
          <div className="w-full flex justify-center items-center mt-10">
            <Logo size="Xlarge" className="drop-shadow-lg" />
          </div>
        </div>
        
        {/* Center content - positioned higher */}
        <div className="flex-1 flex items-start justify-center w-full mt-10">
          {/* Waiting for toy state */}
          <div className="text-center">
            <div className="animate-pulse mb-6">
              <div className="w-56 h-56 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                <div className="w-44 h-44 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <div className="text-gray-800 text-lg font-medium">Place Toy Here</div>
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
    </MainLayout>
  );
};

export default HomePage;
