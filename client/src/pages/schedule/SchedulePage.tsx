import { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
// Context:
import { ScheduleContext } from "@/contexts/scheduleContext";
import { useCollege, useLayout } from "@/contexts";
// Components:
import Sidebar from "@/components/layouts/Sidebar";
import SchedulePageTitle from "@/components/schedulePage/SchedulePageTitle";
import DropdownSettings from "@/components/schedulePage/dropdownSettings/dropdown/DropdownSettings";
import SemesterCards from "@/components/schedulePage/semester/Semesters";
import SaveSchedule from "@/components/savedSchedule/createSchedule/SaveSchedule";
// Types
import { ScheduleData, SemesterType, initialSemesters } from "@/types";

import styles from "./SchedulePage.module.css";

const SchedulePage = (): JSX.Element => {
  const [isNew, setIsNew] = useState<boolean>(true); // Represents if it is a schedule we are editing or a new schedule we would want to save.

  // Load in Data from our loader
  const params = useParams();
  const initialData = useLoaderData() as ScheduleData;
  console.log("Initial Data: ", initialData);

  const { isSidebarVisible, handleSidebarVisibility } = useLayout();
  const {
    year,
    handleSelectedYear,
    ccc,
    handleSelectedCommunityCollege,
    univ,
    handleSelectedTransferCollege,
    major,
    handleSelectedMajor,
  } = useCollege();
  // Make these context
  const [schedule, setSchedule] = useState<SemesterType[] | null>(null);
  const [subjectClasses] = useState(initialData.subjectClasses);
  const [classList] = useState(initialData.classList);
  const [ge] = useState(initialData.ge);

  console.log("PARAMS: ", params);
  useEffect(() => {
    if (initialData.savedSchedule) {
      handleSelectedYear(initialData.savedSchedule.params.year);
      handleSelectedCommunityCollege(initialData.savedSchedule.params.cccCode);
      handleSelectedTransferCollege(initialData.savedSchedule.params.college);
      handleSelectedMajor(initialData.savedSchedule.params.major);
      setSchedule(initialData.savedSchedule.schedule);
      setIsNew(false);
    } else {
      handleSelectedYear(params.year);
      handleSelectedCommunityCollege(params.cccCode);
      handleSelectedTransferCollege(params.college);
      handleSelectedMajor(params.major);
      setSchedule(initialSemesters); // Ensure initialSemesters is defined
    }

    // Optionally, if you want to log or use the selected params
    console.log(
      `Year: ${year}, CCC: ${ccc}, College: ${univ}, Major: ${major}`
    );
  }, [
    ccc,
    handleSelectedCommunityCollege,
    handleSelectedMajor,
    handleSelectedTransferCollege,
    handleSelectedYear,
    initialData,
    major,
    params,
    univ,
    year,
  ]);

  // Initialize state for schedule and classes

  const handleScheduleChange = (
    semesterId: number,
    courseId: number,
    type: string,
    newValue: string
  ) => {
    if (!schedule) return;

    // Create a deep copy of the schedule
    const newSchedule = [...schedule];

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
      ...newSchedule[semesterIndex].courses[courseIndex],
      [type]: newValue,
    };

    // Update the specific field in the course
    newSchedule[semesterIndex].courses[courseIndex] = updatedCourse;

    // Update the state with the new schedule
    setSchedule(newSchedule);
  };

  useEffect(() => {
    console.log("Subject Classes: ", subjectClasses);
    console.log("Schedule: ", schedule);
  }, [schedule, subjectClasses]);

  return (
    <ScheduleContext.Provider value={{ schedule, handleScheduleChange }}>
      {schedule && (
        <div className={styles.container}>
          {/* Sidebar Component with toggle function */}
          <Sidebar
            isVisible={isSidebarVisible}
            setIsVisible={handleSidebarVisibility}
            subjectClasses={subjectClasses}
            ge={ge}
            classList={classList}
            schedule={schedule}
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
                selectedYear={year}
                selectedCCC={
                  ccc ? (typeof ccc === "object" ? ccc.name : ccc) : "N/A"
                }
                selectedTransferCollege={univ}
                selectedMajor={major}
              />
              <div className={styles.toolbar}>
                <DropdownSettings />
              </div>
            </div>

            <div className={styles.contentPadding}>
              <SemesterCards />
            </div>
            <div className={styles.saveScheduleContainer}>
              <div className={styles.saveSchedule}>
                <SaveSchedule
                  schedule={schedule}
                  params={params}
                  isNew={isNew}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </ScheduleContext.Provider>
  );
};

export default SchedulePage;
