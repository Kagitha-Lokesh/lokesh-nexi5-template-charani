import React from 'react';
import WelcomeSection from "@/components/dashboard/core/WelcomeSection";
import QuickStats from "@/components/dashboard/core/QuickStats";
import AnalyticsRowOne from "@/components/dashboard/analytics/AnalyticsRowOne";
import ProjectSummaryTable from "@/components/dashboard/tables/ProjectSummaryTable";
import AttendanceCard from "@/components/dashboard/core/AttendanceCard";

const RoleDashboard = ({ title, showAttendance = false }) => {
  return (
    <div className="animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)]">
      <WelcomeSection />
      {showAttendance && (
        <div className="mb-6">
          <AttendanceCard />
        </div>
      )}
      <div className="mb-6">
        <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
      </div>
      <QuickStats />
      <AnalyticsRowOne />
      <ProjectSummaryTable />
      <div className="py-6 text-center mt-auto">
        <p className="text-textSecondary text-xs">Copyright © NEXI5 HRM Portal</p>
      </div>
    </div>
  );
};

// ManagerDashboard has been moved to src/pages/dashboard/manager/ManagerDashboard.jsx
export const EmployeeDashboard = () => <RoleDashboard title="Employee Dashboard" showAttendance={true} />;
