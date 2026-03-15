import { CheckCircle2, AlertTriangle, Users, FileText, Briefcase, User } from 'lucide-react';

export const conversations = [
    {
        id: 'conv-1', name: 'Sarah (Recruiter)', avatar: 'S', color: 'bg-violet-500/10 text-violet-500',
        lastMsg: 'The candidate for Frontend Developer has accepted the offer.', time: '2m', unread: 3, online: true,
        messages: [
            { from: 'them', text: 'Good morning! I wanted to update you on the Frontend Developer role.', time: '09:30' },
            { from: 'me', text: 'Please go ahead, Sarah.', time: '09:31' },
            { from: 'them', text: 'Rahul Sharma has successfully passed the technical and HR rounds.', time: '09:32' },
            { from: 'them', text: 'The candidate for Frontend Developer has accepted the offer.', time: '09:33' },
        ]
    },
    {
        id: 'conv-2', name: 'David (HR Manager)', avatar: 'D', color: 'bg-blue-500/10 text-blue-500',
        lastMsg: 'Payroll batch for March is ready for your approval.', time: '15m', unread: 1, online: true,
        messages: [
            { from: 'them', text: 'Hi, I have compiled the March payroll batch.', time: '09:10' },
            { from: 'me', text: 'How many employees are in this batch?', time: '09:12' },
            { from: 'them', text: '48 employees across all departments.', time: '09:15' },
            { from: 'them', text: 'Payroll batch for March is ready for your approval.', time: '09:20' },
        ]
    },
    {
        id: 'conv-3', name: 'Engineering Team', avatar: 'E', color: 'bg-emerald-500/10 text-emerald-500',
        lastMsg: 'Q2 workforce expansion plan submitted for review.', time: '1h', unread: 0, online: false,
        messages: [
            { from: 'them', text: 'Team update: we need 30 new hires in Q3.', time: '08:00' },
            { from: 'me', text: 'Noted. Please submit the formal workforce request.', time: '08:05' },
            { from: 'them', text: 'Q2 workforce expansion plan submitted for review.', time: '08:30' },
        ]
    },
    {
        id: 'conv-4', name: 'Emily (Recruiter)', avatar: 'E', color: 'bg-amber-500/10 text-amber-500',
        lastMsg: 'Interview scheduled for Sales Manager on Mar 20.', time: '2h', unread: 0, online: true,
        messages: [
            { from: 'them', text: 'I have scheduled the final round for Amit Kumar.', time: '07:45' },
            { from: 'me', text: 'Great. Who is the interview panel?', time: '07:50' },
            { from: 'them', text: 'David and I will conduct it.', time: '07:52' },
            { from: 'them', text: 'Interview scheduled for Sales Manager on Mar 20.', time: '07:55' },
        ]
    },
    {
        id: 'conv-5', name: 'Finance Dept', avatar: 'F', color: 'bg-red-500/10 text-red-500',
        lastMsg: 'Budget approval needed for new hires.', time: '1d', unread: 0, online: false,
        messages: [
            { from: 'them', text: 'The hiring budget for Q2 needs HR Head sign-off.', time: 'Mar 11' },
            { from: 'me', text: 'I will review it today.', time: 'Mar 11' },
            { from: 'them', text: 'Budget approval needed for new hires.', time: 'Mar 11' },
        ]
    },
];

export const initialNotifications = [
    { id: 'n1', type: 'approval', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', title: 'Payroll Batch Ready', desc: 'March payroll batch is pending your approval — 48 employees.', time: '2 min ago', read: false },
    { id: 'n2', type: 'alert', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', title: 'Compliance Issue Detected', desc: 'Policy violation flagged in Payroll record PR-1106 for Finance.', time: '1 hour ago', read: false },
    { id: 'n3', type: 'recruitment', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', title: 'New Hiring Request', desc: 'Engineering team submitted a Q3 expansion hiring request (30 positions).', time: '3 hours ago', read: false },
    { id: 'n4', type: 'policy', icon: FileText, color: 'text-violet-500', bg: 'bg-violet-500/10', title: 'Policy Update Required', desc: 'Remote Work Guidelines are pending review — last updated 30+ days ago.', time: 'Yesterday', read: true },
    { id: 'n5', type: 'interview', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-500/10', title: 'Interview Scheduled', desc: 'Final round for Sales Manager (Amit Kumar) confirmed — Mar 20, 10:00 AM.', time: 'Yesterday', read: true },
    { id: 'n6', type: 'approval', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', title: 'Job Approval Pending', desc: '3 new job opening requests from Marketing department awaiting approval.', time: '2 days ago', read: true },
    { id: 'n7', type: 'candidate', icon: User, color: 'text-cyan-500', bg: 'bg-cyan-500/10', title: 'Offer Accepted', desc: 'Rahul Sharma accepted the Frontend Developer offer — onboarding next week.', time: '2 days ago', read: true },
];
