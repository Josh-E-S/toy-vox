import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface VisualizerSettings {
  intensity: number; // 0.1 to 2.0 - multiplier for audio response
  wireframeThickness: number; // 1 to 5 - line thickness
  detail: number; // 10 to 50 - geometry complexity
  size: number; // 2 to 8 - orb size
  sensitivity: number; // 50 to 200 - audio sensitivity multiplier
}

interface VisualizerSettingsContextType {
  settings: VisualizerSettings;
  updateSetting: <K extends keyof VisualizerSettings>(key: K, value: VisualizerSettings[K]) => void;
  resetToDefaults: () => void;
  saveSettings: () => void;
  lastSaved: Date | null;
}

const defaultSettings: VisualizerSettings = {
  intensity: 1.0,
  wireframeThickness: 1,
  detail: 30,
  size: 4,
  sensitivity: 100
};

const VisualizerSettingsContext = createContext<VisualizerSettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'toyvox-visualizer-settings';

export const VisualizerSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<VisualizerSettings>(() => {
    // Load settings from localStorage on initialization
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultSettings, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load visualizer settings:', error);
    }
    return defaultSettings;
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setLastSaved(new Date());
      console.log('Visualizer settings saved:', settings);
    } catch (error) {
      console.error('Failed to save visualizer settings:', error);
    }
  }, [settings]);

  const updateSetting = <K extends keyof VisualizerSettings>(
    key: K, 
    value: VisualizerSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setLastSaved(new Date());
      console.log('Settings manually saved');
    } catch (error) {
      console.error('Failed to manually save settings:', error);
    }
  };

  return (
    <VisualizerSettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetToDefaults,
        saveSettings,
        lastSaved
      }}
    >
      {children}
    </VisualizerSettingsContext.Provider>
  );
};

export const useVisualizerSettings = (): VisualizerSettingsContextType => {
  const context = useContext(VisualizerSettingsContext);
  if (context === undefined) {
    throw new Error('useVisualizerSettings must be used within a VisualizerSettingsProvider');
  }
  return context;
};