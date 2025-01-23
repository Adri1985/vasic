import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(true); // Estado para alternar entre Register y Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Manejar registro
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log('Registrando usuario con:', { email, password });

      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
      });

      console.log('Respuesta del servidor:', response.data);

      setSuccess('Usuario registrado con éxito. ¡Ahora puedes iniciar sesión!');
      setEmail('');
      setPassword('');
      setIsRegister(false); // Cambiar a Login después de registrar
    } catch (err) {
      console.error('Error al registrar usuario:', err);

      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Error al registrar usuario. Inténtalo nuevamente.');
      }
    }
  };

  // Manejar login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log('Iniciando sesión con:', { email, password });

      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      console.log('Respuesta del servidor:', response.data);

      localStorage.setItem('token', response.data.token); // Guardar el token
      navigate('/home'); // Redirigir a HomeLanding
    } catch (err) {
      console.error('Error al iniciar sesión:', err);

      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Error al iniciar sesión. Inténtalo nuevamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
            {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
          </h2>

          {error && (
            <div className="mb-4 text-red-600 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 text-green-600 text-center">
              {success}
            </div>
          )}

          {/* Formulario de Register/Login */}
          <form onSubmit={(e) => (isRegister ? handleRegister(e) : handleLogin(e))} className="space-y-4">
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
                placeholder={isRegister ? 'Crea una contraseña' : 'Ingresa tu contraseña'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Enlace para alternar entre Register y Login */}
          <p className="mt-4 text-center text-sm">
            {isRegister ? (
              <>
                ¿Ya sos miembro?{' '}
                <span
                  onClick={() => setIsRegister(false)}
                  className="text-green-600 cursor-pointer hover:underline"
                >
                  Ingresa aquí
                </span>
              </>
            ) : (
              <>
                ¿No tienes una cuenta?{' '}
                <span
                  onClick={() => setIsRegister(true)}
                  className="text-green-600 cursor-pointer hover:underline"
                >
                  Regístrate aquí
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
