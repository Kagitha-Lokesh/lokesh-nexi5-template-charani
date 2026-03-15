import StarCanvas from "@/components/auth/StarCanvas";
import '@/index.css';
import logo from '@/assets/nexi5-logo.png';
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {

  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050b1a]">
      {/* Background remains consistent */}
      <StarCanvas />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 overflow-hidden ${isDarkMode
        ? 'bg-white/5 border-white/10'
        : 'bg-white/80 border-gray-200'
        }`}>
        <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex-shrink-0"
          >
            <div className="flex items-center justify-center h-[110px] bg-gray-900 dark:bg-transparent rounded-lg px-2 transition-all group shadow-sm hover:shadow-md max-w-[160px]">
              <img src={logo} alt="Logo" className="h-full object-contain transform group-hover:scale-105 transition-all" />
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 hover:rotate-12 ${isDarkMode
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 group shadow-sm hover:shadow-md ${isDarkMode
                ? 'text-white border-white/20 hover:bg-white/10'
                : 'text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              aria-label="Go to Home"
            >
              <Home size={18} className="transition-transform group-hover:scale-110" />
              <span className="text-[13px] font-bold tracking-tight">Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Login / Register card */}
      <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 z-30 mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-[440px] relative"
          style={{ paddingBottom: '48px' }}
        >

          {children}
        </motion.div>
      </div>

      {/* background glowing logo */}
      <div className=" w-[100%] h-[100%] overflow-hidden top-[55%] left-[70%] z-20 ">
        <img
          src={logo}
          className="w-[1200px] ml-[27%] logo-glow pointer-events-none"
          alt="NEXI5 Glow Logo"
        />
      </div>

    </div>
  );
}