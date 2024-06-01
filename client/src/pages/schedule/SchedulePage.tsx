import { useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";
// Context:
import { useCollege, useLayout, useSchedule } from "@/contexts";
// Components:
import Sidebar from "@/components/layouts/Sidebar";
import SchedulePageTitle from "@/components/schedulePage/SchedulePageTitle";
import DropdownSettings from "@/components/schedulePage/dropdownSettings/dropdown/DropdownSettings";
import SemesterCards from "@/components/schedulePage/semester/Semesters";
import SaveSchedule from "@/components/savedSchedule/createSchedule/SaveSchedule";
// Types
import { ScheduleData, initialSemesters } from "@/types";

import styles from "./SchedulePage.module.css";
import { ScheduleContextType } from "@/contexts/scheduleContext";

const SchedulePage = (): JSX.Element => {
  // Load in Data from our loader
  const params = useParams();
  const initialData = useLoaderData() as ScheduleData;
  console.log("Initial Data: ", initialData);

  const { isSidebarVisible } = useLayout();
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

  const {
    schedule,
    initSchedule,
    initClassList,
    initSubjectClasses,
    initAccordionGE,
    updateIsNew,
  } = useSchedule() as ScheduleContextType;

  initClassList(initialData.classList);
  initSubjectClasses(initialData.subjectClasses);
  initAccordionGE(initialData.ge);

  console.log("PARAMS: ", params);

  useEffect(() => {
    if (initialData.savedSchedule) {
      handleSelectedYear(initialData.savedSchedule.params.year);
      handleSelectedCommunityCollege(initialData.savedSchedule.params.cccCode);
      handleSelectedTransferCollege(initialData.savedSchedule.params.college);
      handleSelectedMajor(initialData.savedSchedule.params.major);
      initSchedule(initialData.savedSchedule.schedule);
      updateIsNew(false);
    } else {
      handleSelectedYear(params.year);
      handleSelectedCommunityCollege(params.cccCode);
      handleSelectedTransferCollege(params.college);
      handleSelectedMajor(params.major);
      initSchedule(initialSemesters); // Ensure initialSemesters is defined
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
    initSchedule,
    initialData,
    major,
    params,
    univ,
    updateIsNew,
    year,
  ]);

  return (
    <div>
      {schedule && (
        <div className={styles.container}>
          {/* Sidebar Component with toggle function */}
          <Sidebar />
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
                <SaveSchedule params={params} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
