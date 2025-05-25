import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'Xlarge';
  className?: string;
}

const Logo = ({ size = 'medium', className = '' }: LogoProps) => {
  const sizeClasses = {
    small: 'h-10',
    medium: 'h-16',
    large: 'h-24',
    Xlarge: 'h-56'
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src="https://storage.googleapis.com/toy-vox-public-assets/public-assets/logo.png" 
        alt="ToyVox Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
    </Link>
  );
};

export default Logo;
