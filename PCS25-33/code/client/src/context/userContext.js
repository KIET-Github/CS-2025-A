"use client";
import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = Cookies.get('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
