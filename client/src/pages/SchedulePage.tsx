import React, { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import SemesterCards from "@/components/schedulePage/semester/Semesters";
import SchedulePageTitle from "@/components/schedulePage/SchedulePageTitle";
import Sidebar from "@/components/layouts/Sidebar";
const SchedulePage = () => {
  const params = useParams();
  const selectedYear = params.year;
  const selectedCCC = params.ccc;
  const selectedTransferCollege = params.college;
  const selectedMajor = params.major;

  const scheduleData = useLoaderData();

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
        subjectClasses={scheduleData.classes}
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
          <SemesterCards data={scheduleData} />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
