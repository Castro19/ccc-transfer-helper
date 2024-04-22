import { cn } from "@/lib/utils";
import ClassRow from "./ClassRow";

type CourseType = {
  courseCode: string;
  units: string;
};

type SemesterType = {
  id: number;
  term: string;
  year: number;
  courses: Array<CourseType>;
};

type SemesterCardProps = {
  semester: SemesterType;
};

export const SemesterCard = ({ semester }: SemesterCardProps) => {
  return (
    <div className="relative z-20 rounded-2xl bg-slate-800 border border-black dark:border-white/[0.2] group-hover:border-slate-700 overflow-hidden min-w-[300px] min-h-[300px] w-full max-w-[700px] mx-auto flex flex-col gap-5 p-4">
      <CardTitle className="flex-shrink-0">
        {semester.term} {semester.year}
      </CardTitle>
      <div className="flex-grow-0 flex flex-col gap-2">
        {semester.courses.map((course, index) => (
          <ClassRow
            key={`${semester.id}-course-${index}`}
            initialCourseCode={course.courseCode}
            initialUnits={course.units}
            onCourseCodeChange={(newCode) =>
              console.log(`New Code for Course ${index}: ${newCode}`)
            }
            onUnitsChange={(newUnit) =>
              console.log(`New Units for Course ${index}: ${newUnit}`)
            }
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
