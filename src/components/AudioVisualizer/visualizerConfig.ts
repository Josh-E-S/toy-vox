import { Character } from '../../config/characters';
import { VisualizerSettings } from '../../context/VisualizerSettingsContext';

export interface VisualizerConfig {
  red: number;
  green: number;
  blue: number;
  threshold: number;
  strength: number;
  radius: number;
  wireframe: boolean;
  detail: number;
  size: number;
}

// Default configuration
export const defaultConfig: VisualizerConfig = {
  red: 1.0,
  green: 1.0,
  blue: 1.0,
  threshold: 0.5,
  strength: 0.5,
  radius: 0.8,
  wireframe: true,
  detail: 30,
  size: 4
};

// Character-specific configurations
export const getCharacterConfig = (character?: Character | null, settings?: VisualizerSettings): VisualizerConfig => {
  // Convert hex color to RGB (0-1 range)
  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  };

  // Get base configuration
  let baseConfig = defaultConfig;
  
  if (character) {
    // Get RGB values from character color
    const [r, g, b] = hexToRgb(character.color);
    
    // Character-specific base presets
    switch (character.id) {
      case 'chungy001':
        baseConfig = {
          red: r,
          green: g,
          blue: b,
          threshold: 0.4,
          strength: 0.8,
          radius: 0.7,
          wireframe: true,
          detail: 30,
          size: 4
        };
        break;
      case 'sonic001':
        baseConfig = {
          red: r,
          green: g,
          blue: b,
          threshold: 0.3,
          strength: 1.0,
          radius: 0.5,
          wireframe: true,
          detail: 25,
          size: 3.5
        };
        break;
      case 'shadow001':
        baseConfig = {
          red: r,
          green: g,
          blue: b,
          threshold: 0.6,
          strength: 1.2,
          radius: 0.9,
          wireframe: true,
          detail: 35,
          size: 4.2
        };
        break;
      case 'sponge001':
        baseConfig = {
          red: r,
          green: g,
          blue: b,
          threshold: 0.2,
          strength: 0.7,
          radius: 0.6,
          wireframe: true,
          detail: 20,
          size: 3.8
        };
        break;
      default:
        // Default configuration with character's color
        baseConfig = {
          ...defaultConfig,
          red: r,
          green: g,
          blue: b
        };
        break;
    }
  }

  // Apply user settings overrides if provided
  if (settings) {
    return {
      ...baseConfig,
      detail: settings.detail,
      size: settings.size,
      strength: baseConfig.strength * settings.intensity,
    };
  }

  return baseConfig;
};
