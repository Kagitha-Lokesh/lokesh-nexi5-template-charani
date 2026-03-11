import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from "@/layouts/DashboardLayout";
import WelcomeSection from "@/components/dashboard/core/WelcomeSection";
import QuickStats from "@/components/dashboard/core/QuickStats";
import AnalyticsRowOne from "@/components/dashboard/analytics/AnalyticsRowOne";
import ProjectSummaryTable from "@/components/dashboard/tables/ProjectSummaryTable";

// Dashboard Pages
import UsersManagement from "@/pages/dashboard/UsersManagement";
import Departments from "@/pages/dashboard/Departments";
import AttendanceDashboard from "@/pages/dashboard/AttendanceDashboard";
import Employees from "@/pages/dashboard/Employees";
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

export default function Dashboard({ handleLogout }) {
    return (
        <DashboardLayout handleLogout={handleLogout}>
            <Routes>
                {/* Default Dashboard Overview Route */}
                <Route
                    path="/"
                    element={
                        <div className="animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)]">
                            <WelcomeSection />
                            <QuickStats />
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
                <Route path="users" element={<UsersManagement />} />
                <Route path="departments" element={<Departments />} />
                <Route path="departments/add" element={<AddDepartment />} />
                <Route path="employee" element={<Employees />} />
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
