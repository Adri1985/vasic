// UserModal.js actualizado
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const UserModal = ({ user, onClose }) => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  // Obtener el próximo viernes
  const getNextFriday = () => {
    const today = new Date();
    const nextFriday = new Date(
      today.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7))
    );
    return nextFriday.toLocaleDateString();
  };

  const handleLogout = () => {
    setUser(null); // Limpiar el estado del usuario
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/'); // Redirigir al login
    onClose(); // Cerrar el modal
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-md p-4 z-10 text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Información del Usuario</h3>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          ✖
        </button>
      </div>
      <div className="mt-4">
        <p className="mb-2"><strong>Nombre:</strong> {user.nombre}</p>
        <p className="mb-2"><strong>Apellido:</strong> {user.apellido}</p>
        <p className="mb-2"><strong>Dirección:</strong></p>
        <p className="mb-2">
          {user.direccion.calle} {user.direccion.numero}, CP {user.direccion.codigoPostal}
        </p>
        <p className="mt-2"><strong>Próximo Envío:</strong> {getNextFriday()}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserModal;
