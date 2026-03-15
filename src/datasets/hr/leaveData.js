export const leaveRequests = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', type: 'Annual Leave', from: '12 Jun 2026', to: '15 Jun 2026', days: '3 Days', reason: 'Family Vacation', status: 'Approved' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', type: 'Sick Leave', from: '18 Jun 2026', to: '20 Jun 2026', days: '2 Days', reason: 'Medical Leave', status: 'Pending' },
    { id: 3, name: 'David Lee', email: 'david.lee@example.com', type: 'Casual Leave', from: '25 Jun 2026', to: '26 Jun 2026', days: '1 Day', reason: 'Personal Work', status: 'Rejected' },
];

export const leaveBalance = [
    { id: 1, name: 'John Smith', annual: 12, sick: 8, casual: 6, used: 10, remaining: 16 },
    { id: 2, name: 'Sarah Johnson', annual: 15, sick: 10, casual: 8, used: 5, remaining: 28 },
    { id: 3, name: 'David Lee', annual: 10, sick: 5, casual: 4, used: 12, remaining: 7 },
];

export const leaveStats = [
    { title: 'Total Leave Requests', value: '125', subtext: 'This month', change: '▲ 12%', isPositive: true },
    { title: 'Approved Leaves', value: '80', subtext: '', change: '▲ 8%', isPositive: true },
    { title: 'Pending Requests', value: '30', subtext: '', change: '▲ 5%', isPositive: true },
];

export const leaveYearOptions = ['2024', '2025', '2026'];

export const leaveTypeOptions = [
    'Annual Leave',
    'Sick Leave',
    'Casual Leave',
    'Maternity Leave',
    'Work From Home'
];
