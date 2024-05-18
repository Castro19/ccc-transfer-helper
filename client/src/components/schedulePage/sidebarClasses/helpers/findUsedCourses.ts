// Function to get used courses from the schedule

export const findUsedCourses = (schedule) => {
  const usedCourses = new Set();
  schedule.forEach((semester) => {
    semester.courses.forEach((course) => {
      if (course.courseCode) {
        usedCourses.add(course.courseCode);
      }
    });
  });
  return usedCourses;
}; // Recompute when schedule changes
