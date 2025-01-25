import React from 'react';

const UserModal = ({ user, onClose }) => {
  // Función para calcular el próximo viernes
  const calcularProximoViernes = () => {
    const hoy = new Date();
    const proximoViernes = new Date(hoy);
    proximoViernes.setDate(
      hoy.getDate() + ((5 - hoy.getDay() + 7) % 7 || 7) // Calcular días restantes para el viernes
    );
    return proximoViernes.toLocaleDateString(); // Formato de fecha local
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-green-600 mb-4">Información del Usuario</h2>
        <ul className="space-y-2">
          <li>
            <strong>Nombre:</strong> {user.nombre}
          </li>
          <li>
            <strong>Apellido:</strong> {user.apellido}
          </li>
          <li>
            <strong>Dirección:</strong> {`${user.direccion.calle}, ${user.direccion.numero}, ${user.direccion.codigoPostal}`}
          </li>
          <li>
            <strong>Próximo envío:</strong> {calcularProximoViernes()}
          </li>
        </ul>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
