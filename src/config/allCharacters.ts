// Complete character roster for ToyVox
import { Character } from './characterTypes';
import { generateCharacter } from './characterGenerator';

// List of all characters from your storage bucket
const characterList = [
  // Disney Characters
  'Elsa',
  'Olaf', 
  'Genie',
  'Mickey Mouse',
  'Minnie Mouse',
  'Pinocchio',
  'Jiminy Cricket',
  'Ursula',
  
  // Pixar Characters
  'Woody',
  'Buzz Lightyear',
  'Jessie',
  'Rex',
  'Mr. Incredible',
  'Elastigirl',
  'Dash',
  'Violet',
  'Mike Wazowski',
  'Sulley',
  'Roz',
  'Celia',
  'Randall',
  'Nemo',
  'Dory',
  'Crush',
  'Carl',
  'Russell',
  'Miguel',
  'Hector',
  'Ernesto de la Cruz',
  'Lightning McQueen',
  'Mater',
  'Ember',
  'Wade',
  'Luca',
  'Alberto',
  
  // Inside Out
  'Joy',
  'Sadness',
  'Anger',
  'Fear',
  'Disgust',
  
  // Marvel Characters
  'Spider-Man',
  'Venom',
  'Iron Man',
  'Captain America',
  'Thor',
  'Hulk',
  'Black Panther',
  'Groot',
  'Rocket Raccoon',
  'Deadpool',
  
  // Sonic Characters
  'Sonic',
  'Tails',
  'Knuckles',
  'Dr. Robotnik',
  'Shadow',
  'Ugly Sonic',
  
  // Mario Characters
  'Mario',
  'Luigi',
  'Princess Peach',
  'Bowser',
  
  // SpongeBob Characters
  'SpongeBob',
  'Patrick Star',
  'Squidward',
  'Mr. Krabs',
  'Sandy Cheeks',
  'Plankton',
  
  // Wreck-It Ralph
  'Ralph',
  'Vanellope',
  'Fix-It Felix',
  
  // Other Animated Characters
  'Gru',
  'Judy Hopps',
  'Nick Wilde',
  'Shrek',
  'Donkey',
  'Fiona',
  'Puss in Boots',
  'Rumpelstiltskin',
  'Gingy',
  'Moana',
  'Maui',
  'Tamatoa',
  'Baymax',
  'Po',
  'Tigress',
  'Master Shifu',
  'Master Oogway',
  'Chip',
  'Dale',
  'Winnie the Pooh',
  'Tigger',
  'Grug',
  'Eep',
  'Emmet',
  'Wyldstyle',
  'Red',
  'Chuck',
  'Bomb',
  'Steve',
  'General Chungus',
  'Finn (Adventure Time)',
  'Jake the Dog (Adventure Time)',
  'Bluey',
  'Bingo',
  'Chilli (Mom)',
  'Bandit (Dad)',
  'B.O.B.',
  'Scooby-Doo',
  'Shaggy'
];

// Type for character dictionary
type Characters = Record<string, Character>;

// Generate all characters
const generatedCharacters: Characters = {};

characterList.forEach(name => {
  const character = generateCharacter(name);
  generatedCharacters[character.id] = character;
});

// Manual overrides for existing characters that need special handling
const characterOverrides: Partial<Characters> = {
  'generalchungus001': {
    ...generatedCharacters['generalchungus001'],
    id: 'chungy001',
    name: 'General Chungus',
    systemPrompt: "You are General Chungus, a brave and adventurous character who loves to explore new worlds. You speak with enthusiasm and often use military-inspired phrases like 'At ease, soldier!' or 'Mission accomplished!'. You're friendly, funny, and always ready for adventure. You love telling stories about your past missions and explorations.",
    voiceClip: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/General%20Chungus/voice.wav',
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/General%20Chungus/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/General%20Chungus/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/General%20Chungus/background3.gif', type: 'gif' }
      ]
    }
  },
  'sonic001': {
    ...generatedCharacters['sonic001'],
    personality: 'Fast, cocky, heroic',
    greeting: "I'm Sonic! Sonic the Hedgehog!",
    systemPrompt: "You are Sonic the Hedgehog, the fastest thing alive! You're confident, heroic, and always ready for action. You love speed, chili dogs, and helping your friends. You often use phrases like 'Gotta go fast!' and 'Way past cool!'. You're competitive but have a good heart.",
    popularity: 100
  },
  'spongebob001': {
    ...generatedCharacters['spongebob001'],
    greeting: "I'm ready! I'm ready! I'm ready!",
    systemPrompt: "You are SpongeBob SquarePants, an optimistic and energetic sea sponge who lives in a pineapple under the sea. You work at the Krusty Krab making Krabby Patties and love jellyfishing with your best friend Patrick. You're always enthusiastic and see the good in everyone.",
    mood: 'energetic'
  },
  'shrek001': {
    ...generatedCharacters['shrek001'],
    greeting: "What are you doing in my swamp?!",
    systemPrompt: "You are Shrek, an ogre who values his privacy but has a heart of gold. You might seem grumpy at first, but you're loyal to your friends and family. You often make references to fairy tale creatures and your swamp. You have a Scottish accent.",
    mood: 'calm'
  }
};

// Merge generated characters with overrides
const allCharacters: Characters = {
  ...generatedCharacters
};

// Apply overrides
Object.entries(characterOverrides).forEach(([id, override]) => {
  if (override) {
    allCharacters[id] = {
      ...allCharacters[id],
      ...override
    } as Character;
  }
});

// Export the complete character list
export default allCharacters;

// Export character list for other uses
export { characterList };

// Helper function to get characters by category
export function getCharactersByCategory(category: string): Character[] {
  return Object.values(allCharacters).filter((char: Character) => char.category === category);
}

// Helper function to search characters
export function searchCharacters(query: string): Character[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(allCharacters).filter((char: Character) => 
    char.name.toLowerCase().includes(lowercaseQuery) ||
    char.personality.toLowerCase().includes(lowercaseQuery) ||
    char.description?.toLowerCase().includes(lowercaseQuery)
  );
}