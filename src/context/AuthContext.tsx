/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

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
        checkUserSession()
    }, []);

    const checkUserSession = async () => {
        try {
            const response = await apiClient.get("/auth/me", { withCredentials: true });
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };


    const login = async (email: string, password: string): Promise<string | null> => {
        try {
            await apiClient.post("/auth/login", { email, password }, { withCredentials: true });
            await checkUserSession(); // Refresh user data after login
            return null;
        } catch (error: any) {
            return error.response?.data?.message || "Login failed. Please try again.";
        }
    };

    const register = async (firstName: string, lastName: string, email: string, password: string, role: number): Promise<string | null> => {
        try {
            await apiClient.post('/auth/register', { firstName, lastName, email, password, role });
            return null;
        } catch (error: any) {
            return error.response?.data?.message || "Registration failed. Please try again.";
        }
    };

    const logout = async () => {
        try {
            await apiClient.post("/auth/logout", { withCredentials: true });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
        }
    };

    return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};