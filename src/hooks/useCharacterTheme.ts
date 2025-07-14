import { useEffect } from 'react';
import { Character } from '@/config/characters';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  gradientFrom: string;
  gradientTo: string;
  textContrast: string;
}

export const useCharacterTheme = (character?: Character): ThemeColors => {
  const defaultTheme: ThemeColors = {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#2563EB',
    glow: '#93BBFC',
    gradientFrom: '#3B82F6',
    gradientTo: '#60A5FA',
    textContrast: '#FFFFFF'
  };

  if (!character) return defaultTheme;

  // Extract theme from character or use defaults
  const theme: ThemeColors = {
    primary: character.color || defaultTheme.primary,
    secondary: character.secondaryColor || character.color || defaultTheme.secondary,
    accent: character.theme?.accent || character.color || defaultTheme.accent,
    glow: character.theme?.glow || character.secondaryColor || defaultTheme.glow,
    gradientFrom: character.theme?.gradient?.from || character.color || defaultTheme.gradientFrom,
    gradientTo: character.theme?.gradient?.to || character.secondaryColor || defaultTheme.gradientTo,
    textContrast: getContrastColor(character.color || defaultTheme.primary)
  };

  // Apply CSS custom properties to root
  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS variables
    root.style.setProperty('--character-primary', theme.primary);
    root.style.setProperty('--character-secondary', theme.secondary);
    root.style.setProperty('--character-accent', theme.accent);
    root.style.setProperty('--character-glow', theme.glow);
    root.style.setProperty('--character-gradient-from', theme.gradientFrom);
    root.style.setProperty('--character-gradient-to', theme.gradientTo);
    root.style.setProperty('--character-text-contrast', theme.textContrast);
    
    // Set gradient angle if specified
    if (character?.theme?.gradient?.angle) {
      root.style.setProperty('--character-gradient-angle', `${character.theme.gradient.angle}deg`);
    }

    // Cleanup function to reset theme
    return () => {
      root.style.setProperty('--character-primary', defaultTheme.primary);
      root.style.setProperty('--character-secondary', defaultTheme.secondary);
      root.style.setProperty('--character-accent', defaultTheme.accent);
      root.style.setProperty('--character-glow', defaultTheme.glow);
      root.style.setProperty('--character-gradient-from', defaultTheme.gradientFrom);
      root.style.setProperty('--character-gradient-to', defaultTheme.gradientTo);
      root.style.setProperty('--character-text-contrast', defaultTheme.textContrast);
      root.style.setProperty('--character-gradient-angle', '135deg');
    };
  }, [character, theme]);

  return theme;
};

// Helper function to determine if text should be light or dark based on background
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

// Additional helper to lighten/darken colors
export function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16)
    .slice(1);
}

// Helper to create gradient CSS string
export function createGradient(from: string, to: string, angle = 135): string {
  return `linear-gradient(${angle}deg, ${from}, ${to})`;
}