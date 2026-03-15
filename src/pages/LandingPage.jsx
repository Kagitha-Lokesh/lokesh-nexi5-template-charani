import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import RoleAccessSection from '@/components/landing/RoleAccessSection';
import CoreFeaturesSection from '@/components/landing/CoreFeaturesSection';
import SelfServicePortalSection from '@/components/landing/SelfServicePortalSection';
import AnalyticsSection from '@/components/landing/AnalyticsSection';
import TechStackSection from '@/components/landing/TechStackSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import ScrollProgressButton from '@/components/landing/ScrollProgressButton';

export default function LandingPage() {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    // Custom scroll behavior wrapper to ensure top position on mount if we needed
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`min-h-screen font-sans overflow-x-hidden selection:bg-primary/30 transition-colors duration-300 relative ${isDarkMode ? 'dark auth-background text-white' : 'text-dark bg-white'}`}>
            <Navbar
                onLoginClick={() => navigate('/login')}
                onRegisterClick={() => navigate('/register')}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
            >
                {!isDarkMode && (
                    <div className="fixed inset-0 pointer-events-none z-0">
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-300/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
                        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-sky-300/10 rounded-full blur-[120px] translate-x-1/3" />
                        <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.01),transparent)]" />
                    </div>
                )}

                <main className={!isDarkMode ? 'bg-gradient-to-b from-white via-blue-50 to-white' : 'dark:bg-transparent'}>
                    <HeroSection onGetStarted={() => navigate('/register')} />
                    <AboutSection />
                    <RoleAccessSection />
                    <CoreFeaturesSection />
                    <SelfServicePortalSection />
                    <AnalyticsSection />
                    <TechStackSection />
                    <CTASection onGetStarted={() => navigate('/register')} />
                </main>

                <Footer />
                <ScrollProgressButton />
            </motion.div>
        </div>
    );
}
