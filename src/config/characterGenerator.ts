import { Character, CharacterCategory, CharacterMood } from './characterTypes';

// Character category mappings
const categoryMappings: Record<string, CharacterCategory> = {
  // Disney Characters
  'Elsa': 'disney',
  'Olaf': 'disney',
  'Genie': 'disney',
  'Mickey Mouse': 'disney',
  'Minnie Mouse': 'disney',
  'Pinocchio': 'disney',
  'Ursula': 'disney',
  
  // Pixar Characters
  'Woody': 'pixar',
  'Buzz Lightyear': 'pixar',
  'Jessie': 'pixar',
  'Rex': 'pixar',
  'Mr. Incredible': 'pixar',
  'Elastigirl': 'pixar',
  'Dash': 'pixar',
  'Violet': 'pixar',
  'Mike Wazowski': 'pixar',
  'Sulley': 'pixar',
  'Roz': 'pixar',
  'Celia': 'pixar',
  'Randall': 'pixar',
  'Nemo': 'pixar',
  'Dory': 'pixar',
  'Crush': 'pixar',
  'Carl': 'pixar',
  'Russell': 'pixar',
  'Miguel': 'pixar',
  'Hector': 'pixar',
  'Lightning McQueen': 'pixar',
  'Mater': 'pixar',
  'Ember': 'pixar',
  'Wade': 'pixar',
  'Luca': 'pixar',
  'Alberto': 'pixar',
  
  // Game Characters
  'Spider-Man': 'marvel',
  'Venom': 'marvel',
  'Sonic': 'games',
  'Tails': 'games',
  'Knuckles': 'games',
  'Dr. Robotnik': 'games',
  'Shadow': 'games',
  'Mario': 'games',
  'Luigi': 'games',
  'Princess Peach': 'games',
  'Bowser': 'games',
  'Steve': 'games',
  'General Chungus': 'games',
  'Ugly Sonic': 'games',
  
  // Marvel Characters
  'Iron Man': 'marvel',
  'Captain America': 'marvel',
  'Thor': 'marvel',
  'Hulk': 'marvel',
  'Black Panther': 'marvel',
  'Groot': 'marvel',
  'Rocket Raccoon': 'marvel',
  'Deadpool': 'marvel',
  
  // SpongeBob Characters
  'SpongeBob': 'cartoon',
  'Patrick Star': 'cartoon',
  'Squidward': 'cartoon',
  'Mr. Krabs': 'cartoon',
  'Sandy Cheeks': 'cartoon',
  'Plankton': 'cartoon',
  
  // Other Animated Characters
  'Ralph': 'disney',
  'Vanellope': 'disney',
  'Fix-It Felix': 'disney',
  'Gru': 'cartoon',
  'Judy Hopps': 'disney',
  'Nick Wilde': 'disney',
  'Shrek': 'cartoon',
  'Donkey': 'cartoon',
  'Fiona': 'cartoon',
  'Puss in Boots': 'cartoon',
  'Rumpelstiltskin': 'cartoon',
  'Gingy': 'cartoon',
  'Moana': 'disney',
  'Maui': 'disney',
  'Tamatoa': 'disney',
  'Joy': 'pixar',
  'Sadness': 'pixar',
  'Anger': 'pixar',
  'Fear': 'pixar',
  'Disgust': 'pixar',
  'Ernesto de la Cruz': 'pixar',
  'Baymax': 'disney',
  'Po': 'cartoon',
  'Tigress': 'cartoon',
  'Master Shifu': 'cartoon',
  'Master Oogway': 'cartoon',
  'Red': 'games',
  'Chuck': 'games',
  'Bomb': 'games',
  'Winnie the Pooh': 'disney',
  'Tigger': 'disney',
  'Grug': 'cartoon',
  'Eep': 'cartoon',
  'Emmet': 'cartoon',
  'Wyldstyle': 'cartoon',
  'Finn (Adventure Time)': 'cartoon',
  'Jake the Dog (Adventure Time)': 'cartoon',
  'Bluey': 'cartoon',
  'Bingo': 'cartoon',
  'Chilli (Mom)': 'cartoon',
  'Bandit (Dad)': 'cartoon',
  'B.O.B.': 'cartoon',
  'Jiminy Cricket': 'disney',
  'Scooby-Doo': 'cartoon',
  'Shaggy': 'cartoon',
  'Chip': 'disney',
  'Dale': 'disney'
};

