// ClassRow.tsx
import React, { useEffect, useState } from "react";

interface ClassRowProps {
  semesterId: number; // Identifier of the semester the course belongs to
  courseId: number;
  initialCourseCode?: string;
  initialUnits?: string;
  onCourseCodeChange: (value: string) => void;
  onUnitsChange: (value: string) => void;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    id: string,
    semesterId: number
  ) => void; // Handler for when dragging starts
  onDrop: any;
  onDragOver: any;
}
const ClassRow: React.FC<ClassRowProps> = ({
  semesterId,
  courseId,
  initialCourseCode = "",
  initialUnits = "",
  onCourseCodeChange,
  onUnitsChange,
  onDragStart,
  onDrop,
  onDragOver,
}) => {
  const [courseCode, setCourseCode] = useState(initialCourseCode);
  const [units, setUnits] = useState(initialUnits);

  // Effect to sync state with props
  useEffect(() => {
    setCourseCode(initialCourseCode);
    setUnits(initialUnits);
  }, [initialCourseCode, initialUnits]); // Dependencies on the props

  const handleCourseCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCourseCode = event.target.value;
    setCourseCode(newCourseCode);
    onCourseCodeChange(newCourseCode);
  };

  const handleUnitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUnits = event.target.value;
    setUnits(newUnits);
    onUnitsChange(newUnits);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, courseId, semesterId)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, courseId, semesterId)}
      className="flex space-x-2 w-full cursor-move"
    >
      <input
        type="text"
        value={courseCode}
        onChange={handleCourseCodeChange}
        maxLength={7}
        placeholder="Course Code"
        className="flex-1 p-2 text-sm font-medium text-white bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        value={units}
        onChange={handleUnitsChange}
        maxLength={4}
        placeholder="Units"
        className="flex-none w-20 p-2 text-sm font-medium text-white bg-transparent border-b border-slate-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default ClassRow;
