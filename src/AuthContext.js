import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const tokenData = localStorage.getItem('token');
        if (tokenData) {
            setToken(tokenData);
        }
        const userData = localStorage.getItem('user')
        if(userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (user, token) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = async() => {
        try {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, user, token }}>
            {children}
        </AuthContext.Provider>
    );
};