import { CheckCircle2, XCircle, FileText, Building2, Activity } from 'lucide-react';

export const jobRequests = [
    { id: 'JR-1021', dept: 'Engineering', title: 'Frontend Developer', requestedBy: 'Rahul Sharma', positions: 2, priority: 'High', date: 'Mar 10', status: 'Pending', experience: '3+ years', type: 'Full Time', description: 'Build and maintain React-based frontend applications.', justification: 'Expansion of product development team for upcoming Q2 launch.' },
    { id: 'JR-1022', dept: 'Marketing', title: 'Content Strategist', requestedBy: 'Priya Nair', positions: 1, priority: 'Medium', date: 'Mar 9', status: 'Pending', experience: '2+ years', type: 'Full Time', description: 'Plan and execute content strategy across digital channels.', justification: 'New brand campaign requires dedicated content resource.' },
    { id: 'JR-1023', dept: 'Sales', title: 'Sales Executive', requestedBy: 'Amit Kumar', positions: 3, priority: 'High', date: 'Mar 8', status: 'Pending', experience: '1+ year', type: 'Full Time', description: 'Drive B2B sales and maintain client relationships.', justification: 'Regional expansion entering 3 new cities.' },
    { id: 'JR-1024', dept: 'Finance', title: 'Financial Analyst', requestedBy: 'Sonia Rao', positions: 1, priority: 'Low', date: 'Mar 7', status: 'Approved', experience: '4+ years', type: 'Full Time', description: 'Analyze financial data and prepare quarterly forecasts.', justification: 'Required for regulatory compliance reporting.' },
    { id: 'JR-1025', dept: 'Human Resources', title: 'HR Business Partner', requestedBy: 'David Chen', positions: 1, priority: 'Medium', date: 'Mar 6', status: 'Rejected', experience: '5+ years', type: 'Full Time', description: 'Partner with business units to align HR strategy.', justification: 'Headcount growth requires dedicated HRBP support.' },
    { id: 'JR-1026', dept: 'Engineering', title: 'Backend Developer', requestedBy: 'Rahul Sharma', positions: 2, priority: 'High', date: 'Mar 5', status: 'Pending', experience: '4+ years', type: 'Full Time', description: 'Design and build scalable Node.js microservices.', justification: 'New infrastructure initiative requires backend team scaling.' },
];

export const jobRecentActivities = [
    { text: 'HR Head approved Backend Developer request (JR-1018)', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Marketing job opening rejected due to budget constraints', time: '3 hours ago', icon: XCircle, color: 'text-red-500' },
    { text: 'New job request submitted by Sales department (JR-1023)', time: 'Yesterday', icon: FileText, color: 'text-blue-500' },
    { text: 'Engineering department requested 2 new developers', time: '2 days ago', icon: Building2, color: 'text-violet-500' },
    { text: 'HR Executive completed review of JR-1020', time: '3 days ago', icon: Activity, color: 'text-amber-500' },
];

export const jobDepts = ['All Departments', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Human Resources'];
export const jobStatuses = ['All Status', 'Pending', 'Approved', 'Rejected'];
export const jobPriorities = ['All Priority', 'High', 'Medium', 'Low'];
export const jobDateRanges = [{ label: 'Last 7 Days', value: '7' }, { label: 'Last 30 Days', value: '30' }, { label: 'Last 90 Days', value: '90' }];

export const workflowSteps = [
    { label: 'Manager Request', done: true },
    { label: 'HR Executive Review', done: true },
    { label: 'HR Head Approval', done: false, current: true },
    { label: 'Recruitment Start', done: false },
];
