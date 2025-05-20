import React, { useState, useEffect, useRef } from 'react';

interface DynamicBackgroundProps {
  character?: {
    color?: string;
    secondaryColor?: string;
    name?: string;
  } | null;
  type?: 'particles';
  intensity?: 'low' | 'medium' | 'high';
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ 
  character, 
  type = 'particles', 
  intensity = 'medium' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);

  // Character-specific settings
  const bgSettings = character ? {
    color: character.secondaryColor || '#1e324f',
    accentColor: character.color || '#2c4672',
  } : {
    color: '#050510', // Very dark background for maximum contrast
    accentColor: '#4a90e2', // Vibrant blue for better visibility
  };

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize animation based on type
  useEffect(() => {
    // Only proceed if we're using the particles type
    if (type !== 'particles') return;
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Determine number of particles based on intensity
    const particleCount = 
      intensity === 'low' ? 40 :
      intensity === 'medium' ? 80 :
      intensity === 'high' ? 150 : 80;
    
    // Initialize particles
    particlesRef.current = Array(particleCount).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 2, // Larger particles
      speedX: (Math.random() - 0.5) * 1.0, // Slightly faster
      speedY: (Math.random() - 0.5) * 1.0, // Slightly faster
      opacity: Math.random() * 0.6 + 0.4, // Higher opacity
      color: Math.random() > 0.5 ? bgSettings.accentColor : bgSettings.color // More accent particles
    }));
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Connect nearby particles with lines
        particlesRef.current.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) { // Increased connection distance
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.4 * (1 - distance / 150); // Increased opacity
            ctx.lineWidth = 1.0; // Thicker lines
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, character, intensity]);

  // Render different background types
  const renderBackground = () => {
    switch (type) {
      case 'particles':
        return (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10"
            style={{ backgroundColor: bgSettings.color }}
          />
        );
      default:
        return (
          <div 
            className="absolute inset-0 -z-10" 
            style={{ backgroundColor: bgSettings.color }}
          />
        );
    }
  };

  return renderBackground();
};

export default DynamicBackground;
