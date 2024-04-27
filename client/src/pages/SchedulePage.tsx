import { useLocation } from "react-router-dom";
import SemesterCards from "@/components/schedulePage/semester/Semesters";
import SchedulePageTitle from "@/components/schedulePage/SchedulePageTitle";
import Sidebar from "@/components/layouts/Sidebar";
import React, { useState } from "react";
const SchedulePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedYear = queryParams.get("year");
  const selectedCCC = queryParams.get("ccc");
  const selectedTransferCollege = queryParams.get("college");
  const selectedMajor = queryParams.get("major");

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleSidebarVisibility = (isVisible: boolean) => {
    setIsSidebarVisible(isVisible);
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component with toggle function */}
      <Sidebar
        isVisible={isSidebarVisible}
        setIsVisible={handleSidebarVisibility}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 ${
          isSidebarVisible ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        <SchedulePageTitle
          selectedYear={selectedYear}
          selectedCCC={selectedCCC}
          selectedTransferCollege={selectedTransferCollege}
          selectedMajor={selectedMajor}
        />
        <div className="p-4 gap-4">
          <SemesterCards />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
