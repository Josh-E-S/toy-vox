// Extended character types with theme support

export interface CharacterTheme {
  primary: string;
  accent: string;
  gradient: {
    from: string;
    to: string;
    angle?: number;
  };
  glow: string;
}

export type CharacterCategory = 'fantasy' | 'adventure' | 'educational' | 'animals' | 'heroes' | 'games' | 'disney' | 'pixar' | 'marvel' | 'cartoon';
export type CharacterMood = 'playful' | 'calm' | 'energetic' | 'mysterious';

export interface ExtendedCharacter {
  id: string;
  name: string;
  color: string;
  secondaryColor: string;
  personality: string;
  greeting: string;
  description?: string;
  systemPrompt?: string;
  voiceId?: string;
  voiceClip?: string;
  theme?: CharacterTheme;
  category?: CharacterCategory;
  popularity?: number;
  mood?: CharacterMood;
  background?: {
    type: 'color' | 'image' | 'video' | 'animated-webp' | 'gif' | 'slideshow';
    src?: string;
    fallbackSrc?: string;
    overlay?: boolean;
    slides?: {
      src: string;
      type?: 'image' | 'gif' | 'animated-webp';
    }[];
    transitionDuration?: number;
    slideDuration?: number;
    fadeDuration?: number;
  };
}

// Re-export the original Character type for backward compatibility
export type Character = ExtendedCharacter;