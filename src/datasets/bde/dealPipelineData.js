export const dealValueInsights = [
    { stage: 'Qualified', value: 1500000 },
    { stage: 'Proposal', value: 1200000 },
    { stage: 'Negotiation', value: 800000 },
    { stage: 'Closed Won', value: 1000000 },
];

export const winRateDistribution = [
    { name: 'Closed Won', value: 65, color: '#22C55E' },
    { name: 'Closed Lost', value: 15, color: '#EF4444' },
    { name: 'Negotiation', value: 20, color: '#F59E0B' },
];

export const pipelineStagesData = {
    'New Lead': [
        { id: 'D001', client: 'TechNova Solutions', requirement: 'Cloud Migration', value: '₹4,50,000', manager: 'Lokesh', date: 'Apr 25' },
        { id: 'D002', client: 'Green Leaf Ltd', requirement: 'ERP Implementation', value: '₹12,00,000', manager: 'Ravi', date: 'May 02' }
    ],
    'Qualified': [
        { id: 'D003', client: 'Aero Dynamics', requirement: 'AI Chatbot', value: '₹3,20,000', manager: 'Suresh', date: 'Apr 28' }
    ],
    'Proposal Sent': [
        { id: 'D004', client: 'Global Finance Ltd', requirement: 'CRM Integration', value: '₹12,00,000', manager: 'Priya', date: 'Apr 12' }
    ],
    'Negotiation': [
        { id: 'D005', client: 'ABC Technologies', requirement: 'HRM Development', value: '₹8,50,000', manager: 'Lokesh', date: 'Apr 20' }
    ],
    'Closed Won': [
        { id: 'D006', client: 'Zenith Retail', requirement: 'POS Upgrade', value: '₹5,75,000', manager: 'Ravi', date: 'Mar 30' }
    ],
    'Closed Lost': [
        { id: 'D007', client: 'EcoEnergy Systems', requirement: 'Solar Monitoring', value: '₹15,00,000', manager: 'Suresh', date: 'Mar 25' }
    ]
};

export const topOpportunities = [
    { client: 'ABC Technologies', industry: 'IT Services', value: '₹8,50,000', stage: 'Negotiation', probability: 70, date: 'Apr 20' },
    { client: 'Global Finance Ltd', industry: 'Finance', value: '₹12,00,000', stage: 'Proposal', probability: 60, date: 'Apr 28' },
    { client: 'HealthPlus Inc', industry: 'Healthcare', value: '₹15,50,000', stage: 'Qualified', probability: 40, date: 'May 05' },
    { client: 'Meta Logistics', industry: 'Logistics', value: '₹22,00,000', stage: 'Qualified', probability: 35, date: 'May 12' },
];

export const recentDealActivity = [
    { id: 1, text: 'New deal added for TechNova Solutions', time: '1 hour ago', type: 'new' },
    { id: 2, text: 'Proposal sent to Global Finance Ltd', time: '3 hours ago', type: 'proposal' },
    { id: 3, text: 'ABC Technologies moved to Negotiation', time: 'Yesterday', type: 'move' },
    { id: 4, text: 'Deal closed with Zenith Retail', time: 'Yesterday', type: 'won' },
];

export const pipelineFilterOptions = [
    { label: 'Deal Stage', options: ['All Stages', 'New Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed'] },
    { label: 'Client Industry', options: ['All Industries', 'IT Services', 'Healthcare', 'Finance', 'Education'] },
    { label: 'Deal Value Range', options: ['All Ranges', '₹1L - ₹5L', '₹5L - ₹15L', '₹15L+'] },
    { label: 'Account Manager', options: ['All Managers', 'Lokesh', 'Ravi', 'Suresh', 'Priya'] },
    { label: 'Closing Date', options: ['Next 30 Days', 'Next 60 Days', 'This Quarter'] }
];
