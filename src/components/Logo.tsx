import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-12'
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src="/assets/logo.png" 
        alt="ToyVox Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
    </Link>
  );
};

export default Logo;
