import { Link } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'Xlarge';
  className?: string;
}

const Logo = ({ size = 'medium', className = '' }: LogoProps) => {
  const { handleReset } = useCharacter();
  
  const sizeClasses = {
    small: 'h-10',
    medium: 'h-16',
    large: 'h-24',
    Xlarge: 'h-56'
  };

  // Handle logo click to reset all states
  const handleLogoClick = () => {
    handleReset();
  };

  return (
    <Link 
      to="/" 
      className={`flex items-center ${className}`}
      onClick={handleLogoClick}
    >
      <img 
        src="/assets/logo.png" 
        alt="ToyVox Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
    </Link>
  );
};

export default Logo;
