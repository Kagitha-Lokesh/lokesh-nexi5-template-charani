import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import '@/index.css';

export default function AddDepartment() {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        head: '',
        employees: '',
        description: '',
        isActive: true
    });

    // Validation State
    const [errors, setErrors] = useState({});

    // UI State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Department name is required.';
        if (!formData.head) newErrors.head = 'Department head is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setShowSuccess(true);

                // Redirect after showing success toast
                setTimeout(() => {
                    navigate('/dashboard/departments');
                }, 1500);
            }, 800);
        }
    };

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 font-body min-h-screen relative ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Success Toast Overlay */}
            {showSuccess && (
                <div className={`fixed top-24 right-8 shadow-lg rounded-md p-4 flex items-center gap-3 z-50 animate-slide-in-right border-l-4 transition-all ${isDarkMode ? 'bg-[#0c162d] border-[#3ec3ff] text-white border border-white/10' : 'bg-white border-emerald-500 border-l-emerald-500 border border-emerald-200'}`}>
                    <CheckCircle2 className={isDarkMode ? "text-[#3ec3ff]" : "text-emerald-500"} size={24} />
                    <div>
                        <h4 className="font-bold text-sm">Success!</h4>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Department added successfully</p>
                    </div>
                </div>
            )}

            {/* Breadcrumb / Header */}
            <div className="mb-6 flex justify-between w-full">
                <div className={`flex items-center gap-2 text-sm mb-2 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                    <Link to="/dashboard" className={`transition-colors ${isDarkMode ? 'hover:text-[#3ec3ff]' : 'hover:text-primary'}`}>Dashboard</Link>
                    <span>/</span>
                    <Link to="/dashboard/departments" className={`transition-colors ${isDarkMode ? 'hover:text-[#3ec3ff]' : 'hover:text-primary'}`}>Departments</Link>
                    <span>/</span>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-textPrimary'}`}>Add Department</span>
                </div>
                {/* Back Button */}
                <div className="mb-6 flex items-center max-w-[700px] mr-10 w-[100px]">
                    <button
                        onClick={() => navigate(-1)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90' : 'bg-secondary text-white hover:bg-blue-700'}`}
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                </div>

            </div>



            {/* Centered Form Container */}
            <div className="flex justify-center">
                <div className={`w-full max-w-[700px] rounded-[10px] border overflow-hidden transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>

                    {/* Card Header */}
                    <div className={`p-6 md:p-8 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h2 className={`text-[22px] font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Add New Department</h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Fill the information to create a department.</p>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                            {/* Department Name */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Department Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter department name"
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                        ? `bg-white/5 text-white placeholder:text-gray-600 ${errors.name ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'}`
                                        : `text-dark placeholder:text-gray-400 ${errors.name ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-borderColor focus:border-primary focus:ring-primary'}`
                                        }`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                            </div>

                            {/* Department Code */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Department Code
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    placeholder="Enter department code"
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                        : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                        }`}
                                />
                            </div>

                            {/* Total Employees */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Total Employees
                                </label>
                                <input
                                    type="number"
                                    name="employees"
                                    value={formData.employees}
                                    onChange={handleChange}
                                    placeholder="Enter number of employees"
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                        : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                        }`}
                                />
                            </div>

                            {/* Department Head */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Department Head <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="head"
                                    value={formData.head}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-1 transition-all cursor-pointer ${isDarkMode
                                        ? `bg-[#0c162d] text-white border-white/10 focus:border-[#3ec3ff] focus:ring-[#3ec3ff] ${errors.head ? 'border-red-500/50' : ''}`
                                        : `bg-white ${errors.head ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/30 text-red-700' : formData.head ? 'border-borderColor focus:border-primary focus:ring-primary text-dark' : 'border-borderColor focus:border-primary focus:ring-primary text-gray-400'}`
                                        }`}
                                >
                                    <option value="" disabled className={isDarkMode ? 'bg-[#0c162d]' : ''}>Select department head</option>
                                    <option value="John Smith" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>John Smith</option>
                                    <option value="Maryam Amiri" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>Maryam Amiri</option>
                                    <option value="Frank Camly" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>Frank Camly</option>
                                    <option value="Gary Camara" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>Gary Camara</option>
                                </select>
                                {errors.head && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.head}</p>}
                            </div>

                            {/* Description */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Department Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Write short department description"
                                    className={`w-full px-4 py-3 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 resize-y ${isDarkMode
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                        : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                        }`}
                                ></textarea>
                            </div>

                            {/* Status Toggle */}
                            <div className="col-span-1 md:col-span-2 pt-2">
                                <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Status
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, isActive: !p.isActive }))}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode
                                            ? (formData.isActive ? 'bg-[#3ec3ff]' : 'bg-white/10 focus:ring-[#3ec3ff] focus:ring-offset-[#0c162d]')
                                            : (formData.isActive ? 'bg-primary' : 'bg-gray-200 focus:ring-primary')
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                    <span className={`text-sm font-medium ${isDarkMode ? (formData.isActive ? 'text-[#3ec3ff]' : 'text-gray-500') : (formData.isActive ? 'text-primary' : 'text-textSecondary')}`}>
                                        {formData.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={`pt-6 border-t flex justify-end gap-3 flex-col sm:flex-row ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard/departments')}
                                disabled={isSubmitting}
                                className={`px-6 py-2.5 rounded-md border font-medium text-sm transition-colors w-full sm:w-auto text-center disabled:opacity-50 ${isDarkMode
                                    ? 'border-white/10 text-gray-300 hover:bg-white/5 hover:text-white'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-dark'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || showSuccess}
                                className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all w-full sm:w-auto text-center shadow-sm disabled:opacity-70 flex justify-center items-center gap-2 ${isDarkMode
                                    ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90'
                                    : 'bg-primary text-white hover:bg-sky-500'
                                    }`}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Department'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className="py-6 text-center mt-auto">
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
