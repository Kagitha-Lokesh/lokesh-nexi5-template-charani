import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logo from '../../assets/nexi5-logo.png';

export default function Navbar({ onLoginClick, onRegisterClick, isDarkMode, toggleTheme }) {
    const [isOpen, setIsOpen] = useState(false);

    // Smooth scroll to section
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <nav className="fixed w-full z-50 bg-white/70 dark:bg-white/10 backdrop-blur-lg border-b border-gray-100 dark:border-white/20 transition-all duration-300">
            <div className="max-w-[1200px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src={logo} alt="Logo" className="w-48 h-24 md:w-40 md:h-18 object-contain transform group-hover:scale-105 transition-all duration-300" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    <button onClick={() => scrollTo('features')} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#3ec3ff] font-medium text-sm transition-colors relative group">
                        Features
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-[#3ec3ff] transition-all group-hover:w-full" />
                    </button>
                    <button onClick={() => scrollTo('solutions')} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#3ec3ff] font-medium text-sm transition-colors relative group">
                        Solutions
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-[#3ec3ff] transition-all group-hover:w-full" />
                    </button>
                    <button onClick={() => scrollTo('analytics')} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#3ec3ff] font-medium text-sm transition-colors relative group">
                        Analytics
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-[#3ec3ff] transition-all group-hover:w-full" />
                    </button>
                    <button onClick={() => scrollTo('technology')} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#3ec3ff] font-medium text-sm transition-colors relative group">
                        Technology
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-[#3ec3ff] transition-all group-hover:w-full" />
                    </button>
                    <button onClick={() => scrollTo('contact')} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#3ec3ff] font-medium text-sm transition-colors relative group">
                        Contact
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-[#3ec3ff] transition-all group-hover:w-full" />
                    </button>
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-12"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={onLoginClick} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#3ec3ff] font-medium text-sm transition-colors">Login</button>
                    <button
                        onClick={onRegisterClick}
                        className="bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:scale-95"
                    >
                        Sign Up
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        className="text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white/95 dark:bg-[#0c162d]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 absolute w-full left-0 top-[64px] md:top-20 shadow-2xl transition-all duration-300">
                    <div className="flex flex-col p-6 gap-2">
                        <button onClick={() => scrollTo('features')} className="text-left text-gray-600 dark:text-gray-300 font-medium py-3 hover:text-primary dark:hover:text-[#3ec3ff] transition-colors">Features</button>
                        <button onClick={() => scrollTo('solutions')} className="text-left text-gray-600 dark:text-gray-300 font-medium py-3 hover:text-primary dark:hover:text-[#3ec3ff] transition-colors">Solutions</button>
                        <button onClick={() => scrollTo('technology')} className="text-left text-gray-600 dark:text-gray-300 font-medium py-3 hover:text-primary dark:hover:text-[#3ec3ff] transition-colors">Technology</button>
                        <button onClick={() => scrollTo('analytics')} className="text-left text-gray-600 dark:text-gray-300 font-medium py-3 hover:text-primary dark:hover:text-[#3ec3ff] transition-colors">Analytics</button>
                        <button onClick={() => scrollTo('contact')} className="text-left text-gray-600 dark:text-gray-300 font-medium py-3 hover:text-primary dark:hover:text-[#3ec3ff] transition-colors">Contact</button>
                        <div className="flex flex-col gap-3 mt-4">
                            <button onClick={onLoginClick} className="w-full text-center text-primary dark:text-[#3ec3ff] font-bold py-3 border-2 border-primary dark:border-[#3ec3ff] rounded-full hover:bg-primary hover:text-white dark:hover:bg-[#3ec3ff] dark:hover:text-dark transition-all">Login</button>
                            <button onClick={onRegisterClick} className="w-full text-center bg-primary text-white py-3 rounded-full font-bold shadow-lg hover:bg-secondary transition-all">Sign Up</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
