/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClint from '../services/apiClient';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: number;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<string | null>;
    register: (firstName: string, lastName: string, email: string, password: string, role: number) => Promise<string | null>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    return useContext(AuthContext)!;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<string | null> => {
        try {
            const response = await apiClint.post('/auth/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return null; // No error
        } catch (error: any) {
            return error.response?.data?.message || "Login failed. Please try again.";
        }
    };

    const register = async (firstName: string, lastName: string, email: string, password: string, role: number): Promise<string | null> => {
        try {
            await apiClint.post('/auth/register', { firstName, lastName, email, password, role });
            return null;
        } catch (error: any) {
            return error.response?.data?.message || "Registration failed. Please try again.";
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};