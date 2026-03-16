import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from "@/layouts/DashboardLayout";
import WelcomeSection from "@/components/dashboard/core/WelcomeSection";
import QuickStats from "@/components/dashboard/core/QuickStats";
import QuickActions from "@/components/dashboard/core/QuickActions";
import AnalyticsRowOne from "@/components/dashboard/analytics/AnalyticsRowOne";
import ProjectSummaryTable from "@/components/dashboard/tables/ProjectSummaryTable";

// Dashboard Pages
import UsersManagement from "@/pages/dashboard/UsersManagement";
import Departments from "@/pages/dashboard/Departments";
import AttendanceDashboard from "@/pages/dashboard/AttendanceDashboard";
import Employees from "@/pages/dashboard/Employees";
import Settings from "@/pages/dashboard/Settings";
import Notifications from "@/pages/dashboard/Notifications";
import AdminProfile from "@/pages/dashboard/AdminProfile";
import LeaveManagement from "@/pages/dashboard/LeaveManagement";
import Holidays from "@/pages/dashboard/Holidays";
import ProjectDashboard from "@/pages/dashboard/ProjectDashboard";
import AddDepartment from "@/pages/dashboard/AddDepartment";
import AddEmployee from "@/pages/dashboard/AddEmployee";
import ApplyLeave from "@/pages/dashboard/ApplyLeave";
import Events from "@/pages/dashboard/Events";
import Payroll from "@/pages/dashboard/Payroll";
import Accounts from "@/pages/dashboard/Accounts";
import Reports from "@/pages/dashboard/Reports";
import OrganizationOverview from "@/pages/dashboard/OrganizationOverview";
import ManageRoles from "@/pages/dashboard/ManageRoles";
import Permissions from "@/pages/dashboard/Permissions";
import HRManagement from "@/pages/dashboard/HRManagement";
import RecruitmentOverview from "@/pages/dashboard/RecruitmentOverview";
import ClientBusinessOverview from "@/pages/dashboard/ClientBusinessOverview";
import EmployeeManagement from "@/pages/dashboard/EmployeeManagement";
import SystemSettings from "@/pages/dashboard/SystemSettings";
import AuditLogs from "@/pages/dashboard/AuditLogs";
import HRHeadRecruitmentManagement from "@/pages/dashboard/hrhead/RecruitmentManagement";
import HRHeadJobApprovals from "@/pages/dashboard/hrhead/JobApprovals";
import HRHeadHiringRequests from "@/pages/dashboard/hrhead/HiringRequests";
import HRHeadCandidateManagement from "@/pages/dashboard/hrhead/CandidateManagement";
import HRHeadInterviewPanelOverview from "@/pages/dashboard/hrhead/InterviewPanelOverview";
import HRHeadWorkforcePlanning from "@/pages/dashboard/hrhead/WorkforcePlanning";
import HRHeadPoliciesCompliance from "@/pages/dashboard/hrhead/PoliciesCompliance";
import HRHeadPayrollApproval from "@/pages/dashboard/hrhead/PayrollApproval";
import HRHeadHRChat from "@/pages/dashboard/hrhead/HRChat";

