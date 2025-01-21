import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus páginas
import LoginPage from './pages/LoginPage';
import HomeLanding from './components/HomeLanding';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto => Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Ruta para HomeLanding */}
        <Route path="/home" element={<HomeLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
