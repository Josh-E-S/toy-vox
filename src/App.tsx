import { Route, Routes, Navigate } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";
import { VisualizerSettingsProvider } from "./context/VisualizerSettingsContext";
import { VoxTokenProvider } from "./context/VoxTokenContext";

// ToyVox Pages
import HomePage from "./pages/HomePage";
import CharacterPageEnhanced from "./pages/CharacterPageEnhanced";

function App() {
  return (
    <VisualizerSettingsProvider>
      <VoxTokenProvider>
        <CharacterProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/character/:characterId" element={<CharacterPageEnhanced />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CharacterProvider>
      </VoxTokenProvider>
    </VisualizerSettingsProvider>
  );
}

export default App;
