"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
    // General
    platformName: string;
    supportEmail: string;
    publicUrl: string;
    // AI Engine
    model: string;
    tone: string;
    memoryEnabled: boolean;
    maxResponseLength: number;
    // Usage & Access
    dailyMessageLimit: number;
    publicChatbotEnabled: boolean;
    registrationsEnabled: boolean;
    maintenanceMode: boolean;
}

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const DEFAULT_SETTINGS: Settings = {
    platformName: "Fit.AI Admin",
    supportEmail: "support@fit-ai.com",
    publicUrl: "app.fit-ai.com",
    model: "gpt-4o",
    tone: "encouraging",
    memoryEnabled: true,
    maxResponseLength: 500,
    dailyMessageLimit: 50,
    publicChatbotEnabled: true,
    registrationsEnabled: true,
    maintenanceMode: false
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

    //load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('fitai_settings');
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem('fitai_settings', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                updateSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) throw new Error(
        'useSettings must be used within a SettingsProvider'
    );
    return context;
};