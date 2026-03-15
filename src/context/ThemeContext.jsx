import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const location = useLocation();

    // Initialize theme from local storage
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('nexi5_theme') || 'dark';
    });

    // Apply the correct theme to the root element
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    // Persist theme
    useEffect(() => {
        localStorage.setItem('nexi5_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const isDarkMode = theme === 'dark';

    return (
        <ThemeContext.Provider value={{
            theme,
            isDarkMode,
            toggleTheme,
            // Maintain backward compatibility
            landingTheme: theme,
            dashboardTheme: theme,
            toggleLandingTheme: toggleTheme,
            toggleDashboardTheme: toggleTheme,
            isLandingDarkMode: isDarkMode,
            isDashboardDarkMode: isDarkMode
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
