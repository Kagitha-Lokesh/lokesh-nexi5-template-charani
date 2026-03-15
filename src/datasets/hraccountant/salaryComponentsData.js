export const initialEarnings = [
    { id: 'e1', name: 'Basic Salary', type: 'Fixed', calc: '40% of CTC', value: '₹4,00,000', status: true, tag: 'Core' },
    { id: 'e2', name: 'House Rent Allowance (HRA)', type: 'Percentage', calc: '50% of Basic', value: '₹2,00,000', status: true, tag: 'Allowance' },
    { id: 'e3', name: 'Dearness Allowance (DA)', type: 'Percentage', calc: '10% of Basic', value: '₹40,000', status: true, tag: 'Allowance' },
    { id: 'e4', name: 'Special Allowance', type: 'Fixed', calc: 'Fixed Amount', value: '₹2,50,000', status: true, tag: 'Allowance' },
    { id: 'e5', name: 'Bonus', type: 'Fixed', calc: 'Annual Bonus', value: '₹50,000', status: false, tag: 'Incentive' },
    { id: 'e6', name: 'Overtime Pay', type: 'Variable', calc: 'Hours × Rate', value: '—', status: true, tag: 'Variable' },
    { id: 'e7', name: 'Performance Incentive', type: 'Variable', calc: 'KPI Based', value: '—', status: false, tag: 'Incentive' },
];

export const initialDeductions = [
    { id: 'd1', name: 'Provident Fund (PF)', type: 'Percentage', calc: '12% of Basic', value: '₹48,000', status: true, tag: 'Statutory' },
    { id: 'd2', name: 'Employee State Insurance (ESI)', type: 'Percentage', calc: '0.75% of Gross', value: '₹5,250', status: true, tag: 'Statutory' },
    { id: 'd3', name: 'Professional Tax', type: 'Fixed', calc: 'State Slab', value: '₹2,400', status: true, tag: 'Statutory' },
    { id: 'd4', name: 'Income Tax (TDS)', type: 'Variable', calc: 'Tax Slab Basis', value: '₹75,000', status: true, tag: 'Tax' },
    { id: 'd5', name: 'Loan Deduction', type: 'Fixed', calc: 'EMI Amount', value: '—', status: false, tag: 'Loan' },
    { id: 'd6', name: 'Other Deductions', type: 'Fixed', calc: 'As Applicable', value: '—', status: false, tag: 'Other' },
];

export const salaryFormulas = [
    { label: 'Basic Salary', formula: 'Basic = 40% × CTC', color: 'text-blue-500' },
    { label: 'HRA', formula: 'HRA = 50% × Basic Salary', color: 'text-violet-500' },
    { label: 'Gross Salary', formula: 'Gross = Basic + HRA + DA + Allowances', color: 'text-emerald-500' },
    { label: 'PF Contribution', formula: 'PF = 12% × Basic Salary', color: 'text-amber-500' },
    { label: 'ESI Contribution', formula: 'ESI = 0.75% × Gross Salary', color: 'text-cyan-500' },
    { label: 'Income Tax (TDS)', formula: 'TDS = As per Tax Slab (Old / New Regime)', color: 'text-red-500' },
    { label: 'Net Salary', formula: 'Net = Gross Salary − Total Deductions', color: 'text-green-500' },
];

export const previewEarnings = [
    { label: 'Basic Salary', amount: '₹4,00,000' },
    { label: 'HRA', amount: '₹2,00,000' },
    { label: 'DA', amount: '₹40,000' },
    { label: 'Special Allowance', amount: '₹2,50,000' },
    { label: 'Bonus', amount: '₹50,000' },
];

export const previewDeductions = [
    { label: 'PF', amount: '₹48,000' },
    { label: 'ESI', amount: '₹5,250' },
    { label: 'Professional Tax', amount: '₹2,400' },
    { label: 'Income Tax (TDS)', amount: '₹75,000' },
];

export const TAG_COLORS = {
    Core: 'bg-blue-500/10 text-blue-500',
    Allowance: 'bg-violet-500/10 text-violet-500',
    Incentive: 'bg-amber-500/10 text-amber-500',
    Variable: 'bg-cyan-500/10 text-cyan-500',
    Statutory: 'bg-emerald-500/10 text-emerald-500',
    Tax: 'bg-red-500/10 text-red-500',
    Loan: 'bg-orange-500/10 text-orange-500',
    Other: 'bg-gray-500/10 text-gray-500',
};

export const CALC_METHODS = [
    'Fixed Amount',
    'Percentage of Basic Salary',
    'Percentage of CTC',
    'Percentage of Gross Salary',
    'Custom Formula',
    'KPI Based',
    'Tax Slab Basis',
];

export const SALARY_DEPARTMENTS = ['All Departments', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Support'];
