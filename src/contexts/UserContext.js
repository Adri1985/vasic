import React, { createContext, useState } from 'react';

// Crear el contexto del usuario
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [loading, setLoading] = useState(false); // Estado para manejar el cargando

  // Función para actualizar los datos del usuario
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
