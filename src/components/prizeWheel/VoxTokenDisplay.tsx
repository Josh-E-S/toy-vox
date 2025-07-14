import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';
import { useVoxTokens } from '@/context/VoxTokenContext';

export function VoxTokenDisplay() {
  const { tokens } = useVoxTokens();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 
                 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <FaCoins className="text-yellow-500 text-xl" />
      </motion.div>
      <span className="text-white font-bold text-lg">
        {tokens.toLocaleString()}
      </span>
      <span className="text-yellow-300 text-sm">Vox Tokens</span>
    </motion.div>
  );
}