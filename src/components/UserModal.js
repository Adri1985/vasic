import React from 'react';

const UserModal = ({ user, onClose, onLogout }) => {
  return (
    <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-4 w-64 z-10">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ×
      </button>
      <h2 className="text-lg font-semibold mb-2">Perfil de Usuario</h2>
      <p>
        <strong>Nombre:</strong> {user.nombre}
      </p>
      <p>
        <strong>Apellido:</strong> {user.apellido}
      </p>
      <p>
        <strong>Dirección:</strong> {user.direccion?.calle}, {user.direccion?.numero},{' '}
        {user.direccion?.codigoPostal}
      </p>
      <button
        onClick={onLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserModal;
