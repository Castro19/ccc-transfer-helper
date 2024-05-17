import { cn } from "@/lib/utils";
import ClassRow from "./ClassRow";
import { SemesterType } from "@/types";
import { useScheduleDataContext } from "@/contexts/scheduleContext";
import {
  handleDragOver,
  handleDragStart,
  handleDrop
} from "../helpers/drag";
type SemesterCardProps = {
  semester: SemesterType;
  handleScheduleChange: (
    semesterId: number,
    courseId: number,
    type: string,
    newValue: string
  ) => void;
};

export const SemesterCard = ({
  semester
}: SemesterCardProps): JSX.Element => {
  const { schedule, handleScheduleChange } =
    useScheduleDataContext();

  const onValueChange = (
    semesterId: number,
    courseId: number,
    type: string,
    newValue: string
  ) => {
    handleScheduleChange(semesterId, courseId, type, newValue);
  };

  return (
    <div className="relative z-20 rounded-2xl bg-slate-800 border border-black dark:border-white/[0.2] group-hover:border-slate-700 overflow-hidden min-w-[200px] min-h-[300px] w-full max-w-[700px] mx-auto flex flex-col gap-5 p-4">
      <CardTitle className="flex-shrink-0">
        {semester.term} {semester.year}
      </CardTitle>
      <div className="flex-grow-0 flex flex-col gap-2">
        {semester.courses.map((course) => (
          <ClassRow
            key={course.id}
            semesterId={semester.id} // Passed as index directly
            courseId={course.id} // Index of the course in the semester's course array
            initialCourseCode={course.courseCode}
            initialUnits={course.units}
            onDragStart={(e) =>
              handleDragStart(e, course.id, semester.id)
            }
            onCourseCodeChange={(newCode) =>
              onValueChange(
                semester.id,
                course.id,
                "courseCode",
                newCode
              )
            }
            onUnitsChange={(newUnit) =>
              onValueChange(
                semester.id,
                course.id,
                "units",
                newUnit
              )
            }
            onDrop={(e: React.DragEvent<HTMLDivElement>) =>
              handleDrop(
                e,
                semester.id,
                course.id,
                schedule,
                handleScheduleChange
              )
            }
            onDragOver={handleDragOver}
          />
        ))}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <h4
      className={cn(
        "text-white font-bold tracking-wide mt-4",
        className
      )}
    >
      {children}
    </h4>
  );
};
