import StarCanvas from "@/components/auth/StarCanvas";
import '@/index.css';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from '@/assets/NEXI5-logo.png';

export default function AuthLayout({ children }) {
  return (
    <div className="w-screen h-screen">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
        <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <img src={logo} alt="Logo" className="w-48 h-24 rounded-lg transform group-hover:scale-105 transition-all object-contain" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-white px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all group font-semibold text-sm"
          >
            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </Link>
        </div>
      </nav>

      <StarCanvas />

      {/* Login / Register card */}
      <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 z-30">

        <div
          className="w-[380px] p-10 rounded-xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl flex flex-col gap-4 text-white"
        >
          <img src={logo} className="w-[90px] mx-auto" alt="Logo" />

          <h2 className="text-center text-lg font-semibold">
            NEXI5 HR Platform
          </h2>

          {children}

        </div>
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