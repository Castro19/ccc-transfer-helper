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

export type ScheduleData = {
  schedule: SemesterCourses;
  classes: SubjectType;
};
