import { 
    Briefcase, UserCheck, CalendarDays, CheckCircle2, 
    FileText, UserPlus, FilePlus, ClipboardList, TrendingUp,
    Clock, Target
} from 'lucide-react';

export const recruitmentStats = [
    { title: 'Open Job Positions', value: '12', label: 'Jobs', icon: Briefcase, color: '#3182ce', bgColor: 'bg-blue-500/10' },
    { title: 'Total Applications', value: '84', label: 'Applications', icon: FileText, color: '#805ad5', bgColor: 'bg-purple-500/10' },
    { title: 'Candidates Shortlisted', value: '32', label: 'Shortlisted', icon: UserCheck, color: '#38a169', bgColor: 'bg-green-500/10' },
    { title: 'Interviews Scheduled', value: '18', label: 'Interviews', icon: CalendarDays, color: '#f6ad55', bgColor: 'bg-orange-500/10' },
    { title: 'Offers Issued', value: '10', label: 'Offers', icon: CheckCircle2, color: '#3182ce', bgColor: 'bg-indigo-500/10' },
    { title: 'New Hires', value: '8', label: 'This Month', icon: UserPlus, color: '#d53f8c', bgColor: 'bg-pink-500/10' },
];

export const pipelineData = [
    { stage: 'Applications', count: 84, fill: '#6366F1' },
    { stage: 'Screening', count: 52, fill: '#8B5CF6' },
    { stage: 'Interview 1', count: 32, fill: '#3B82F6' },
    { stage: 'Interview 2', count: 18, fill: '#06B6D4' },
    { stage: 'Offer Stage', count: 12, fill: '#10B981' },
    { stage: 'Hired', count: 8, fill: '#F43F5E' },
];

export const hiringTrendData = [
    { month: 'Jan', hired: 5 },
    { month: 'Feb', hired: 12 },
    { month: 'Mar', hired: 8 },
    { month: 'Apr', hired: 15 },
    { month: 'May', hired: 10 },
    { month: 'Jun', hired: 18 },
];

export const openPositions = [
    { title: 'Frontend Developer', dept: 'Engineering', openings: 3, apps: 24, status: 'Active', date: 'Mar 01' },
    { title: 'Backend Developer', dept: 'Engineering', openings: 2, apps: 18, status: 'Active', date: 'Mar 03' },
    { title: 'HR Executive', dept: 'HR', openings: 1, apps: 10, status: 'Active', date: 'Mar 05' },
    { title: 'Marketing Specialist', dept: 'Marketing', openings: 2, apps: 12, status: 'Active', date: 'Mar 07' },
];

export const candidateApplications = [
    { name: 'John Miller', position: 'Frontend Developer', exp: '4 yrs', stage: 'Interview Round 1', recruiter: 'HR Executive', status: 'In Progress' },
    { name: 'Sarah Clark', position: 'Backend Developer', exp: '5 yrs', stage: 'Resume Screening', recruiter: 'HR Executive', status: 'Pending' },
    { name: 'David Lee', position: 'HR Executive', exp: '3 yrs', stage: 'Interview Round 2', recruiter: 'HR Manager', status: 'In Progress' },
    { name: 'Emily Brown', position: 'Marketing Specialist', exp: '2 yrs', stage: 'Offer Stage', recruiter: 'HR Executive', status: 'Offer Sent' },
];

export const upcomingInterviews = [
    { candidate: 'John Miller', position: 'Frontend Developer', panel: 'Tech Lead', date: 'Mar 22', mode: 'Online' },
    { candidate: 'Sarah Clark', position: 'Backend Developer', panel: 'Eng Manager', date: 'Mar 23', mode: 'Onsite' },
    { candidate: 'Emily Brown', position: 'Marketing Specialist', panel: 'HR Head', date: 'Mar 24', mode: 'Online' },
];

export const performanceMetrics = [
    { label: 'Avg Hiring Time', value: '18 Days', icon: Clock, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { label: 'Offer Acceptance', value: '72%', icon: Target, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
    { label: 'Interviews Held', value: '45', icon: ClipboardList, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { label: 'Recruiter Score', value: '92%', icon: TrendingUp, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
];

export const recentActivity = [
    { text: 'New job posting created: UX Designer', time: '2 hours ago', icon: FilePlus, color: 'text-blue-500' },
    { text: 'John Miller shortlisted for Interview', time: '5 hours ago', icon: UserCheck, color: 'text-green-500' },
    { text: 'Offer letter issued to Emily Brown', time: 'Yesterday', icon: CheckCircle2, color: 'text-purple-500' },
    { text: 'Candidate onboarding: Mark Wilson', time: '2 days ago', icon: UserPlus, color: 'text-pink-500' },
    { text: 'Interview scheduled: Backend Developer', time: '3 days ago', icon: CalendarDays, color: 'text-amber-500' },
];
