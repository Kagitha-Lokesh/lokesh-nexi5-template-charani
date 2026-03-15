import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Briefcase, Calendar, MapPin, Phone, Shield, Upload, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { attendanceDepartments, employmentTypes } from '@/datasets';
import '@/index.css';

export default function AddEmployee() {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        joinDate: '',
        employmentType: '',
        salary: '',
        gender: '',
        address: '',
        isActive: true
    });

    // Validation State
    const [errors, setErrors] = useState({});

    // UI State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    // Profile image state (mocked)
    const [profileImg, setProfileImg] = useState(null);

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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Mocking an image upload for UI representation using a local blob URL
            const imageUrl = URL.createObjectURL(file);
            setProfileImg(imageUrl);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
        if (!formData.email.trim()) newErrors.email = 'Email is required.';
        // Basic email validation regex
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
        if (!formData.department) newErrors.department = 'Department is required.';
        if (!formData.joinDate) newErrors.joinDate = 'Join Date is required.';

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
                    navigate('/dashboard/employee');
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
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Employee added successfully</p>
                    </div>
                </div>
            )}

            {/* Breadcrumb / Header */}
            <div className="mb-6 flex justify-between w-full">
                <div className={`flex items-center gap-2 text-sm mb-2 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                    <Link to="/dashboard" className={`transition-colors ${isDarkMode ? 'hover:text-[#3ec3ff]' : 'hover:text-primary'}`}>Dashboard</Link>
                    <span>/</span>
                    <Link to="/dashboard/employee" className={`transition-colors ${isDarkMode ? 'hover:text-[#3ec3ff]' : 'hover:text-primary'}`}>Employees</Link>
                    <span>/</span>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-textPrimary'}`}>Add Employee</span>
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
            <div className="flex justify-center pb-12">
                <div className={`w-full max-w-[900px] rounded-[10px] border overflow-hidden transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>

                    {/* Card Header */}
                    <div className={`p-6 md:p-8 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h2 className={`text-[22px] font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Add New Employee</h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Fill in employee details to create a new record.</p>
                    </div>

                    {/* Form Layout */}
                    <form onSubmit={handleSubmit}>

                        {/* Profile Image Section */}
                        <div className={`p-6 md:p-8 border-b ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50/30 border-borderColor'}`}>
                            <div className="flex items-center gap-6">
                                {/* Image Container (90px) */}
                                <div className={`relative w-[90px] h-[90px] rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden shrink-0 transition-all ${isDarkMode ? 'bg-white/5 border-white/20' : 'bg-gray-100 border-gray-300'}`}>
                                    {profileImg ? (
                                        <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className={isDarkMode ? "text-gray-500 text-sm font-medium" : "text-gray-400 text-sm font-medium"}>Photo</span>
                                    )}
                                </div>
                                {/* Upload Button */}
                                <div>
                                    <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium shadow-sm transition-all focus-within:ring-2 active:scale-95 ${isDarkMode ? 'bg-white/10 border-white/10 text-white hover:bg-white/20 focus-within:ring-[#3ec3ff]' : 'bg-white border-borderColor text-dark hover:bg-gray-50 focus-within:ring-primary'}`}>
                                        <Upload size={16} />
                                        <span>Change Photo</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                    <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>
                        </div>

                        {/* Fields Content */}
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                                {/* 1. Full Name */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter employee full name"
                                        className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                            ? `bg-white/5 text-white placeholder:text-gray-600 ${errors.fullName ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'}`
                                            : `text-dark placeholder:text-gray-400 ${errors.fullName ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-borderColor focus:border-primary focus:ring-primary'}`
                                            }`}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName}</p>}
                                </div>

                                {/* 2. Employee ID */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Employee ID
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeId"
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                        placeholder="e.g. LA-0218"
                                        className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                            ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                            : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                            }`}
                                    />
                                </div>

                                {/* 3. Email Address */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="employee@email.com"
                                        className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                            ? `bg-white/5 text-white placeholder:text-gray-600 ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'}`
                                            : `text-dark placeholder:text-gray-400 ${errors.email ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-borderColor focus:border-primary focus:ring-primary'}`
                                            }`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                                </div>

                                {/* 4. Phone Number */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 9876543210"
                                        className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                            ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                            : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                            }`}
                                    />
                                </div>

                                {/* 5. Department */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Department <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-1 transition-all cursor-pointer ${isDarkMode
                                            ? `bg-[#0c162d] text-white border-white/10 focus:border-[#3ec3ff] focus:ring-[#3ec3ff] ${errors.department ? 'border-red-500/50 focus:ring-red-500/50' : ''}`
                                            : `bg-white ${errors.department ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/30 text-red-700' : formData.department ? 'border-borderColor focus:border-primary focus:ring-primary text-dark' : 'border-borderColor focus:border-primary focus:ring-primary text-gray-400'}`
                                            }`}
                                    >
                                        <option value="" disabled className={isDarkMode ? 'bg-[#0c162d]' : ''}>Select department</option>
                                        {attendanceDepartments.filter(d => d.value !== '').map(dept => (
                                            <option key={dept.value} value={dept.label} className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>{dept.label}</option>
                                        ))}
                                    </select>
                                    {errors.department && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.department}</p>}
                                </div>

                                {/* 6. Role / Designation */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Role / Designation
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        placeholder="e.g. Web Developer"
                                        className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                            ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                            : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                            }`}
                                    />
                                </div>

                                {/* 7. Join Date */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Join Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="joinDate"
                                        value={formData.joinDate}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-1 transition-all ${isDarkMode
                                            ? `bg-white/5 border-white/10 text-white focus:border-[#3ec3ff] focus:ring-1 focus:ring-[#3ec3ff] ${errors.joinDate ? 'border-red-500/50' : ''}`
                                            : `bg-white ${errors.joinDate ? 'border-red-500 focus:border-red-500 bg-red-50/30 text-red-700' : formData.joinDate ? 'border-borderColor focus:border-primary focus:ring-primary text-dark' : 'border-borderColor focus:border-primary focus:ring-primary text-gray-400'}`
                                            }`}
                                    />
                                    {errors.joinDate && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.joinDate}</p>}
                                </div>

                                {/* 8. Employment Type */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Employment Type
                                    </label>
                                    <select
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-1 transition-all cursor-pointer ${isDarkMode
                                            ? 'bg-[#0c162d] text-white border-white/10 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                            : `bg-white ${formData.employmentType ? 'border-borderColor focus:border-primary focus:ring-primary text-dark' : 'border-borderColor focus:border-primary focus:ring-primary text-gray-400'}`
                                            }`}
                                    >
                                        <option value="" disabled className={isDarkMode ? 'bg-[#0c162d]' : ''}>Select type</option>
                                        {employmentTypes.map(type => (
                                            <option key={type} value={type} className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* 9. Salary */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Salary
                                    </label>
                                    <div className="relative">
                                        <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>$</span>
                                        <input
                                            type="number"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            placeholder="45000"
                                            className={`w-full pl-8 pr-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                                ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                                : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* 10. Gender */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Gender
                                    </label>
                                    <div className={`flex items-center gap-6 mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={formData.gender === 'Male'}
                                                onChange={handleChange}
                                                className={`w-4 h-4 transition-all ${isDarkMode ? 'accent-[#3ec3ff] bg-white/5 border-white/10' : 'text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2'}`}
                                            />
                                            Male
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={formData.gender === 'Female'}
                                                onChange={handleChange}
                                                className={`w-4 h-4 transition-all ${isDarkMode ? 'accent-[#3ec3ff] bg-white/5 border-white/10' : 'text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2'}`}
                                            />
                                            Female
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Other"
                                                checked={formData.gender === 'Other'}
                                                onChange={handleChange}
                                                className={`w-4 h-4 transition-all ${isDarkMode ? 'accent-[#3ec3ff] bg-white/5 border-white/10' : 'text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2'}`}
                                            />
                                            Other
                                        </label>
                                    </div>
                                </div>

                                {/* 11. Address */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Enter employee address"
                                        className={`w-full px-4 py-3 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 resize-y ${isDarkMode
                                            ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                            : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                            }`}
                                    />
                                </div>

                                {/* 12. Status Toggle */}
                                <div className={`col-span-1 md:col-span-2 pt-2 border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
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
                                    onClick={() => navigate('/dashboard/employee')}
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
                                    {isSubmitting ? 'Saving...' : 'Add Employee'}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
