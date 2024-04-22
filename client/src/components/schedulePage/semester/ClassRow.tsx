// ClassRow.tsx
import React, { useState } from "react";

interface ClassRowProps {
  initialCourseCode?: string;
  initialUnits?: string;
  onCourseCodeChange: (value: string) => void;
  onUnitsChange: (value: string) => void;
}

const ClassRow: React.FC<ClassRowProps> = ({
  initialCourseCode = "",
  initialUnits = "",
  onCourseCodeChange,
  onUnitsChange,
}) => {
  const [courseCode, setCourseCode] = useState(initialCourseCode);
  const [units, setUnits] = useState(initialUnits);

  const handleCourseCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCourseCode(event.target.value);
    onCourseCodeChange(event.target.value);
  };

  const handleUnitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnits(event.target.value);
    onUnitsChange(event.target.value);
  };

  return (
    <div className="flex space-x-2 w-full">
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
