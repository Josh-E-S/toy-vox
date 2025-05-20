import React, { ReactNode } from 'react';
import Logo from '../components/Logo';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Header with logo */}
      <header className="absolute top-0 left-0 w-full z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="medium" className="drop-shadow-lg" />
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative min-h-screen w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
