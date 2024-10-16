import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const login = (token) => {
        setIsAuthenticated(true);
        setUserToken(token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserToken(null);
        localStorage.removeItem('jwtToken'); // Clear token from localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
