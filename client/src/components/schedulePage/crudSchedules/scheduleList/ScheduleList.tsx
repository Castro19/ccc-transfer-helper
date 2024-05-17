import ScheduleCard from "./scheduleCard/ScheduleCard";
const fakeList = [
  {
    id: 1,
    ccc: "San Mateo College",
    univ: "California Polytechnic University, San Luis Obispo",
    major: "COMPUTER SCIENCE, B.S.",
    year: "2024",
  },
  {
    ccc: "Clovis Community College",
    univ: "California Polytechnic University, San Luis Obispo",
    major: "COMPUTER SCIENCE, B.S.",
    year: "2024",
  },
];

const ScheduleList = (): JSX.Element => {
  return (
    <>
      {fakeList.map((college, index) => (
        <div key={index}>
          <ScheduleCard
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