import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import HRHeadDashboard from "@/pages/dashboard/HRHeadDashboard";
import HRAccountantDashboard from "@/pages/dashboard/hraccountant/HRAccountantDashboard";
import ProcessPayroll from "@/pages/dashboard/hraccountant/ProcessPayroll";
import SalaryComponents from "@/pages/dashboard/hraccountant/SalaryComponents";
import AttendanceLeaveData from "@/pages/dashboard/hraccountant/AttendanceLeaveData";
import SalarySlips from "@/pages/dashboard/hraccountant/SalarySlips";
import Reimbursements from "@/pages/dashboard/hraccountant/Reimbursements";
import BonusManagement from "@/pages/dashboard/hraccountant/BonusManagement";
import StatutoryCompliance from "@/pages/dashboard/hraccountant/StatutoryCompliance";
import ESIManagement from "@/pages/dashboard/hraccountant/ESIManagement";
import PFManagement from "@/pages/dashboard/hraccountant/PFManagement";
import TDSManagement from "@/pages/dashboard/hraccountant/TDSManagement";
import TaxDocuments from "@/pages/dashboard/hraccountant/TaxDocuments";
import Form16Dashboard from "@/pages/dashboard/hraccountant/Form16Dashboard";
import Form16ADashboard from "@/pages/dashboard/hraccountant/Form16ADashboard";
import Form16BDashboard from "@/pages/dashboard/hraccountant/Form16BDashboard";
import FinancialReportsDashboard from "@/pages/dashboard/hraccountant/FinancialReportsDashboard";
import PayrollReportsDashboard from "@/pages/dashboard/hraccountant/PayrollReportsDashboard";
import { EmployeeDashboard } from "@/pages/dashboard/CommonDashboards";
import BDEDashboard from "@/pages/dashboard/bde/BDEDashboard";
import ClientManagementDashboard from "@/pages/dashboard/bde/ClientManagementDashboard";
import DealPipelineDashboard from "@/pages/dashboard/bde/DealPipelineDashboard";
import ProposalManagementDashboard from "@/pages/dashboard/bde/ProposalManagementDashboard";
import RevenueTrackingDashboard from "@/pages/dashboard/bde/RevenueTrackingDashboard";
import ClientRequirementsDashboard from "@/pages/dashboard/bde/ClientRequirementsDashboard";
import MeetingsDashboard from "@/pages/dashboard/bde/MeetingsDashboard";
import ManagerDashboard from "@/pages/dashboard/manager/ManagerDashboard";
import MyTeamDashboard from "@/pages/dashboard/manager/MyTeamDashboard";
import ProjectMonitoringDashboard from "@/pages/dashboard/manager/ProjectMonitoringDashboard";
import TeamAttendanceDashboard from "@/pages/dashboard/manager/TeamAttendanceDashboard";
import LeaveApprovalsDashboard from "@/pages/dashboard/manager/LeaveApprovalsDashboard";
import PerformanceReviewsDashboard from "@/pages/dashboard/manager/PerformanceReviewsDashboard";
import HrExecutiveDashboard from "@/pages/dashboard/hr-executive/HrExecutiveDashboard";
import AssetManagementDashboard from "@/pages/dashboard/hr-executive/AssetManagementDashboard";
import HRExecutiveReportsDashboard from "@/pages/dashboard/hr-executive/HRExecutiveReportsDashboard";
import AIAssistant from "@/pages/dashboard/AIAssistant";





