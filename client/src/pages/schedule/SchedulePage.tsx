import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import SemesterCards from "@/components/schedulePage/semester/Semesters";
import SchedulePageTitle from "@/components/schedulePage/SchedulePageTitle";
import DropdownSettings from "@/components/schedulePage/settings/dropdownSettings/DropdownSettings";
import Sidebar from "@/components/layouts/Sidebar";
import { ScheduleContext } from "@/contexts/scheduleContext";
import { ScheduleData, initialSemesters } from "@/types";
import styles from "./SchedulePage.module.css";

const SchedulePage = (): JSX.Element => {
  const params = useParams();
  const selectedYear = params.year;
  const selectedCCC = params.ccc;
  const selectedTransferCollege = params.college;
  const selectedMajor = params.major;

  const initialData = useLoaderData() as ScheduleData;

  console.log("INITIAL DATA: ", initialData);
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
    semesterId: number,
    courseId: number,
    type: string,
    newValue: string
  ) => {
    // Create a deep copy of the schedule
    const newSchedule = [...schedule];

    // Deep copy of the card obj that needs to be updated
    const updatedCourses = [...newSchedule[semesterId].courses];

    // Find the semester by ID
    const semesterIndex = newSchedule.findIndex(
      (semester) => semester.id === semesterId
    );
    if (semesterIndex === -1) {
      console.error("Semester not found");
      return;
    }

    // Find the course by ID within the found semester
    const courseIndex = newSchedule[semesterIndex].courses.findIndex(
      (course) => course.id === courseId
    );
    if (courseIndex === -1) {
      console.error("Course not found");
      return;
    }

    // Create new copy of the course obj and update specific field
    const updatedCourse = {
      ...updatedCourses[courseIndex],
      [type]: newValue,
    };

    updatedCourses[courseIndex] = updatedCourse;

    // Update the specific field in the course
    newSchedule[semesterIndex].courses = updatedCourses;

    // Update the state with the new schedule
    setSchedule(newSchedule);
  };

  return (
    <ScheduleContext.Provider value={{ schedule, handleScheduleChange }}>
      <div className={styles.container}>
        {/* Sidebar Component with toggle function */}
        <Sidebar
          isVisible={isSidebarVisible}
          setIsVisible={handleSidebarVisibility}
          subjectClasses={subjectClasses}
        />
        {/* Main Content Area */}
        <div
          className={`${styles.mainContent} ${
            isSidebarVisible
              ? styles.mainContentWithSidebar
              : styles.mainContentWithoutSidebar
          }`}
        >
          <div className={styles.contentArea}>
            <SchedulePageTitle
              selectedYear={selectedYear}
              selectedCCC={selectedCCC}
              selectedTransferCollege={selectedTransferCollege}
              selectedMajor={selectedMajor}
            />
            <div className={styles.toolbar}>
              <DropdownSettings />
            </div>
          </div>

          <div className={styles.contentPadding}>
            <SemesterCards />
          </div>
        </div>
      </div>
    </ScheduleContext.Provider>
  );
};

export default SchedulePage;