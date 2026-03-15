export const assetDistributionData = [
    { name: 'Laptop', value: 45, color: '#3b82f6' },
    { name: 'Monitor', value: 25, color: '#6366f1' },
    { name: 'Phone', value: 15, color: '#8b5cf6' },
    { name: 'ID Card', value: 30, color: '#ec4899' },
    { name: 'Other', value: 10, color: '#94a3b8' },
];

export const assetStatusData = [
    { status: 'Available', count: 25, color: '#10b981' },
    { status: 'Assigned', count: 40, color: '#3b82f6' },
    { status: 'Maintenance', count: 6, color: '#f59e0b' },
    { status: 'Retired', count: 3, color: '#64748b' },
];

export const assetInventoryData = [
    { id: 'AST-1032', name: 'Dell Latitude 5420', type: 'Laptop', status: 'Assigned', employee: 'Rahul Sharma', dept: 'Engineering', date: 'Apr 05' },
    { id: 'AST-1045', name: 'Lenovo ThinkPad X1', type: 'Laptop', status: 'Assigned', employee: 'Priya Verma', dept: 'QA', date: 'Apr 08' },
    { id: 'AST-2088', name: 'Samsung 27" Monitor', type: 'Monitor', status: 'Available', employee: '-', dept: '-', date: '-' },
    { id: 'AST-3012', name: 'iPhone 13 Pro', type: 'Phone', status: 'Under Maintenance', employee: 'Suresh Kumar', dept: 'Marketing', date: 'Mar 25' },
    { id: 'AST-1099', name: 'MacBook Pro M2', type: 'Laptop', status: 'Assigned', employee: 'Ananya Rao', dept: 'Design', date: 'Apr 02' },
    { id: 'AST-4055', name: 'Corporate ID Card', type: 'ID Card', status: 'Available', employee: '-', dept: '-', date: '-' },
];

export const recentAssetActivityData = [
    { text: 'Laptop (AST-1032) assigned to Rahul Sharma', time: '1 hour ago', type: 'assign' },
    { text: 'Monitor (AST-2088) returned by Amit Singh', time: '3 hours ago', type: 'return' },
    { text: '5 New ID Cards added to inventory', time: 'Yesterday', type: 'add' },
    { text: 'iPhone 13 (AST-3012) sent for maintenance', time: '2 days ago', type: 'maintenance' },
];

export const assetFilterOptions = [
    { label: 'Asset Type', options: ['All Types', 'Laptop', 'Monitor', 'Phone', 'ID Card', 'Other'] },
    { label: 'Status', options: ['All Status', 'Available', 'Assigned', 'Maintenance', 'Retired'] },
    { label: 'Department', options: ['All Departments', 'Engineering', 'Design', 'Marketing', 'QA', 'HR'] },
    { label: 'Purchase Date', options: ['All Time', 'This Month', 'Last 6 Months', '2023', '2024'] },
];
