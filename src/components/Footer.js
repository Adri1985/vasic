import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; 2025 VASIC - Todos los derechos reservados</p>
        <div className="mt-4">
          <a href="#" className="text-white hover:text-green-500 mx-2">Facebook</a>
          <a href="#" className="text-white hover:text-green-500 mx-2">Instagram</a>
          <a href="#" className="text-white hover:text-green-500 mx-2">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
