import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../animations/variants';

const techStack = [
    { name: "React", desc: "Frontend Interface", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20" },
    { name: "Next.js", desc: "Server rendering", color: "bg-gray-50 dark:bg-gray-500/10 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-500/20" },
    { name: "Node.js", desc: "Backend API", color: "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-500/20" },
    { name: "Express", desc: "Web Framework", color: "bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/20" },
    { name: "MongoDB", desc: "Document Database", color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20" },
    { name: "PostgreSQL", desc: "Relational DB", color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20" },
    { name: "JWT", desc: "Authentication", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20" },
    { name: "Recharts", desc: "Data Visualization", color: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20" },
    { name: "AWS S3", desc: "File Storage", color: "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20" },
    { name: "Tailwind CSS", desc: "Styling", color: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-500/20" },
];

export default function TechStackSection() {
    return (
        <motion.section
            id="technology"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="py-12 md:py-16 lg:py-24 bg-white dark:bg-transparent transition-colors duration-300"
        >
            <div className="max-w-[1200px] mx-auto px-6 text-center">

                <div className="mb-16">
                    <h2 className="font-headings text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4 transition-colors">
                        Powered by modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-[#3ec3ff] dark:to-primary">Technology</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
                        Built on a robust, scalable, and secure technology foundation to ensure high performance and data security.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {techStack.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border ${tech.color} min-w-[140px] shadow-sm transition-colors`}
                        >
                            <span className="font-bold text-lg mb-1">{tech.name}</span>
                            <span className="text-xs opacity-80">{tech.desc}</span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </motion.section>
    );
}
