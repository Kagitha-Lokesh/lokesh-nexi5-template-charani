import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '@/layouts/AuthLayout';

export default function AuthPage({ onLoginSuccess, initialRegister = false }) {
    const [isRegister, setIsRegister] = useState(initialRegister);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify({ email }));
            onLoginSuccess();
            navigate('/dashboard');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        if (name && email && password) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify({ email, name }));
            onLoginSuccess();
            navigate('/dashboard');
        }
    };

    // Card slide variants
    const variants = {
        initial: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 100 : -100,
            scale: 0.95,
        }),
        animate: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -100 : 100,
            scale: 0.95,
        })
    };

    return (
        <AuthLayout>
            <div className="overflow-hidden relative min-h-[320px]">
                <AnimatePresence mode="wait" initial={false} custom={isRegister ? 1 : -1}>
                    {isRegister ? (
                        <motion.div
                            key="register"
                            custom={1}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="flex flex-col gap-4"
                        >
                            <div className="text-center h-12 flex flex-col justify-center">
                                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3ec3ff] to-primary">
                                    Start Your Journey
                                </h1>
                                <p className="text-gray-400 text-[10px] uppercase tracking-wider">Create your NEXI5 workspace</p>
                            </div>

                            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3ec3ff]/50 transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3ec3ff]/50 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3ec3ff]/50 transition-colors"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3ec3ff]/50 transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-primary hover:bg-secondary text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all w-full"
                                >
                                    Create Account
                                </button>
                            </form>

                            <div className="text-center text-xs h-8 flex items-center justify-center">
                                <div className="text-gray-400">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setIsRegister(false)}
                                        className="text-[#3ec3ff] font-semibold hover:underline"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="login"
                            custom={-1}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="flex flex-col gap-4"
                        >
                            <div className="text-center h-12 flex flex-col justify-center">
                                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3ec3ff] to-primary">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-400 text-[10px] uppercase tracking-wider">Sign in to your account</p>
                            </div>

                            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3ec3ff]/50 transition-colors"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3ec3ff]/50 transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                <div className="flex justify-end h-4 items-center">
                                    <Link to="#" className="text-[#3ec3ff] text-[11px] hover:underline">Forgot password?</Link>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-primary hover:bg-secondary text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all w-full"
                                >
                                    Sign In
                                </button>
                            </form>

                            <div className="text-center text-xs h-8 flex items-center justify-center">
                                <div className="text-gray-400">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setIsRegister(true)}
                                        className="text-[#3ec3ff] font-semibold hover:underline"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AuthLayout>
    );
}
