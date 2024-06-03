// Function to get used courses from the schedule
import {
  CompletedCourse,
  GEAccordionArea,
  GEAccordionSubArea,
  SemesterType,
} from "@/types";

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

export const findGeCompletion = (
  usedCourses: Set<string>,
  accordionData: GEAccordionArea[]
): GEAccordionArea[] => {
  const checkCompletion = (area: GEAccordionArea | GEAccordionSubArea) => {
    if ("subAreas" in area) {
      // Process subAreas only if 'area' is a GEAccordionArea
      let totalUnits = 0;
      let allSubAreasCompleted = true;

      // Ensure that we are dealing with 'units' requirements
      if (area.requirements[1] === "units") {
        Object.keys(area.subAreas || {}).forEach((subAreaKey) => {
          const subArea = area.subAreas[subAreaKey];
          checkCompletion(subArea);
          if (subArea.completed) {
            subArea.completedCourses.forEach((course) => {
              totalUnits += course.units;
            });
          } else {
            // If not area D
            if (area.requirements[0] !== 6) {
              allSubAreasCompleted = false;
            }
          }
        });

        area.currentUnitCount = totalUnits;
        area.completed =
          allSubAreasCompleted && totalUnits >= area.requirements[0];
      }
    }

    if ("subjects" in area) {
      // This block handles subject-based completion, assuming it might be a GEAccordionArea
      const subjects = area.subjects || {};
      const requiredClasses = area.requirements[0] || 1;
      const completedCourses: CompletedCourse[] = [];
      const completedSubjects: string[] = [];
      Object.keys(subjects).forEach((subjectCode) => {
        subjects[subjectCode].forEach((course) => {
          if (usedCourses.has(course.course)) {
            completedSubjects.push(subjectCode);
            completedCourses.push({
              course: course.course,
              courseTitle: course.courseTitle,
              subjectCode,
              units: parseFloat(course.units),
            });
          }
        });
      });

      const isCompleted = completedCourses.length >= requiredClasses;
      area.completed = isCompleted;
      area.completedSubjects = completedSubjects;
      area.completedCourses = completedCourses;
    }
  };

  accordionData.forEach((area) => {
    checkCompletion(area);
  });

  return accordionData;
};
