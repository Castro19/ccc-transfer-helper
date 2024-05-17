import ScheduleList from "@/components/schedulePage/crudSchedules/scheduleList/ScheduleList";
import { useLoaderData } from "react-router-dom";
const SavedSchedulesPage = (): JSX.Element => {
  const savedSchedules = useLoaderData();
  console.log("SCHEDULE INS SAVED: ", savedSchedules);
  return (
    <div>
      <p>SavedSchedulesPage</p>
      <ScheduleList />
    </div>
  );
};

export default SavedSchedulesPage;
