export const revenueGrowthData = [
    { name: 'Jan', value: 1200000 },
    { name: 'Feb', value: 1400000 },
    { name: 'Mar', value: 1800000 },
    { name: 'Apr', value: 2100000 },
    { name: 'May', value: 1950000 },
    { name: 'Jun', value: 2400000 },
];

export const revenueByIndustry = [
    { name: 'IT Services', value: 45, color: '#3B82F6' },
    { name: 'Healthcare', value: 20, color: '#10B981' },
    { name: 'Finance', value: 15, color: '#F59E0B' },
    { name: 'Education', value: 12, color: '#8B5CF6' },
    { name: 'Retail', value: 8, color: '#EC4899' },
];

export const topRevenueClients = [
    { name: 'ABC Technologies', industry: 'IT', revenue: '₹35,00,000', projects: 3, contribution: 28 },
    { name: 'Global Finance Ltd', industry: 'Finance', revenue: '₹22,00,000', projects: 2, contribution: 18 },
    { name: 'Sunrise Tech', industry: 'Retail', revenue: '₹14,00,000', projects: 1, contribution: 11 },
    { name: 'EcoEnergy Systems', industry: 'Energy', revenue: '₹12,50,000', projects: 2, contribution: 10 },
    { name: 'Future Retail', industry: 'Retail', revenue: '₹9,50,000', projects: 1, contribution: 8 },
];

export const revenueByStage = [
    { stage: 'Qualified', value: 2000000 },
    { stage: 'Proposal', value: 1500000 },
    { stage: 'Negotiation', value: 1200000 },
    { stage: 'Closed', value: 4000000 },
];

export const revenueDistribution = [
    { name: 'New Clients', value: 50, color: '#3B82F6' },
    { name: 'Existing Clients', value: 30, color: '#10B981' },
    { name: 'Renewals', value: 10, color: '#F59E0B' },
    { name: 'Upsells', value: 10, color: '#8B5CF6' },
];

export const recentRevenueActivity = [
    { id: 1, text: 'Deal closed with ABC Technologies worth ₹8.5L', time: '2 hours ago', type: 'closed' },
    { id: 2, text: 'New contract signed with Sunrise Tech', time: '5 hours ago', type: 'contract' },
    { id: 3, text: 'Proposal accepted by Global Finance Ltd', time: 'Yesterday', type: 'proposal' },
    { id: 4, text: 'Revenue milestone reached for March: ₹1.8 Cr', time: '2 days ago', type: 'milestone' },
];

export const revenueFilterOptions = [
    { label: 'Revenue Period', options: ['Q1 2026', 'Q4 2025', 'Yearly 2026', 'MTD'] },
    { label: 'Industry', options: ['All Industries', 'IT Services', 'Healthcare', 'Finance', 'Retail'] },
    { label: 'Sales Executive', options: ['All Executives', 'Lokesh', 'Ravi', 'Suresh', 'Priya'] },
    { label: 'Revenue Range', options: ['Any Range', '₹0 - ₹5L', '₹5L - ₹20L', '₹20L+'] },
    { label: 'Client Type', options: ['All Clients', 'New', 'Existing', 'Strategic'] }
];
