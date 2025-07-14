// Character data configuration for ToyVox
import { Character, CharacterTheme, CharacterCategory, CharacterMood } from './characterTypes';
import allCharacters from './allCharacters';

export type { Character, CharacterTheme, CharacterCategory, CharacterMood };
export type Characters = Record<string, Character>;

// Use the complete character roster
const characters: Characters = allCharacters;

export default characters;

// Re-export helper functions
export { getCharactersByCategory, searchCharacters, characterList } from './allCharacters';