// Character data configuration for ToyVox

export interface Character {
  id: string;
  name: string;
  color: string;
  secondaryColor: string;
  personality: string;
  greeting: string;
}

export type Characters = Record<string, Character>;

const characters: Characters = {
  'chungy001': {
    id: 'chungy001',
    name: 'General Chungus',
    color: '#2c4672',
    secondaryColor: '#1e324f',
    personality: 'Brave, funny, adventurous',
    greeting: "Hey there, young adventurer! General Chungus at your service!"
  },
  'spacex001': {
    id: 'spacex001',
    name: 'Cosmic Explorer',
    color: '#6d28d9',
    secondaryColor: '#312e81',
    personality: 'Curious, scientific, wonder-filled',
    greeting: "Greetings, Earth friend! Ready to explore the cosmos together?"
  },
  'octo001': {
    id: 'octo001',
    name: 'Captain Bubbles',
    color: '#0ea5e9',
    secondaryColor: '#0c4a6e',
    personality: 'Playful, kind, imaginative',
    greeting: "Ahoy there! Captain Bubbles ready for underwater adventures!"
  }
};

export default characters;
