import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext'; // Importa el provider del contexto
import HomeLanding from './pages/HomeLanding';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomeLanding />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
