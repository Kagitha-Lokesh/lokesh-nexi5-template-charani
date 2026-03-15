export const payrollData = [
    { id: '01', name: 'South Shyanne', email: 'south.shyanne@example.com', role: 'Web Developer', salary: '$1200', status: 'Done' },
    { id: '02', name: 'Zoe Baker', email: 'zoe.baker@example.com', role: 'Graphics Designer', salary: '$378', status: 'Done' },
    { id: '03', name: 'Colin Brown', email: 'colin.brown@example.com', role: 'HTML Developer', salary: '$653', status: 'Done' },
    { id: '04', name: 'Kevin Gill', email: 'kevin.gill@example.com', role: 'Mobile', salary: '$451', status: 'Pending' },
    { id: '05', name: 'Brandon Smith', email: 'brandon.smith@example.com', role: 'VueJS FrontEnd', salary: '$1,989', status: 'Done' },
    { id: '06', name: 'Kevin Baker', email: 'kevin.baker@example.com', role: 'Java Developer', salary: '$343', status: 'Pending' },
    { id: '07', name: 'Sarah John', email: 'sarah.john@example.com', role: 'Team Leader', salary: '$451', status: 'Pending' },
];

export const payrollStats = [
    { title: 'Web Developer', amount: '$18,960', change: '5.27%', isPositive: false, icon: 'BarChart3' },
    { title: 'App Developer', amount: '$11,783', change: '11.38%', isPositive: true, icon: 'Activity' },
    { title: 'Designer', amount: '$2,254', change: '9.61%', isPositive: true, icon: 'PieChart' },
    { title: 'Marketing', amount: '$8,751', change: '2.27%', isPositive: false, icon: 'LineChart' }
];

export const payslipMockInfo = {
    name: 'John Smith',
    id: 'C09',
    initials: 'JS',
    address: '795 Folsom Ave, Suite 546\nSan Francisco, CA 54656',
    date: 'Jun 15, 2019'
};

export const payslipMockRows = [
    { id: '01', desc: 'Basic Salary', earn: '$1,500', ded: '', total: '$380' },
    { id: '02', desc: 'House Rent Allowance (H.R.A.)', earn: '$62', ded: '', total: '$250' },
    { id: '03', desc: 'Tax Deducted at Source (T.D.S.)', earn: '', ded: '$80', total: '$120' },
    { id: '04', desc: 'C/Bank Loan', earn: '', ded: '$120', total: '$120' },
    { id: '05', desc: 'Other Allowance', earn: '$121', ded: '', total: '$120' }
];

export const payslipSummary = {
    totalEarnings: '$1683',
    totalDeductions: '$200',
    finalSalary: '$1483.00'
};

export const invoiceStats = [
    { value: '562', label: 'Total Approved' },
    { value: '254', label: 'Pending Invoice' },
    { value: '982', label: 'Closed' }
];

export const invoiceDetailInfo = {
    id: '#AB0017',
    date: 'Jun 15, 2026',
    company: {
        name: 'NEXI5 HRM Portal',
        address: 'Street Address\nState, City\nRegion, Postal Code',
        email: 'ltd@example.com'
    },
    client: {
        name: 'Client Name',
        address: 'Street Address\nState, City\nRegion, Postal Code',
        email: 'ctr@example.com'
    }
};

export const invoiceProducts = [
    { id: 1, name: 'Logo Creation', desc: 'Logo and business cards design', qnt: 1, unit: '$1,800', amount: '$1,800' },
    { id: 2, name: 'Online Store Design & Development', desc: 'Design/Development for modern browsers', qnt: 1, unit: '$20,000', amount: '$20,000' },
    { id: 3, name: 'App Design', desc: 'Promotional mobile application', qnt: 1, unit: '$3,200', amount: '$3,200' }
];

export const invoiceSummary = {
    subtotal: '$25,000',
    vatRate: '20%',
    vatDue: '$5,000',
    totalDue: '$30,000'
};
