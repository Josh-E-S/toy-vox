// Character data configuration for ToyVox

export interface Character {
  id: string;
  name: string;
  color: string;
  secondaryColor: string;
  personality: string;
  greeting: string;
  background?: {
    type: 'color' | 'image' | 'video' | 'animated-webp' | 'gif' | 'slideshow';
    src?: string;
    fallbackSrc?: string;
    overlay?: boolean; // Whether to overlay on the color background or replace it
    // For slideshow type
    slides?: {
      src: string;
      type?: 'image' | 'gif' | 'animated-webp';
    }[];
    transitionDuration?: number; // Duration of fade transition in seconds
    slideDuration?: number; // How long each slide is shown in seconds
  };
}

export type Characters = Record<string, Character>;

const characters: Characters = {
  'chungy001': {
    id: 'chungy001',
    name: 'General Chungus',
    color: '#2c4672',
    secondaryColor: '#1e324f',
    personality: 'Brave, funny, adventurous',
    greeting: "Hey there, young adventurer! General Chungus at your service!",
    background: {
      type: 'slideshow',
      overlay: false,
      transitionDuration: 1.5, // 1.5 second fade transition
      slideDuration: 8, // Each slide shows for 8 seconds
      slides: [
        { src: '/assets/characters/chungy001/background.gif', type: 'gif' },
        { src: '/assets/characters/chungy001/background2.gif', type: 'gif' },
        { src: '/assets/characters/chungy001/background3.gif', type: 'gif' }
      ]
    }
  },
  'sonic001': {
    id: 'sonic001',
    name: 'Sonic',
    color: '#0066cc',
    secondaryColor: '#003366',
    personality: 'Fast, confident, heroic',
    greeting: "Hey there! I'm Sonic - the fastest thing alive! What's up?",
    background: {
      type: 'animated-webp',
      src: '/assets/characters/sonic001/background.webp',
      fallbackSrc: '/assets/characters/sonic001/background.gif',
      overlay: false
    }
  },
  'shadow001': {
    id: 'shadow001',
    name: 'Shadow',
    color: '#990000',
    secondaryColor: '#330000',
    personality: 'Mysterious, determined, powerful',
    greeting: "I am Shadow, the Ultimate Life Form. What do you want?",
    background: {
      type: 'image',
      src: '/assets/characters/shadow001/background.png',
      overlay: true
    }
  },
  'sponge001': {
    id: 'sponge001',
    name: 'SpongeBob',
    color: '#ffcc00',
    secondaryColor: '#ff9900',
    personality: 'Cheerful, optimistic, energetic',
    greeting: "I'm ready! I'm ready! Hi, I'm SpongeBob SquarePants!",
    background: {
      type: 'gif',
      src: '/assets/characters/sponge001/background.gif',
      overlay: false
    }
  }
};

export default characters;
