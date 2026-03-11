import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, Target, FileText, BookOpen } from 'lucide-react';
import { fadeUp } from '../../animations/variants';
import nexi5Logo from '../../assets/nexi5-logo.png';

const features = [
    { icon: <Users size={20} />, title: "Employee Lifecycle Management" },
    { icon: <Calendar size={20} />, title: "Attendance & Leave Tracking" },
    { icon: <DollarSign size={20} />, title: "Payroll Processing" },
    { icon: <Target size={20} />, title: "Performance Management" },
    { icon: <FileText size={20} />, title: "Document Management" },
    { icon: <BookOpen size={20} />, title: "Training & Development" },
];

export default function AboutSection() {
    return (
        <motion.section
            id="solutions"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative py-12 md:py-16 lg:py-24 bg-gray-50 dark:bg-transparent transition-colors duration-300 z-0"
        >
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-primary to-secondary blur-[120px] opacity-20 dark:opacity-40 -z-10 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side - Abstract Illustration */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-square max-w-[500px] mx-auto relative flex items-center justify-center">
                            {/* Decorative rings */}
                            <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-white/10 transition-colors" />
                            <div className="absolute inset-8 rounded-full border border-gray-200 dark:border-white/10 border-dashed transition-colors" />
                            <div className="absolute inset-16 rounded-full border border-primary/20 dark:border-[#3ec3ff]/20 bg-lightSky/30 dark:bg-white/5 transition-colors" />

                            {/* Central Element */}
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary dark:from-[#3ec3ff] dark:to-primary rounded-2xl shadow-soft flex items-center justify-center z-10 transform rotate-3">
                                <img src={nexi5Logo} alt="Logo" className="h-[65px] w-[65px] rounded-lg rounded-[50%] " />
                            </div>

                            {/* Floating nodes */}
                            {[
                                { top: '10%', left: '50%', color: 'bg-green-400', delay: 0 },
                                { top: '30%', left: '85%', color: 'bg-blue-400', delay: 1 },
                                { top: '75%', left: '80%', color: 'bg-indigo-400', delay: 2 },
                                { top: '90%', left: '45%', color: 'bg-amber-400', delay: 3 },
                                { top: '70%', left: '15%', color: 'bg-rose-400', delay: 4 },
                                { top: '25%', left: '20%', color: 'bg-teal-400', delay: 5 },
                            ].map((node, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, delay: node.delay }}
                                    className={`absolute w-12 h-12 ${node.color} rounded-full flex items-center justify-center text-white shadow-soft z-10`}
                                    style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
                                >
                                    <Users size={20} />
                                </motion.div>
                            ))}

                            {/* Connectors */}
                            <svg className="absolute inset-0 w-full h-full text-gray-200 dark:text-white/10 transition-colors" style={{ zIndex: 0 }}>
                                <circle cx="50%" cy="50%" r="40%" fill="none" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="text-primary dark:text-[#3ec3ff] font-medium text-sm tracking-wider uppercase mb-3 transition-colors">About The Platform</div>
                        <h2 className="font-headings text-3xl md:text-4xl font-bold text-dark dark:text-white mb-6 transition-colors">
                            Complete HR Management System
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 leading-relaxed transition-colors">
                            Transform your human resources department from a tactical necessity to a strategic advantage. Our platform centralizes all HR operations, eliminating paperwork and improving cross-team efficiency.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-soft hover:border-primary/30 dark:hover:border-[#3ec3ff]/30 transition-all cursor-default group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-lightSky dark:bg-white/10 text-primary dark:text-[#3ec3ff] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <span className="font-medium text-dark dark:text-white text-sm sm:text-base transition-colors">{feature.title}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
}
