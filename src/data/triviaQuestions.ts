import { GameQuestion } from '@/types/games';

export const triviaQuestions: GameQuestion[] = [
  // Character Questions - Easy
  {
    id: 'char_001',
    question: "What color is Sonic the Hedgehog?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: 1,
    category: 'characters',
    difficulty: 'easy',
    characterId: 'sonic001'
  },
  {
    id: 'char_002',
    question: "What is SpongeBob's best friend's name?",
    options: ["Squidward", "Mr. Krabs", "Patrick", "Sandy"],
    correctAnswer: 2,
    category: 'characters',
    difficulty: 'easy',
    characterId: 'spongebob001'
  },
  {
    id: 'char_003',
    question: "What type of animal is Winnie the Pooh?",
    options: ["Tiger", "Rabbit", "Bear", "Pig"],
    correctAnswer: 2,
    category: 'characters',
    difficulty: 'easy',
    characterId: 'winniethepooh001'
  },
  {
    id: 'char_004',
    question: "What is Mario's job?",
    options: ["Chef", "Plumber", "Doctor", "Carpenter"],
    correctAnswer: 1,
    category: 'characters',
    difficulty: 'easy',
    characterId: 'mario001'
  },
  {
    id: 'char_005',
    question: "What color is Hulk when he's angry?",
    options: ["Red", "Blue", "Green", "Purple"],
    correctAnswer: 2,
    category: 'characters',
    difficulty: 'easy',
    characterId: 'hulk001'
  },

  // Movie Questions - Easy
  {
    id: 'movie_001',
    question: "In 'Frozen', what is Elsa's special power?",
    options: ["Fire", "Ice and Snow", "Flying", "Super Strength"],
    correctAnswer: 1,
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: 'movie_002',
    question: "What does 'Hakuna Matata' mean?",
    options: ["Good Morning", "No Worries", "Be Happy", "Hello Friend"],
    correctAnswer: 1,
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: 'movie_003',
    question: "In 'Toy Story', what kind of toy is Woody?",
    options: ["Space Ranger", "Dinosaur", "Cowboy", "Soldier"],
    correctAnswer: 2,
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: 'movie_004',
    question: "What is Shrek?",
    options: ["A Dragon", "An Ogre", "A Giant", "A Troll"],
    correctAnswer: 1,
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: 'movie_005',
    question: "In 'Finding Nemo', what type of fish is Nemo?",
    options: ["Goldfish", "Shark", "Clownfish", "Blue Tang"],
    correctAnswer: 2,
    category: 'movies',
    difficulty: 'easy'
  },

  // General Knowledge - Easy
  {
    id: 'gen_001',
    question: "How many colors are in a rainbow?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    category: 'general',
    difficulty: 'easy'
  },
  {
    id: 'gen_002',
    question: "What do bees make?",
    options: ["Milk", "Honey", "Butter", "Jam"],
    correctAnswer: 1,
    category: 'general',
    difficulty: 'easy'
  },
  {
    id: 'gen_003',
    question: "How many legs does a spider have?",
    options: ["4", "6", "8", "10"],
    correctAnswer: 2,
    category: 'general',
    difficulty: 'easy'
  },

  // Character Questions - Medium
  {
    id: 'char_006',
    question: "What is Iron Man's real name?",
    options: ["Steve Rogers", "Tony Stark", "Bruce Banner", "Peter Parker"],
    correctAnswer: 1,
    category: 'characters',
    difficulty: 'medium',
    characterId: 'ironman001'
  },
  {
    id: 'char_007',
    question: "In 'Inside Out', which emotion is blue?",
    options: ["Joy", "Anger", "Sadness", "Fear"],
    correctAnswer: 2,
    category: 'characters',
    difficulty: 'medium'
  },
  {
    id: 'char_008',
    question: "What is Lightning McQueen's racing number?",
    options: ["1", "43", "86", "95"],
    correctAnswer: 3,
    category: 'characters',
    difficulty: 'medium',
    characterId: 'lightningmcqueen001'
  },
  {
    id: 'char_009',
    question: "Who is Mickey Mouse's girlfriend?",
    options: ["Daisy Duck", "Minnie Mouse", "Clarabelle Cow", "Donald Duck"],
    correctAnswer: 1,
    category: 'characters',
    difficulty: 'medium',
    characterId: 'mickeymouse001'
  },
  {
    id: 'char_010',
    question: "What does Po from Kung Fu Panda love to eat?",
    options: ["Pizza", "Noodles", "Dumplings", "Rice"],
    correctAnswer: 2,
    category: 'characters',
    difficulty: 'medium',
    characterId: 'po001'
  },

  // Movie Questions - Medium
  {
    id: 'movie_006',
    question: "In 'Moana', what ocean creature helps guide her?",
    options: ["A Whale", "A Stingray", "A Dolphin", "A Turtle"],
    correctAnswer: 1,
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: 'movie_007',
    question: "What is the name of the dragon in 'Mulan'?",
    options: ["Sisu", "Mushu", "Toothless", "Smaug"],
    correctAnswer: 1,
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: 'movie_008',
    question: "In 'Wreck-It Ralph', what game does Ralph come from?",
    options: ["Sugar Rush", "Hero's Duty", "Fix-It Felix Jr.", "Street Fighter"],
    correctAnswer: 2,
    category: 'movies',
    difficulty: 'medium'
  },

  // Science & Nature - Medium
  {
    id: 'sci_001',
    question: "What planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    category: 'science',
    difficulty: 'medium'
  },
  {
    id: 'sci_002',
    question: "What do caterpillars turn into?",
    options: ["Bees", "Dragonflies", "Butterflies", "Moths"],
    correctAnswer: 2,
    category: 'nature',
    difficulty: 'medium'
  },

  // Character Questions - Hard
  {
    id: 'char_011',
    question: "What year was Mickey Mouse created?",
    options: ["1923", "1928", "1932", "1937"],
    correctAnswer: 1,
    category: 'characters',
    difficulty: 'hard',
    characterId: 'mickeymouse001'
  },
  {
    id: 'char_012',
    question: "In the Marvel universe, what is Groot's home planet called?",
    options: ["Planet X", "Xandar", "Ego", "Sakaar"],
    correctAnswer: 0,
    category: 'characters',
    difficulty: 'hard',
    characterId: 'groot001'
  },
  {
    id: 'char_013',
    question: "What is the name of Dr. Robotnik's home planet in Sonic?",
    options: ["Mobius", "Earth", "Robotropolis", "He's from Earth"],
    correctAnswer: 3,
    category: 'characters',
    difficulty: 'hard',
    characterId: 'drrobotnik001'
  }
];

// Helper functions
export function getRandomQuestions(count: number, difficulty?: 'easy' | 'medium' | 'hard'): GameQuestion[] {
  let filtered = difficulty 
    ? triviaQuestions.filter(q => q.difficulty === difficulty)
    : triviaQuestions;
  
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuestionsByCategory(category: GameQuestion['category'], count: number): GameQuestion[] {
  const filtered = triviaQuestions.filter(q => q.category === category);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getCharacterQuestions(characterId: string): GameQuestion[] {
  return triviaQuestions.filter(q => q.characterId === characterId);
}