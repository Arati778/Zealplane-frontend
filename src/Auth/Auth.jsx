// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const tokenFromRedux = useSelector((state) => state.user.token); // Assuming the token is stored in Redux under 'user.token'

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    // Check if token exists in either Redux or localStorage
    if (tokenFromRedux || tokenFromLocalStorage) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [tokenFromRedux]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
