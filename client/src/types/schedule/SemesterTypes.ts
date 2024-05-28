export type CourseType = {
  courseTitle: string;
  id?: number;
  courseCode?: string | null;
  course?: string;
  units: string;
  subject?: string;
  inSchedule?: boolean;
};

export type ClassData = {
  courseNumber: string;
  courseTitle: string;
  courseUnits: string;
};

export type SemesterCourses = {
  [key: string]: CourseType[];
};

export type SemesterType = {
  id: number;
  term: string;
  year: number;
  courses: CourseType[];
};

export type SubjectType = {
  subject: CourseType[];
};

type SavedScheduleData = {
  _id: string;
  userId: string;
  schedule: SemesterType[];
  params: {
    year: string;
    ccc: string;
    college: string;
    major: string;
  };
};

export type ScheduleData = {
  schedule: SemesterCourses;
  subjectClasses: CourseType[];
  classList: ClassData[];
  savedSchedule?: SavedScheduleData;
  ge: GEDataType;
};

// GE Areas
export interface SubArea {
  title: string;
  requirements?: [number, string] | []; // Optional sub-requirements as an array1
  courses: ClassData[];
}

export interface Area {
  title: string;
  requirements: [number, string]; // Optional sub-requirements as an array1
  subAreas: { [key: string]: SubArea }; // Explicitly define subAreas
}

export interface GEDataType {
  GE: Area[];
}

export type GEAccordionSubArea = {
  title: string;
  requirementsText: string;
  requirements: [number, string]; // Optional sub-requirements as an array1
  subjects: { [key: string]: CourseType[] };
  completed: boolean; // Indicates if this area is completed
  completedCourses: CompletedCourse[]; // Courses that satisfy the area
  completedSubjects?: string[];
};

export type CompletedCourse = {
  course: string;
  courseTitle: string;
  subjectCode: string;
  units: number;
};

export type GEAccordionArea = {
  title: string;
  requirementsText: string;
  requirements: [number, string]; // Requirements as a tuple
  subAreas: { [key: string]: GEAccordionSubArea }; // Subareas if any
  completed: boolean; // Indicates if this area is completed
  completedCourses: CompletedCourse[]; // Courses that satisfy the area
  currentUnitCount: number;
};
