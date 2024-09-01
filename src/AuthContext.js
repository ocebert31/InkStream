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

    useEffect(() => {
        // Met à jour localStorage lorsque user change
        if (user !== null) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    const login = (user, token) => {
        setToken(token);
        updateUser(user);
        localStorage.setItem('token', token);
    };

    const updateUser = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

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
        <AuthContext.Provider value={{ login, logout, user, token, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};