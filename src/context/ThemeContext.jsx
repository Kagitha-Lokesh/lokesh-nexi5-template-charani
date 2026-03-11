import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const location = useLocation();

    // Initialize themes from local storage
    const [landingTheme, setLandingTheme] = useState(() => {
        return localStorage.getItem('landingTheme') || 'light';
    });

    const [dashboardTheme, setDashboardTheme] = useState(() => {
        return localStorage.getItem('dashboardTheme') || 'light';
    });

    // Detect if we are in the dashboard
    const isDashboard = location.pathname.startsWith('/dashboard');

    // Apply the correct theme to the root element
    useEffect(() => {
        const root = window.document.documentElement;
        const currentTheme = isDashboard ? dashboardTheme : landingTheme;

        if (currentTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDashboard, landingTheme, dashboardTheme]);

    // Persist landing theme
    useEffect(() => {
        localStorage.setItem('landingTheme', landingTheme);
    }, [landingTheme]);

    // Persist dashboard theme
    useEffect(() => {
        localStorage.setItem('dashboardTheme', dashboardTheme);
    }, [dashboardTheme]);

    const toggleLandingTheme = () => {
        setLandingTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const toggleDashboardTheme = () => {
        setDashboardTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // Derived values for components to maintain backward compatibility
    const isDarkMode = isDashboard ? dashboardTheme === 'dark' : landingTheme === 'dark';
    const toggleTheme = isDashboard ? toggleDashboardTheme : toggleLandingTheme;

    return (
        <ThemeContext.Provider value={{
            theme: isDashboard ? dashboardTheme : landingTheme,
            isDarkMode,
            toggleTheme,
            landingTheme,
            dashboardTheme,
            toggleLandingTheme,
            toggleDashboardTheme,
            isLandingDarkMode: landingTheme === 'dark',
            isDashboardDarkMode: dashboardTheme === 'dark'
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
