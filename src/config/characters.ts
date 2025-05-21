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
      overlay: true,
      transitionDuration: 1.2, // 1.2 second fade transition
      slideDuration: 2.4, // Each slide shows for 8 seconds
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
    personality: 'Fast, cocky, heroic',
    greeting: "I'm Sonic! Sonic the Hedgehog!",
    background: {
      type: 'slideshow',
      overlay: true,
      transitionDuration: 1.2, // 1.2 second fade transition
      slideDuration: 2.4, // Each slide shows for 8 seconds
      slides: [
        { src: '/assets/characters/sonic001/background.gif', type: 'gif' },
        { src: '/assets/characters/sonic001/background2.gif', type: 'gif' },
        { src: '/assets/characters/sonic001/background3.gif', type: 'gif' }
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
        { src: '/assets/characters/shadow001/background.gif', type: 'gif' },
        { src: '/assets/characters/shadow001/background2.gif', type: 'gif' },
        { src: '/assets/characters/shadow001/background3.gif', type: 'gif' }
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
        { src: '/assets/characters/sponge001/background.gif', type: 'gif' },
        { src: '/assets/characters/sponge001/background2.gif', type: 'gif' },
        { src: '/assets/characters/sponge001/background3.gif', type: 'gif' }
      ]
    }
  }
};

export default characters;
