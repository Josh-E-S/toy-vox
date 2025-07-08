// Simple sound effects using Web Audio API
const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

const createSound = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.2) => {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const sounds = {
  hover: () => createSound(400, 0.03, 'sine', 0.1), // Very subtle
  select: () => createSound(600, 0.1, 'sine', 0.3),
  connect: () => {
    createSound(400, 0.1);
    setTimeout(() => createSound(600, 0.1), 100);
    setTimeout(() => createSound(800, 0.1), 200);
  },
  disconnect: () => {
    // Descending tones for disconnect
    createSound(600, 0.1);
    setTimeout(() => createSound(400, 0.1), 100);
    setTimeout(() => createSound(200, 0.15), 200);
  },
};

// Simple sound player with error handling
export const playSound = (soundName: keyof typeof sounds) => {
  try {
    sounds[soundName]?.();
  } catch (error) {
    console.log('Sound playback failed:', error);
  }
};

// Preload function (no-op for Web Audio API)
export const preloadSounds = () => {
  // Web Audio API doesn't need preloading
};

export default {
  playSound,
  preloadSounds,
};