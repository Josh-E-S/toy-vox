import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
}

const LoadingSpinner = ({ size = 'medium', color, message }: LoadingSpinnerProps) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className={`${sizes[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`absolute inset-0 rounded-full border-4 border-t-transparent`}
          style={{
            borderColor: color ? `${color}40` : 'rgba(255, 255, 255, 0.2)',
            borderTopColor: color || 'white'
          }}
        />
      </motion.div>
      {message && (
        <motion.p
          className="text-white text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;