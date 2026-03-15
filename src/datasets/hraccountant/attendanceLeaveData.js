export const attendanceRows = [
    { id: 'EMP-1012', name: 'Rahul Sharma',   dept: 'Engineering', working: 22, present: 20, leave: 1, absent: 1, ot: '3 hrs', status: 'Verified' },
    { id: 'EMP-1015', name: 'Priya Nair',     dept: 'HR',          working: 22, present: 19, leave: 2, absent: 1, ot: '1 hr',  status: 'Pending'  },
    { id: 'EMP-1022', name: 'Amit Kumar',     dept: 'Sales',       working: 22, present: 21, leave: 0, absent: 1, ot: '2 hrs', status: 'Verified' },
    { id: 'EMP-1030', name: 'Sneha Patel',    dept: 'Marketing',   working: 22, present: 22, leave: 0, absent: 0, ot: '—',     status: 'Verified' },
    { id: 'EMP-1041', name: 'Vijay Reddy',    dept: 'Finance',     working: 22, present: 17, leave: 3, absent: 2, ot: '—',     status: 'Missing'  },
    { id: 'EMP-1053', name: 'Asha Menon',     dept: 'Support',     working: 22, present: 20, leave: 1, absent: 1, ot: '—',     status: 'Pending'  },
    { id: 'EMP-1067', name: 'Naveen Roy',     dept: 'Engineering', working: 22, present: 22, leave: 0, absent: 0, ot: '5 hrs', status: 'Verified' },
    { id: 'EMP-1078', name: 'Divya Krishnan', dept: 'HR',          working: 22, present: 18, leave: 2, absent: 2, ot: '—',     status: 'Missing'  },
];

export const leaveAdjustments = [
    { name: 'Rahul Sharma',   dept: 'Engineering', type: 'Casual Leave',      days: 1, status: 'Approved', impact: 'No Deduction',      impactColor: 'text-emerald-500' },
    { name: 'Priya Nair',     dept: 'HR',          type: 'Sick Leave',        days: 2, status: 'Pending',  impact: 'Deduct 2 Days',     impactColor: 'text-red-500'     },
    { name: 'Vijay Reddy',    dept: 'Finance',     type: 'Unpaid Leave',      days: 3, status: 'Approved', impact: 'Deduct 3 Days',     impactColor: 'text-red-500'     },
    { name: 'Asha Menon',     dept: 'Support',     type: 'Earned Leave',      days: 1, status: 'Pending',  impact: 'No Deduction',      impactColor: 'text-emerald-500' },
    { name: 'Divya Krishnan', dept: 'HR',          type: 'Medical Leave',     days: 2, status: 'Rejected', impact: 'Mark as Absent',    impactColor: 'text-red-500'     },
];

export const attendanceIssues = [
    { msg: 'Missing punch records detected for 3 employees',         type: 'error'   },
    { msg: '5 unapproved leave requests pending HR review',          type: 'warning' },
    { msg: 'Attendance mismatch found in Engineering — 2 employees', type: 'warning' },
    { msg: 'Unverified overtime hours for Naveen Roy (5 hrs)',       type: 'info'    },
    { msg: 'Vijay Reddy absent records incomplete for payroll',      type: 'error'   },
];

export const ATT_DEPARTMENTS = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Support'];
export const ATT_MONTHS      = ['March 2026', 'February 2026', 'January 2026'];
export const ATT_EMP_TYPES   = ['All', 'Full-time', 'Contract'];
export const ATT_STATUS      = ['All', 'Verified', 'Pending', 'Missing'];
export const ATT_LEAVE_STATUS = ['All', 'Approved', 'Pending', 'Rejected'];
