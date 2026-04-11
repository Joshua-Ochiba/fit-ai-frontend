"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    //Check local storage on mount
    useEffect(() => {
        const authStatus = localStorage.getItem('fitai_admin_auth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, pass: string) => {
        //Mock logic to allow non-empty credentials
        if (email.trim() !== "" && pass.trim() !== "") {
            localStorage.setItem('fitai_admin_auth', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        router.push('/admin/login');
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error(
        'useAuth must be used within AuthProvider'
    );
    return context;
};

