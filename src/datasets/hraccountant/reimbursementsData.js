import {
    Plane, Stethoscope, Utensils, Briefcase, MapPin, GraduationCap,
    CheckCircle2, Receipt, Download, FileText
} from 'lucide-react';

export const reimbursementCategories = [
    { name: 'Travel',          icon: Plane,          claims: 32, color: 'text-blue-500',   bg: 'bg-blue-500/10' },
    { name: 'Medical',         icon: Stethoscope,    claims: 12, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Food',            icon: Utensils,        claims: 24, color: 'text-amber-500',   bg: 'bg-amber-500/10' },
    { name: 'Office Supplies', icon: Briefcase,       claims: 18, color: 'text-violet-500',  bg: 'bg-violet-500/10' },
    { name: 'Client Meetings', icon: MapPin,          claims: 15, color: 'text-rose-500',    bg: 'bg-rose-500/10' },
    { name: 'Training',        icon: GraduationCap,  claims: 8,  color: 'text-indigo-500',  bg: 'bg-indigo-500/10' },
];

export const reimbursementClaims = [
    { id: 'CLM-5012', name: 'Rahul Sharma',   dept: 'Engineering', cat: 'Travel',          amt: '₹4,200', date: 'Mar 12', status: 'Pending',   merchant: 'IndiGo Airlines', desc: 'Flight booking for client onsite visit' },
    { id: 'CLM-5015', name: 'Priya Nair',     dept: 'HR',          cat: 'Medical',         amt: '₹2,800', date: 'Mar 11', status: 'Approved',  merchant: 'Apollo Pharmacy', desc: 'Annual health checkup reimbursement' },
    { id: 'CLM-5022', name: 'Amit Kumar',     dept: 'Sales',       cat: 'Client Meetings', amt: '₹3,600', date: 'Mar 10', status: 'Pending',   merchant: 'The Oberoi',      desc: 'Lunch with potential client from ACME Corp' },
    { id: 'CLM-5030', name: 'Sneha Patel',    dept: 'Marketing',   cat: 'Food',            amt: '₹1,200', date: 'Mar 09', status: 'Paid',      merchant: 'Swiggy',          desc: 'Team lunch for project milestone' },
    { id: 'CLM-5041', name: 'Vijay Reddy',    dept: 'Finance',     cat: 'Office Supplies', amt: '₹5,500', date: 'Mar 08', status: 'Rejected',  merchant: 'Amazon',          desc: 'Purchase of wireless keyboard and mouse' },
    { id: 'CLM-5053', name: 'Asha Menon',     dept: 'Support',     cat: 'Travel',          amt: '₹2,100', date: 'Mar 07', status: 'Paid',      merchant: 'Uber',            desc: 'Cab services for airport commute' },
];

export const reimbursementPaymentTracker = [
    { name: 'Rahul Sharma', amt: '₹4,200', date: 'Mar 13', method: 'Bank Transfer', status: 'Paid' },
    { name: 'Priya Nair',   amt: '₹2,800', date: 'Mar 12', method: 'Bank Transfer', status: 'Processing' },
    { name: 'Sneha Patel',  amt: '₹1,200', date: 'Mar 11', method: 'UPI Pay',       status: 'Paid' },
    { name: 'Asha Menon',   amt: '₹2,100', date: 'Mar 10', method: 'Bank Transfer', status: 'Paid' },
];

export const reimbursementActivityFeed = [
    { text: 'Travel reimbursement approved for Rahul Sharma',   time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Medical claim submitted by Priya Nair (₹2,800)',   time: '5 hours ago', icon: Receipt,      color: 'text-blue-500'    },
    { text: 'Expense report exported for Finance department',   time: 'Yesterday',   icon: Download,     color: 'text-violet-500'  },
    { text: 'Client meeting expense verified for Amit Kumar',   time: '2 days ago',  icon: FileText,     color: 'text-amber-500'   },
];

export const REIMB_STATUS_STYLE = {
    Pending:    'bg-amber-500/10  text-amber-500  border-amber-500/20',
    Approved:   'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Rejected:   'bg-red-500/10    text-red-500    border-red-500/20',
    Paid:       'bg-blue-500/10   text-blue-500   border-blue-500/20',
    Processing: 'bg-amber-500/10  text-amber-500  border-amber-500/20',
};

export const REIMB_DEPARTMENTS = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Support'];
export const REIMB_CATEGORIES  = ['All', 'Travel', 'Medical', 'Food', 'Office Supplies', 'Client Meetings', 'Training'];
export const REIMB_STATUSES    = ['All', 'Pending', 'Approved', 'Rejected', 'Paid'];
