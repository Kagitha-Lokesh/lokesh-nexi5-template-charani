import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck, UserCog, ChevronDown } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import { useTheme } from '@/context/ThemeContext';
import './auth.css';

export default function AuthPage({ onLoginSuccess, initialRegister = false }) {

    /**
     * Exact translation of main.js:
     *
     *   signUpLink click → add 'animated-signin',  remove 'animated-signup'
     *   signInLink click → add 'animated-signup',  remove 'animated-signin'
     *
     * Because mode is a single string, setting it automatically
     * "removes" the previous class — identical behaviour.
     */
    const [mode, setMode] = useState(initialRegister ? 'animated-signin' : '');

    const [showPassword, setShowPassword]       = useState(false);
    const [email, setEmail]                     = useState('');
    const [password, setPassword]               = useState('');
    const [name, setName]                       = useState('');
    const [role, setRole]                       = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate       = useNavigate();
    const { isDarkMode } = useTheme();

    /* ── Exact JS logic → React ─────────────────────────────────────────── */

    // signUpLink click  →  wrapper.classList.add('animated-signin')
    const onSignUpLinkClick = (e) => {
        e.preventDefault();
        setMode('animated-signin');
    };

    // signInLink click  →  wrapper.classList.add('animated-signup')
    const onSignInLinkClick = (e) => {
        e.preventDefault();
        setMode('animated-signup');
    };

    /* ── Form submit handlers ────────────────────────────────────────────── */

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password && role) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', role);
            localStorage.setItem('currentUser', JSON.stringify({ email, role }));
            onLoginSuccess();
            const path = role === 'employee' ? '/dashboard' : `/dashboard/${role}`;
            navigate(path);
        } else if (!role) {
            alert('Please select a role');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (name && email && password && role) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', role);
            localStorage.setItem('currentUser', JSON.stringify({ email, name, role }));
            onLoginSuccess();
            const path = role === 'employee' ? '/dashboard' : `/dashboard/${role}`;
            navigate(path);
        } else if (!role) {
            alert('Please select a role');
        }
    };

    /* ── Shared Tailwind class strings ───────────────────────────────────── */

    const inputClass = `w-full border rounded-lg py-3 pl-10 pr-4 text-xs transition-colors focus:outline-none ${
        isDarkMode
            ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#3ec3ff]/50'
            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary/50'
    }`;

    const selectClass = `w-full border rounded-lg py-3 pl-10 pr-3 text-xs transition-colors appearance-none cursor-pointer font-medium focus:outline-none ${
        isDarkMode
            ? 'bg-[#0c162d] border-white/10 text-white focus:border-[#3ec3ff]/50'
            : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-primary/50'
    }`;

    const cardBase = `form-container w-full rounded-2xl border shadow-2xl backdrop-blur-xl p-8 flex flex-col gap-4 ${
        isDarkMode
            ? 'bg-[#0c162d]/60 border-white/10 text-white'
            : 'bg-white/95 border-gray-200 text-gray-900'
    }`;

    const roleOptions = [
        { value: 'admin',         label: 'Admin / CEO' },
        { value: 'hr-head',       label: 'HR Manager / HR Head' },
        { value: 'hr-accountant', label: 'HR Accountant' },
        { value: 'hr-executive',  label: 'HR Executive' },
        { value: 'bde',           label: 'BDE' },
        { value: 'manager',       label: 'Manager' },
        { value: 'employee',      label: 'Employee' },
    ];

    /* ── Render ──────────────────────────────────────────────────────────── */

    return (
        <AuthLayout>
            <div className="relative w-full" style={{ height: '500px' }}>

                {/* div.wrapper  ←→  class="wrapper [mode]" */}
                <div className={`wrapper ${mode}`}>

                    {/* ── SIGN-UP CARD (starts rotated 7° behind) ───────── */}
                    <div className={`${cardBase} sign-up`}>

                        <div className="text-center">
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3ec3ff] to-primary">
                                Start Your Journey
                            </h1>
                            <p className={`text-[10px] uppercase tracking-wider font-bold mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Create your NEXI5 workspace
                            </p>
                        </div>

                        <form onSubmit={handleRegister} className="flex flex-col gap-3">
                            {/* Name + Email row */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`} size={16} />
                                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className={inputClass} required />
                                </div>
                                <div className="relative">
                                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`} size={16} />
                                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} required />
                                </div>
                            </div>

                            {/* Role */}
                            <div className="relative">
                                <UserCog className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`} size={16} />
                                <select value={role} onChange={e => setRole(e.target.value)} className={selectClass} required>
                                    <option value="" className={isDarkMode ? 'bg-[#0c162d]' : 'bg-white'}>Select Role</option>
                                    {roleOptions.map(o => (
                                        <option key={o.value} value={o.value} className={isDarkMode ? 'bg-[#0c162d]' : 'bg-white'}>{o.label}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`} size={16} />
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} required />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <ShieldCheck className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`} size={16} />
                                <input type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={inputClass} required />
                                <button type="button" onClick={() => setShowPassword(p => !p)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <button type="submit" className="bg-primary hover:bg-secondary text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all w-full mt-1">
                                Create Account
                            </button>
                        </form>

                        {/* signin-link  ←→  signInLink in main.js */}
                        <div className="link text-center text-xs">
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                Already have an account?{' '}
                                <a href="#" className="signin-link text-primary dark:text-[#3ec3ff] font-bold hover:underline"
                                   onClick={onSignInLinkClick}>
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* ── SIGN-IN CARD (starts flat on top) ─────────────── */}
                    <div className={`${cardBase} sign-in`}>

                        <div className="text-center">
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3ec3ff] to-primary">
                                Welcome Back
                            </h1>
                            <p className={`text-[10px] uppercase tracking-wider font-bold mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Sign in to your account
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="flex flex-col gap-3">
                            {/* Email */}
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`} size={16} />
                                <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} required />
                            </div>

                            {/* Role */}
                            <div className="relative">
                                <UserCog className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`} size={16} />
                                <select value={role} onChange={e => setRole(e.target.value)} className={selectClass} required>
                                    <option value="" className={isDarkMode ? 'bg-[#0c162d]' : 'bg-white'}>Select Role</option>
                                    {roleOptions.map(o => (
                                        <option key={o.value} value={o.value} className={isDarkMode ? 'bg-[#0c162d]' : 'bg-white'}>{o.label}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`} size={16} />
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} required />
                                <button type="button" onClick={() => setShowPassword(p => !p)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/50 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <Link to="#" className="text-primary dark:text-[#3ec3ff] text-[11px] font-bold hover:underline">Forgot password?</Link>
                            </div>

                            <button type="submit" className="bg-primary hover:bg-secondary text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all w-full">
                                Sign In
                            </button>
                        </form>

                        {/* signup-link  ←→  signUpLink in main.js */}
                        <div className="link text-center text-xs">
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                Don't have an account?{' '}
                                <a href="#" className="signup-link text-primary dark:text-[#3ec3ff] font-bold hover:underline"
                                   onClick={onSignUpLinkClick}>
                                    Create Account
                                </a>
                            </p>
                        </div>
                    </div>

                </div>{/* /.wrapper */}
            </div>
        </AuthLayout>
    );
}
