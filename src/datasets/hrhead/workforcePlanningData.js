import { Building2, TrendingUp, AlertTriangle, Activity, FileText } from 'lucide-react';

export const deptDistribution = [
    { name: 'Engineering', value: 180, color: '#38BDF8' },
    { name: 'Sales', value: 95, color: '#8B5CF6' },
    { name: 'Customer Support', value: 70, color: '#06B6D4' },
    { name: 'Marketing', value: 60, color: '#10B981' },
    { name: 'Finance', value: 30, color: '#EF4444' },
    { name: 'HR', value: 25, color: '#F59E0B' },
];

export const headcountData = [
    { dept: 'Engineering', current: 180, required: 210 },
    { dept: 'Sales', current: 95, required: 120 },
    { dept: 'Marketing', current: 60, required: 75 },
    { dept: 'HR', current: 25, required: 30 },
    { dept: 'Finance', current: 30, required: 38 },
    { dept: 'Support', current: 70, required: 85 },
];

export const growthTrend = [
    { month: 'Jan', employees: 420 },
    { month: 'Feb', employees: 435 },
    { month: 'Mar', employees: 450 },
    { month: 'Apr', employees: 470 },
    { month: 'May', employees: 485 },
];

export const deptTableData = [
    { dept: 'Engineering', current: 180, required: 210, gap: 30, recruitments: 5, manager: 'Rahul Mehta' },
    { dept: 'Sales', current: 95, required: 120, gap: 25, recruitments: 3, manager: 'Priya Nair' },
    { dept: 'Marketing', current: 60, required: 75, gap: 15, recruitments: 2, manager: 'Amit Kumar' },
    { dept: 'Human Resources', current: 25, required: 30, gap: 5, recruitments: 1, manager: 'Sarah Lee' },
    { dept: 'Finance', current: 30, required: 38, gap: 8, recruitments: 2, manager: 'David Chen' },
    { dept: 'Customer Support', current: 70, required: 85, gap: 15, recruitments: 3, manager: 'Emily Clark' },
];

export const upcomingNeeds = [
    { text: 'Engineering team expansion planned for Q3 — 30 new hires', icon: Building2, color: 'text-blue-500' },
    { text: 'Sales team hiring campaign starting next month — 25 positions', icon: TrendingUp, color: 'text-violet-500' },
    { text: 'Customer Support capacity increase required for Q2 peak season', icon: AlertTriangle, color: 'text-amber-500' },
    { text: 'Marketing team hiring planned for product launch — Q2', icon: Activity, color: 'text-emerald-500' },
    { text: 'Finance team expansion for statutory compliance — 8 positions', icon: FileText, color: 'text-red-500' },
];

export const workforceDepts = ['All Departments', 'Engineering', 'Sales', 'Marketing', 'Human Resources', 'Finance', 'Customer Support'];
export const workforceRoles = ['All Roles', 'Frontend Developer', 'Backend Developer', 'Sales Executive', 'HR Specialist', 'Financial Analyst'];
export const workforceEmpTypes = ['All Types', 'Full Time', 'Part Time', 'Contract', 'Intern'];
export const workforceLocations = ['All Locations', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Remote'];
export const workforceDateRanges = [{ label: 'Q1 2025', value: 'q1' }, { label: 'Q2 2025', value: 'q2' }, { label: 'Q3 2025', value: 'q3' }, { label: 'FY 2025', value: 'fy' }];
