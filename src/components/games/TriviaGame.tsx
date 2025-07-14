import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader } from '@heroui/modal';
import { Card, CardBody } from '@heroui/card';
import { Progress } from '@heroui/progress';
import { Button } from '@heroui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoxTokens } from '@/context/VoxTokenContext';
import { GameQuestion, TriviaGameState, GameReward } from '@/types/games';
import { getRandomQuestions } from '@/data/triviaQuestions';
import { soundService } from '@/services/soundService';
import ConfettiExplosion from 'react-confetti-explosion';
import { IoClose, IoTimer, IoTrophy } from 'react-icons/io5';
import { FaCoins } from 'react-icons/fa';

interface TriviaGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTION_TIME = 20; // seconds per question
const BASE_REWARD = 10; // base tokens per correct answer
const STREAK_MULTIPLIER = 0.5; // bonus per streak
const TIME_BONUS_MULTIPLIER = 0.1; // bonus for quick answers

export function TriviaGame({ isOpen, onClose }: TriviaGameProps) {
  const { addTokens } = useVoxTokens();
  const [gameState, setGameState] = useState<TriviaGameState>({
    currentQuestion: null,
    questionNumber: 0,
    totalQuestions: 10,
    timeRemaining: QUESTION_TIME,
    selectedAnswer: null,
    isAnswered: false,
    score: 0,
    streak: 0,
    gameStatus: 'ready'
  });
  
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reward, setReward] = useState<GameReward | null>(null);

  // Initialize game
  useEffect(() => {
    if (isOpen && gameState.gameStatus === 'ready') {
      const newQuestions = getRandomQuestions(10);
      setQuestions(newQuestions);
      setGameState(prev => ({
        ...prev,
        currentQuestion: newQuestions[0],
        questionNumber: 1,
        gameStatus: 'playing'
      }));
    }
  }, [isOpen, gameState.gameStatus]);

  // Timer logic
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && !gameState.isAnswered && gameState.timeRemaining > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);

      return () => clearTimeout(timer);
    } else if (gameState.timeRemaining === 0 && !gameState.isAnswered) {
      handleTimeUp();
    }
  }, [gameState.timeRemaining, gameState.isAnswered, gameState.gameStatus]);

  const handleTimeUp = () => {
    setGameState(prev => ({
      ...prev,
      isAnswered: true,
      streak: 0 // Reset streak on timeout
    }));
    soundService.playSound('error');
    setShowResult(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState.isAnswered || !gameState.currentQuestion) return;

    const isCorrect = answerIndex === gameState.currentQuestion.correctAnswer;
    
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0
    }));

    soundService.playSound(isCorrect ? 'success' : 'error');
    setShowResult(true);
  };

  const calculateReward = (): GameReward => {
    const correctAnswers = gameState.score;
    const baseTokens = correctAnswers * BASE_REWARD;
    const streakBonus = Math.floor(gameState.streak * STREAK_MULTIPLIER * BASE_REWARD);
    const timeBonus = Math.floor(gameState.timeRemaining * TIME_BONUS_MULTIPLIER * BASE_REWARD);
    
    const totalTokens = baseTokens + streakBonus + timeBonus;
    
    return {
      tokens: totalTokens,
      bonusMultiplier: 1 + (gameState.streak * 0.1),
      message: `Great job! You earned ${totalTokens} tokens!`,
      animation: totalTokens > 100 ? 'confetti' : 'sparkles'
    };
  };

  const nextQuestion = () => {
    const nextIndex = gameState.questionNumber;
    
    if (nextIndex < questions.length) {
      setGameState(prev => ({
        ...prev,
        currentQuestion: questions[nextIndex],
        questionNumber: nextIndex + 1,
        timeRemaining: QUESTION_TIME,
        selectedAnswer: null,
        isAnswered: false
      }));
      setShowResult(false);
    } else {
      // Game finished
      finishGame();
    }
  };

  const finishGame = () => {
    const finalReward = calculateReward();
    setReward(finalReward);
    addTokens(finalReward.tokens);
    setGameState(prev => ({ ...prev, gameStatus: 'finished' }));
    
    if (finalReward.tokens > 50) {
      setShowConfetti(true);
      soundService.playSound('celebration');
    } else {
      soundService.playSound('coins');
    }
  };

  const resetGame = () => {
    setGameState({
      currentQuestion: null,
      questionNumber: 0,
      totalQuestions: 10,
      timeRemaining: QUESTION_TIME,
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      streak: 0,
      gameStatus: 'ready'
    });
    setQuestions([]);
    setShowResult(false);
    setShowConfetti(false);
    setReward(null);
  };

  const handleClose = () => {
    resetGame();
    onClose();
  };

  const renderGameContent = () => {
    if (gameState.gameStatus === 'finished' && reward) {
      return (
        <div className="text-center space-y-6 py-8">
          {showConfetti && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <ConfettiExplosion
                force={0.6}
                duration={3000}
                particleCount={80}
                width={1200}
                colors={['#FFD700', '#FF69B4', '#00CED1', '#32CD32']}
              />
            </div>
          )}
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <IoTrophy className="text-6xl text-yellow-400 mx-auto mb-4" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white">Game Complete!</h2>
          
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-xl text-white">
                Score: {gameState.score}/{gameState.totalQuestions}
              </p>
              <p className="text-lg text-white/80">
                Best Streak: {gameState.streak}
              </p>
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-6"
            >
              <div className="flex items-center justify-center gap-3">
                <FaCoins className="text-3xl text-yellow-400" />
                <span className="text-3xl font-bold text-yellow-400">+{reward.tokens}</span>
                <span className="text-xl text-yellow-300">Tokens</span>
              </div>
              <p className="text-white/80 mt-2">{reward.message}</p>
            </motion.div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onPress={() => {
                resetGame();
                setGameState(prev => ({ ...prev, gameStatus: 'ready' }));
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
            >
              Play Again
            </Button>
            <Button
              size="lg"
              variant="bordered"
              onPress={handleClose}
              className="border-white/30 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      );
    }

    if (!gameState.currentQuestion) return null;

    return (
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/70">
            <span>Question {gameState.questionNumber} of {gameState.totalQuestions}</span>
            <span>Score: {gameState.score}</span>
          </div>
          <Progress 
            value={(gameState.questionNumber / gameState.totalQuestions) * 100}
            className="h-2"
            color="success"
          />
        </div>

        {/* Timer and Streak */}
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            animate={{ scale: gameState.timeRemaining <= 5 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: gameState.timeRemaining <= 5 ? Infinity : 0 }}
          >
            <IoTimer className={`text-2xl ${gameState.timeRemaining <= 5 ? 'text-red-400' : 'text-white'}`} />
            <span className={`text-xl font-bold ${gameState.timeRemaining <= 5 ? 'text-red-400' : 'text-white'}`}>
              {gameState.timeRemaining}s
            </span>
          </motion.div>
          
          {gameState.streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-3 py-1 rounded-full"
            >
              <span className="text-orange-400">🔥</span>
              <span className="text-white font-bold">{gameState.streak} Streak!</span>
            </motion.div>
          )}
        </div>

        {/* Question */}
        <Card className="bg-white/10 backdrop-blur border border-white/20">
          <CardBody className="p-6">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              {gameState.currentQuestion.question}
            </h3>
            
            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-4">
              {gameState.currentQuestion.options.map((option, index) => {
                const isSelected = gameState.selectedAnswer === index;
                const isCorrect = index === gameState.currentQuestion!.correctAnswer;
                const showCorrect = gameState.isAnswered && isCorrect;
                const showWrong = gameState.isAnswered && isSelected && !isCorrect;
                
                return (
                  <motion.div
                    key={index}
                    whileHover={!gameState.isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!gameState.isAnswered ? { scale: 0.98 } : {}}
                  >
                    <Card
                      isPressable={!gameState.isAnswered}
                      onPress={() => handleAnswerSelect(index)}
                      className={`
                        p-4 cursor-pointer transition-all duration-300
                        ${!gameState.isAnswered ? 'bg-default-100 hover:bg-default-200' : ''}
                        ${showCorrect ? 'bg-green-500/30 border-2 border-green-500' : ''}
                        ${showWrong ? 'bg-red-500/30 border-2 border-red-500' : ''}
                        ${!showCorrect && !showWrong && gameState.isAnswered ? 'opacity-50' : ''}
                      `}
                    >
                      <CardBody className="flex flex-row items-center gap-4 p-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                          {showCorrect && <span className="text-green-400">✓</span>}
                          {showWrong && <span className="text-red-400">✗</span>}
                          {!gameState.isAnswered && <span className="text-white">{String.fromCharCode(65 + index)}</span>}
                        </div>
                        <p className="text-lg text-white">{option}</p>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Next Button */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <Button
                  size="lg"
                  onPress={nextQuestion}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                >
                  {gameState.questionNumber < gameState.totalQuestions ? 'Next Question' : 'See Results'}
                </Button>
              </motion.div>
            )}
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="3xl"
      backdrop="blur"
      hideCloseButton
      classNames={{
        base: "bg-black/95 border border-white/20",
        body: "p-0"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Trivia Challenge
          </h2>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <IoClose size={24} />
          </button>
        </ModalHeader>
        
        <ModalBody className="p-6">
          <AnimatePresence mode="wait">
            {renderGameContent()}
          </AnimatePresence>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}