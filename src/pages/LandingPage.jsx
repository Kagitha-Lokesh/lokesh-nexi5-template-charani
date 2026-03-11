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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`min-h-screen font-sans overflow-x-hidden selection:bg-primary/30 transition-colors duration-300 ${isDarkMode ? 'dark auth-background text-white' : 'text-dark bg-white'}`}
        >
            <Navbar
                onLoginClick={() => navigate('/login')}
                onRegisterClick={() => navigate('/register')}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />

            <main>
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
    );
}
