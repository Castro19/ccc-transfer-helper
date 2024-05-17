import { useAuth } from "@/contexts/authContext";
import { SemesterType } from "@/types";
import { Params } from "react-router-dom";
import postSchedule from "./postSchedule";
import styles from "./SaveSchedule.module.css";

interface SaveScheduleProps {
  schedule: SemesterType[];
  params: Readonly<Params<string>>;
}

const SaveSchedule = ({ schedule, params }: SaveScheduleProps): JSX.Element => {
  const { currentUser } = useAuth();
  const handleSaveSchedule = async () => {
    console.log(
      `SAVING SCHEDULE ${schedule} for ${currentUser.uid} with params: ${params}`
    );
    const responseData = await postSchedule(currentUser.uid, schedule, params);
    console.log("POST SCHEDULE RESPONSE: ", responseData);
  };
  return (
    <>
      {currentUser && (
        <button className={styles.btn} onClick={handleSaveSchedule}>
          Save Schedule
        </button>
      )}
    </>
  );
};

export default SaveSchedule;
