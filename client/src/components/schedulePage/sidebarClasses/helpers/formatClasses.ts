import { GE, ClassData, SubRequirement, Area } from "@/types";

interface formatClassListReturnType {
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

interface prepareFormattedAccordionDataReturnType {
  title: string;
  subAreas: Area | SubRequirement;
  requirements: SubRequirement;
}

export function prepareFormattedAccordionData(
  geData: GE
): prepareFormattedAccordionDataReturnType[] {
  // First, format the GE data
  const formattedGE = Object.entries(geData.GE).map(([, areaVal]) => {
    const obj = Object.entries(areaVal).filter(
      ([key]) => key !== "E" && key !== "F" // Removing specific keys if needed
    );
    return Object.fromEntries(obj);
  })[0];

  console.log("Formatted GE: ", formattedGE);

  // Then, prepare accordion data based on the formatted GE
  const accordionData = [];
  Object.entries(formattedGE).forEach(([areaTitle, area]) => {
    const subAreas = {};

    // Capture requirements for the parent area if available
    console.log("AREA REQS: ", area.requirements);
    const areaRequirements =
      `Requirement: Student needs to take ${area.requirements[0]} ${area.requirements[1]} from area ${areaTitle}` ||
      "No requirements listed";

    Object.entries(area)
      .filter(([key, value]) => key !== "title" && typeof value === "object")
      .forEach(([subReqKey, subReqValue]) => {
        const subAreaTitle = `${subReqKey}: ${subReqValue.title}`;

        // Capture requirements for the sub-area if available
        // console.log("SUB REQ VALUE: ", subReqValue.requirements);

        const subAreaRequirements =
          subReqValue.requirements && subReqValue.requirements.length !== 0
            ? `Requirement: Student needs to take ${subReqValue.requirements[0]} ${subReqValue.requirements[1]} from ${subAreaTitle}`
            : "No requirements listed";

        if (!subAreas[subReqKey]) {
          subAreas[subReqKey] = {
            subjects: {},
            title: subAreaTitle,
            requirements: subAreaRequirements,
          };
        }

        if (Array.isArray(subReqValue.courses)) {
          subReqValue.courses.forEach((course) => {
            const match = course.courseNumber.match(/^[A-Za-z]+/);
            const subject = match ? match[0] : "Unknown"; // Default to "Unknown" if no match found

            if (!subAreas[subReqKey].subjects[subject]) {
              subAreas[subReqKey].subjects[subject] = [];
            }
            subAreas[subReqKey].subjects[subject].push({
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
        requirements: areaRequirements,
      });
    }
  });

  return accordionData;
}
