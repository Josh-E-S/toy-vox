import { useState } from 'react';
import DynamicBackground from '../components/DynamicBackground';
import characters from '../config/characters';

const SettingsPage = () => {
  const [bgType] = useState<'particles'>('particles');
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [characterIndex, setCharacterIndex] = useState(0);
  
  const charactersList = [
    null,
    ...Object.values(characters)
  ];
  
  const selectedCharacter = charactersList[characterIndex];
  
  return (
    <div className="relative min-h-screen w-full">
      {/* Background component */}
      <DynamicBackground 
        type={bgType} 
        intensity={intensity}
        character={selectedCharacter} 
      />
      
      {/* Controls */}
      <div className="relative z-10 p-4 flex flex-col h-screen">
        <div className="mb-8"></div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-black bg-opacity-30 backdrop-blur-md p-6 rounded-xl text-white max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">App Settings</h2>
            
            <div className="mb-4">
              <label className="block mb-2">Background Type</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  className="p-3 rounded bg-white bg-opacity-30"
                >
                  Particles
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Intensity</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  className={`p-2 rounded ${intensity === 'low' ? 'bg-white bg-opacity-30' : 'bg-black bg-opacity-30'}`}
                  onClick={() => setIntensity('low')}
                >
                  Low
                </button>
                <button 
                  className={`p-2 rounded ${intensity === 'medium' ? 'bg-white bg-opacity-30' : 'bg-black bg-opacity-30'}`}
                  onClick={() => setIntensity('medium')}
                >
                  Medium
                </button>
                <button 
                  className={`p-2 rounded ${intensity === 'high' ? 'bg-white bg-opacity-30' : 'bg-black bg-opacity-30'}`}
                  onClick={() => setIntensity('high')}
                >
                  High
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Character Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {charactersList.map((char, index) => (
                  <button 
                    key={index}
                    className={`p-3 rounded ${characterIndex === index ? 'bg-white bg-opacity-30' : 'bg-black bg-opacity-30'}`}
                    onClick={() => setCharacterIndex(index)}
                    style={{
                      borderLeft: char ? `4px solid ${char.color}` : undefined
                    }}
                  >
                    {char ? char.name : 'Default'}
                  </button>
                ))}
              </div>
            </div>
            
            <p className="mt-6 text-sm opacity-70">
              Adjust the app settings to customize your ToyVox experience.
              Changes will apply to all characters and interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
