import React from 'react';

// Función para calcular el próximo viernes
const getNextFriday = () => {
  const today = new Date();
  const nextFriday = new Date(today);

  // Calcular la diferencia de días hasta el próximo viernes
  const daysToFriday = (5 - today.getDay() + 7) % 7;
  nextFriday.setDate(today.getDate() + daysToFriday);

  // Formatear la fecha como "dd/mm/yyyy"
  const day = String(nextFriday.getDate()).padStart(2, '0');
  const month = String(nextFriday.getMonth() + 1).padStart(2, '0');
  const year = nextFriday.getFullYear();
  return `${day}/${month}/${year}`;
};

const UserModal = ({ user, onClose, onLogout }) => {
  const nextFriday = getNextFriday(); // Obtener el próximo viernes

  return (
    <div className="absolute top-12 right-0 bg-gray-800 text-white shadow-lg rounded-lg p-6 w-80 z-10 transition-all transform scale-100 hover:scale-105">
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 text-gray-400 hover:text-white transition duration-300 ease-in-out"
      >
        ×
      </button>
      <h2 className="text-xl font-semibold text-green-400 mb-3 text-center">
        Perfil de Usuario
      </h2>
      <div className="mb-4 space-y-2">
        <p className="text-sm">
          <strong className="text-gray-300">Nombre:</strong> {user.nombre}
        </p>
        <p className="text-sm">
          <strong className="text-gray-300">Apellido:</strong> {user.apellido}
        </p>
        <p className="text-sm">
          <strong className="text-gray-300">Dirección:</strong> {user.direccion?.calle}, {user.direccion?.numero}, {user.direccion?.codigoPostal}
        </p>
        <p className="text-sm">
          <strong className="text-gray-300">Próxima Entrega:</strong> {nextFriday}
        </p>
      </div>
      <button
        onClick={onLogout}
        className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserModal;
