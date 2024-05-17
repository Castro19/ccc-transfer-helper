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
  const formattedList = classList.map((course) => ({
    value: course.courseNumber,
    label: course.courseNumber,
    course: course.courseNumber,
    units: course.courseUnits,
  }));
  return formattedList;
}
