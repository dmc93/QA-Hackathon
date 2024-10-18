import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null); // Add userId state
    const [userName, setUserName] = useState(null); // Add userName state

    const login = (token, id, name) => {
        setIsAuthenticated(true);
        setUserToken(token);
        setUserId(id); // Store user ID
        setUserName(name); // Store user name
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserToken(null);
        setUserId(null); // Clear user ID
        setUserName(null); // Clear user name
        localStorage.removeItem('jwtToken'); // Clear token from localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userToken, userId, userName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
