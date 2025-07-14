import { useState } from 'react';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { HiPuzzle } from 'react-icons/hi';
import { TriviaGame } from './TriviaGame';

export function GamesButton() {
  const [showTrivia, setShowTrivia] = useState(false);

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5, delay: 0.3 }}
      >
        <Button
          onPress={() => setShowTrivia(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold"
          startContent={<HiPuzzle className="text-xl" />}
        >
          Play Games
        </Button>
      </motion.div>

      <TriviaGame 
        isOpen={showTrivia} 
        onClose={() => setShowTrivia(false)} 
      />
    </>
  );
}