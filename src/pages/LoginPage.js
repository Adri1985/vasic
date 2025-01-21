// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook de navegación
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegar

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías validar email/contraseña o hacer tu lógica de login.
    // Si todo es correcto:
    navigate('/home'); // Redirige a la ruta /home
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-600"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-600"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>

     
    </div>
  );
};

export default LoginPage;
