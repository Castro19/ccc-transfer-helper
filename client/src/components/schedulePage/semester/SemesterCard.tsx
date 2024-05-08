import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import ClassRow from "./ClassRow";
import { SemesterType } from "@/types";
import { useScheduleDataContext } from "@/contexts/scheduleContext";

type SemesterCardProps = {
  semester: SemesterType;
  hoveredIndex: number; // This doesn't seem to be used currently
};

export const SemesterCard = ({ semester }: SemesterCardProps) => {
  const { schedule, handleScheduleChange } = useScheduleDataContext();

  const onValueChange = (semesterIndex, courseIndex, type, newValue) => {
    handleScheduleChange(semesterIndex, courseIndex, type, newValue);
  };

  useEffect(() => {
    console.log("SCHEDULE CHANGING: ", schedule);
  }, [schedule]);

  function handleDragStart(e, courseIndex, semesterIndex) {
    const dragData = { courseIndex, semesterIndex };
    e.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = "move";
    console.log("Drag start:", JSON.stringify(dragData));
  }

  function handleDrop(e, targetSemesterIndex, targetCourseIndex) {
    e.preventDefault();
    const {
      courseIndex: sourceCourseIndex,
      semesterIndex: sourceSemesterIndex,
    } = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(
      "Drop data:",
      JSON.stringify({
        sourceCourseIndex,
        sourceSemesterIndex,
        targetCourseIndex,
        targetSemesterIndex,
      })
    );

    if (
      sourceSemesterIndex === targetSemesterIndex &&
      sourceCourseIndex === targetCourseIndex
    ) {
      // Do nothing if the course is dropped onto itself
      return;
    }

    const swapCourses = (
      sourceSemesterIndex,
      sourceCourseIndex,
      targetSemesterIndex,
      targetCourseIndex
    ) => {
      const sourceCourse =
        schedule[sourceSemesterIndex].courses[sourceCourseIndex];
      const targetCourse =
        schedule[targetSemesterIndex].courses[targetCourseIndex];

      // Swapping courseCode
      handleScheduleChange(
        sourceSemesterIndex,
        sourceCourseIndex,
        "courseCode",
        targetCourse.courseCode
      );
      handleScheduleChange(
        targetSemesterIndex,
        targetCourseIndex,
        "courseCode",
        sourceCourse.courseCode
      );

      // Swapping units
      handleScheduleChange(
        sourceSemesterIndex,
        sourceCourseIndex,
        "units",
        targetCourse.units
      );
      handleScheduleChange(
        targetSemesterIndex,
        targetCourseIndex,
        "units",
        sourceCourse.units
      );
    };
    swapCourses(
      sourceSemesterIndex,
      sourceCourseIndex,
      targetSemesterIndex,
      targetCourseIndex
    );
  }

  function handleDragOver(e) {
    e.preventDefault(); // This is necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
  }

  return (
    <div className="relative z-20 rounded-2xl bg-slate-800 border border-black dark:border-white/[0.2] group-hover:border-slate-700 overflow-hidden min-w-[200px] min-h-[300px] w-full max-w-[700px] mx-auto flex flex-col gap-5 p-4">
      <CardTitle className="flex-shrink-0">
        {semester.term} {semester.year}
      </CardTitle>
      <div className="flex-grow-0 flex flex-col gap-2">
        {semester.courses.map((course, index) => (
          <ClassRow
            key={`${semester.id}-course-${index}`}
            semesterId={semester.id} // Passed as index directly
            courseId={index} // Index of the course in the semester's course array
            initialCourseCode={course.courseCode}
            initialUnits={course.units}
            onDragStart={handleDragStart}
            onCourseCodeChange={(newCode) =>
              onValueChange(semester.id, index, "courseCode", newCode)
            }
            onUnitsChange={(newUnit) =>
              onValueChange(semester.id, index, "units", newUnit)
            }
            onDrop={(e) => handleDrop(e, semester.id, index)}
            onDragOver={handleDragOver}
          />
        ))}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-white font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
