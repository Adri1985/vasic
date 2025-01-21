import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para logout si es necesario (por ejemplo, limpiar el estado global o localStorage)
    navigate('/'); // Redirige al login
  };

  return (
    <header className="w-full bg-green-600 text-white py-4 fixed top-0 left-0 z-10">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">VASIC 🌿 </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              {/* Al hacer clic, se despliega el modal */}
              <button
                onClick={() => setShowModal(true)}
                className="hover:underline text-2xl"
              >
                👤
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal para Logout */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-64">
            <h2 className="text-xl font-bold mb-4 text-center">¿Cerrar sesión?</h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
