import { ReactNode, useState } from 'react';
import Logo from '../components/Logo';
import { useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import SettingsModal from '../components/SettingsModal';

interface MainLayoutProps {
  children: ReactNode;
  background?: ReactNode;
}

const MainLayout = ({ children, background }: MainLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background container - positioned absolutely to fill the entire screen */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {background}
      </div>
      
      {/* Header with logo - hidden on home page */}
      {!isHomePage && (
        <header className="absolute top-0 left-0 w-full z-50 p-4">
          <div className="flex items-center justify-between">
            <Logo size="large" className="drop-shadow-lg ml-4" />
            
            {/* Settings button */}
            <button 
              onClick={() => setIsSettingsOpen(true)} 
              className="mr-4 p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm text-white shadow-lg"
              aria-label="Settings"
            >
              <FiSettings size={24} />
            </button>
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className="relative z-10 min-h-screen w-full">
        {children}
      </main>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;
