export type CourseType = {
  courseCode: string;
  units: string;
};

export type SemesterType = {
  id: number;
  term: string;
  year: number;
  courses: Array<CourseType>;
};

export type ClassType = {
  course: string;
  units: string;
  subject?: string;
};

export type SubjectType = {
  subject: ClassType[];
};

export type ScheduleData = {
  classes: ClassType[];
  schedule: ClassType[];
};
