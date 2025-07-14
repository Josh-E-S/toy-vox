import { Route, Routes, Navigate } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";
import { VisualizerSettingsProvider } from "./context/VisualizerSettingsContext";
import MainLayout from "./layouts/MainLayout";

// ToyVox Pages
import HomePage from "./pages/HomePage";
import CharacterPageEnhanced from "./pages/CharacterPageEnhanced";

function App() {
  return (
    <VisualizerSettingsProvider>
      <CharacterProvider>
        <Routes>
          <Route element={<MainLayout><HomePage /></MainLayout>} path="/" />
          <Route element={<MainLayout><CharacterPageEnhanced /></MainLayout>} path="/character/:characterId" />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CharacterProvider>
    </VisualizerSettingsProvider>
  );
}

export default App;
