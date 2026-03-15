import { CalendarDays, CheckCircle2, XCircle, Briefcase, Activity } from 'lucide-react';

export const recruitPipelineData = [
    { stage: 'Applications', count: 240, fill: '#38BDF8' },
    { stage: 'Screening', count: 110, fill: '#8B5CF6' },
    { stage: 'Technical', count: 58, fill: '#3B82F6' },
    { stage: 'HR Interview', count: 32, fill: '#10B981' },
    { stage: 'Offer', count: 18, fill: '#F59E0B' },
    { stage: 'Hired', count: 14, fill: '#F43F5E' },
];

export const deptApplications = [
    { name: 'Engineering', value: 120, color: '#38BDF8' },
    { name: 'Sales', value: 60, color: '#F59E0B' },
    { name: 'HR', value: 25, color: '#8B5CF6' },
    { name: 'Marketing', value: 20, color: '#10B981' },
    { name: 'Finance', value: 15, color: '#F43F5E' },
];

export const hiringTrend = [
    { month: 'Jan', hires: 5 },
    { month: 'Feb', hires: 7 },
    { month: 'Mar', hires: 6 },
    { month: 'Apr', hires: 9 },
    { month: 'May', hires: 11 },
];

export const recruiterData = [
    { name: 'Sarah Lee', openPositions: 6, screened: 34, interviews: 12, hires: 4 },
    { name: 'David Brown', openPositions: 4, screened: 28, interviews: 10, hires: 3 },
    { name: 'Emily Clark', openPositions: 3, screened: 20, interviews: 8, hires: 2 },
    { name: 'Raj Mehta', openPositions: 5, screened: 25, interviews: 9, hires: 3 },
];

export const recruitmentActivities = [
    { text: 'Frontend Developer interview scheduled with Rahul Sharma', time: '1 hour ago', icon: CalendarDays, color: 'text-blue-500' },
    { text: 'Offer letter sent for Backend Engineer position', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Candidate rejected after HR interview — Marketing role', time: 'Yesterday', icon: XCircle, color: 'text-red-500' },
    { text: 'New job opening approved: Senior Data Analyst', time: '2 days ago', icon: Briefcase, color: 'text-violet-500' },
    { text: 'Recruitment campaign launched for Q2 hiring drive', time: '3 days ago', icon: Activity, color: 'text-amber-500' },
];

export const recruitmentDepartments = ['All Departments', 'Engineering', 'HR', 'Marketing', 'Sales', 'Finance'];
export const recruitmentRoles = ['All Roles', 'Frontend Developer', 'Backend Developer', 'HR Executive', 'Sales Manager', 'Data Analyst'];
export const recruitmentRecruiters = ['All Recruiters', 'Sarah Lee', 'David Brown', 'Emily Clark', 'Raj Mehta'];
export const recruitmentStages = ['All Stages', 'Application Review', 'Interview Scheduled', 'Offer Sent', 'Hired', 'Rejected'];
