import { Users, XCircle, Clock, MapPin } from 'lucide-react';

export const attendanceStats = [
    { title: 'Present Employees', value: 15, total: 24, icon: Users, color: '#22C55E', bgColor: 'bg-green-50', darkBgColor: 'bg-green-500/10' },
    { title: 'Absent Employees', value: 2, total: 24, icon: XCircle, color: '#EF4444', bgColor: 'bg-red-50', darkBgColor: 'bg-red-500/10' },
    { title: 'Late Arrivals', value: 3, total: 24, icon: Clock, color: '#F59E0B', bgColor: 'bg-orange-50', darkBgColor: 'bg-orange-500/10' },
    { title: 'Remote Workers', value: 4, total: 24, icon: MapPin, color: '#3ec3ff', bgColor: 'bg-blue-50', darkBgColor: 'bg-blue-500/10' },
];

export const weeklyTrendData = [
    { name: 'Mon', percentage: 90 },
    { name: 'Tue', percentage: 88 },
    { name: 'Wed', percentage: 92 },
    { name: 'Thu', percentage: 86 },
    { name: 'Fri', percentage: 89 },
];

export const attendanceDistributionData = [
    { name: 'Present', value: 15, color: '#22C55E' },
    { name: 'Absent', value: 2, color: '#EF4444' },
    { name: 'Late', value: 3, color: '#F59E0B' },
    { name: 'Remote', value: 4, color: '#3ec3ff' },
];

export const teamAttendanceTableData = [
    { id: 1, name: 'Rahul Sharma', dept: 'Engineering', checkIn: '9:05 AM', checkOut: '6:10 PM', hours: '9h 05m', status: 'Present' },
    { id: 2, name: 'Priya Nair', dept: 'HR', checkIn: '9:40 AM', checkOut: '—', hours: '—', status: 'Late' },
    { id: 3, name: 'Ankit Verma', dept: 'Sales', checkIn: '—', checkOut: '—', hours: '—', status: 'Absent' },
    { id: 4, name: 'Vikram Singh', dept: 'Engineering', checkIn: '8:55 AM', checkOut: '5:30 PM', hours: '8h 35m', status: 'Remote' },
    { id: 5, name: 'Sana Khan', dept: 'Marketing', checkIn: '9:15 AM', checkOut: '6:00 PM', hours: '8h 45m', status: 'Present' },
];

export const lateArrivals = [
    { name: 'Priya Nair', dept: 'HR', time: '9:40 AM', delay: '40 min' },
    { name: 'Ankit Verma', dept: 'Sales', time: '9:30 AM', delay: '30 min' },
];

export const timelineActivities = [
    { user: 'Rahul Sharma', action: 'checked in', time: '9:05 AM', type: 'checkin' },
    { user: 'Priya Nair', action: 'checked in late', time: '9:40 AM', type: 'late' },
    { team: 'Engineering', action: 'reached full attendance', time: '10:00 AM', type: 'team' },
    { user: 'Ankit Verma', action: 'marked absent', time: '10:30 AM', type: 'absent' },
];
