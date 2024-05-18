import ScheduleCard from "./scheduleCard/ScheduleCard";

interface savedScheduleType {
  id: string;
  ccc: string;
  univ: string;
  major: string;
  year: string;
}
interface ScheduleListProps {
  savedSchedules: savedScheduleType[];
}

const ScheduleList = ({ savedSchedules }: ScheduleListProps): JSX.Element => {
  console.log("SAVED SCHEDULES", savedSchedules);
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
          />
        </div>
      ))}
    </>
  );
};

export default ScheduleList;
