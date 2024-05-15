import { CourseType, SemesterType } from "@/types";

// Updated function to create default courses with unique IDs
const createDefaultCourses = (
  semesterId: number,
  numCourses: number
): CourseType[] => {
  return Array.from({ length: numCourses }, (_, index) => ({
    id: semesterId * 10 + index,
    courseCode: "",
    units: "",
  }));
};

export const initialSemesters: Array<SemesterType> = [
  { id: 0, term: "Summer", year: 2021, courses: createDefaultCourses(0, 4) },
  { id: 1, term: "Fall", year: 2021, courses: createDefaultCourses(1, 4) },
  { id: 2, term: "Spring", year: 2022, courses: createDefaultCourses(2, 4) },
  { id: 3, term: "Summer", year: 2022, courses: createDefaultCourses(3, 4) },
  { id: 4, term: "Fall", year: 2022, courses: createDefaultCourses(4, 4) },
  { id: 5, term: "Spring", year: 2023, courses: createDefaultCourses(5, 4) },
  { id: 6, term: "Summer", year: 2023, courses: createDefaultCourses(6, 4) },
  { id: 7, term: "Fall", year: 2023, courses: createDefaultCourses(7, 4) },
  { id: 8, term: "Spring", year: 2024, courses: createDefaultCourses(8, 4) },
];
