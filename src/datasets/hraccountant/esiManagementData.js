import {
    UserCheck, Building2, CreditCard,
    RefreshCw, ClipboardCheck, FileText,
    Stethoscope, Shield, Baby, ShieldAlert
} from 'lucide-react';

// Custom icon components (defined inline in main file, referenced here for data)
// Calculator and Landmark are custom SVG icons in the component file itself

export const esiContributionSummary = [
    { title: 'Eligible Employees', value: 72,      suffix: '',       icon: UserCheck,      color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Employee Contrib',   value: 28000,   suffix: '₹',      icon: Building2,      color: 'text-blue-500',    bg: 'bg-blue-500/10'    },
    { title: 'Employer Contrib',   value: 74000,   suffix: '₹',      icon: Shield,         color: 'text-violet-500',  bg: 'bg-violet-500/10'  },
    { title: 'Total Contribution', value: 102000,  suffix: '₹',      icon: CreditCard,     color: 'text-amber-500',   bg: 'bg-amber-500/10'   },
];

export const esiEligibleEmployees = [
    { id: 'EMP-1012', name: 'Rahul Sharma', dept: 'Support',   salary: '₹18,000', status: 'Eligible', number: 'ESI-234987' },
    { id: 'EMP-1019', name: 'Priya Nair',   dept: 'Operations', salary: '₹19,500', status: 'Eligible', number: 'ESI-456321' },
    { id: 'EMP-1025', name: 'Kiran Deep',   dept: 'Admin',      salary: '₹15,000', status: 'Eligible', number: 'ESI-789123' },
    { id: 'EMP-1031', name: 'Amit Verma',   dept: 'Support',   salary: '₹22,000', status: 'Not Eligible', number: '-' },
];

export const esiContributions = [
    { name: 'Rahul Sharma', salary: '₹18,000', employee: '₹135', employer: '₹585', total: '₹720', status: 'Paid' },
    { name: 'Priya Nair',   salary: '₹19,500', employee: '₹146', employer: '₹633', total: '₹779', status: 'Pending' },
    { name: 'Kiran Deep',   salary: '₹15,000', employee: '₹112', employer: '₹487', total: '₹599', status: 'Processing' },
    { name: 'Sanjay Dutt',  salary: '₹17,200', employee: '₹129', employer: '₹559', total: '₹688', status: 'Paid' },
];

export const esiBenefits = [
    { name: 'Rahul Sharma', claim: 'Medical Claim Submitted', type: 'Medical', status: 'Active', icon: Stethoscope },
    { name: 'Priya Nair',   claim: 'No active claims',       type: 'General', status: 'Eligible', icon: Shield },
    { name: 'Kiran Deep',   claim: 'Maternity Leave applied', type: 'Maternity', status: 'Processing', icon: Baby },
    { name: 'Arjun Kapur',  claim: 'Sickness Benefit active', type: 'Sickness', status: 'Active', icon: ShieldAlert },
];

export const esiFilingSteps = [
    { label: 'Contrib Calculation', status: 'Completed', date: 'Mar 10' },
    { label: 'Payment Processing', status: 'Completed', date: 'Mar 12' },
    { label: 'Government Filing',    status: 'Pending',   date: '-' },
    { label: 'Acknowledgment',      status: 'Waiting',   date: '-' },
];

export const esiActivity = [
    { text: 'ESI contribution calculated for March cycle', date: '2 hours ago', icon: RefreshCw },
    { text: 'ESI payment submitted for Batch A (₹45,000)', date: '5 hours ago', icon: CreditCard },
    { text: 'New employee insurance record EMP-1045 updated', date: 'Yesterday', icon: ClipboardCheck },
    { text: 'ESI filing document for Feb 2026 uploaded', date: 'Mar 12', icon: FileText },
];

export const ESI_STATUS_STYLE = {
    Paid:       'bg-emerald-500/10  text-emerald-500  border-emerald-500/20',
    Pending:     'bg-amber-500/10    text-amber-500    border-amber-500/20',
    Processing:  'bg-blue-500/10     text-blue-500     border-blue-500/20',
    Eligible:   'bg-emerald-500/10  text-emerald-500  border-emerald-500/20',
    'Not Eligible': 'bg-gray-500/10 text-gray-400     border-gray-500/20',
    Active:     'bg-blue-500/10     text-blue-500     border-blue-500/20',
};
