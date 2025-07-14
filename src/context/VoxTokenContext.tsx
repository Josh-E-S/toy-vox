import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VoxTokenContextType {
  tokens: number;
  unlockedCharacters: string[];
  addTokens: (amount: number) => void;
  spendTokens: (amount: number) => boolean;
  unlockCharacter: (characterId: string) => void;
  isCharacterUnlocked: (characterId: string) => boolean;
  resetProgress: () => void;
}

const VoxTokenContext = createContext<VoxTokenContextType | undefined>(undefined);

const STORAGE_KEY = 'voxTokenData';
const INITIAL_TOKENS = 100; // Start with 100 tokens for testing
const SPIN_COST = 10; // Cost per spin

export function VoxTokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<number>(INITIAL_TOKENS);
  const [unlockedCharacters, setUnlockedCharacters] = useState<string[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTokens(parsed.tokens || INITIAL_TOKENS);
        setUnlockedCharacters(parsed.unlockedCharacters || []);
      } catch (error) {
        console.error('Error loading token data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      tokens,
      unlockedCharacters
    }));
  }, [tokens, unlockedCharacters]);

  const addTokens = (amount: number) => {
    setTokens(prev => prev + amount);
  };

  const spendTokens = (amount: number): boolean => {
    if (tokens >= amount) {
      setTokens(prev => prev - amount);
      return true;
    }
    return false;
  };

  const unlockCharacter = (characterId: string) => {
    if (!unlockedCharacters.includes(characterId)) {
      setUnlockedCharacters(prev => [...prev, characterId]);
    }
  };

  const isCharacterUnlocked = (characterId: string): boolean => {
    return unlockedCharacters.includes(characterId);
  };

  const resetProgress = () => {
    setTokens(INITIAL_TOKENS);
    setUnlockedCharacters([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: VoxTokenContextType = {
    tokens,
    unlockedCharacters,
    addTokens,
    spendTokens,
    unlockCharacter,
    isCharacterUnlocked,
    resetProgress
  };

  return (
    <VoxTokenContext.Provider value={value}>
      {children}
    </VoxTokenContext.Provider>
  );
}

export function useVoxTokens() {
  const context = useContext(VoxTokenContext);
  if (!context) {
    throw new Error('useVoxTokens must be used within a VoxTokenProvider');
  }
  return context;
}

export { SPIN_COST };