// Mood mappings
const moodMappings: Record<string, CharacterMood> = {
  'Joy': 'energetic',
  'Sadness': 'calm',
  'Anger': 'energetic',
  'Fear': 'mysterious',
  'Disgust': 'calm',
  'Tigger': 'energetic',
  'Winnie the Pooh': 'calm',
  'Master Oogway': 'calm',
  'Shadow': 'mysterious',
  'Venom': 'mysterious',
  'Ursula': 'mysterious',
  'Randall': 'mysterious',
  'Bowser': 'energetic',
  'Hulk': 'energetic',
  'Sonic': 'energetic',
  'Dash': 'energetic',
  'Rocket Raccoon': 'energetic',
  'Deadpool': 'playful',
  'SpongeBob': 'playful',
  'Patrick Star': 'playful',
  'Olaf': 'playful',
  'Donkey': 'playful',
  'Genie': 'playful'
};

// Color schemes
const colorSchemes: Record<string, { primary: string; secondary: string }> = {
  // Disney
  'Elsa': { primary: '#4A90E2', secondary: '#2E5C8A' },
  'Olaf': { primary: '#FF8C42', secondary: '#CC6633' },
  'Genie': { primary: '#4B9BFF', secondary: '#2E5C8A' },
  'Mickey Mouse': { primary: '#FF0000', secondary: '#CC0000' },
  'Minnie Mouse': { primary: '#FF69B4', secondary: '#CC5490' },
  'Pinocchio': { primary: '#8B4513', secondary: '#654321' },
  'Ursula': { primary: '#6B3AA0', secondary: '#4B2870' },
  
  // Pixar
  'Woody': { primary: '#8B4513', secondary: '#654321' },
  'Buzz Lightyear': { primary: '#228B22', secondary: '#165816' },
  'Jessie': { primary: '#DC143C', secondary: '#A01028' },
  'Rex': { primary: '#228B22', secondary: '#165816' },
  'Mr. Incredible': { primary: '#FF0000', secondary: '#CC0000' },
  'Elastigirl': { primary: '#FF6347', secondary: '#CC5038' },
  'Dash': { primary: '#FF4500', secondary: '#CC3700' },
  'Violet': { primary: '#8B008B', secondary: '#5D005D' },
  'Mike Wazowski': { primary: '#00FF00', secondary: '#00CC00' },
  'Sulley': { primary: '#00CED1', secondary: '#008B8C' },
  'Nemo': { primary: '#FF6347', secondary: '#CC5038' },
  'Dory': { primary: '#1E90FF', secondary: '#1870CC' },
  'Lightning McQueen': { primary: '#FF0000', secondary: '#CC0000' },
  'Mater': { primary: '#8B4513', secondary: '#654321' },
  
  // Marvel
  'Spider-Man': { primary: '#FF0000', secondary: '#CC0000' },
  'Iron Man': { primary: '#FFD700', secondary: '#B8860B' },
  'Captain America': { primary: '#4169E1', secondary: '#3457B8' },
  'Thor': { primary: '#DC143C', secondary: '#A01028' },
  'Hulk': { primary: '#00FF00', secondary: '#00CC00' },
  'Black Panther': { primary: '#4B0082', secondary: '#360062' },
  'Groot': { primary: '#8B4513', secondary: '#654321' },
  'Venom': { primary: '#000000', secondary: '#333333' },
  'Deadpool': { primary: '#DC143C', secondary: '#A01028' },
  
  // Games
  'Sonic': { primary: '#0066CC', secondary: '#003366' },
  'Tails': { primary: '#FFA500', secondary: '#CC8400' },
  'Knuckles': { primary: '#FF0000', secondary: '#CC0000' },
  'Shadow': { primary: '#000000', secondary: '#333333' },
  'Mario': { primary: '#FF0000', secondary: '#CC0000' },
  'Luigi': { primary: '#00FF00', secondary: '#00CC00' },
  'Princess Peach': { primary: '#FFB6C1', secondary: '#CC92A1' },
  'Bowser': { primary: '#228B22', secondary: '#165816' },
  
  // SpongeBob
  'SpongeBob': { primary: '#FFFF00', secondary: '#CCCC00' },
  'Patrick Star': { primary: '#FF69B4', secondary: '#CC5490' },
  'Squidward': { primary: '#00CED1', secondary: '#008B8C' },
  'Sandy Cheeks': { primary: '#8B4513', secondary: '#654321' },
  'Mr. Krabs': { primary: '#FF0000', secondary: '#CC0000' },
  'Plankton': { primary: '#228B22', secondary: '#165816' },
  
  // Default
  'default': { primary: '#6B46C1', secondary: '#553594' }
};

