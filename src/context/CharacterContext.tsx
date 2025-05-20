import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Character } from '../config/characters';

type Status = 'waiting' | 'detecting' | 'connecting' | 'active';

interface CharacterContextType {
  status: Status;
  setStatus: (status: Status) => void;
  character: Character | null;
  setCharacter: (character: Character | null) => void;
  message: string;
  setMessage: (message: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  transcript: string;
  setTranscript: (transcript: string) => void;
  audioLevel: number;
  setAudioLevel: (level: number) => void;
  handleReset: () => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<Status>('waiting');
  const [character, setCharacter] = useState<Character | null>(null);
  const [message, setMessage] = useState<string>('Place a toy on the base to begin');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const handleReset = () => {
    setStatus('waiting');
    setCharacter(null);
    setMessage('Place a toy on the base to begin');
    setIsListening(false);
    setTranscript('');
    setAudioLevel(0);
  };

  return (
    <CharacterContext.Provider
      value={{
        status,
        setStatus,
        character,
        setCharacter,
        message,
        setMessage,
        isListening,
        setIsListening,
        transcript,
        setTranscript,
        audioLevel,
        setAudioLevel,
        handleReset
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
