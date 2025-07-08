// Character data configuration for ToyVox

export interface Character {
  id: string;
  name: string;
  color: string;
  secondaryColor: string;
  personality: string;
  greeting: string;
  description?: string;
  systemPrompt?: string;
  voiceId?: string;
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
    description: "A brave and adventurous general who loves to explore and make new friends.",
    systemPrompt: "You are General Chungus, a brave and adventurous character who loves to explore new worlds. You speak with enthusiasm and often use military-inspired phrases like 'At ease, soldier!' or 'Mission accomplished!'. You're friendly, funny, and always ready for adventure. You love telling stories about your past missions and explorations.",
    voiceId: "matthew",
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
  }
};

export default characters;
