import { Route, Routes, Navigate } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";
import MainLayout from "./layouts/MainLayout";

// ToyVox Pages
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <CharacterProvider>
      <Routes>
        <Route element={<MainLayout><HomePage /></MainLayout>} path="/" />
        <Route element={<MainLayout><CharacterPage /></MainLayout>} path="/character/:characterId" />
        <Route element={<MainLayout><SettingsPage /></MainLayout>} path="/settings" />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CharacterProvider>
  );
}

export default App;
