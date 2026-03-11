import React from 'react';
import { motion } from 'framer-motion';
import { UsersRound, Clock, CalendarDays, Receipt, LineChart, FileText } from 'lucide-react';
import { fadeUp } from '../../animations/variants';

const coreFeatures = [
    {
        icon: <UsersRound />,
        title: "Employee Management",
        desc: "Maintain detailed digital records for every employee. Track personal details, job history, skills, and emergency contacts in a secure database."
    },
    {
        icon: <Clock />,
        title: "Attendance & Shift Tracking",
        desc: "Automate time-tracking with digital check-ins, biometric integration support, and customizable shift scheduling tools."
    },
    {
        icon: <CalendarDays />,
        title: "Leave Management",
        desc: "Simplify time-off requests. Employees can check balances, request leave, and managers can approve with a single click."
    },
    {
        icon: <Receipt />,
        title: "Payroll Processing",
        desc: "Generate accurate payslips automatically based on attendance, shifts, leave data, and predefined salary structures without manual calculations."
    },
    {
        icon: <LineChart />,
        title: "Performance Reviews",
        desc: "Set OKRs, track KPIs, and conduct regular 360-degree reviews to foster continuous growth and monitor employee development."
    },
    {
        icon: <FileText />,
        title: "Document Management",
        desc: "Store and organize contracts, policies, and compliance documents securely. Share files globally or with specific departments easily."
    }
];

export default function CoreFeaturesSection() {
    return (
        <motion.section
            id="features"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="py-12 md:py-16 lg:py-24 bg-gray-50 dark:bg-transparent border-y border-gray-100 dark:border-white/10 transition-colors duration-300"
        >
            <div className="max-w-[1200px] mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="font-headings text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4 transition-colors">
                            Everything you need to <br className="hidden md:block" /> manage your workforce
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
                            Powerful tools designed to simplify your daily HR tasks.
                        </p>
                    </div>
                    <button className="text-primary dark:text-[#3ec3ff] font-medium hover:text-secondary dark:hover:text-white flex items-center gap-1 transition-colors">
                        View all features <span className="text-xl">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {coreFeatures.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative bg-white dark:bg-white/5 dark:backdrop-blur-md p-8 rounded-2xl border border-gray-100 dark:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] hover:border-primary/30 dark:hover:border-[#3ec3ff]/30 hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-lightSky dark:bg-white/10 text-primary dark:text-[#3ec3ff] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary dark:group-hover:bg-[#3ec3ff] group-hover:text-white transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-headings text-xl font-bold text-dark dark:text-white mb-3 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </motion.section>
    );
}
