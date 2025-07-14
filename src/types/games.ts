// Game system types for ToyVox mini-games

export interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  category: 'characters' | 'movies' | 'general' | 'science' | 'nature';
  difficulty: 'easy' | 'medium' | 'hard';
  characterId?: string; // For character-specific questions
}

export interface GameSession {
  gameType: 'trivia' | 'memory' | 'puzzle'; // Extensible for future games
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  tokensEarned: number;
  startTime: Date;
  endTime?: Date;
}

export interface TriviaGameState {
  currentQuestion: GameQuestion | null;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  score: number;
  streak: number;
  gameStatus: 'ready' | 'playing' | 'paused' | 'finished';
}

export interface GameReward {
  tokens: number;
  bonusMultiplier: number;
  message: string;
  animation?: 'confetti' | 'sparkles' | 'coins';
}