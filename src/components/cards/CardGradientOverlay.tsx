import { motion } from 'framer-motion';

interface CardGradientOverlayProps {
  primaryColor?: string;
  secondaryColor?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const CardGradientOverlay = ({ 
  primaryColor = '#3B82F6', 
  secondaryColor = '#60A5FA',
  intensity = 'medium' 
}: CardGradientOverlayProps) => {
  
  const opacityMap = {
    low: 0.1,
    medium: 0.2,
    high: 0.3
  };

  return (
    <>
      {/* Animated gradient border glow */}
      <motion.div
        className="absolute inset-0 rounded-large opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40)`,
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Static gradient overlay for depth */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${primaryColor}${Math.floor(opacityMap[intensity] * 255).toString(16)}, transparent 50%)`,
        }}
      />
      
      {/* Bottom gradient for text contrast */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
        }}
      />
    </>
  );
};

export default CardGradientOverlay;