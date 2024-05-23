import { CourseType } from "@/types";
import { RiDragMove2Fill } from "react-icons/ri";
import handleDragStartFromSidebar from "../../dragHelpers/sidebarDrag";
import styles from "./DraggableClass.module.css";
type DraggableClassProps = {
  classItem: CourseType;
  isInUse: boolean;
};
const DraggableClass = ({
  classItem,
  isInUse,
}: DraggableClassProps): JSX.Element => {
  const classList = `${styles.draggableClass} ${isInUse ? styles.inUse : ""}`;

  return (
    <div
      className={classList}
      draggable
      onDragStart={(e) => handleDragStartFromSidebar(e, classItem)}
    >
      <p className={styles.course}>{classItem.course}</p>
      <p className={styles.unit}>({classItem.units})</p>
      <RiDragMove2Fill className={styles.dragIcon} /> {/* Icon for dragging */}
    </div>
  );
};

export default DraggableClass;
