export const pipelineData = {
    Lead: [
        { id: '101', client: 'TechNova Solutions', requirement: 'Cloud Migration', value: '₹4,50,000', date: 'Apr 25' },
        { id: '102', client: 'Green Leaf Ltd', requirement: 'ERP Implementation', value: '₹12,00,000', date: 'May 02' }
    ],
    Qualified: [
        { id: '103', client: 'Aero Dynamics', requirement: 'AI Chatbot', value: '₹3,20,000', date: 'Apr 28' }
    ],
    'Proposal Sent': [
        { id: '104', client: 'Global Finance Ltd', requirement: 'CRM Integration', value: '₹12,00,000', date: 'Apr 12' }
    ],
    Negotiation: [
        { id: '105', client: 'ABC Technologies', requirement: 'HRM Development', value: '₹8,50,000', date: 'Apr 10' }
    ],
    Closed: [
        { id: '106', client: 'Zenith Retail', requirement: 'POS Upgrade', value: '₹5,75,000', date: 'Mar 30' }
    ]
};

export const clientOpportunities = [
    { client: 'ABC Technologies', industry: 'IT Services', requirement: 'HRM Development', value: '₹8,50,000', stage: 'Negotiation', nextFollowup: 'Apr 10' },
    { client: 'Global Finance Ltd', industry: 'Finance', requirement: 'CRM Integration', value: '₹12,00,000', stage: 'Proposal Sent', nextFollowup: 'Apr 12' },
    { client: 'HealthPlus Inc', industry: 'Healthcare', requirement: 'Patient Management', value: '₹15,50,000', stage: 'Qualified', nextFollowup: 'Apr 15' },
    { client: 'EduQuest Academy', industry: 'Education', requirement: 'LMS Portal', value: '₹6,20,000', stage: 'Lead', nextFollowup: 'Apr 18' },
];
