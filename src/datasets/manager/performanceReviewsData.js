import {
    Trophy, Star, AlertCircle, CheckCircle,
    Zap, Clock, Download, FileText
} from 'lucide-react';

export const performanceScoreboard = [
    { title: 'Top Performers', value: 6, icon: Trophy, color: '#22C55E', bgColor: 'bg-green-500/10' },
    { title: 'Average Rating', value: 4.2, icon: Star, color: '#F59E0B', bgColor: 'bg-orange-500/10' },
    { title: 'Needs Improvement', value: 3, icon: AlertCircle, color: '#EF4444', bgColor: 'bg-red-500/10' },
    { title: 'Reviews Completed', value: 15, icon: CheckCircle, color: '#38BDF8', bgColor: 'bg-blue-500/10' },
];

export const ratingDistribution = [
    { name: 'Excellent (5)', value: 6, color: '#22C55E' },
    { name: 'Good (4)', value: 8, color: '#38BDF8' },
    { name: 'Average (3)', value: 4, color: '#F59E0B' },
    { name: 'Improvement (2)', value: 3, color: '#EF4444' },
];

export const productivityTrend = [
    { name: 'Jan', value: 72 },
    { name: 'Feb', value: 78 },
    { name: 'Mar', value: 82 },
    { name: 'Apr', value: 88 },
];

export const employeePerformanceData = [
    { id: 1, name: 'Rahul Sharma', dept: 'Engineering', tasks: 28, rating: 4.5, lastReview: 'Mar 10', status: 'Reviewed' },
    { id: 2, name: 'Priya Nair', dept: 'HR', tasks: 18, rating: 4.2, lastReview: 'Mar 8', status: 'Reviewed' },
    { id: 3, name: 'Ankit Verma', dept: 'Sales', tasks: 20, rating: 3.1, lastReview: '—', status: 'Pending' },
    { id: 4, name: 'Vikram Singh', dept: 'Engineering', tasks: 25, rating: 3.8, lastReview: 'Mar 12', status: 'Needs Review' },
];

export const performanceActivity = [
    { id: 1, text: 'Rahul Sharma received 4.5 rating in Q1 review', time: '2 hours ago', type: 'rating' },
    { id: 2, text: 'Priya Nair promoted to Senior HR Executive', time: '5 hours ago', type: 'promo' },
    { id: 3, text: 'Team productivity increased by 6%', time: 'Yesterday', type: 'trend' },
    { id: 4, text: 'Manager submitted quarterly review report', time: '2 days ago', type: 'report' },
];

export const performanceQuickActions = [
    { label: 'Start Performance Review', icon: Zap, color: 'text-amber-500' },
    { label: 'Schedule Review Meeting', icon: Clock, color: 'text-blue-500' },
    { label: 'Download Review Summary', icon: Download, color: 'text-emerald-500' },
    { label: 'Generate Team Report', icon: FileText, color: 'text-indigo-500' },
];
