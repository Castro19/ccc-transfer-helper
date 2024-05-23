// Function to get used courses from the schedule
import { SemesterType } from "@/types";

export const findUsedCourses = (schedule: SemesterType[]): Set<string> => {
  const usedCourses = new Set<string>();
  schedule.forEach((semester) => {
    semester.courses.forEach((course) => {
      if (course.courseCode) {
        usedCourses.add(course.courseCode);
      }
    });
  });
  return usedCourses;
}; // Recompute when schedule changes
