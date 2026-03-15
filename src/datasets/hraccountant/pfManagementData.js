import { Users, Wallet, Building2, Coins, TrendingUp, Landmark, ClipboardCheck } from 'lucide-react';

export const pfContributionSummary = [
    { title: 'Employees Enrolled',  value: 148,     suffix: '',       icon: Users,          color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Employee Contrib',    value: 325000,  suffix: '₹',      icon: Wallet,         color: 'text-blue-500',    bg: 'bg-blue-500/10'    },
    { title: 'Employer Contrib',    value: 325000,  suffix: '₹',      icon: Building2,      color: 'text-violet-500',  bg: 'bg-violet-500/10'  },
    { title: 'Total PF Fund',       value: 650000,  suffix: '₹',      icon: Coins,          color: 'text-amber-500',   bg: 'bg-amber-500/10'   },
];

export const pfRecords = [
    { id: 'EMP-1012', name: 'Rahul Sharma', dept: 'Engineering', salary: '₹45,000', uan: 'UAN-1023456789', status: 'Active' },
    { id: 'EMP-1015', name: 'Priya Nair',   dept: 'HR',          salary: '₹40,000', uan: 'UAN-1098765432', status: 'Active' },
    { id: 'EMP-1022', name: 'Kiran Deep',   dept: 'Operations',  salary: '₹38,000', uan: 'UAN-1065432198', status: 'Active' },
    { id: 'EMP-1031', name: 'Amit Verma',   dept: 'Support',    salary: '₹22,000', uan: 'UAN-1033445566', status: 'Inactive' },
];

export const pfMonthlyContributions = [
    { name: 'Rahul Sharma', salary: '₹45,000', employee: '₹5,400', employer: '₹5,400', total: '₹10,800', status: 'Paid' },
    { name: 'Priya Nair',   salary: '₹40,000', employee: '₹4,800', employer: '₹4,800', total: '₹9,600',  status: 'Pending' },
    { name: 'Kiran Deep',   salary: '₹38,000', employee: '₹4,560', employer: '₹4,560', total: '₹9,120',  status: 'Processing' },
    { name: 'Sanjay Dutt',  salary: '₹35,000', employee: '₹4,200', employer: '₹4,200', total: '₹8,400',  status: 'Paid' },
];

export const pfWithdrawalRequests = [
    { name: 'Rahul Sharma', uan: 'UAN-1023456789', type: 'Partial Withdrawal', amount: '₹50,000', date: 'Mar 12', status: 'Pending' },
    { name: 'Vikram Singh', uan: 'UAN-1099887766', type: 'Full Settlement',    amount: '₹4,20,000', date: 'Mar 10', status: 'Approved' },
    { name: 'Neha Gupta',   uan: 'UAN-1011223344', type: 'Partial Withdrawal', amount: '₹25,000', date: 'Mar 08', status: 'Rejected' },
];

export const pfFilingSteps = [
    { label: 'Contrib Calculation', status: 'Completed', date: 'Mar 10' },
    { label: 'Payment Submission',  status: 'Completed', date: 'Mar 12' },
    { label: 'Government Filing',    status: 'Pending',   date: '-' },
    { label: 'Acknowledgment',      status: 'Waiting',   date: '-' },
];

export const pfActivity = [
    { text: 'PF contribution calculated for March cycle', date: '2 hours ago', icon: TrendingUp },
    { text: 'PF payment submitted to government portal (₹6.5L)', date: '5 hours ago', icon: Landmark },
    { text: 'Employee UAN record EMP-1045 updated', date: 'Yesterday', icon: ClipboardCheck },
    { text: 'PF withdrawal request received for Rahul Sharma', date: 'Mar 12', icon: Wallet },
];

export const PF_STATUS_STYLE = {
    Paid:       'bg-emerald-500/10  text-emerald-500  border-emerald-500/20',
    Pending:     'bg-amber-500/10    text-amber-500    border-amber-500/20',
    Processing:  'bg-blue-500/10     text-blue-500     border-blue-500/20',
    Active:     'bg-emerald-500/10  text-emerald-500  border-emerald-500/20',
    Inactive:   'bg-gray-500/10     text-gray-400     border-gray-500/20',
    Approved:   'bg-emerald-500/10  text-emerald-500  border-emerald-500/20',
    Rejected:   'bg-rose-500/10     text-rose-500     border-rose-500/20',
};
