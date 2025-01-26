import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      // Configurar el token en los encabezados de axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserDetails();
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUser(null);
    }
  };

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
