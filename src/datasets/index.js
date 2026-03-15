// Analytics
export * from './analytics/salaryData';
export * from './analytics/revenueBarData';
export * from './analytics/balanceData';
export * from './analytics/structureData';
export * from './analytics/satisfactionData';
export * from './analytics/growthData';
export * from './analytics/overallStats';

// Attendance
export * from './attendance/attendanceStats';
export * from './attendance/mockAttendance';
export * from './attendance/attendanceData';


// Finance
export * from './finance/mockInvoices';
export * from './finance/mockExpenses';
export * from './finance/expenseStats';
export * from './finance/accountsData';

// Projects
export * from './projects/statsData';
export * from './projects/mockTableData';
export * from './projects/projectDashboardData';

// HR
export * from './hr/usersData';
export * from './hr/mockDepartments';
export * from './hr/holidaysData';
export * from './hr/employeesData';
export * from './hr/leaveData';
export * from './hr/payrollData';

// Dashboards & Components
export * from './dashboard/quickStatsData';
export * from './recruitment/recruitmentOverviewData';
export * from './audit/auditLogsData';
export * from './notifications/notificationsData';
export * from './settings/settingsData';
export * from './system/systemSettingsData';
export * from './roles/rolesData';
export * from './organization/organizationOverviewData';
export * from './management/employeeManagementData';
export * from './dashboard/clientBusinessData';
export * from './events/eventsData';
export * from './profile/adminProfileData';

// HR Accountant
export * from './hraccountant/index';

// HR Executive
export * from './hr-executive/index';
export * from './bde';
export * from './landing';


// Exporting new dashboard summaries
export { 
    adminStatsCards,
    recruitmentSummary, 
    payrollDashboardSummary, 
    projectDashboardSummary 
} from './dashboard/adminStats';

// Exporting new audit filters
export { auditFilterOptions } from './audit/auditLogsData';

// Exporting extra payroll/invoice data
export { 
    invoiceStats, 
    invoiceDetailInfo, 
    invoiceProducts, 
    invoiceSummary 
} from './hr/payrollData';

// Exporting Shared Filter Options
export { employmentTypes } from './attendance/attendanceData';
export { departmentHeadOptions } from './hr/employeesData';


