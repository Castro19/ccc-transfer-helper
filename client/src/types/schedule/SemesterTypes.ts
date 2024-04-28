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
