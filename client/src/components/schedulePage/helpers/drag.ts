import { CourseType, SemesterType } from "@/types";

export function handleDragStart(
  e: React.DragEvent<HTMLDivElement>,
  courseId: number,
  semesterId: number
): void {
  const dragData = { courseId, semesterId };
  e.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  e.dataTransfer.effectAllowed = "move";
  console.log("Drag start:", JSON.stringify(dragData));
}

export function handleDragOver(e: React.DragEvent<HTMLDivElement>): void {
  e.preventDefault(); // This is necessary to allow dropping
  e.dataTransfer.dropEffect = "move";
}

export function handleDrop(
  e: React.DragEvent<HTMLDivElement>,
  targetSemesterId: number,
  targetCourseId: number,
  schedule?: SemesterType[],
  handleScheduleChange?: (
    semesterId: number,
    courseId: number,
    type: string,
    newValue: string
  ) => void
): void {
  e.preventDefault();
  const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));

  console.log("DRAG DATA: ", dragData);
  const {
    courseId: sourceCourseId,
    semesterId: sourceSemesterId,
    course,
    units,
    fromSidebar,
  } = dragData;

  if (fromSidebar) {
    handleScheduleChange(
      targetSemesterId,
      targetCourseId,
      "courseCode",
      course
    );
    handleScheduleChange(targetSemesterId, targetCourseId, "units", units);
    return;
  }

  // Else
  if (
    sourceSemesterId === targetSemesterId &&
    sourceCourseId === targetCourseId
  ) {
    console.log("Dropped on the same item, no operation performed.");
    return;
  }
  console.log("Target Semester: ", targetSemesterId);
  console.log("Target Course: ", targetCourseId);
  swapCourses(
    sourceSemesterId,
    sourceCourseId,
    targetSemesterId,
    targetCourseId,
    schedule,
    handleScheduleChange
  );
}

function findCourseIndexById(courses: Array<CourseType>, courseId: number) {
  return courses.findIndex((course) => course.id === courseId);
}

const swapCourses = (
  sourceSemesterId: number,
  sourceCourseId: number,
  targetSemesterId: number,
  targetCourseId: number,
  schedule: SemesterType[],
  handleScheduleChange: (
    semesterId: number,
    courseId: number,
    type: string,
    newValue: string
  ) => void
) => {
  const sourceSemester = schedule.find(
    (semester) => semester.id === sourceSemesterId
  );
  const targetSemester = schedule.find(
    (semester) => semester.id === targetSemesterId
  );

  if (!sourceSemester || !targetSemester) {
    console.error("Semester not found.");
    return;
  }

  const sourceCourseIndex = findCourseIndexById(
    sourceSemester.courses,
    sourceCourseId
  );
  const targetCourseIndex = findCourseIndexById(
    targetSemester.courses,
    targetCourseId
  );

  if (sourceCourseIndex === -1 || targetCourseIndex === -1) {
    console.error("Course not found.");
    return;
  }

  const sourceCourse = sourceSemester.courses[sourceCourseIndex];
  const targetCourse = targetSemester.courses[targetCourseIndex];

  // Swapping courseCode
  handleScheduleChange(
    sourceSemesterId,
    sourceCourseId,
    "courseCode",
    targetCourse.courseCode
  );
  handleScheduleChange(
    targetSemesterId,
    targetCourseId,
    "courseCode",
    sourceCourse.courseCode
  );

  // Swapping units
  handleScheduleChange(
    sourceSemesterId,
    sourceCourseId,
    "units",
    targetCourse.units
  );
  handleScheduleChange(
    targetSemesterId,
    targetCourseId,
    "units",
    sourceCourse.units
  );
};

export function handleDragStartFromSidebar(
  e: React.DragEvent<HTMLDivElement>,
  courseCode: string,
  units: string
): void {
  const dragData = { courseCode, units };
  e.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  e.dataTransfer.effectAllowed = "move";
  console.log("Drag start:", JSON.stringify(dragData));
}

export default {
  handleDragOver,
  handleDragStart,
  handleDrop,
  handleDragStartFromSidebar,
};
