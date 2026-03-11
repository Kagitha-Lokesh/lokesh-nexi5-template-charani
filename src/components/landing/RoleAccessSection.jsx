import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Building, Users, UserCircle } from 'lucide-react';
import { fadeUp } from '../../animations/variants';

const roles = [
    {
        icon: <Shield size={24} />,
        title: "Admin / CEO",
        color: "from-purple-500 to-indigo-500",
        bg: "bg-purple-50 dark:bg-purple-500/10",
        iconColor: "text-purple-600 dark:text-purple-400",
        features: [
            "Strategic dashboards",
            "Organization management",
            "Analytics and reporting"
        ]
    },
    {
        icon: <Building size={24} />,
        title: "HR Department",
        color: "from-primary to-secondary",
        bg: "bg-blue-50 dark:bg-blue-500/10",
        iconColor: "text-primary dark:text-[#3ec3ff]",
        features: [
            "Employee lifecycle management",
            "Payroll processing",
            "Leave approvals",
            "Training management"
        ]
    },
    {
        icon: <Users size={24} />,
        title: "Managers",
        color: "from-amber-500 to-orange-500",
        bg: "bg-amber-50 dark:bg-amber-500/10",
        iconColor: "text-amber-600 dark:text-amber-400",
        features: [
            "Team dashboards",
            "Performance reviews",
            "Leave approvals"
        ]
    },
    {
        icon: <UserCircle size={24} />,
        title: "Employees",
        color: "from-emerald-500 to-teal-500",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        features: [
            "Self service portal",
            "Attendance tracking",
            "Payslip viewing",
            "Leave requests"
        ]
    }
];

export default function RoleAccessSection() {
    return (
        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="py-12 md:py-16 lg:py-24 bg-white dark:bg-transparent overflow-hidden transition-colors duration-300"
        >
            <div className="max-w-[1200px] mx-auto px-6">

                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 font-medium text-sm mb-4 transition-colors">
                        Role-Based Capabilities
                    </div>
                    <h2 className="font-headings text-3xl md:text-[40px] font-bold text-dark dark:text-white mb-4 transition-colors">
                        Built for everyone in your company
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
                        Customized experiences, dashboards, and permissions for different roles to ensure smooth HR operations.
                    </p>
                </div>

                {/* Horizontal scroll on mobile, grid on desktop */}
                <div className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 snap-x snap-mandatory hide-scrollbar">
                    {roles.map((role, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="min-w-[280px] md:min-w-0 flex-1 snap-center bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-2xl border border-gray-100 dark:border-white/10 p-6 shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                        >
                            {/* Top Gradient Line */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className={`w-14 h-14 rounded-xl ${role.bg} ${role.iconColor} flex items-center justify-center mb-6 transition-colors`}>
                                {role.icon}
                            </div>

                            <h3 className="font-headings text-xl font-bold text-dark dark:text-white mb-4 transition-colors">{role.title}</h3>

                            <ul className="space-y-3">
                                {role.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 transition-colors" />
                                        <span className="text-gray-600 dark:text-gray-300 text-sm leading-snug transition-colors">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
        </motion.section>
    );
}
