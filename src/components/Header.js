import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import UserModal from './UserModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useUserContext();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Bienvenido a VASIC 🌿</h1>
      {user && (
        <div className="relative">
          <button
            onClick={toggleModal}
            className="text-white text-3xl hover:text-green-300"
            title="Perfil de usuario"
          >
            👤
          </button>
          {isModalOpen && (
            <UserModal user={user} onClose={toggleModal} onLogout={logout} />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
