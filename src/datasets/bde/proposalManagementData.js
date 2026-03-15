export const proposalConversionRate = [
    { name: 'Approved', value: 45, color: '#22C55E' },
    { name: 'Rejected', value: 10, color: '#EF4444' },
    { name: 'Pending', value: 25, color: '#3B82F6' },
    { name: 'Under Review', value: 20, color: '#F59E0B' },
];

export const monthlyProposalValue = [
    { name: 'Jan', value: 500000 },
    { name: 'Feb', value: 800000 },
    { name: 'Mar', value: 1000000 },
    { name: 'Apr', value: 700000 },
];

export const proposalWorkflowData = {
    'Draft': [
        { id: 'PR-1025', client: 'Future Retail', project: 'E-commerce App', value: '₹5,50,000', date: 'Apr 08' },
    ],
    'Sent to Client': [
        { id: 'PR-1023', client: 'ABC Technologies', project: 'HRM Portal Development', value: '₹8,50,000', date: 'Apr 05' },
    ],
    'Under Review': [
        { id: 'PR-1024', client: 'Sunrise Tech', project: 'CRM Integration', value: '₹6,20,000', date: 'Apr 06' },
    ],
    'Approved': [
        { id: 'PR-1022', client: 'Global Finance Ltd', project: 'Security Audit', value: '₹12,00,000', date: 'Mar 28' },
    ],
    'Rejected': [
        { id: 'PR-1021', client: 'EcoEnergy Systems', project: 'Smart Grid UI', value: '₹15,00,000', date: 'Mar 20' },
    ]
};

export const allProposals = [
    { id: 'PR-1023', client: 'ABC Technologies', project: 'HRM Portal', value: '₹8,50,000', status: 'Sent', date: 'Apr 05' },
    { id: 'PR-1024', client: 'Sunrise Tech', project: 'CRM Integration', value: '₹6,20,000', status: 'Under Review', date: 'Apr 06' },
    { id: 'PR-1022', client: 'Global Finance Ltd', project: 'Security Audit', value: '₹12,00,000', status: 'Approved', date: 'Mar 28' },
    { id: 'PR-1021', client: 'EcoEnergy Systems', project: 'Smart Grid UI', value: '₹15,00,000', status: 'Rejected', date: 'Mar 20' },
    { id: 'PR-1025', client: 'Future Retail', project: 'E-commerce App', value: '₹5,50,000', status: 'Draft', date: 'Apr 08' },
];

export const recentProposalActivity = [
    { id: 1, text: 'Proposal PR-1023 sent to ABC Technologies', time: '1 hour ago', type: 'sent' },
    { id: 2, text: 'Proposal PR-1022 approved by Global Finance Ltd', time: '4 hours ago', type: 'approved' },
    { id: 3, text: 'Reminder sent for proposal PR-1021', time: 'Yesterday', type: 'reminder' },
    { id: 4, text: 'New proposal created for Sunrise Tech', time: '2 days ago', type: 'created' },
];

export const proposalFilterOptions = [
    { label: 'Client Name', type: 'text', placeholder: 'Search Client...' },
    { label: 'Proposal Status', type: 'select', options: ['All Statuses', 'Draft', 'Sent', 'Under Review', 'Approved', 'Rejected'] },
    { label: 'Deal Value', type: 'select', options: ['Any Value', '< ₹5L', '₹5L - ₹10L', '₹10L+'] },
    { label: 'Sales Executive', type: 'select', options: ['All Executives', 'Lokesh', 'Ravi', 'Suresh', 'Priya'] },
    { label: 'Date Range', type: 'select', options: ['Last 7 Days', 'Last 30 Days', 'This Quarter'] }
];
