export const clientAcquisitionTrend = [
    { name: 'Jan', clients: 5 },
    { name: 'Feb', clients: 7 },
    { name: 'Mar', clients: 10 },
    { name: 'Apr', clients: 12 },
];

export const clientIndustryDistribution = [
    { name: 'IT Services', value: 40, color: '#3B82F6' },
    { name: 'Healthcare', value: 25, color: '#22C55E' },
    { name: 'Finance', value: 15, color: '#F59E0B' },
    { name: 'Education', value: 10, color: '#8B5CF6' },
    { name: 'Retail', value: 10, color: '#EF4444' },
];

export const clientDirectory = [
    { id: 1, name: 'ABC Technologies', industry: 'IT Services', location: 'Hyderabad', status: 'Active', logo: 'A', manager: 'Lokesh' },
    { id: 2, name: 'Global Finance Ltd', industry: 'Finance', location: 'Mumbai', status: 'Active', logo: 'G', manager: 'Ravi' },
    { id: 3, name: 'HealthPlus Inc', industry: 'Healthcare', location: 'Bangalore', status: 'Pending', logo: 'H', manager: 'Suresh' },
    { id: 4, name: 'EduQuest Academy', industry: 'Education', location: 'Delhi', status: 'Inactive', logo: 'E', manager: 'Priya' },
];

export const interactionRecords = [
    { client: 'ABC Technologies', manager: 'Lokesh', lastMeeting: 'Apr 5', nextFollowup: 'Apr 12', type: 'Sales Call' },
    { client: 'Global Finance Ltd', manager: 'Ravi', lastMeeting: 'Apr 2', nextFollowup: 'Apr 15', type: 'Proposal Discussion' },
    { client: 'HealthPlus Inc', manager: 'Suresh', lastMeeting: 'Mar 28', nextFollowup: 'Apr 10', type: 'Demo Presentation' },
    { client: 'EduQuest Academy', manager: 'Priya', lastMeeting: 'Apr 1', nextFollowup: 'Apr 20', type: 'Follow-up' },
];

export const engagementTimeline = [
    { id: 1, text: 'Meeting scheduled with ABC Technologies', time: '2 hours ago', type: 'meeting' },
    { id: 2, text: 'Proposal sent to Global Finance Ltd', time: '5 hours ago', type: 'proposal' },
    { id: 3, text: 'New client registered from website', time: 'Yesterday', type: 'registration' },
    { id: 4, text: 'Follow-up email sent to Sunrise Tech', time: '2 days ago', type: 'email' },
];

export const clientFilterOptions = [
    { label: 'Client Industry', options: ['IT Services', 'Healthcare', 'Finance', 'Education', 'Retail'] },
    { label: 'Company Size', options: ['Startup', 'SMB', 'Enterprise', 'Fortune 500'] },
    { label: 'Client Status', options: ['Active', 'Pending', 'Inactive', 'On Hold'] },
    { label: 'Location', options: ['India', 'USA', 'UK', 'Singapore'] },
    { label: 'Account Manager', options: ['Lokesh', 'Ravi', 'Suresh', 'Priya'] }
];
