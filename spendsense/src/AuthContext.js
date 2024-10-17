// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null); // Add userId state

    const login = (token, id) => {
        setIsAuthenticated(true);
        setUserToken(token);
        setUserId(id); // Store user ID
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserToken(null);
        setUserId(null); // Clear user ID
        localStorage.removeItem('jwtToken'); // Clear token from localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userToken, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
