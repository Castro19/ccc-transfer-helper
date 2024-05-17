// ClassRow.tsx
import React, { useEffect, useState } from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import { IoTrashBinOutline } from "react-icons/io5";

interface ClassRowProps {
  semesterId: number; // Identifier of the semester the course belongs to
  courseId: number;
  initialCourseCode?: string;
  initialUnits?: string;
  onCourseCodeChange: (value: string) => void;
  onUnitsChange: (value: string) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    courseId: number,
    semesterId: number
  ) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    targetSemesterId: number,
    targetCourseId: number
  ) => void;

  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
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
  }, [initialCourseCode, initialUnits]);

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
  const clearFields = () => {
    setCourseCode("");
    setUnits("");
    onCourseCodeChange("");
    onUnitsChange("");
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, semesterId, courseId)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, semesterId, courseId)}
      className="flex items-center space-x-2 w-full cursor-move p-2 rounded shadow"
    >
      <div className="flex-shrink-0">
        <RiDragMove2Fill className="text-gray-100 h-5 w-5" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={courseCode}
        onChange={handleCourseCodeChange}
        maxLength={7}
        placeholder="Course Code"
        className="flex-grow-0 flex-shrink-0 md:flex-grow md:flex-shrink w-48 md:min-w-0 text-sm font-medium text-gray-100 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        value={units}
        onChange={handleUnitsChange}
        maxLength={4}
        placeholder="Units"
        className="flex-grow-0 flex-shrink-0 md:flex-grow md:flex-shrink w-24 md:min-w-0 text-sm font-medium text-gray-100 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={clearFields}
        className="flex-shrink-0 ml-2 p-1 rounded "
        title="Clear fields"
      >
        <IoTrashBinOutline className="h-5 w-5 text-gray-100 hover:text-red-500" />
      </button>
    </div>
  );
};

export default ClassRow;
