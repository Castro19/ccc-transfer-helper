import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import SemesterCards from "@/components/schedulePage/semester/Semesters";
import SchedulePageTitle from "@/components/schedulePage/SchedulePageTitle";
import Sidebar from "@/components/layouts/Sidebar";
import { ScheduleContext } from "@/contexts/scheduleContext";
import { initialSemesters } from "@/types";

const SchedulePage = () => {
  const params = useParams();
  const selectedYear = params.year;
  const selectedCCC = params.ccc;
  const selectedTransferCollege = params.college;
  const selectedMajor = params.major;

  const initialData = useLoaderData();
  // const scheduleData = initialData.schedule;
  const subjectClassData = initialData.classes;

  // Initialize state for schedule and classes
  const [subjectClasses] = useState(subjectClassData);
  const [schedule, setSchedule] = useState(initialSemesters);
  // Layout
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleSidebarVisibility = (isVisible: boolean) => {
    setIsSidebarVisible(isVisible);
  };

  const handleScheduleChange = (
    cardIndex: number,
    courseIndex: number,
    type: string,
    newValue: string
  ) => {
    // Create a deep copy
    const newSchedule = [...schedule];

    // Deep copy of the card obj that needs to be updated
    const updatedCourses = [...newSchedule[cardIndex].courses];

    // Create new copy of the course obj and update specific field
    const updatedCourse = {
      ...updatedCourses[courseIndex],
      [type]: newValue,
    };
    updatedCourses[courseIndex] = updatedCourse;

    newSchedule[cardIndex].courses = updatedCourses;

    setSchedule(newSchedule);
  };

  return (
    <div className="flex min-h-screen">
      <ScheduleContext.Provider value={{ schedule, handleScheduleChange }}>
        {/* Sidebar Component with toggle function */}
        <Sidebar
          isVisible={isSidebarVisible}
          setIsVisible={handleSidebarVisibility}
          subjectClasses={subjectClasses}
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
      </ScheduleContext.Provider>
    </div>
  );
};

export default SchedulePage;
