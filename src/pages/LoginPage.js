import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import RegistrationForm from '../components/RegistrationForm';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Iniciar el estado de carga
    try {
      setError(''); // Limpiar error antes de intentar el login
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  
      const { token, user } = response.data;
      console.log(user);
      console.log(token);

      // Guardar el token y usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir a la página de inicio
      navigate('/home'); // Redirigir al home solo después de que el login esté completo
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);  // Finalizar el estado de carga
    }
  };

  // Verificar si el usuario ya está autenticado en el localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); // Redirigir si el usuario ya tiene un token válido
    }
  }, [navigate]);

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
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" disabled={loading}>
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
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
