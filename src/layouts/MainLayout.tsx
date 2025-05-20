import { ReactNode } from 'react';
import Logo from '../components/Logo';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
  background?: ReactNode;
}

const MainLayout = ({ children, background }: MainLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background container - positioned absolutely to fill the entire screen */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {background}
      </div>
      
      {/* Header with logo - hidden on home page */}
      {!isHomePage && (
        <header className="absolute top-0 left-0 w-full z-50 p-4">
          <div className="flex items-center">
            <Logo size="large" className="drop-shadow-lg ml-4" />
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className="relative z-10 min-h-screen w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
