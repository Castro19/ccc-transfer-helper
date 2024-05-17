import { classData } from "@/types";

interface formatClassListReturnType {
  value: string;
  label: string;
  course: string;
  units: string;
}

export function formatClassList(
  classList: classData[]
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
