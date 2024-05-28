import { createContext, useContext, useState, ReactNode } from "react";
import {
  // CourseType,
  ScheduleData,
  // SemesterType,
  // initialSemesters,
  // formattedGEType,
} from "@/types";
``;
// type ScheduleProviderProps = {
//   children: ReactNode;
// };

// type ScheduleContexType = {

// }
export const ScheduleContext = createContext<ScheduleData | undefined>(
  undefined
);

// export function useSemesterContext() {
//   const [schedule, setSchedule] = useState<SemesterType[] | null>(null);
//   const [subjectClasses] = useState();
//   const [classList] = useState();
//   const [ge] = useState();

//   const [semesters] = useContext(ScheduleContext);

//   if (semesters === undefined) {
//     throw new Error("useScheduleContext must be used with a Schedule Context ");
//   }
//   return semesters;
// }

export function useScheduleDataContext() {
  const context = useContext(ScheduleContext);

  if (context === undefined) {
    throw new Error(
      "useScheduleDataContext must be used within a ScheduleContext.Provider"
    );
  }

  return context; // This now includes { scheduleData, setScheduleData }
}

// export function useDefaultScheduleContext() {
//   const context = useContext(ScheduleContext);

//   if (context === undefined) {
//     throw new Error(
//       "useScheduleDataContext must be used within a ScheduleContext.Provider"
//     );
//   }

//   return context; // This now includes { defaultScheduleData, setDefaultScheduleData }
// }
// export function useClassesDataContext() {
//   const [classesData] = useContext(ScheduleContext);

//   if (classesData === undefined) {
//     throw new Error(
//       "useClassesDataContext must be used with a Schedule Context "
//     );
//   }
//   return classesData;
// }
