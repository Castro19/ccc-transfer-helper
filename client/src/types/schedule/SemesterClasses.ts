import { CourseType, SemesterType } from "@/types";

// Function to create a default course
const createDefaultCourses = (numCourses: number): CourseType[] => {
  return Array(numCourses).fill({ courseCode: "", units: "" });
};

export const semesters: Array<SemesterType> = [
  {
    id: 1,
    term: "Summer",
    year: 2021,
    courses: createDefaultCourses(7), // Initialize each semester with 7 empty courses
  },
  {
    id: 2,
    term: "Fall",
    year: 2021,
    courses: createDefaultCourses(7),
  },
  {
    id: 3,
    term: "Spring",
    year: 2022,
    courses: createDefaultCourses(7),
  },
  {
    id: 4,
    term: "Summer",
    year: 2022,
    courses: createDefaultCourses(7),
  },
  {
    id: 5,
    term: "Fall",
    year: 2022,
    courses: createDefaultCourses(7),
  },
  {
    id: 6,
    term: "Spring",
    year: 2023,
    courses: createDefaultCourses(7),
  },
  {
    id: 7,
    term: "Summer",
    year: 2023,
    courses: createDefaultCourses(7),
  },
  {
    id: 8,
    term: "Fall",
    year: 2023,
    courses: createDefaultCourses(7),
  },
  {
    id: 9,
    term: "Spring",
    year: 2024,
    courses: createDefaultCourses(7),
  },
];
