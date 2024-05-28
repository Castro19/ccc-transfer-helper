import { GEDataType, ClassData, Area, GEAccordionArea, SubArea } from "@/types";

export interface formatClassListReturnType {
  value: string;
  label: string;
  course: string;
  units: string;
}

export function formatClassList(
  classList: ClassData[]
): formatClassListReturnType[] {
  const formattedList = classList
    .sort((a, b) => {
      const subjectA = a.courseNumber.replace(/[0-9]/g, ""); // Remove numbers for subject
      const subjectB = b.courseNumber.replace(/[0-9]/g, "");

      if (subjectA !== subjectB) {
        // Different subjects, sort alphabetically
        return subjectA.localeCompare(subjectB);
      } else {
        // Same subject, sort by entire course number (numerically)
        const numberA = parseInt(a.courseNumber.replace(/[^0-9]/g, ""), 10);
        const numberB = parseInt(b.courseNumber.replace(/[^0-9]/g, ""), 10);
        return numberA - numberB;
      }
    })
    .map((course) => ({
      value: course.courseNumber,
      label: course.courseNumber,
      course: course.courseNumber,
      units: course.courseUnits,
    }));

  return formattedList;
}

export type formattedGEType = {
  [key: string]: Area;
};

export function formatGEData(geData: GEDataType): formattedGEType {
  const formattedGE: formattedGEType = Object.entries(geData.GE).map(
    ([, areaVal]) => {
      const obj = Object.entries(areaVal).filter(
        ([key]) => key !== "E" && key !== "F" // Removing specific keys if needed
      );
      return Object.fromEntries(obj);
    }
  )[0];
  return formattedGE;
}

export function prepareFormattedAccordionData(
  formattedGE: formattedGEType
): GEAccordionArea[] {
  console.log("Formatted GE: ", formattedGE);

  // Then, prepare accordion data based on the formatted GE
  const accordionData = [];
  Object.entries(formattedGE).forEach(([areaTitle, area]: [string, Area]) => {
    const subAreas = {};

    // Capture requirements for the parent area if available
    const areaRequirements =
      `Requirement: Student needs to take ${area.requirements[0]} ${area.requirements[1]} from ${areaTitle}` ||
      "No requirements listed";

    // Map through every root area and then map through the nested sub areas
    Object.entries(area)
      .filter(
        ([key, value]) =>
          key !== "title" && key !== "requirements" && typeof value === "object"
      )
      // Map through each subArea in the area (skipping over the other properties in the area object)
      .forEach(([subAreaKey, subAreaValue]: [string, SubArea]) => {
        const subAreaTitle = `${subAreaKey}: ${subAreaValue.title}`;

        const subAreaRequirements =
          subAreaValue.requirements && subAreaValue.requirements.length !== 0
            ? `Requirement: Student needs to take ${subAreaValue.requirements[0]} ${subAreaValue.requirements[1]} from ${subAreaTitle}`
            : "No requirements listed";

        // For the subAreeas
        if (!subAreas[subAreaKey]) {
          subAreas[subAreaKey] = {
            subjects: {},
            title: subAreaTitle,
            requirements: subAreaValue.requirements,
            requirementsText: subAreaRequirements,
            completed: false,
            completedCourses: [],
            completedSubjects: [],
          };
        }

        if (Array.isArray(subAreaValue.courses)) {
          subAreaValue.courses.forEach((course) => {
            const match = course.courseNumber.match(/^[A-Za-z]+/);
            const subject = match ? match[0] : "Unknown"; // Default to "Unknown" if no match found

            if (!subAreas[subAreaKey].subjects[subject]) {
              subAreas[subAreaKey].subjects[subject] = [];
            }
            subAreas[subAreaKey].subjects[subject].push({
              course: course.courseNumber,
              courseTitle: course.courseTitle,
              units: course.courseUnits,
            });
          });
        }
      });

    if (Object.keys(subAreas).length > 0) {
      accordionData.push({
        title: areaTitle,
        subAreas,
        requirements: area.requirements,
        requirementsText: areaRequirements,
        completed: false,
        completedCourses: [],
        currentUnitCount: 0,
      });
    }
  });

  return accordionData;
}
