import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Main content */}
      <main className="relative min-h-screen w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