export default function Dashboard({ handleLogout }) {
    return (
        <DashboardLayout handleLogout={handleLogout}>
            <Routes>
                {/* Role Specific Dashboards */}
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="hr-head" element={<HRHeadDashboard />} />
                <Route path="hr-head/recruitment-management" element={<HRHeadRecruitmentManagement />} />
                <Route path="hr-head/job-approvals" element={<HRHeadJobApprovals />} />
                <Route path="hr-head/hiring-requests" element={<HRHeadHiringRequests />} />
                <Route path="hr-head/candidate-management" element={<HRHeadCandidateManagement />} />
                <Route path="hr-head/interview-panel" element={<HRHeadInterviewPanelOverview />} />
                <Route path="hr-head/workforce-planning" element={<HRHeadWorkforcePlanning />} />
                <Route path="hr-head/hr-policies-compliance" element={<HRHeadPoliciesCompliance />} />
                <Route path="hr-head/payroll-approval" element={<HRHeadPayrollApproval />} />
                <Route path="hr-head/hr-chat" element={<HRHeadHRChat />} />
                <Route path="hr-accountant" element={<HRAccountantDashboard />} />
                <Route path="hr-accountant/process-payroll" element={<ProcessPayroll />} />
                <Route path="hr-accountant/salary-components" element={<SalaryComponents />} />
                <Route path="hr-accountant/attendance-leave-data" element={<AttendanceLeaveData />} />
                <Route path="hr-accountant/salary-slips" element={<SalarySlips />} />
                <Route path="hr-accountant/reimbursements" element={<Reimbursements />} />
                <Route path="hr-accountant/bonus-management" element={<BonusManagement />} />
                <Route path="hr-accountant/statutory-compliance" element={<StatutoryCompliance />} />
                <Route path="hr-accountant/esi" element={<ESIManagement />} />
                <Route path="hr-accountant/pf" element={<PFManagement />} />
                <Route path="hr-accountant/tds" element={<TDSManagement />} />
                <Route path="hr-accountant/tax-documents" element={<TaxDocuments />} />
                <Route path="hr-accountant/form16" element={<Form16Dashboard />} />
                <Route path="hr-accountant/form16a" element={<Form16ADashboard />} />
                <Route path="hr-accountant/form16b" element={<Form16BDashboard />} />
                <Route path="hr-accountant/financial-reports" element={<FinancialReportsDashboard />} />
                <Route path="hr-accountant/payroll-reports" element={<PayrollReportsDashboard />} />
                <Route path="bde" element={<BDEDashboard />} />
                <Route path="bde/client-management" element={<ClientManagementDashboard />} />
                <Route path="bde/deal-pipeline" element={<DealPipelineDashboard />} />
                <Route path="bde/proposal-management" element={<ProposalManagementDashboard />} />
                <Route path="bde/revenue-tracking" element={<RevenueTrackingDashboard />} />
                <Route path="bde/client-requirements" element={<ClientRequirementsDashboard />} />
                <Route path="bde/meetings" element={<MeetingsDashboard />} />
                <Route path="manager" element={<ManagerDashboard />} />
                <Route path="team" element={<MyTeamDashboard />} />
                <Route path="manager/my-team" element={<Navigate to="/dashboard/team" replace />} />
                <Route path="manager/monitoring" element={<ProjectMonitoringDashboard />} />
                <Route path="manager/team-attendance" element={<TeamAttendanceDashboard />} />
                <Route path="manager/leave-approvals" element={<LeaveApprovalsDashboard />} />
                <Route path="manager/performance-reviews" element={<PerformanceReviewsDashboard />} />
                <Route path="employee" element={<EmployeeDashboard />} />
                <Route path="hr-executive" element={<HrExecutiveDashboard />} />
                <Route path="hr-executive/assets" element={<AssetManagementDashboard />} />
                <Route path="hr-executive/reports" element={<HRExecutiveReportsDashboard />} />
                <Route path="hr-chat" element={<HRHeadHRChat />} />
                <Route path="ai-assistant" element={<AIAssistant />} />

                {/* Default Dashboard Overview Route */}
                <Route
                    path="/"
                    element={
                        <div className="animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)]">
                            <WelcomeSection />
                            <QuickStats />
                            <div className="lg:hidden">
                                <QuickActions />
                            </div>
                            <AnalyticsRowOne />

                            <ProjectSummaryTable />
                            {/* Dashboard Root Footer */}
                            <div className="py-6 text-center mt-auto">
                                <p className="text-textSecondary text-xs">Copyright © NEXI5 HRM Portal</p>
                            </div>
                        </div>
                    }
                />

                {/* Nested child routes */}
                <Route path="org-overview" element={<OrganizationOverview />} />
                <Route path="roles" element={<Navigate to="/dashboard/manage-roles" replace />} />
                <Route path="manage-roles" element={<ManageRoles />} />
                <Route path="permissions" element={<Permissions />} />
                <Route path="hr-management" element={<HRManagement />} />
                <Route path="recruitment-overview" element={<RecruitmentOverview />} />
                <Route path="client-business-overview" element={<ClientBusinessOverview />} />
                <Route path="employees" element={<EmployeeManagement />} />
                <Route path="system-settings" element={<SystemSettings />} />
                <Route path="audit-logs" element={<AuditLogs />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="hr executive/*" element={<Navigate to="/dashboard/hr-executive" replace />} />
                <Route path="hr management" element={<Navigate to="/dashboard/hr-management" replace />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="departments" element={<Departments />} />
                <Route path="departments/add" element={<AddDepartment />} />
                <Route path="employee/add" element={<AddEmployee />} />
                <Route path="attendance" element={<AttendanceDashboard />} />
                <Route path="leaves" element={<LeaveManagement />} />
                <Route path="leaves/apply" element={<ApplyLeave />} />
                <Route path="holidays" element={<Holidays />} />
                <Route path="events" element={<Events />} />
                <Route path="payroll" element={<Payroll />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="reports" element={<Reports />} />
                <Route path="project" element={<ProjectDashboard />} />
                <Route path="form16" element={<Navigate to="/dashboard/hr-accountant/form16" replace />} />
                <Route path="form16a" element={<Navigate to="/dashboard/hr-accountant/form16a" replace />} />
                <Route path="form16b" element={<Navigate to="/dashboard/hr-accountant/form16b" replace />} />

                {/* Add fallback for other navigation items to show placeholder or overview */}
                <Route path="*" element={
                    <div className="flex items-center justify-center h-full p-8 text-textSecondary">
                        <p>Module under construction</p>
                    </div>
                } />
            </Routes>
        </DashboardLayout>
    );
}
