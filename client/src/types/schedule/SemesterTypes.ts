export type CourseType = {
  id?: number;
  courseCode: string | null;
  units: string;
};

export type ClassType = {
  course: string;
  units: string;
  subject?: string;
  inSchedule?: boolean;
};

export type SemesterCourses = {
  [key: string]: CourseType[];
};

export type SubjectType = {
  subject: CourseType[];
};

export type SemesterType = {
  id: number;
  term: string;
  year: number;
  courses: Array<CourseType>;
};

export type classData = {
  course(course: any): boolean;
  courseNumber: string;
  courseTitle: string;
  courseUnits: string;
};

export type ScheduleData = {
  schedule: SemesterCourses;
  subjectClasses: SubjectType;
  classList: classData[];
};

export interface SubRequirement {
  title: string;
  requirements: (number | string)[]; // Could be a mix of numbers and strings
  courses: classData[];
}

export interface Area {
  title: string;
  requirements: (number | string)[];
  [key: string]: SubRequirement | (number | string)[] | string; // Allow string for title
}

export interface GE {
  GE: Area[];
  [key: string]: Area[]; // For areas like "Area A", "Area B", etc.
}
