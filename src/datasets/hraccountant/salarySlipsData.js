import { FileText, Mail, CheckCircle2, Download, RefreshCw } from 'lucide-react';

export const payslips = [
    { id: 'EMP-1012', name: 'Rahul Sharma',   dept: 'Engineering', month: 'March 2026', net: '₹87,200', status: 'Generated', gross: '₹92,700', basic: '₹40,000', hra: '₹20,000', da: '₹4,000', special: '₹25,000', bonus: '₹3,700', pf: '₹4,800', esi: '₹300', tds: '₹400', pt: '₹200' },
    { id: 'EMP-1015', name: 'Priya Nair',     dept: 'HR',          month: 'March 2026', net: '₹74,100', status: 'Sent',      gross: '₹79,000', basic: '₹30,000', hra: '₹15,000', da: '₹3,000', special: '₹28,000', bonus: '₹3,000', pf: '₹3,600', esi: '₹300', tds: '₹800', pt: '₹200' },
    { id: 'EMP-1022', name: 'Amit Kumar',     dept: 'Sales',       month: 'March 2026', net: '₹71,300', status: 'Pending',   gross: '₹76,500', basic: '₹28,000', hra: '₹14,000', da: '₹2,800', special: '₹28,200', bonus: '₹3,500', pf: '₹3,360', esi: '₹300', tds: '₹1,240', pt: '₹300' },
    { id: 'EMP-1030', name: 'Sneha Patel',    dept: 'Marketing',   month: 'March 2026', net: '₹61,500', status: 'Generated', gross: '₹66,000', basic: '₹24,400', hra: '₹12,200', da: '₹2,440', special: '₹23,960', bonus: '₹3,000', pf: '₹2,928', esi: '₹300', tds: '₹972', pt: '₹300' },
    { id: 'EMP-1041', name: 'Vijay Reddy',    dept: 'Finance',     month: 'March 2026', net: '₹79,000', status: 'Pending',   gross: '₹84,800', basic: '₹32,000', hra: '₹16,000', da: '₹3,200', special: '₹30,000', bonus: '₹3,600', pf: '₹3,840', esi: '₹300', tds: '₹1,360', pt: '₹300' },
    { id: 'EMP-1053', name: 'Asha Menon',     dept: 'Support',     month: 'March 2026', net: '₹55,500', status: 'Sent',      gross: '₹59,800', basic: '₹22,000', hra: '₹11,000', da: '₹2,200', special: '₹21,600', bonus: '₹3,000', pf: '₹2,640', esi: '₹300', tds: '₹1,060', pt: '₹300' },
    { id: 'EMP-1067', name: 'Naveen Roy',     dept: 'Engineering', month: 'March 2026', net: '₹92,400', status: 'Generated', gross: '₹98,500', basic: '₹36,000', hra: '₹18,000', da: '₹3,600', special: '₹35,900', bonus: '₹5,000', pf: '₹4,320', esi: '₹300', tds: '₹1,180', pt: '₹300' },
];

export const payrollHistory = [
    { month: 'January 2026',  total: 145, generated: 145, pending: 0,  done: true  },
    { month: 'February 2026', total: 148, generated: 148, pending: 0,  done: true  },
    { month: 'March 2026',    total: 150, generated: 120, pending: 30, done: false },
];

export const salarySlipActivityFeed = [
    { text: 'Payslips generated for Engineering department',   time: '1 hour ago',   icon: FileText,    color: 'text-blue-500'    },
    { text: 'Payslips emailed to 32 employees in Sales team',  time: '3 hours ago',  icon: Mail,        color: 'text-emerald-500' },
    { text: 'Payroll fully processed for February 2026',       time: 'Yesterday',    icon: CheckCircle2,color: 'text-green-500'   },
    { text: 'Payslip regenerated for Rahul Sharma (EMP-1012)', time: '2 days ago',   icon: RefreshCw,   color: 'text-amber-500'   },
    { text: 'Bulk payslip download by HR Accountant',          time: '3 days ago',   icon: Download,    color: 'text-violet-500'  },
];

export const SLIP_STATUS_STYLE = {
    Generated: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Pending:   'bg-amber-500/10  text-amber-500  border-amber-500/20',
    Sent:      'bg-blue-500/10   text-blue-500   border-blue-500/20',
};

export const SLIP_DEPARTMENTS = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Support'];
export const SLIP_MONTHS      = ['March 2026', 'February 2026', 'January 2026'];
export const SLIP_EMP_TYPES   = ['All', 'Full-Time', 'Contract'];
export const SLIP_STATUSES    = ['All', 'Generated', 'Pending', 'Sent'];
