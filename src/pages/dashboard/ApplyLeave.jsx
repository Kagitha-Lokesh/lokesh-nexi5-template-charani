import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Send, Clock, AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import '@/index.css';

export default function ApplyLeave() {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    // Form State
    const [formData, setFormData] = useState({
        employeeName: 'John Smith', // Auto-filled mock
        leaveType: '',
        fromDate: '',
        toDate: '',
        reason: '',
        emergencyContact: '',
        attachment: null
    });


    // Validation State
    const [errors, setErrors] = useState({});

    // UI State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [fileName, setFileName] = useState('');

    // Calculate Total Days (Derived State)
    let computedTotalDays = '';
    let toDateError = '';

    if (formData.fromDate && formData.toDate) {
        const start = new Date(formData.fromDate);
        const end = new Date(formData.toDate);

        if (end < start) {
            toDateError = 'End date cannot be before start date.';
        } else {
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            computedTotalDays = `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, attachment: file }));
            setFileName(file.name);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.leaveType) newErrors.leaveType = 'Please select leave type.';
        if (!formData.fromDate) newErrors.fromDate = 'From date is required.';
        if (!formData.toDate) newErrors.toDate = 'To date is required.';
        if (toDateError) newErrors.toDate = toDateError;
        if (!formData.reason.trim()) newErrors.reason = 'Reason for leave is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && (!formData.fromDate || !formData.toDate || new Date(formData.toDate) >= new Date(formData.fromDate));
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
                    navigate('/dashboard/leaves');
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
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Leave request submitted successfully</p>
                    </div>
                </div>
            )}

            {/* Breadcrumb / Header */}
            <div className="mb-6 flex justify-between w-full">
                <div className={`flex items-center gap-2 text-sm mb-2 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                    <Link to="/dashboard" className={`transition-colors ${isDarkMode ? 'hover:text-[#3ec3ff]' : 'hover:text-primary'}`}>Dashboard</Link>
                    <span>/</span>
                    <Link to="/dashboard/leaves" className={`transition-colors ${isDarkMode ? 'hover:text-[#3ec3ff]' : 'hover:text-primary'}`}>Leave Management</Link>
                    <span>/</span>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-textPrimary'}`}>Apply Leave</span>
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
                <div className={`w-full max-w-[700px] rounded-[10px] border overflow-hidden transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>

                    {/* Card Header */}
                    <div className={`p-6 md:p-8 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h2 className={`text-[22px] font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Apply Leave</h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Submit a leave request for approval.</p>
                    </div>

                    {/* Form Layout */}
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                            {/* 1. Employee Name (Auto-filled) */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Employee Name
                                </label>
                                <select
                                    name="employeeName"
                                    value={formData.employeeName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 cursor-not-allowed ${isDarkMode
                                        ? 'bg-white/5 border-white/10 text-gray-400 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                        : 'bg-gray-50 border-borderColor text-dark focus:border-primary focus:ring-primary'
                                        }`}
                                    disabled
                                >
                                    <option value="John Smith">John Smith</option>
                                </select>
                                <p className={`text-xs mt-1.5 font-medium ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Auto-filled based on logged in user.</p>
                            </div>

                            {/* 2. Leave Type */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Leave Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="leaveType"
                                    value={formData.leaveType}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 cursor-pointer ${isDarkMode
                                        ? `bg-[#0c162d] text-white border-white/10 focus:border-[#3ec3ff] focus:ring-[#3ec3ff] ${errors.leaveType ? 'border-red-500/50 focus:ring-red-500/50' : ''}`
                                        : `bg-white ${errors.leaveType ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/30 text-red-700' : formData.leaveType ? 'border-borderColor focus:border-primary focus:ring-primary text-dark' : 'border-borderColor focus:border-primary focus:ring-primary text-gray-400'}`
                                        }`}
                                >
                                    <option value="" disabled className={isDarkMode ? 'bg-[#0c162d]' : ''}>Select leave type</option>
                                    <option value="Annual Leave" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>Annual Leave</option>
                                    <option value="Sick Leave" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>Sick Leave</option>
                                    <option value="Casual Leave" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>Casual Leave</option>
                                    <option value="Maternity Leave" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>Maternity Leave</option>
                                    <option value="Work From Home" className={isDarkMode ? 'bg-[#0c162d]' : 'text-dark'}>Work From Home</option>
                                </select>
                                {errors.leaveType && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.leaveType}</p>}
                            </div>

                            {/* 3. From Date */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    From Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={formData.fromDate}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                        ? `bg-white/5 border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff] ${errors.fromDate ? 'border-red-500/50' : ''}`
                                        : `bg-white ${errors.fromDate ? 'border-red-500 focus:border-red-500 bg-red-50/30 text-red-700' : formData.fromDate ? 'border-borderColor focus:border-primary focus:ring-primary text-dark' : 'border-borderColor focus:border-primary focus:ring-primary text-gray-400'}`
                                        }`}
                                />
                                {errors.fromDate && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fromDate}</p>}
                            </div>

                            {/* 4. To Date */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    To Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="toDate"
                                    value={formData.toDate}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                        ? `bg-white/5 border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff] ${errors.toDate || toDateError ? 'border-red-500/50' : ''}`
                                        : `bg-white ${errors.toDate || toDateError ? 'border-red-500 focus:border-red-500 bg-red-50/30 text-red-700' : formData.toDate ? 'border-borderColor focus:border-primary focus:ring-primary text-dark' : 'border-borderColor focus:border-primary focus:ring-primary text-gray-400'}`
                                        }`}
                                />
                                {(errors.toDate || toDateError) && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.toDate || toDateError}</p>}
                            </div>

                            {/* 5. Total Days (Auto-Calculated) */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Total Days
                                </label>
                                <input
                                    type="text"
                                    value={computedTotalDays}
                                    readOnly
                                    placeholder="0 Days"
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all cursor-not-allowed font-medium ${isDarkMode
                                        ? 'bg-white/10 border-white/10 text-gray-300'
                                        : 'bg-gray-50 border-borderColor text-dark'
                                        }`}
                                />
                            </div>

                            {/* 6. Reason for Leave */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Reason for Leave <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Describe reason for leave"
                                    className={`w-full px-4 py-3 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 resize-y ${isDarkMode
                                        ? `bg-white/5 text-white placeholder:text-gray-600 ${errors.reason ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'}`
                                        : `text-dark placeholder:text-gray-400 ${errors.reason ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-borderColor focus:border-primary focus:ring-primary'}`
                                        }`}
                                />
                                {errors.reason && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.reason}</p>}
                            </div>

                            {/* 7. Emergency Contact */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Emergency Contact
                                </label>
                                <input
                                    type="tel"
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                    placeholder="Emergency phone number"
                                    className={`w-full px-4 py-2.5 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                        : 'border-borderColor text-dark placeholder:text-gray-400 focus:border-primary focus:ring-primary'
                                        }`}
                                />
                            </div>

                            {/* 8. Attachment */}
                            <div className="col-span-1 md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>
                                    Attachment
                                </label>
                                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-all ${isDarkMode
                                    ? 'border-white/10 hover:bg-white/5'
                                    : 'border-borderColor hover:bg-gray-50/50'
                                    }`}>
                                    <div className="space-y-1 text-center flex flex-col items-center">
                                        <Upload className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} strokeWidth={1} />
                                        <div className="flex text-sm mt-2">
                                            <label className={`relative cursor-pointer rounded-md font-medium transition-colors focus-within:outline-none ${isDarkMode ? 'text-[#3ec3ff] hover:text-[#3ec3ff]/80' : 'text-primary hover:text-sky-500'}`}>
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} accept=".pdf,image/*" />
                                            </label>
                                            <p className={`pl-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>or drag and drop</p>
                                        </div>
                                        {fileName ? (
                                            <p className={`text-xs font-semibold mt-2 ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{fileName}</p>
                                        ) : (
                                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>PDF or Image up to 10MB</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={`pt-6 border-t flex justify-end gap-3 flex-col sm:flex-row ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard/leaves')}
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
                                {isSubmitting ? 'Submitting...' : 'Submit Leave'}
                            </button>
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
