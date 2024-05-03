import { CourseType, SemesterType } from "@/types";

// Function to create a default course
const createDefaultCourses = (numCourses: number): CourseType[] => {
  return Array(numCourses).fill({ courseCode: "", units: "" });
};

export const initialSemesters: Array<SemesterType> = [
  {
    id: 0,
    term: "Summer",
    year: 2021,
    courses: createDefaultCourses(7), // Initialize each semester with 7 empty courses
  },
  {
    id: 1,
    term: "Fall",
    year: 2021,
    courses: createDefaultCourses(7),
  },
  {
    id: 2,
    term: "Spring",
    year: 2022,
    courses: createDefaultCourses(7),
  },
  {
    id: 3,
    term: "Summer",
    year: 2022,
    courses: createDefaultCourses(7),
  },
  {
    id: 4,
    term: "Fall",
    year: 2022,
    courses: createDefaultCourses(7),
  },
  {
    id: 5,
    term: "Spring",
    year: 2023,
    courses: createDefaultCourses(7),
  },
  {
    id: 6,
    term: "Summer",
    year: 2023,
    courses: createDefaultCourses(7),
  },
  {
    id: 7,
    term: "Fall",
    year: 2023,
    courses: createDefaultCourses(7),
  },
  {
    id: 8,
    term: "Spring",
    year: 2024,
    courses: createDefaultCourses(7),
  },
];
