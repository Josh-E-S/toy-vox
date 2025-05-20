interface SparkleEffectProps {
  active: boolean;
}

const SparkleEffect = ({ active }: SparkleEffectProps) => {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-3 h-3 bg-white rounded-full animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 2 + 1}s`
          }}
        />
      ))}
      <style>{`
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }
        .animate-sparkle {
          animation: sparkle 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SparkleEffect;
