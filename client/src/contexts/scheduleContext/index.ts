import { createContext, useContext } from "react";

export const ScheduleContext = createContext(undefined);

export function useSemesterContext() {
  const [semesters] = useContext(ScheduleContext);

  if (semesters === undefined) {
    throw new Error(
      "useScheduleContext must be used with a Schedule Context "
    );
  }
  return semesters;
}

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
