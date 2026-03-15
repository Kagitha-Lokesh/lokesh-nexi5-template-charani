export const requirementsData = [
    {
        id: 'REQ-1023',
        client: 'ABC Technologies',
        title: 'HRM System Development',
        type: 'Web Application',
        budget: '₹8,50,000',
        deadline: 'May 10, 2026',
        status: 'Open',
        industry: 'IT Services',
        posted: '2 days ago'
    },
    {
        id: 'REQ-1024',
        client: 'Global Finance Ltd',
        title: 'CRM Migration & Cloud Support',
        type: 'Cloud Services',
        budget: '₹12,00,000',
        deadline: 'May 25, 2026',
        status: 'In Discussion',
        industry: 'Finance',
        posted: '5 hours ago'
    },
    {
        id: 'REQ-1025',
        client: 'Sunrise Tech',
        title: 'Mobile App for Logistics',
        type: 'Mobile App',
        budget: '₹6,20,000',
        deadline: 'June 05, 2026',
        status: 'Proposal Sent',
        industry: 'Retail',
        posted: '1 day ago'
    },
    {
        id: 'REQ-1026',
        client: 'HealthCare Plus',
        title: 'Patient Portal UI/UX Redesign',
        type: 'UI/UX Design',
        budget: '₹3,50,000',
        deadline: 'May 15, 2026',
        status: 'Open',
        industry: 'Healthcare',
        posted: '3 days ago'
    },
    {
        id: 'REQ-1027',
        client: 'EcoEnergy Systems',
        title: 'IoT Dashboard for Solar Monitoring',
        type: 'Internet of Things',
        budget: '₹15,00,000',
        deadline: 'July 10, 2026',
        status: 'Closed',
        industry: 'Energy',
        posted: '1 week ago'
    },
    {
        id: 'REQ-1028',
        client: 'Future Retail',
        title: 'Inventory Management AI Upgrade',
        type: 'AI Services',
        budget: '₹9,80,000',
        deadline: 'June 20, 2026',
        status: 'Open',
        industry: 'Retail',
        posted: '12 hours ago'
    }
];

export const industryDistribution = [
    { name: 'IT Services', value: 35, color: '#3B82F6' },
    { name: 'Finance', value: 20, color: '#10B981' },
    { name: 'Healthcare', value: 15, color: '#F59E0B' },
    { name: 'Education', value: 10, color: '#8B5CF6' },
    { name: 'Retail', value: 20, color: '#EC4899' },
];

export const monthlyRequests = [
    { month: 'Jan', requests: 8 },
    { month: 'Feb', requests: 12 },
    { month: 'Mar', requests: 15 },
    { month: 'Apr', requests: 10 },
    { month: 'May', requests: 18 },
    { month: 'Jun', requests: 14 },
];

export const recentActivities = [
    { id: 1, text: 'New requirement received from ABC Technologies', time: '2 hours ago', type: 'new' },
    { id: 2, text: 'Proposal created for Sunrise Tech project', time: '5 hours ago', type: 'proposal' },
    { id: 3, text: 'Requirement assigned to Development Team', time: 'Yesterday', type: 'assignment' },
    { id: 4, text: 'Client discussion scheduled for Global Finance Ltd', time: '2 days ago', type: 'calendar' },
];

export const requirementFilterOptions = [
    { label: 'Client Name', options: ['All Clients', 'ABC Technologies', 'Global Finance', 'Sunrise Tech'] },
    { label: 'Requirement Type', options: ['All Types', 'Web App', 'Mobile App', 'Cloud', 'AI/ML'] },
    { label: 'Industry', options: ['All Industries', 'IT Services', 'Finance', 'Retail', 'Healthcare'] },
    { label: 'Budget Range', options: ['Any Budget', '₹0 - ₹5L', '₹5L - ₹10L', '₹10L+'] },
    { label: 'Status', options: ['Any Status', 'Open', 'In Discussion', 'Proposal Sent', 'Closed'] }
];
