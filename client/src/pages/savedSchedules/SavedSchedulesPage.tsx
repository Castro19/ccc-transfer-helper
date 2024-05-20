import ScheduleList from "@/components/schedulePage/crudSchedules/scheduleList/ScheduleList";
import { SemesterCourses } from "@/types";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./SavedSchedulesPage.module.css";

type paramsType = {
  year: string;
  ccc: string;
  cccCode: string;
  college: string;
  major: string;
};
type savedSchedule = {
  _id: string;
  userId: string;
  schedule: SemesterCourses;
  params: paramsType;
};

const SavedSchedulesPage = (): JSX.Element => {
  const savedSchedules = useLoaderData() as savedSchedule[];
  console.log("SS: ", savedSchedules);
  const scheduleListFormatted = savedSchedules.map((schedule) => {
    return {
      id: schedule._id,
      ccc: schedule.params.ccc,
      univ: schedule.params.college,
      major: schedule.params.major,
      year: schedule.params.year,
    };
  });
  // Next steps: Create a handler function to modify the setScheduleList (change state and backend database)
  const [scheduleList] = useState(scheduleListFormatted);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Saved Schedules</h1>
      <ScheduleList savedSchedules={scheduleList} />
    </div>
  );
};

export default SavedSchedulesPage;
