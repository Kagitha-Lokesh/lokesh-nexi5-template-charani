import {
    ClipboardList, Calendar, CheckCircle2,
    Activity, FileText, Send, Megaphone,
} from 'lucide-react';

export const teamMembers = [
    { id: 1, name: 'Rahul Sharma',  initials: 'RS', designation: 'Senior Developer',    dept: 'Engineering', status: 'Online',  color: '#38BDF8', tasks: 8,  score: 85 },
    { id: 2, name: 'Priya Nair',    initials: 'PN', designation: 'HR Specialist',        dept: 'HR',          status: 'Online',  color: '#8B5CF6', tasks: 5,  score: 78 },
    { id: 3, name: 'Ankit Verma',   initials: 'AV', designation: 'Sales Executive',      dept: 'Sales',       status: 'Busy',    color: '#F59E0B', tasks: 11, score: 90 },
    { id: 4, name: 'Sneha Das',     initials: 'SD', designation: 'QA Engineer',          dept: 'Engineering', status: 'Online',  color: '#10B981', tasks: 6,  score: 82 },
    { id: 5, name: 'Meera Kapoor',  initials: 'MK', designation: 'Frontend Developer',   dept: 'Engineering', status: 'Away',    color: '#EC4899', tasks: 9,  score: 74 },
    { id: 6, name: 'Vikram Joshi',  initials: 'VJ', designation: 'Marketing Analyst',   dept: 'Marketing',   status: 'Offline', color: '#EF4444', tasks: 4,  score: 68 },
    { id: 7, name: 'Divya Menon',   initials: 'DM', designation: 'Backend Developer',    dept: 'Engineering', status: 'Online',  color: '#14B8A6', tasks: 7,  score: 88 },
    { id: 8, name: 'Karan Patel',   initials: 'KP', designation: 'UI/UX Designer',      dept: 'Design',      status: 'Busy',    color: '#6366F1', tasks: 6,  score: 80 },
];

export const hierarchyTree = {
    name: 'Arun Mehta',
    role: 'Engineering Manager',
    dept: 'Engineering',
    color: '#38BDF8',
    children: [
        {
            name: 'Rahul Sharma',
            role: 'Senior Developer',
            dept: 'Engineering',
            color: '#8B5CF6',
            children: [
                { name: 'Meera Kapoor', role: 'Frontend Developer', dept: 'Engineering', color: '#10B981', children: [] },
                { name: 'Divya Menon',  role: 'Backend Developer',  dept: 'Engineering', color: '#F59E0B', children: [] },
            ],
        },
        {
            name: 'Sneha Das',
            role: 'QA Engineer',
            dept: 'Engineering',
            color: '#EC4899',
            children: [],
        },
    ],
};

export const teamPerformanceData = [
    { name: 'Rahul',  score: 85 },
    { name: 'Priya',  score: 78 },
    { name: 'Ankit',  score: 90 },
    { name: 'Sneha',  score: 82 },
    { name: 'Meera',  score: 74 },
    { name: 'Vikram', score: 68 },
    { name: 'Divya',  score: 88 },
    { name: 'Karan',  score: 80 },
];

export const taskDonut = [
    { name: 'Completed',   value: 42, color: '#10B981' },
    { name: 'In Progress', value: 28, color: '#38BDF8' },
    { name: 'Pending',     value: 18, color: '#F59E0B' },
    { name: 'Overdue',     value: 12, color: '#EF4444' },
];

export const availabilityRows = [
    { name: 'Rahul Sharma', role: 'Senior Developer',    status: 'Present', hours: '9:00 – 6:00',  avail: 'Available' },
    { name: 'Priya Nair',   role: 'HR Specialist',       status: 'Leave',   hours: '—',             avail: 'Not Available' },
    { name: 'Ankit Verma',  role: 'Sales Executive',     status: 'Present', hours: '9:30 – 6:30',  avail: 'Busy' },
    { name: 'Sneha Das',    role: 'QA Engineer',         status: 'Present', hours: '9:00 – 6:00',  avail: 'Available' },
    { name: 'Meera Kapoor', role: 'Frontend Developer',  status: 'Present', hours: '10:00 – 7:00', avail: 'Busy' },
    { name: 'Vikram Joshi', role: 'Marketing Analyst',  status: 'Offline', hours: '—',             avail: 'Offline' },
    { name: 'Divya Menon',  role: 'Backend Developer',   status: 'Present', hours: '9:15 – 6:15',  avail: 'Available' },
    { name: 'Karan Patel',  role: 'UI/UX Designer',     status: 'Present', hours: '9:30 – 6:30',  avail: 'Busy' },
];

export const teamActivities = [
    { person: 'Rahul Sharma',  action: 'completed',   task: '"Dashboard UI Redesign"',         time: '30 min ago',  color: '#10B981', icon: CheckCircle2 },
    { person: 'Priya Nair',    action: 'updated',     task: 'HR Policy Document v2.1',         time: '1 hour ago',  color: '#38BDF8', icon: FileText },
    { person: 'Ankit Verma',   action: 'submitted',   task: 'Q1 Sales Report',                 time: '2 hours ago', color: '#F59E0B', icon: FileText },
    { person: 'Sneha Das',     action: 'completed',   task: 'Testing Module — Sprint 4',       time: '3 hours ago', color: '#10B981', icon: CheckCircle2 },
    { person: 'Divya Menon',   action: 'pushed',      task: 'API endpoint updates to staging', time: '4 hours ago', color: '#8B5CF6', icon: Activity },
    { person: 'Karan Patel',   action: 'shared',      task: 'New component design mockups',   time: 'Yesterday',   color: '#6366F1', icon: Send },
];

export const teamQuickActions = [
    { label: 'Assign Task',            icon: ClipboardList, color: 'text-blue-500',   bg: 'bg-blue-500/10' },
    { label: 'Schedule Meeting',       icon: Calendar,      color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Send Announcement',      icon: Megaphone,     color: 'text-amber-500',  bg: 'bg-amber-500/10' },
    { label: 'Generate Team Report',   icon: FileText,      color: 'text-emerald-500',bg: 'bg-emerald-500/10' },
];

export const teamDepts    = ['All', ...new Set(teamMembers.map(m => m.dept))];
export const teamRoles    = ['All', ...new Set(teamMembers.map(m => m.designation))];
export const teamAvails   = ['All', 'Online', 'Busy', 'Away', 'Offline'];
export const availRowFilter = ['All', 'Available', 'Busy', 'Not Available', 'Offline'];
