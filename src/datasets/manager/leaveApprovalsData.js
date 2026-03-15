export const pendingRequests = [
    { id: 1, name: 'Priya Nair', dept: 'HR Department', type: 'Sick Leave', duration: 'Apr 12 – Apr 14', reason: 'Medical Leave', avatar: 'PN' },
    { id: 2, name: 'Rahul Sharma', dept: 'Engineering', type: 'Vacation', duration: 'Apr 15 – Apr 20', reason: 'Annual Trip', avatar: 'RS' },
    { id: 3, name: 'Ankit Verma', dept: 'Sales', type: 'Personal Leave', duration: 'Apr 15 – Apr 15', reason: 'Family Work', avatar: 'AV' },
];

export const calendarEvents = [
    { date: 'Apr 12', employee: 'Priya Nair', type: 'Sick Leave', color: 'bg-orange-500' },
    { date: 'Apr 14', employee: 'Rahul Sharma', type: 'Vacation', color: 'bg-blue-500' },
    { date: 'Apr 15', employee: 'Ankit Verma', type: 'Personal Leave', color: 'bg-purple-500' },
];

export const leaveTableData = [
    { id: 1, name: 'Priya Nair', dept: 'HR', type: 'Sick Leave', start: 'Apr 12', end: 'Apr 14', days: 3, status: 'Pending' },
    { id: 2, name: 'Rahul Sharma', dept: 'Engineering', type: 'Vacation', start: 'Apr 15', end: 'Apr 20', days: 6, status: 'Approved' },
    { id: 3, name: 'David Lee', dept: 'Marketing', type: 'Casual Leave', start: 'Mar 25', end: 'Mar 26', days: 2, status: 'Rejected' },
];

export const leaveAvailabilityData = [
    { dept: 'Engineering', present: 12, onLeave: 2, status: 'Available', color: 'text-green-500' },
    { dept: 'Sales', present: 6, onLeave: 3, status: 'Limited Staff', color: 'text-yellow-500' },
    { dept: 'HR', present: 4, onLeave: 1, status: 'Available', color: 'text-green-500' },
];

export const leaveRecentActivity = [
    { id: 1, text: 'Priya Nair submitted sick leave request', time: '10 min ago', type: 'submit' },
    { id: 2, text: 'Rahul Sharma leave approved by manager', time: '1 hour ago', type: 'approve' },
    { id: 3, text: 'Ankit Verma leave rejected due to project deadline', time: '3 hours ago', type: 'reject' },
    { id: 4, text: 'Leave report exported', time: 'Yesterday', type: 'system' },
];
