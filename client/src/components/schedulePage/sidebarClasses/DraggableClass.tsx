import { ClassType } from "@/types";
import handleDragStartFromSidebar from "../helpers/sidebarDrag";

type DraggableClassProps = {
  classItem: ClassType;
};
const DraggableClass = ({
  classItem
}: DraggableClassProps): JSX.Element => {
  return (
    <div
      draggable
      onDragStart={(e) =>
        handleDragStartFromSidebar(e, classItem)
      }
    >
      {classItem.course} ({classItem.units})
    </div>
  );
};

export default DraggableClass;
