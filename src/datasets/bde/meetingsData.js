import { Video, MapPin } from 'lucide-react';

export const upcomingMeetings = [
    {
        id: 1,
        client: 'ABC Technologies',
        type: 'Demo Presentation',
        time: 'Apr 10 • 11:00 AM',
        mode: 'Online',
        executive: 'Lokesh',
        status: 'Scheduled',
        icon: Video
    },
    {
        id: 2,
        client: 'Global Finance Ltd',
        type: 'Proposal Discussion',
        time: 'Apr 12 • 02:30 PM',
        mode: 'Offline',
        executive: 'Ravi',
        status: 'Confirmed',
        icon: MapPin
    },
    {
        id: 3,
        client: 'Sunrise Tech',
        type: 'Client Negotiation',
        time: 'Apr 15 • 10:00 AM',
        mode: 'Online',
        executive: 'Priya',
        status: 'Scheduled',
        icon: Video
    },
    {
        id: 4,
        client: 'TechNova Solutions',
        type: 'Technical Follow-up',
        time: 'Apr 18 • 04:00 PM',
        mode: 'Online',
        executive: 'Suresh',
        status: 'Pending',
        icon: Video
    }
];

export const meetingStats = [
    { name: 'Demo', value: 35, color: '#3B82F6' },
    { name: 'Sales Call', value: 25, color: '#10B981' },
    { name: 'Negotiation', value: 20, color: '#F59E0B' },
    { name: 'Follow-up', value: 20, color: '#8B5CF6' },
];

export const monthlyActivity = [
    { month: 'Jan', meetings: 10 },
    { month: 'Feb', meetings: 14 },
    { month: 'Mar', meetings: 18 },
    { month: 'Apr', meetings: 12 },
    { month: 'May', meetings: 22 },
    { month: 'Jun', meetings: 16 },
];

export const meetingTimeline = [
    { id: 1, text: 'Meeting with Global Finance Ltd completed', time: '2 hours ago', type: 'completed' },
    { id: 2, text: 'Demo presented to Sunrise Tech', time: '5 hours ago', type: 'demo' },
    { id: 3, text: 'Follow-up call with ABC Technologies', time: 'Yesterday', type: 'call' },
    { id: 4, text: 'Negotiation meeting scheduled with TechNova', time: '2 days ago', type: 'scheduled' },
];

export const meetingFilterOptions = [
    { label: 'Client Name', options: ['All Clients', 'ABC Technologies', 'Global Finance', 'Sunrise Tech'] },
    { label: 'Meeting Type', options: ['All Types', 'Demo', 'Sales Call', 'Negotiation', 'Follow-up'] },
    { label: 'Status', options: ['Any Status', 'Scheduled', 'Confirmed', 'Completed', 'Cancelled'] },
    { label: 'Sales Executive', options: ['All Executives', 'Lokesh', 'Priya', 'Ravi', 'Suresh'] },
    { label: 'Meeting Date', type: 'date' }
];
