import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@heroui/button';
import { HiMenu } from 'react-icons/hi';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDrawer from '@/components/layout/SidebarDrawer';
import SettingsModal from '@/components/SettingsModal';
import { Character } from '@/config/characters';
import { FiSettings } from 'react-icons/fi';

interface AppLayoutProps {
  children: React.ReactNode;
  background?: React.ReactNode;
  showSettings?: boolean;
}

const AppLayout = ({ children, background, showSettings = true }: AppLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on a character page
  const isCharacterPage = location.pathname.includes('/character/');
  
  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCharacterSelect = (_character: Character) => {
    // Character selection is handled by the sidebar navigation
    setSidebarOpen(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex">
      {/* Background */}
      {background && (
        <div className="absolute inset-0 z-0">
          {background}
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && !isCharacterPage && (
        <div className="relative z-20 h-full">
          <Sidebar 
            onCharacterSelect={handleCharacterSelect}
            onSettingsClick={() => setIsSettingsOpen(true)}
          />
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <SidebarDrawer
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onCharacterSelect={handleCharacterSelect}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 relative z-10 flex flex-col overflow-hidden">
        {/* Header for mobile */}
        {isMobile && !isCharacterPage && (
          <header className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              className="bg-white/10 text-white"
              onPress={() => setSidebarOpen(true)}
            >
              <HiMenu size={20} />
            </Button>
            
            <h1 className="text-xl font-bold text-white">🎭 ToyVox</h1>
            
            {showSettings && (
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                className="bg-white/10 text-white"
                onPress={() => setIsSettingsOpen(true)}
              >
                <FiSettings size={18} />
              </Button>
            )}
          </header>
        )}

        {/* Desktop settings button removed - now in sidebar */}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default AppLayout;