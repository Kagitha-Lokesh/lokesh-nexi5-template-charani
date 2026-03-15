import { Landmark, HeartHandshake, FileText, FileCheck } from 'lucide-react';

export const complianceSummary = [
    { title: 'PF Filing Status', value: '148', total: '150', status: 'Filed',      icon: Landmark,       color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'ESI Contribution', value: '148', total: '150', status: 'Processing', icon: HeartHandshake, color: 'text-blue-500',    bg: 'bg-blue-500/10'    },
    { title: 'TDS Filing',       value: '148', total: '150', status: 'Pending',    icon: FileText,       color: 'text-amber-500',   bg: 'bg-amber-500/10'   },
    { title: 'Tax Documents',    value: '132', total: '150', status: 'Overdue',    icon: FileCheck,      color: 'text-red-500',     bg: 'bg-red-500/10'     },
];

export const complianceFilings = [
    { type: 'PF',  period: 'Mar 2026', count: 148, amount: '₹3,45,000', date: 'Mar 12', status: 'Filed'      },
    { type: 'ESI', period: 'Mar 2026', count: 72,  amount: '₹1,12,000', date: 'Mar 15', status: 'Pending'    },
    { type: 'TDS', period: 'Mar 2026', count: 148, amount: '₹2,78,000', date: 'Mar 14', status: 'Processing' },
    { type: 'PF',  period: 'Feb 2026', count: 146, amount: '₹3,42,000', date: 'Feb 12', status: 'Filed'      },
    { type: 'ESI', period: 'Feb 2026', count: 70,  amount: '₹1,09,000', date: 'Feb 15', status: 'Filed'      },
];

export const complianceDeadlines = [
    { type: 'PF Filing',           date: '15 Apr 2026', status: 'On Track', color: 'text-emerald-500' },
    { type: 'ESI Contribution',    date: '21 Apr 2026', status: 'Due Soon', color: 'text-amber-500'   },
    { type: 'TDS Return Filing',   date: '30 Apr 2026', status: 'On Track', color: 'text-emerald-500' },
    { type: 'Professional Tax',    date: '10 Apr 2026', status: 'Overdue',  color: 'text-red-500'     },
];

export const complianceDocuments = [
    { name: 'PF Return Form (Mar 2026)', type: 'PF',  period: 'Mar 2026', date: 'Mar 12', status: 'Uploaded' },
    { name: 'ESI Contribution Sheet',     type: 'ESI', period: 'Mar 2026', date: '-',      status: 'Pending'  },
    { name: 'TDS Filing Document',        type: 'TDS', period: 'Mar 2026', date: 'Mar 14', status: 'Uploaded' },
    { name: 'Professional Tax Record',    type: 'PT',  period: 'Feb 2026', date: 'Feb 10', status: 'Uploaded' },
];

export const complianceAlerts = [
    { text: 'PF filing deadline approaching (2 days left)', type: 'Deadline', priority: 'High', color: 'text-red-500' },
    { text: 'TDS return pending for March 2026 cycle',      type: 'Pending',  priority: 'High', color: 'text-red-500' },
    { text: 'ESI payment verification required for Batch B',type: 'Verify',   priority: 'Medium', color: 'text-amber-500' },
    { text: 'Compliance document missing: Form 16C',        type: 'Document', priority: 'Medium', color: 'text-amber-500' },
];

export const STATUTORY_STATUS_STYLE = {
    Filed:      'bg-emerald-500/10  text-emerald-500  border-emerald-500/20',
    Pending:    'bg-amber-500/10    text-amber-500    border-amber-500/20',
    Overdue:    'bg-red-500/10      text-red-500      border-red-500/20',
    Processing: 'bg-blue-500/10     text-blue-500     border-blue-500/20',
    Uploaded:   'bg-emerald-500/10  text-emerald-500  border-emerald-500/20',
    Failed:     'bg-red-500/10      text-red-500      border-red-500/20',
};

export const STATUTORY_DEADLINE_STYLE = {
    'On Track': 'bg-emerald-500/10 text-emerald-500',
    'Due Soon': 'bg-amber-500/10  text-amber-500',
    'Overdue':  'bg-red-500/10    text-red-500',
};
