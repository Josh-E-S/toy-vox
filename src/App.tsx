import { Route, Routes, Navigate } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";
import { VisualizerSettingsProvider } from "./context/VisualizerSettingsContext";

// ToyVox Pages
import HomePage from "./pages/HomePage";
import CharacterPageEnhanced from "./pages/CharacterPageEnhanced";

function App() {
  return (
    <VisualizerSettingsProvider>
      <CharacterProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:characterId" element={<CharacterPageEnhanced />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CharacterProvider>
    </VisualizerSettingsProvider>
  );
}

export default App;
