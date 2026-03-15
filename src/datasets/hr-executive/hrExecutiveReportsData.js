export const onboardingProgressReportData = [
    { name: 'Offer Accepted', value: 15, color: '#3b82f6' },
    { name: 'Docs Pending', value: 8, color: '#6366f1' },
    { name: 'Verification', value: 12, color: '#f59e0b' },
    { name: 'Orientation', value: 6, color: '#8b5cf6' },
    { name: 'Completed', value: 45, color: '#10b981' },
];

export const onboardingTrendReportData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 18 },
    { name: 'Mar', value: 22 },
    { name: 'Apr', value: 16 },
    { name: 'May', value: 25 },
    { name: 'Jun', value: 20 },
];

export const assetCategoryReportData = [
    { name: 'Laptops', value: 45, color: '#3b82f6' },
    { name: 'ID Cards', value: 30, color: '#ec4899' },
    { name: 'Access Cards', value: 25, color: '#8b5cf6' },
    { name: 'Equipment', value: 15, color: '#94a3b8' },
];

export const assetDeptReportData = [
    { dept: 'Engineering', count: 40 },
    { dept: 'HR', count: 12 },
    { dept: 'Finance', count: 10 },
    { dept: 'Sales', count: 18 },
    { dept: 'Design', count: 15 },
];

export const reportActivityLogsData = [
    { id: 1, name: 'Rahul Sharma', dept: 'Engineering', status: 'Completed', assets: 'Laptop, ID Card', date: 'Apr 10', hr: 'Ananya' },
    { id: 2, name: 'Priya Verma', dept: 'QA', status: 'Orientation', assets: 'Laptop', date: 'Apr 15', hr: 'Ravi' },
    { id: 3, name: 'Amit Singh', dept: 'Engineering', status: 'Verification', assets: 'ID Card', date: 'Apr 08', hr: 'Ananya' },
    { id: 4, name: 'Sneha Gupta', dept: 'Design', status: 'Docs Pending', assets: '-', date: 'Apr 12', hr: 'Ravi' },
];

export const recentReportActivitiesData = [
    { text: 'Onboarding report generated for Engineering', time: '1 hour ago' },
    { text: 'Asset assignment report exported to CSV', time: '3 hours ago' },
    { text: 'Employee joining report downloaded by Ravi', time: 'Yesterday' },
    { text: 'Monthly HR operational report scheduled', time: '2 days ago' },
];

export const reportFilterOptions = [
    { label: 'Report Type', options: ['Onboarding', 'Employee Records', 'Asset Allocation', 'Attendance'] },
    { label: 'Department', options: ['All Departments', 'Engineering', 'HR', 'Finance', 'Sales', 'Design'] },
    { label: 'Date Range', options: ['Last 30 Days', 'Last 6 Months', 'Year 2024', 'Custom Range'] },
    { label: 'Employee Status', options: ['Active', 'Onboarding', 'Exited', 'On Leave'] },
    { label: 'Asset Category', options: ['All Assets', 'Laptops', 'ID Cards', 'Peripherals'] },
];
