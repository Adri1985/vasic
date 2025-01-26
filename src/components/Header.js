import React, { useState } from 'react';
import UserModal from './UserModal';
import { useUserContext } from '../contexts/UserContext';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserContext(); // Obtiene los datos del usuario desde el contexto

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Bienvenido a VASIC 🌿</h1>
      {user && (
        <div className="relative">
          {/* Botón con emoji de usuario */}
          <button
            onClick={toggleModal}
            className="text-white text-3xl hover:text-green-300"
            title="Perfil de usuario"
          >
            👤
          </button>
          {/* Modal desplegable con los datos del usuario */}
          {isModalOpen && <UserModal user={user} onClose={toggleModal} />}
        </div>
      )}
    </header>
  );
};

export default Header;
