import { UserCheck, CalendarDays, CheckCircle2, XCircle, Activity } from 'lucide-react';

export const pipelineData = [
    { stage: 'Applications', count: 320, fill: '#38BDF8' },
    { stage: 'Shortlisted', count: 120, fill: '#8B5CF6' },
    { stage: 'Technical', count: 60, fill: '#3B82F6' },
    { stage: 'HR Interview', count: 35, fill: '#F59E0B' },
    { stage: 'Offer', count: 18, fill: '#A855F7' },
    { stage: 'Hired', count: 14, fill: '#10B981' },
];

export const recruitmentStatusData = [
    { name: 'Shortlisted', value: 120, color: '#38BDF8' },
    { name: 'Interviewing', value: 60, color: '#F59E0B' },
    { name: 'Offer Sent', value: 18, color: '#A855F7' },
    { name: 'Rejected', value: 85, color: '#EF4444' },
    { name: 'Hired', value: 14, color: '#10B981' },
];

export const candidates = [
    { id: 'C-001', name: 'Rahul Sharma', role: 'Frontend Developer', dept: 'Engineering', recruiter: 'Sarah', stage: 'Technical Interview', status: 'Shortlisted', date: 'Mar 12', experience: '4 Years', skills: ['React', 'TypeScript', 'Tailwind'], company: 'TechNova' },
    { id: 'C-002', name: 'Priya Nair', role: 'HR Executive', dept: 'Human Resources', recruiter: 'David', stage: 'HR Interview', status: 'Pending', date: 'Mar 10', experience: '3 Years', skills: ['Recruitment', 'HRIS', 'Onboarding'], company: 'PeopleFirst' },
    { id: 'C-003', name: 'Amit Kumar', role: 'Sales Manager', dept: 'Sales', recruiter: 'Emily', stage: 'Offer Stage', status: 'Approved', date: 'Mar 9', experience: '6 Years', skills: ['B2B Sales', 'CRM', 'Territory Management'], company: 'SalesForce Ltd' },
    { id: 'C-004', name: 'Ananya Mehta', role: 'Marketing Specialist', dept: 'Marketing', recruiter: 'Sarah', stage: 'Application Review', status: 'Pending', date: 'Mar 8', experience: '2 Years', skills: ['SEO', 'Content Marketing', 'Analytics'], company: 'MediaWave' },
    { id: 'C-005', name: 'Vikram Singh', role: 'Backend Developer', dept: 'Engineering', recruiter: 'Emily', stage: 'Technical Interview', status: 'Shortlisted', date: 'Mar 7', experience: '5 Years', skills: ['Node.js', 'PostgreSQL', 'AWS'], company: 'CodeCraft' },
    { id: 'C-006', name: 'Deepa Reddy', role: 'Financial Analyst', dept: 'Finance', recruiter: 'David', stage: 'HR Interview', status: 'Shortlisted', date: 'Mar 6', experience: '4 Years', skills: ['Excel', 'SAP', 'Financial Modelling'], company: 'FinEdge' },
    { id: 'C-007', name: 'Saurabh Joshi', role: 'DevOps Engineer', dept: 'Engineering', recruiter: 'Sarah', stage: 'Offer Stage', status: 'Approved', date: 'Mar 5', experience: '5 Years', skills: ['Docker', 'Kubernetes', 'CI/CD'], company: 'CloudSprint' },
    { id: 'C-008', name: 'Neha Kapoor', role: 'UI/UX Designer', dept: 'Design', recruiter: 'Emily', stage: 'Application Review', status: 'Rejected', date: 'Mar 4', experience: '3 Years', skills: ['Figma', 'Adobe XD', 'Prototyping'], company: 'PixelStudio' },
];

export const recentActivities = [
    { text: 'Candidate shortlisted for Backend Developer role', time: '1 hour ago', icon: UserCheck, color: 'text-blue-500' },
    { text: 'Technical interview scheduled for Frontend Developer', time: '3 hours ago', icon: CalendarDays, color: 'text-amber-500' },
    { text: 'Offer letter sent to Marketing Specialist candidate', time: 'Yesterday', icon: CheckCircle2, color: 'text-purple-500' },
    { text: 'Candidate rejected after HR interview — Finance role', time: '2 days ago', icon: XCircle, color: 'text-red-500' },
    { text: 'Recruiter Sarah updated feedback for Vikram Singh', time: '3 days ago', icon: Activity, color: 'text-emerald-500' },
];

export const jobRoles = ['All Roles', 'Frontend Developer', 'Backend Developer', 'HR Executive', 'Sales Manager', 'Marketing Specialist', 'DevOps Engineer'];
export const candidateDepts = ['All Departments', 'Engineering', 'Human Resources', 'Sales', 'Marketing', 'Finance', 'Design'];
export const candidateRecruiters = ['All Recruiters', 'Sarah', 'David', 'Emily'];
export const candidateStages = ['All Stages', 'Application Review', 'Technical Interview', 'HR Interview', 'Offer Stage', 'Hired', 'Rejected'];
export const candidateStatuses = ['All Status', 'Pending', 'Shortlisted', 'Approved', 'Rejected'];
export const candidateDateRanges = [{ label: 'Last 7 Days', value: '7' }, { label: 'Last 30 Days', value: '30' }, { label: 'Last 90 Days', value: '90' }];
