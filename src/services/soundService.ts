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
  spin: () => {
    // Wheel spinning sound
    createSound(300, 0.2, 'sawtooth', 0.2);
    setTimeout(() => createSound(400, 0.2, 'sawtooth', 0.2), 200);
    setTimeout(() => createSound(500, 0.2, 'sawtooth', 0.2), 400);
  },
  success: () => {
    // Victory fanfare
    createSound(523, 0.1); // C
    setTimeout(() => createSound(659, 0.1), 100); // E
    setTimeout(() => createSound(784, 0.1), 200); // G
    setTimeout(() => createSound(1047, 0.3), 300); // High C
  },
  celebration: () => {
    // Big win celebration
    createSound(523, 0.1); // C
    setTimeout(() => createSound(659, 0.1), 100); // E
    setTimeout(() => createSound(784, 0.1), 200); // G
    setTimeout(() => createSound(1047, 0.2), 300); // High C
    setTimeout(() => createSound(784, 0.1), 500); // G
    setTimeout(() => createSound(1047, 0.3), 600); // High C
  },
  coins: () => {
    // Coin collection sound
    createSound(880, 0.05, 'square', 0.1);
    setTimeout(() => createSound(1760, 0.05, 'square', 0.1), 50);
    setTimeout(() => createSound(880, 0.05, 'square', 0.1), 100);
    setTimeout(() => createSound(1760, 0.1, 'square', 0.1), 150);
  },
  error: () => {
    // Error/already have sound
    createSound(200, 0.2, 'sawtooth', 0.2);
    setTimeout(() => createSound(150, 0.3, 'sawtooth', 0.2), 200);
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

// Voice clip cache
const voiceClipCache = new Map<string, HTMLAudioElement>();

// Export as soundService for consistency
export const soundService = {
  playSound,
  preloadSounds,
  playVoiceClip: async (url: string) => {
    try {
      // Check if we have a cached audio element
      let audio = voiceClipCache.get(url);
      
      if (!audio) {
        // Create new audio element and cache it
        audio = new Audio(url);
        audio.volume = 0.5;
        voiceClipCache.set(url, audio);
      }
      
      // Reset and play
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.log('Voice clip playback failed:', error);
    }
  }
};

// Also export standalone functions for backward compatibility
export const playVoiceClip = soundService.playVoiceClip;

// Preload a voice clip
export const preloadVoiceClip = (url: string) => {
  if (!voiceClipCache.has(url)) {
    const audio = new Audio(url);
    audio.volume = 0.5;
    voiceClipCache.set(url, audio);
  }
};

export default soundService;