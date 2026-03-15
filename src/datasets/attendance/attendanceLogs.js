export const attendanceData = [
    { name: 'Rahul Sharma', dept: 'Engineering', checkin: '9:10 AM', checkout: '6:05 PM', status: 'Present' },
    { name: 'Priya Nair', dept: 'HR', checkin: '9:30 AM', checkout: '—', status: 'Working' },
    { name: 'Ankit Verma', dept: 'Sales', checkin: '—', checkout: '—', status: 'Absent' },
    { name: 'Meera Kapoor', dept: 'Engineering', checkin: '9:05 AM', checkout: '5:50 PM', status: 'Present' },
    { name: 'Vikram Joshi', dept: 'Marketing', checkin: '—', checkout: '—', status: 'Leave' },
    { name: 'Sneha Das', dept: 'Sales', checkin: '9:45 AM', checkout: '—', status: 'Working' },
];

export const attendanceStatusStyle = {
    Present: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
    Working: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
    Absent: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' },
    Leave: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
};
