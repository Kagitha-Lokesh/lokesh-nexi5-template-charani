import { 
    CalendarOff, Briefcase, Award, FileText, 
    UserCheck, CheckCircle2, BarChart3, Eye, UserPlus 
} from 'lucide-react';

export const recruitmentActivity = [
    { candidate: 'Rahul Sharma', position: 'Frontend Developer', recruiter: 'Sarah', status: 'Interview Scheduled', statusColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20', date: 'May 12' },
    { candidate: 'Priya Nair', position: 'HR Executive', recruiter: 'David', status: 'Offer Sent', statusColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20', date: 'May 10' },
    { candidate: 'Rohit Gupta', position: 'Backend Developer', recruiter: 'Sarah', status: 'Application Review', statusColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20', date: 'May 9' },
    { candidate: 'Ananya Mehta', position: 'UI/UX Designer', recruiter: 'Lisa', status: 'Shortlisted', statusColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', date: 'May 8' },
    { candidate: 'Vikram Joshi', position: 'Sales Manager', recruiter: 'David', status: 'Hired', statusColor: 'bg-green-500/10 text-green-500 border-green-500/20', date: 'May 7' },
];

export const pendingApprovals = [
    { label: 'Leave Requests Pending', count: 3, icon: CalendarOff, color: 'text-amber-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
    { label: 'Hiring Requests Awaiting Approval', count: 2, icon: Briefcase, color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
    { label: 'Promotion Requests', count: 1, icon: Award, color: 'text-purple-500', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20' },
    { label: 'Policy Update Reviews', count: 4, icon: FileText, color: 'text-rose-500', bgColor: 'bg-rose-500/10', borderColor: 'border-rose-500/20' },
];

export const hrActivities = [
    { text: 'New employee joined the Marketing team', time: '2 hours ago', icon: UserCheck, color: 'text-green-500' },
    { text: 'Leave request approved for Priya Nair', time: '4 hours ago', icon: CheckCircle2, color: 'text-blue-500' },
    { text: 'Interview scheduled for Backend Developer role', time: 'Yesterday', icon: CalendarOff, color: 'text-amber-500' },
    { text: 'Employee performance review completed', time: '2 days ago', icon: BarChart3, color: 'text-indigo-500' },
    { text: 'New job posting created: UX Designer', time: '3 days ago', icon: Briefcase, color: 'text-purple-500' },
];

export const quickActions = [
    { label: 'Approve Hiring Request', icon: CheckCircle2, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', path: '/dashboard/recruitment-overview' },
    { label: 'View Recruitment Pipeline', icon: Eye, color: 'text-blue-500', bgColor: 'bg-blue-500/10', path: '/dashboard/recruitment-overview' },
    { label: 'Add New Employee', icon: UserPlus, color: 'text-violet-500', bgColor: 'bg-violet-500/10', path: '/dashboard/employee/add' },
    { label: 'Review Leave Requests', icon: CalendarOff, color: 'text-amber-500', bgColor: 'bg-amber-500/10', path: '/dashboard/leaves' },
    { label: 'View HR Reports', icon: FileText, color: 'text-rose-500', bgColor: 'bg-rose-500/10', path: '/dashboard/reports' },
];
