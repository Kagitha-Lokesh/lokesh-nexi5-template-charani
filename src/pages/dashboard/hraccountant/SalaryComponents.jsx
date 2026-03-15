import { useState } from 'react';
import {
    Plus, Upload, Edit2, Trash2, ChevronRight, X, Save,
    DollarSign, TrendingDown, Settings, FileText, Download,
    RefreshCw, ToggleLeft, ToggleRight, GripVertical,
    CheckCircle2, AlertCircle, ChevronDown, Info, Layers
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
    initialEarnings, initialDeductions, salaryFormulas as formulas,
    previewEarnings, previewDeductions, TAG_COLORS,
    CALC_METHODS, SALARY_DEPARTMENTS as DEPARTMENTS
} from '@/datasets/hraccountant/salaryComponentsData';

// ─── Sub-components ───────────────────────────────────────────────────────────

function ComponentCard({ item, isDarkMode, isDeduction, onEdit, onToggle, onDelete }) {
    return (
        <div className={`group p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex gap-3 ${isDarkMode
            ? 'bg-[#0c162d]/60 border-white/10 hover:border-white/20'
            : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
        } ${!item.status ? 'opacity-60' : ''}`}>

            {/* Drag Handle */}
            <div className={`flex items-center shrink-0 cursor-grab active:cursor-grabbing ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                <GripVertical size={16} />
            </div>

            {/* Icon */}
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isDeduction ? 'bg-red-500/10' : 'bg-blue-500/10'}`}>
                {isDeduction
                    ? <TrendingDown size={16} className="text-red-500" />
                    : <DollarSign size={16} className="text-blue-500" />
                }
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-dark'}`}>{item.name}</p>
                        <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.calc}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${TAG_COLORS[item.tag] || 'bg-gray-100 text-gray-500'}`}>
                            {item.tag}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${isDeduction ? 'text-red-500' : 'text-emerald-500'}`}>
                            {item.value !== '—' ? (isDeduction ? `− ${item.value}` : `+ ${item.value}`) : item.value}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.type === 'Fixed'
                            ? isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'
                            : isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'
                        }`}>{item.type}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            title={item.status ? 'Disable' : 'Enable'}
                            onClick={() => onToggle(item.id)}
                            className={`p-1 rounded transition-all ${item.status
                                ? isDarkMode ? 'text-emerald-400 hover:bg-white/5' : 'text-emerald-500 hover:bg-emerald-50'
                                : isDarkMode ? 'text-gray-500 hover:bg-white/5' : 'text-gray-400 hover:bg-gray-100'
                            }`}
                        >
                            {item.status ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        </button>
                        <button title="Edit" onClick={() => onEdit(item)} className={`p-1 rounded transition-all ${isDarkMode ? 'text-blue-400 hover:bg-white/5' : 'text-blue-500 hover:bg-blue-50'}`}>
                            <Edit2 size={13} />
                        </button>
                        <button title="Delete" onClick={() => onDelete(item.id)} className={`p-1 rounded transition-all ${isDarkMode ? 'text-red-400 hover:bg-white/5' : 'text-red-500 hover:bg-red-50'}`}>
                            <Trash2 size={13} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DrawerField({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
            {children}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SalaryComponents() {
    const { isDarkMode } = useTheme();
    const [earnings, setEarnings] = useState(initialEarnings);
    const [deductions, setDeductions] = useState(initialDeductions);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [drawerType, setDrawerType] = useState('Earning');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Form state
    const [form, setForm] = useState({
        name: '', type: 'Earning', calcMethod: 'Fixed Amount',
        fixedAmount: '', percentage: '', departments: 'All Departments', status: true,
    });

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const textMuted = isDarkMode ? 'text-gray-400' : 'text-textSecondary';
    const inputClass = `w-full px-3 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 ${isDarkMode
        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20'
        : 'bg-gray-50 border-borderColor text-dark focus:border-blue-500/50 focus:ring-blue-500/20'}`;
    const selectClass = `${inputClass} appearance-none`;

    const openDrawer = (item = null, type = 'Earning') => {
        setEditItem(item);
        setDrawerType(type);
        setForm(item
            ? { name: item.name, type, calcMethod: item.type === 'Fixed' ? 'Fixed Amount' : 'Percentage of Basic Salary', fixedAmount: '', percentage: '', departments: 'All Departments', status: item.status }
            : { name: '', type, calcMethod: 'Fixed Amount', fixedAmount: '', percentage: '', departments: 'All Departments', status: true }
        );
        setDrawerOpen(true);
    };

    const handleToggle = (id, isDeduction) => {
        if (isDeduction) setDeductions(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
        else setEarnings(prev => prev.map(e => e.id === id ? { ...e, status: !e.status } : e));
    };

    const handleDelete = (id, isDeduction) => {
        if (isDeduction) setDeductions(prev => prev.filter(d => d.id !== id));
        else setEarnings(prev => prev.filter(e => e.id !== id));
    };

    const handleSave = () => {
        if (!form.name.trim()) return;
        const newItem = {
            id: `${form.type[0].toLowerCase()}${Date.now()}`,
            name: form.name,
            type: form.calcMethod.includes('Percentage') ? 'Percentage' : form.calcMethod.includes('KPI') ? 'Variable' : 'Fixed',
            calc: form.calcMethod,
            value: form.fixedAmount ? `₹${parseInt(form.fixedAmount || 0).toLocaleString('en-IN')}` : '—',
            status: form.status,
            tag: form.type === 'Earning' ? 'Allowance' : 'Other',
        };
        if (form.type === 'Earning') {
            setEarnings(prev => editItem ? prev.map(e => e.id === editItem.id ? { ...newItem, id: editItem.id } : e) : [...prev, newItem]);
        } else {
            setDeductions(prev => editItem ? prev.map(d => d.id === editItem.id ? { ...newItem, id: editItem.id } : d) : [...prev, newItem]);
        }
        setDrawerOpen(false);
    };

    const categories = ['All', 'Core', 'Allowance', 'Incentive', 'Variable', 'Statutory', 'Tax'];
    const filteredEarnings = earnings.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (activeCategory === 'All' || e.tag === activeCategory)
    );
    const filteredDeductions = deductions.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (activeCategory === 'All' || d.tag === activeCategory)
    );

    const totalEarnings = 9_40_000;
    const totalDeductions = 1_30_650;
    const netSalary = totalEarnings - totalDeductions;

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ── Module Title ──────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Layers size={20} className="text-blue-500" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                            Salary Components
                        </h1>
                        <p className={`text-xs mt-0.5 ${textMuted}`}>Configure salary structures, earnings and deduction components</p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}>
                        <Upload size={15} /> Import Structure
                    </button>
                    <button
                        onClick={() => openDrawer(null, 'Earning')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Plus size={15} /> Create Component
                    </button>
                </div>
            </div>

            {/* ── Search + Category Filter ───────────────────────────────────── */}
            <div className={`${cardClass} p-4`}>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-80">
                        <input
                            type="text"
                            placeholder="Search salary components..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 ${isDarkMode
                                ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20'
                                : 'bg-gray-50 border-borderColor focus:border-blue-500/50 focus:ring-blue-500/20'
                            }`}
                        />
                        <Settings size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === cat
                                    ? 'bg-blue-500 text-white'
                                    : isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Salary Structure Builder: Earnings + Deductions ──────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Earnings Panel */}
                <div className={`${cardClass} flex flex-col`}>
                    <div className={cardHeaderClass}>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <DollarSign size={15} className="text-blue-500" />
                            </div>
                            <h3 className={headingClass}>Earnings Components</h3>
                            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500">{filteredEarnings.length}</span>
                        </div>
                        <button
                            onClick={() => openDrawer(null, 'Earning')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                        >
                            <Plus size={13} /> Add Earning
                        </button>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        {filteredEarnings.length > 0 ? filteredEarnings.map(item => (
                            <ComponentCard
                                key={item.id}
                                item={item}
                                isDarkMode={isDarkMode}
                                isDeduction={false}
                                onEdit={i => openDrawer(i, 'Earning')}
                                onToggle={id => handleToggle(id, false)}
                                onDelete={id => handleDelete(id, false)}
                            />
                        )) : (
                            <p className={`text-center py-8 text-sm ${textMuted}`}>No earnings components found</p>
                        )}
                        <div className={`mt-2 p-3 rounded-xl flex items-center justify-between border ${isDarkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                            <span className={`text-xs font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Total Gross Earnings</span>
                            <span className={`text-sm font-bold text-emerald-500`}>+ ₹9,40,000</span>
                        </div>
                    </div>
                </div>

                {/* Deductions Panel */}
                <div className={`${cardClass} flex flex-col`}>
                    <div className={cardHeaderClass}>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
                                <TrendingDown size={15} className="text-red-500" />
                            </div>
                            <h3 className={headingClass}>Deduction Components</h3>
                            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-500">{filteredDeductions.length}</span>
                        </div>
                        <button
                            onClick={() => openDrawer(null, 'Deduction')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                        >
                            <Plus size={13} /> Add Deduction
                        </button>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        {filteredDeductions.length > 0 ? filteredDeductions.map(item => (
                            <ComponentCard
                                key={item.id}
                                item={item}
                                isDarkMode={isDarkMode}
                                isDeduction={true}
                                onEdit={i => openDrawer(i, 'Deduction')}
                                onToggle={id => handleToggle(id, true)}
                                onDelete={id => handleDelete(id, true)}
                            />
                        )) : (
                            <p className={`text-center py-8 text-sm ${textMuted}`}>No deduction components found</p>
                        )}
                        <div className={`mt-2 p-3 rounded-xl flex items-center justify-between border ${isDarkMode ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
                            <span className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>Total Deductions</span>
                            <span className="text-sm font-bold text-red-500">− ₹1,30,650</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Salary Formula Rules + Salary Preview ─────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Salary Formula Rules */}
                <div className={`${cardClass} flex flex-col`}>
                    <div className={cardHeaderClass}>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                <FileText size={15} className="text-amber-500" />
                            </div>
                            <h3 className={headingClass}>Salary Calculation Rules</h3>
                        </div>
                        <Info size={16} className={textMuted} />
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        {formulas.map((f, i) => (
                            <div key={i} className={`p-3 rounded-lg flex items-start gap-3 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                <ChevronRight size={14} className={`mt-0.5 shrink-0 ${f.color}`} />
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${f.color}`}>{f.label}</p>
                                    <code className={`text-xs font-mono font-semibold block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {f.formula}
                                    </code>
                                </div>
                            </div>
                        ))}
                        <button className={`mt-1 flex items-center gap-2 text-xs font-semibold transition-all ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                            <Plus size={13} /> Add Custom Formula
                        </button>
                    </div>
                </div>

                {/* Salary Structure Preview */}
                <div className={`${cardClass} flex flex-col`}>
                    <div className={cardHeaderClass}>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <CheckCircle2 size={15} className="text-emerald-500" />
                            </div>
                            <h3 className={headingClass}>Salary Structure Preview</h3>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>Live Preview</span>
                    </div>
                    <div className="p-4 flex flex-col gap-4">

                        {/* CTC */}
                        <div className={`p-4 rounded-xl flex items-center justify-between border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Annual CTC</span>
                            <span className={`text-xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>₹10,00,000</span>
                        </div>

                        {/* Earnings breakdown */}
                        <div>
                            <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Earnings</p>
                            <div className={`rounded-xl border divide-y overflow-hidden ${isDarkMode ? 'border-white/10 divide-white/5' : 'border-gray-100 divide-gray-50'}`}>
                                {previewEarnings.map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between px-4 py-2.5 text-sm ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-colors`}>
                                        <span className={textMuted}>{item.label}</span>
                                        <span className="text-emerald-500 font-semibold">+ {item.amount}</span>
                                    </div>
                                ))}
                                <div className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold ${isDarkMode ? 'bg-white/5' : 'bg-blue-50'}`}>
                                    <span className={isDarkMode ? 'text-gray-300' : 'text-blue-700'}>Gross Total</span>
                                    <span className="text-emerald-500">+ ₹9,40,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Deductions breakdown */}
                        <div>
                            <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Deductions</p>
                            <div className={`rounded-xl border divide-y overflow-hidden ${isDarkMode ? 'border-white/10 divide-white/5' : 'border-gray-100 divide-gray-50'}`}>
                                {previewDeductions.map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between px-4 py-2.5 text-sm ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-colors`}>
                                        <span className={textMuted}>{item.label}</span>
                                        <span className="text-red-500 font-semibold">− {item.amount}</span>
                                    </div>
                                ))}
                                <div className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold ${isDarkMode ? 'bg-white/5' : 'bg-red-50'}`}>
                                    <span className={isDarkMode ? 'text-gray-300' : 'text-red-700'}>Total Deductions</span>
                                    <span className="text-red-500">− ₹1,30,650</span>
                                </div>
                            </div>
                        </div>

                        {/* Net Salary */}
                        <div className={`p-4 rounded-xl flex items-center justify-between border ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                            <div>
                                <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Annual Net Salary</p>
                                <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>After all deductions</p>
                            </div>
                            <span className="text-2xl font-bold text-emerald-500">₹8,09,350</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Quick Actions ─────────────────────────────────────────────── */}
            <div className={`${cardClass} p-6`}>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
                            <Settings size={15} className="text-violet-500" />
                        </div>
                        <h3 className={headingClass}>Quick Actions</h3>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'Create Salary Component', icon: Plus, color: 'text-blue-500', bg: 'bg-blue-500/10', action: () => openDrawer(null, 'Earning') },
                        { label: 'Update Salary Structure', icon: RefreshCw, color: 'text-violet-500', bg: 'bg-violet-500/10', action: () => {} },
                        { label: 'Export Salary Template', icon: Download, color: 'text-emerald-500', bg: 'bg-emerald-500/10', action: () => {} },
                        { label: 'Apply Salary Rules', icon: CheckCircle2, color: 'text-amber-500', bg: 'bg-amber-500/10', action: () => {} },
                    ].map((btn, i) => (
                        <button
                            key={i}
                            onClick={btn.action}
                            className={`flex flex-col items-center gap-3 p-4 rounded-xl border text-center transition-all active:scale-95 hover:-translate-y-1 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}
                        >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${btn.bg}`}>
                                <btn.icon size={22} className={btn.color} />
                            </div>
                            <span className="text-xs font-bold leading-tight">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Footer ────────────────────────────────────────────────────── */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>

            {/* ── Component Configuration Drawer ────────────────────────────── */}
            {/* Backdrop */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 backdrop-blur-sm transition-opacity"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Drawer Panel */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md flex flex-col transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} ${isDarkMode ? 'bg-[#0c162d] border-l border-white/10' : 'bg-white border-l border-gray-200'} shadow-2xl`}>

                {/* Drawer Header */}
                <div className={`p-5 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${form.type === 'Earning' ? 'bg-blue-500/10' : 'bg-red-500/10'}`}>
                            {form.type === 'Earning'
                                ? <DollarSign size={16} className="text-blue-500" />
                                : <TrendingDown size={16} className="text-red-500" />
                            }
                        </div>
                        <div>
                            <h3 className={`font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                                {editItem ? 'Edit Component' : 'Create Component'}
                            </h3>
                            <p className={`text-xs ${textMuted}`}>{editItem ? `Editing: ${editItem.name}` : 'Add a new salary component'}</p>
                        </div>
                    </div>
                    <button onClick={() => setDrawerOpen(false)} className={`p-2 rounded-lg transition-all ${isDarkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-dark hover:bg-gray-100'}`}>
                        <X size={18} />
                    </button>
                </div>

                {/* Drawer Form */}
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

                    <DrawerField label="Component Name">
                        <input
                            type="text"
                            placeholder="e.g. Special Allowance"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            className={inputClass}
                        />
                    </DrawerField>

                    <DrawerField label="Component Type">
                        <div className="grid grid-cols-2 gap-2">
                            {['Earning', 'Deduction'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setForm(f => ({ ...f, type: t }))}
                                    className={`py-2 rounded-lg text-sm font-semibold border transition-all ${form.type === t
                                        ? t === 'Earning' ? 'bg-blue-500 text-white border-blue-500' : 'bg-red-500 text-white border-red-500'
                                        : isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </DrawerField>

                    <DrawerField label="Calculation Method">
                        <div className="relative">
                            <select
                                value={form.calcMethod}
                                onChange={e => setForm(f => ({ ...f, calcMethod: e.target.value }))}
                                className={selectClass}
                            >
                                {CALC_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${textMuted}`} />
                        </div>
                    </DrawerField>

                    {form.calcMethod === 'Fixed Amount' ? (
                        <DrawerField label="Fixed Amount (₹)">
                            <input
                                type="number"
                                placeholder="e.g. 50000"
                                value={form.fixedAmount}
                                onChange={e => setForm(f => ({ ...f, fixedAmount: e.target.value }))}
                                className={inputClass}
                            />
                        </DrawerField>
                    ) : (
                        <DrawerField label="Percentage (%)">
                            <input
                                type="number"
                                placeholder="e.g. 12"
                                value={form.percentage}
                                onChange={e => setForm(f => ({ ...f, percentage: e.target.value }))}
                                className={inputClass}
                            />
                        </DrawerField>
                    )}

                    <DrawerField label="Applicable Departments">
                        <div className="relative">
                            <select
                                value={form.departments}
                                onChange={e => setForm(f => ({ ...f, departments: e.target.value }))}
                                className={selectClass}
                            >
                                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${textMuted}`} />
                        </div>
                    </DrawerField>

                    <DrawerField label="Status">
                        <div className="flex gap-2">
                            {['Active', 'Inactive'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setForm(f => ({ ...f, status: s === 'Active' }))}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${(s === 'Active') === form.status
                                        ? s === 'Active' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-red-500 text-white border-red-500'
                                        : isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </DrawerField>

                    {/* Info Note */}
                    <div className={`p-3 rounded-xl flex items-start gap-2 border ${isDarkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                        <AlertCircle size={14} className="text-blue-500 mt-0.5 shrink-0" />
                        <p className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Changes to salary components will apply from the next payroll cycle. Existing processed payrolls will not be affected.
                        </p>
                    </div>
                </div>

                {/* Drawer Footer */}
                <div className={`p-5 border-t flex gap-3 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Save size={15} /> Save Component
                    </button>
                </div>
            </div>
        </div>
    );
}
