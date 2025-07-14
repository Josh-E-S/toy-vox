import characters from '../config/characters';
import { getCharactersByCategory } from '../config/characters';

console.log('=== ToyVox Character Summary ===');
console.log(`Total characters: ${Object.keys(characters).length}`);
console.log('\nCharacters by category:');

const categories = ['disney', 'pixar', 'marvel', 'games', 'cartoon', 'heroes', 'fantasy', 'adventure', 'animals', 'educational'];

categories.forEach(category => {
  const chars = getCharactersByCategory(category);
  if (chars.length > 0) {
    console.log(`${category}: ${chars.length} characters`);
  }
});

console.log('\n=== All Characters ===');
Object.values(characters).forEach(char => {
  console.log(`- ${char.name} (${char.category})`);
});