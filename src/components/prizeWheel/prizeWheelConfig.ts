import characters from '@/config/characters';

export interface WheelSegment {
  segmentText: string;
  segColor: string;
  characterId?: string;
  isSpecial?: boolean;
}

// Casino-style colors for the wheel
const WHEEL_COLORS = {
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  purple: '#9B59B6',
  blue: '#3498DB',
  green: '#2ECC71',
  red: '#E74C3C',
  orange: '#E67E22',
  special: '#FF1493', // Hot pink for special segments
  jackpot: '#FFD700'  // Gold for jackpot
};

// Get random characters for the wheel (mix of locked and unlocked)
export function getWheelSegments(unlockedCharacters: string[]): WheelSegment[] {
  const allCharacterIds = Object.keys(characters);
  const lockedCharacters = allCharacterIds.filter(id => !unlockedCharacters.includes(id));
  
  // Create segments array with a good mix
  const segments: WheelSegment[] = [];
  
  // Add some locked characters (potential wins)
  const selectedLocked = lockedCharacters.slice(0, Math.min(5, lockedCharacters.length));
  selectedLocked.forEach((charId, index) => {
    const char = characters[charId];
    segments.push({
      segmentText: char.name,
      segColor: Object.values(WHEEL_COLORS)[index % Object.values(WHEEL_COLORS).length],
      characterId: charId
    });
  });
  
  // Add token rewards
  segments.push({
    segmentText: '+50 Tokens',
    segColor: WHEEL_COLORS.gold,
    isSpecial: true
  });
  
  segments.push({
    segmentText: '+25 Tokens',
    segColor: WHEEL_COLORS.silver,
    isSpecial: true
  });
  
  // Add "Try Again" segments
  segments.push({
    segmentText: 'Try Again',
    segColor: WHEEL_COLORS.blue
  });
  
  // If we need more segments, add more token rewards
  while (segments.length < 8) {
    segments.push({
      segmentText: '+10 Tokens',
      segColor: WHEEL_COLORS.bronze,
      isSpecial: true
    });
  }
  
  // Shuffle the segments for randomness
  return segments.sort(() => Math.random() - 0.5);
}

export const wheelConfig = {
  oneTurn: 360,
  upDuration: 100,  // Fast start
  downDuration: 600, // Slower stop for suspense
  fontFamily: 'Arial',
  fontSize: '1.2em',
  outlineWidth: 4,
  primaryColor: '#FFD700',
  secondaryColor: '#C0C0C0',
  buttonText: 'SPIN',
  isOnlyOnce: false,
  size: 300,
  lineWidth: 5,
  lineColor: '#FFFFFF'
};