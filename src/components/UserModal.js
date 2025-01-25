import React from 'react';

const UserModal = ({ user, onClose }) => {
  const nextFriday = () => {
    const today = new Date();
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7));
    return nextFriday.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Perfil de Usuario</h2>
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Apellido:</strong> {user.apellido}</p>
        <p><strong>Dirección:</strong> {user.direccion.calle} {user.direccion.numero}, {user.direccion.codigoPostal}</p>
        <p><strong>Próximo Envío:</strong> {nextFriday()}</p>
        <button
          className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default UserModal;
