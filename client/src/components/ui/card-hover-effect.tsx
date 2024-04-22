import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SemesterCard } from "../schedulePage/semester/SemesterCard";

// Define types for props
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

type HoverEffectProps = {
  semesters: SemesterType[];
  className?: string;
};

export const HoverEffect = ({ semesters, className }: HoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {semesters.map((semester, idx) => (
        <button
          key={semester.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() =>
            console.log(
              "Item clicked:",
              semester.id,
              semester.term,
              semester.year
            )
          }
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-300 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <SemesterCard semester={semester} />
        </button>
      ))}
    </div>
  );
};
