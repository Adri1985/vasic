import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import Header from '../components/Header';
import RegistrationForm from '../components/RegistrationForm';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUserContext();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token, user } = response.data;

      login(token, user); // Guardar token y datos del usuario en el contexto
      navigate('/home'); // Redirigir al home
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleRegister = async (formData) => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, formData);
      alert('Usuario registrado con éxito. ¡Ahora puedes iniciar sesión!');
      setIsRegister(false);
    } catch (err) {
      setError('Error al registrarte. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded shadow max-w-md w-full">
          {isRegister ? (
            <RegistrationForm handleRegister={handleRegister} />
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Iniciar Sesión</h2>
              {error && <div className="text-red-600 text-center">{error}</div>}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border p-2 rounded focus:outline-none focus:border-green-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-2 rounded focus:outline-none focus:border-green-600"
                />
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Iniciar Sesión
              </button>
            </form>
          )}
          <p className="mt-4 text-center text-sm">
            {isRegister ? (
              <>
                ¿Ya tienes cuenta?{' '}
                <span
                  className="text-green-600 cursor-pointer hover:underline"
                  onClick={() => setIsRegister(false)}
                >
                  Inicia sesión
                </span>
              </>
            ) : (
              <>
                ¿No tienes cuenta?{' '}
                <span
                  className="text-green-600 cursor-pointer hover:underline"
                  onClick={() => setIsRegister(true)}
                >
                  Regístrate
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
