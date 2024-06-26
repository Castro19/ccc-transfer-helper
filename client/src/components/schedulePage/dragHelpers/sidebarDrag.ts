import { CourseType } from "@/types";
export default function handleDragStartFromSidebar(
  e: React.DragEvent<HTMLDivElement>,
  course: CourseType
): void {
  const dragData = {
    course: course.course,
    units: course.units,
    fromSidebar: true, // Flag to indicate dragging from sidebar
  };
  e.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  e.dataTransfer.effectAllowed = "move";
}
