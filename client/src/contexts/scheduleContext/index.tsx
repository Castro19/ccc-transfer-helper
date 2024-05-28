import { useState, useContext, createContext, ReactNode } from "react";
import {
  ClassData,
  CourseType,
  GEAccordionArea,
  GEDataType,
  SemesterType,
} from "@/types";
import {
  formatGEData,
  prepareFormattedAccordionData,
} from "@/components/schedulePage/sidebarClasses/helpers/formatClasses";

export type ScheduleContextType = {
  schedule: SemesterType[] | null;
  initSchedule: (updatedSchedule: SemesterType[]) => void;
  handleScheduleChange: (
    semesterId: number,
    courseId: number,
    type: string,
    newValue: string
  ) => void;
  subjectClasses: { [key: string]: CourseType[] };
  initSubjectClasses: (newSubjectClasses: {
    [key: string]: CourseType[];
  }) => void;
  classList: ClassData[];
  initClassList: (newClassList: ClassData[]) => void;
  accordionGE: GEAccordionArea[];
  initAccordionGE: (ge: GEDataType) => void;
  updateAccordionGE: (updatedAccordionData: GEAccordionArea[]) => void;
  isNew: boolean;
  updateIsNew: (val: boolean) => void;
};

type ScheduleProviderProps = {
  children: ReactNode;
};

// Initialize with default values
const initialScheduleContext: ScheduleContextType = {
  schedule: null,
  initSchedule: () => {},
  handleScheduleChange: () => {},
  subjectClasses: {}, // Empty object for subject classes
  initSubjectClasses: () => {},
  classList: [], // Empty array for class list
  initClassList: () => {},
  accordionGE: [], // Empty array for accordionGE
  initAccordionGE: () => {},
  updateAccordionGE: () => {},
  isNew: true,
  updateIsNew: () => {},
};

const ScheduleContext = createContext<ScheduleContextType>(
  initialScheduleContext
);

export const ScheduleProvider = ({
  children,
}: ScheduleProviderProps): JSX.Element => {
  // READ ONLY
  const [subjectClasses, setSubjectClasses] = useState<{
    [key: string]: CourseType[];
  }>({}); // Initialize with empty object
  const [classList, setClassList] = useState<ClassData[]>([]); // Initialize with empty array

  // State is updated:
  const [schedule, setSchedule] = useState<SemesterType[] | null>(null);
  const [accordionGE, setAccordionData] = useState<GEAccordionArea[]>([]);
  const [isNew, setIsNew] = useState<boolean>(true); // Represents if it is a schedule we are editing or a new schedule we would want to save.

  //   READ ONLY:
  const initSubjectClasses = (newSubjectClasses: {
    [key: string]: CourseType[];
  }) => {
    setSubjectClasses(newSubjectClasses);
  };

  const initClassList = (newClassList: ClassData[]) => {
    setClassList(newClassList);
  };

  const updateAccordionGE = (updatedAccordionData: GEAccordionArea[]) => {
    setAccordionData(updatedAccordionData);
  };

  const updateIsNew = (newValue: boolean) => {
    setIsNew(newValue);
  };

  const initAccordionGE = (ge: GEDataType) => {
    const formattedGE = formatGEData(ge);

    const accordionDataFormatted = prepareFormattedAccordionData(formattedGE);

    setAccordionData(accordionDataFormatted);
  };

  const initSchedule = (updatedSchedule: SemesterType[]) => {
    setSchedule(updatedSchedule);
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

  return (
    <ScheduleContext.Provider
      value={{
        schedule,
        initSchedule,
        handleScheduleChange,
        subjectClasses,
        initSubjectClasses,
        classList,
        initClassList,
        accordionGE,
        initAccordionGE,
        updateAccordionGE,
        isNew,
        updateIsNew,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

// Custom hook for easier access
// eslint-disable-next-line react-refresh/only-export-components
export const useSchedule = (): ScheduleContextType => {
  return useContext(ScheduleContext);
};
