export type CourseType = {
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

export type ScheduleData = {
  schedule: SemesterCourses;
  subjectClasses: CourseType[];
  classList: ClassData[];
};

export interface SubRequirement {
  title: string;
  requirements: (number | string)[];
  courses: ClassData[];
}

export interface Area {
  title: string;
  requirements: (number | string)[];
  subRequirements?: SubRequirement[]; // Optional sub-requirements as an array
  [key: string]: string | (number | string)[] | SubRequirement[] | undefined; // Index signature allowing specific types
}

export interface GE {
  GE: Area[];
  [key: string]: Area[]; // For areas like "Area A", "Area B", etc.
}
