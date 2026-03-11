import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { fadeUp } from '../../animations/variants';
import logo from '../../assets/nexi5-logo.png';

export default function Footer() {
    return (
        <motion.footer
            id="contact"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-dark text-white pt-16 md:pt-20 pb-10 dark:bg-[#0c162d]/50 dark:backdrop-blur-md dark:border-t dark:border-white/10 transition-colors duration-300"
        >
            <div className="max-w-[1200px] mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img src={logo} alt="Logo" className="h-10 rounded-lg" />
                            <span className="font-headings font-bold text-xl tracking-tight">NEXI5 HRM</span>
                        </div>
                        <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed transition-colors">
                            Smart HR Management Platform for modern organizations. Simplify your HR workflows, from onboarding to offboarding.
                        </p>
                        <div className="flex items-center gap-4 text-gray-400 dark:text-gray-300">
                            <motion.a whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }} href="#" className="hover:text-primary dark:hover:text-white transition-colors"><Twitter size={20} /></motion.a>
                            <motion.a whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }} href="#" className="hover:text-primary dark:hover:text-white transition-colors"><Linkedin size={20} /></motion.a>
                            <motion.a whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }} href="#" className="hover:text-primary dark:hover:text-white transition-colors"><Github size={20} /></motion.a>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 tracking-wide">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-400 dark:text-gray-300 transition-colors">
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Analytics</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Integrations</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 tracking-wide">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400 dark:text-gray-300 transition-colors">
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Partners</a></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 tracking-wide">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-400 dark:text-gray-300 transition-colors">
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Support</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Community</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 dark:border-white/10 flex flex-col items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 transition-colors">
                    <p className="text-center">&copy; {new Date().getFullYear()} NEXI5 HRM Portal. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </motion.footer>
    );
}
