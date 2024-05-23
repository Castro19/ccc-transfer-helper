import { deleteScheduleById } from "../crudSchedule";
import ScheduleCard from "../scheduleCard/ScheduleCard";

interface savedScheduleType {
  id: string;
  ccc: string;
  univ: string;
  major: string;
  year: string;
}
interface ScheduleListProps {
  savedSchedules: savedScheduleType[];
  setScheduleList: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        ccc: string;
        univ: string;
        major: string;
        year: string;
      }[]
    >
  >;
}

const ScheduleList = ({
  savedSchedules,
  setScheduleList,
}: ScheduleListProps): JSX.Element => {
  console.log("SAVED SCHEDULES", savedSchedules);

  const onDelete = async (id: string) => {
    try {
      const newSavedSchedule = savedSchedules.filter(
        (schedule) => schedule.id !== id
      );
      setScheduleList(newSavedSchedule);
      const result = await deleteScheduleById(id);
      console.log("result ", result);
    } catch (error) {
      console.error("ERROR DELETING SCHEDULE: ", error.message);
    }
  };

  return (
    <>
      {savedSchedules.map((college, index) => (
        <div key={index}>
          <ScheduleCard
            id={college.id}
            ccc={college.ccc}
            univ={college.univ}
            major={college.major}
            year={college.year}
            onDelete={onDelete}
          />
        </div>
      ))}
    </>
  );
};

export default ScheduleList;
