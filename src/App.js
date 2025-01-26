// Archivo App.js actualizado para reflejar la estructura correcta del repositorio

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Confirmamos que LoginPage esté en pages
import HomeLanding from './components/HomeLanding'; // Confirmamos que HomeLanding esté en components
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomeLanding />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
