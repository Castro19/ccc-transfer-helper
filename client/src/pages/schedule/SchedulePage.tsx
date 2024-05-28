import { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import SemesterCards from "@/components/schedulePage/semester/Semesters";
import SchedulePageTitle from "@/components/schedulePage/SchedulePageTitle";
import DropdownSettings from "@/components/schedulePage/dropdownSettings/dropdown/DropdownSettings";
import Sidebar from "@/components/layouts/Sidebar";
import { ScheduleContext } from "@/contexts/scheduleContext";
import { ScheduleData, SemesterType, initialSemesters } from "@/types";
import styles from "./SchedulePage.module.css";
import SaveSchedule from "@/components/savedSchedule/createSchedule/SaveSchedule";

const SchedulePage = (): JSX.Element => {
  const params = useParams();
  const initialData = useLoaderData() as ScheduleData;
  console.log("Initial Data: ", initialData);

  const [schedule, setSchedule] = useState<SemesterType[] | null>(null);
  const [subjectClasses] = useState(initialData.subjectClasses);
  const [classList] = useState(initialData.classList);
  const [ge] = useState(initialData.ge);

  const [selectedYear, setSelectedYear] = useState<string | undefined>();
  const [selectedCCC, setSelectedCCC] = useState<string | undefined>();
  const [selectedTransferCollege, setSelectedTransferCollege] = useState<
    string | undefined
  >();
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();
  const [isNew, setIsNew] = useState<boolean>(true); // Represents if it is a schedule we are editing or a new schedule we would want to save.
  console.log("PARAMS: ", params);
  useEffect(() => {
    if (initialData.savedSchedule) {
      setSelectedYear(initialData.savedSchedule.params.year);
      setSelectedCCC(initialData.savedSchedule.params.ccc);
      setSelectedTransferCollege(initialData.savedSchedule.params.college);
      setSelectedMajor(initialData.savedSchedule.params.major);
      setSchedule(initialData.savedSchedule.schedule);
      setIsNew(false);
    } else {
      setSelectedYear(params.year);
      setSelectedCCC(params.ccc);
      setSelectedTransferCollege(params.college);
      setSelectedMajor(params.major);
      setSchedule(initialSemesters); // Ensure initialSemesters is defined
    }

    // Optionally, if you want to log or use the selected params
    console.log(
      `Year: ${selectedYear}, CCC: ${selectedCCC}, College: ${selectedTransferCollege}, Major: ${selectedMajor}`
    );
  }, [initialData, params]);

  // Initialize state for schedule and classes

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
