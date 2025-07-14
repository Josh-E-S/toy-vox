import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/button';
import { IoSparkles } from 'react-icons/io5';
import { GiCartwheel } from 'react-icons/gi';
import { useVoxTokens, SPIN_COST } from '@/context/VoxTokenContext';

interface PrizeWheelButtonProps {
  onClick: () => void;
}

export function PrizeWheelButton({ onClick }: PrizeWheelButtonProps) {
  const { tokens } = useVoxTokens();
  const [isHovered, setIsHovered] = useState(false);
  const canSpin = tokens >= SPIN_COST;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-xl opacity-50"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.7 : 0.5
        }}
      />
      
      {/* Main button */}
      <Button
        onPress={onClick}
        isDisabled={!canSpin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative z-10 min-w-[160px] h-12
          bg-gradient-to-r from-yellow-500 to-pink-500 
          text-white font-bold text-lg
          border-2 border-white/30
          shadow-lg shadow-yellow-500/30
          ${canSpin ? 'hover:shadow-xl hover:shadow-yellow-500/50' : 'opacity-60'}
          transition-all duration-300
        `}
        startContent={
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 1, ease: "linear" }}
          >
            <GiCartwheel className="text-2xl" />
          </motion.div>
        }
        endContent={
          <motion.div
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <IoSparkles className="text-xl" />
          </motion.div>
        }
      >
        <motion.span
          animate={{ scale: isHovered ? 1.05 : 1 }}
          className="px-2"
        >
          Prize Wheel
        </motion.span>
      </Button>
      
      {/* Cost indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                   text-xs text-white/70 whitespace-nowrap"
      >
        {canSpin ? `${SPIN_COST} tokens per spin` : 'Not enough tokens'}
      </motion.div>
      
      {/* Floating sparkles */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300"
              initial={{ 
                x: Math.random() * 40 - 20,
                y: Math.random() * 40 - 20,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                y: -50,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{ 
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            >
              <IoSparkles className="text-lg" />
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
}