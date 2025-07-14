// Character data configuration for ToyVox
import { Character, CharacterTheme, CharacterCategory, CharacterMood } from './characterTypes';

export type { Character, CharacterTheme, CharacterCategory, CharacterMood };
export type Characters = Record<string, Character>;

const characters: Characters = {
  'chungy001': {
    id: 'chungy001',
    name: 'General Chungus',
    color: '#2c4672',
    secondaryColor: '#1e324f',
    personality: 'Brave, funny, adventurous',
    greeting: "Hey there, young adventurer! General Chungus at your service!",
    description: "A brave and adventurous general who loves to explore and make new friends.",
    systemPrompt: "You are General Chungus, a brave and adventurous character who loves to explore new worlds. You speak with enthusiasm and often use military-inspired phrases like 'At ease, soldier!' or 'Mission accomplished!'. You're friendly, funny, and always ready for adventure. You love telling stories about your past missions and explorations.",
    voiceId: "matthew",
    voiceClip: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/chungus/voice.wav',
    theme: {
      primary: '#2c4672',
      accent: '#3a5a8a',
      gradient: {
        from: '#2c4672',
        to: '#1e324f',
        angle: 135
      },
      glow: '#4a7ec8'
    },
    category: 'adventure',
    mood: 'energetic',
    popularity: 95,
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2, // 1.2 second fade transition
      slideDuration: 2.4, // Each slide shows for 8 seconds
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/chungus/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/chungus/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/chungus/background3.gif', type: 'gif' }
      ]
    }
  },
  'sonic001': {
    id: 'sonic001',
    name: 'Sonic',
    color: '#0066cc',
    secondaryColor: '#003366',
    personality: 'Fast, cocky, heroic',
    greeting: "I'm Sonic! Sonic the Hedgehog!",
    voiceClip: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/sonic/voice.wav',
    theme: {
      primary: '#0066cc',
      accent: '#0099ff',
      gradient: {
        from: '#0066cc',
        to: '#003366',
        angle: 45
      },
      glow: '#33aaff'
    },
    category: 'heroes',
    mood: 'energetic',
    popularity: 100,
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2, // 1.2 second fade transition
      slideDuration: 2.4, // Each slide shows for 8 seconds
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/sonic/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/sonic/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/sonic/background3.gif', type: 'gif' }
      ]
    }
  },
  'shadow001': {
    id: 'shadow001',
    name: 'Shadow',
    color: '#ff0000',
    secondaryColor: '#990000',
    personality: 'Dark, brooding, mysterious',
    greeting: "I am Shadow, the Ultimate Life Form.",
    theme: {
      primary: '#ff0000',
      accent: '#cc0000',
      gradient: {
        from: '#ff0000',
        to: '#660000',
        angle: 180
      },
      glow: '#ff6666'
    },
    category: 'heroes',
    mood: 'mysterious',
    popularity: 90,
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2, // 1.2 second fade transition
      slideDuration: 2.4, // Each slide shows for 8 seconds
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/shadow/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/shadow/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/shadow/background3.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/shadow/background4.gif', type: 'gif' }
      ]
    }
  },
  'sponge001': {
    id: 'sponge001',
    name: 'SpongeBob',
    color: '#ffcc00',
    secondaryColor: '#ff9900',
    personality: 'Cheerful, optimistic, energetic',
    greeting: "I'm ready! I'm ready! Hi, I'm SpongeBob SquarePants!",
    voiceClip: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/spongebob/voice.wav',
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2, // 1.2 second fade transition
      slideDuration: 2.4, // Each slide shows for 8 seconds
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/spongebob/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/spongebob/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/spongebob/background3.gif', type: 'gif' }
      ]
    }
  },
  'shrek001': {
    id: 'shrek001',
    name: 'Shrek',
    color: '#228B22',
    secondaryColor: '#006400',
    personality: 'Grumpy but kindhearted, protective, sarcastic',
    greeting: "What are you doing in my swamp?!",
    voiceClip: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/shrek/voice.wav',
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/shrek/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/shrek/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/shrek/background3.gif', type: 'gif' }
      ]
    }
  },
  'robotnik001': {
    id: 'robotnik001',
    name: 'Dr. Robotnik',
    color: '#FF4500',
    secondaryColor: '#8B0000',
    personality: 'Evil genius, megalomaniac, brilliant inventor',
    greeting: "I am Dr. Robotnik, the greatest scientific genius in the world!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/robotnik/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/robotnik/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/robotnik/background3.gif', type: 'gif' }
      ]
    }
  },
  'tails001': {
    id: 'tails001',
    name: 'Tails',
    color: '#FFA500',
    secondaryColor: '#FF8C00',
    personality: 'Smart, loyal, inventive, shy but brave',
    greeting: "Hi! I'm Tails! Want to see what I'm building?",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/tails/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/tails/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/tails/background3.gif', type: 'gif' }
      ]
    }
  },
  'patrick001': {
    id: 'patrick001',
    name: 'Patrick Star',
    color: '#FFB6C1',
    secondaryColor: '#FF69B4',
    personality: 'Simple-minded, loyal, silly, carefree',
    greeting: "Hi, I'm Patrick Star! Is mayonnaise an instrument?",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/patrick/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/patrick/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/patrick/background3.gif', type: 'gif' }
      ]
    }
  },
  'woody001': {
    id: 'woody001',
    name: 'Woody',
    color: '#8B4513',
    secondaryColor: '#654321',
    personality: 'Loyal, brave, leader, protective of friends',
    greeting: "Howdy, partner! There's a snake in my boot!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/woody/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/woody/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/woody/background3.gif', type: 'gif' }
      ]
    }
  },
  'buzz001': {
    id: 'buzz001',
    name: 'Buzz Lightyear',
    color: '#00FF00',
    secondaryColor: '#800080',
    personality: 'Heroic, brave, space ranger, determined',
    greeting: "To infinity and beyond! I'm Buzz Lightyear, Space Ranger!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/buzzlightyear/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/buzzlightyear/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/buzzlightyear/background3.gif', type: 'gif' }
      ]
    }
  },
  'po001': {
    id: 'po001',
    name: 'Po (Kung Fu Panda)',
    color: '#000000',
    secondaryColor: '#FFA500',
    personality: 'Enthusiastic, clumsy, food-loving, determined',
    greeting: "Skadoosh! I'm Po, the Dragon Warrior!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/po/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/po/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/po/background3.gif', type: 'gif' }
      ]
    }
  },
  'ralph001': {
    id: 'ralph001',
    name: 'Wreck-It Ralph',
    color: '#8B0000',
    secondaryColor: '#D2691E',
    personality: 'Strong, kind-hearted, misunderstood, loyal',
    greeting: "I'm bad, and that's good! I'm Wreck-It Ralph!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/wreckitralph/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/wreckitralph/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/wreckitralph/background3.gif', type: 'gif' }
      ]
    }
  },
  'vanellope001': {
    id: 'vanellope001',
    name: 'Vanellope',
    color: '#40E0D0',
    secondaryColor: '#FF1493',
    personality: 'Energetic, mischievous, sweet, glitchy racer',
    greeting: "Hey there, I'm Vanellope von Schweetz, the greatest racer ever!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/vanellope/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/vanellope/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/vanellope/background3.gif', type: 'gif' }
      ]
    }
  },
  'moana001': {
    id: 'moana001',
    name: 'Moana',
    color: '#1E90FF',
    secondaryColor: '#FF6347',
    personality: 'Brave, adventurous, determined, ocean-loving',
    greeting: "I am Moana of Motunui! The ocean chose me!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/moana/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/moana/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/moana/background3.gif', type: 'gif' }
      ]
    }
  },
  'maui001': {
    id: 'maui001',
    name: 'Maui',
    color: '#4B0082',
    secondaryColor: '#FFD700',
    personality: 'Confident, shapeshifter, demigod, charismatic',
    greeting: "What can I say except you're welcome! I'm Maui!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/maui/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/maui/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/maui/background3.gif', type: 'gif' }
      ]
    }
  },
  'red001': {
    id: 'red001',
    name: 'Red (Angry Birds)',
    color: '#DC143C',
    secondaryColor: '#8B0000',
    personality: 'Angry, protective, leader, short-tempered but caring',
    greeting: "I'm Red! Don't make me angry... you wouldn't like me when I'm angry!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2,
      slideDuration: 2.4,
      slides: [
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/red/background.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/red/background2.gif', type: 'gif' },
        { src: 'https://storage.googleapis.com/toy-vox-public-assets/public-assets/characters/red/background3.gif', type: 'gif' }
      ]
    }
  }
};

export default characters;