// Personality templates
const personalityTemplates: Record<string, string> = {
  'hero': 'Brave, courageous, protective',
  'villain': 'Cunning, ambitious, powerful',
  'sidekick': 'Loyal, funny, supportive',
  'princess': 'Kind, graceful, adventurous',
  'comic': 'Funny, energetic, entertaining',
  'wise': 'Thoughtful, patient, knowledgeable',
  'adventurer': 'Curious, brave, enthusiastic',
  'animal': 'Playful, friendly, lovable',
  'magical': 'Mysterious, powerful, enchanting'
};

function generateCharacterId(name: string): string {
  // Convert name to lowercase and replace spaces/special chars
  const cleanName = name.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
  return `${cleanName}001`;
}

function generateGreeting(name: string): string {
  const greetings = [
    `Hi there! I'm ${name}!`,
    `Hello! ${name} here!`,
    `Hey! It's me, ${name}!`,
    `Greetings! I'm ${name}!`,
    `Hi! ${name} at your service!`
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function generateDescription(name: string, category: CharacterCategory): string {
  const templates = {
    'heroes': `${name} is a heroic character ready to save the day and embark on amazing adventures!`,
    'fantasy': `${name} brings magic and wonder to every conversation with enchanting stories and mystical powers!`,
    'adventure': `${name} loves exploring new places and going on exciting adventures with friends!`,
    'animals': `${name} is a lovable character who brings joy and friendship to everyone they meet!`,
    'educational': `${name} loves teaching and sharing wisdom through fun and engaging conversations!`,
    'disney': `${name} is a beloved Disney character bringing magic, wonder, and timeless stories to life!`,
    'pixar': `${name} is a Pixar character full of heart, humor, and unforgettable adventures!`,
    'marvel': `${name} is a Marvel superhero ready to protect the world and inspire courage!`,
    'games': `${name} is a video game character bringing excitement and fun from the digital world!`,
    'cartoon': `${name} is an animated character full of laughs, adventures, and cartoon fun!`
  };
  return templates[category] || `${name} is an amazing character ready to be your friend!`;
}

export function generateCharacter(
  name: string,
  voiceId: string = 'matthew',
  existingUrl?: string
): Character {
  const id = generateCharacterId(name);
  const category = categoryMappings[name] || 'adventure';
  const mood = moodMappings[name] || 'playful';
  const colors = colorSchemes[name] || colorSchemes['default'];
  
  // Clean name for URLs (handle special cases)
  let urlName = name.toLowerCase()
    .replace(/\s+/g, '%20')
    .replace(/[()]/g, '');
  
  // Special case handling
  if (name.includes('(')) {
    urlName = name.split('(')[0].trim().toLowerCase().replace(/\s+/g, '%20');
  }
  
  const baseUrl = existingUrl || `https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/${urlName}`;
  
  return {
    id,
    name,
    color: colors.primary,
    secondaryColor: colors.secondary,
    personality: personalityTemplates[category === 'heroes' ? 'hero' : category] || personalityTemplates['adventurer'],
    greeting: generateGreeting(name),
    description: generateDescription(name, category),
    voiceId,
    voiceClip: `${baseUrl}/voice.wav`,
    theme: {
      primary: colors.primary,
      accent: adjustBrightness(colors.primary, 20),
      gradient: {
        from: colors.primary,
        to: colors.secondary,
        angle: 135
      },
      glow: adjustBrightness(colors.primary, 40)
    },
    category,
    mood,
    popularity: Math.floor(Math.random() * 20) + 80, // 80-100
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: `${baseUrl}/background.gif`, type: 'gif' },
        { src: `${baseUrl}/background2.gif`, type: 'gif' },
        { src: `${baseUrl}/background3.gif`, type: 'gif' }
      ]
    }
  };
}

// Helper function to adjust color brightness
function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}