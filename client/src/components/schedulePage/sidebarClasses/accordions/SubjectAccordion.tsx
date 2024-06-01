import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DraggableClass from "../DraggableClass/DraggableClass";
import { CourseType } from "@/types";
import { useMemo } from "react";
import { findUsedCourses } from "../helpers/findUsedCourses";
import { useSchedule } from "@/contexts";
import { ScheduleContextType } from "@/contexts/scheduleContext";

const SubjectAccordion = (): JSX.Element => {
  const { subjectClasses, schedule } = useSchedule() as ScheduleContextType;

  const entries = Object.entries(subjectClasses);

  // Function to get used courses from the schedule
  const getUsedCourses = useMemo(() => {
    return findUsedCourses(schedule);
  }, [schedule]); // Recompute when schedule changes

  return (
    <Accordion type="multiple">
      {entries.map(([subject, classes]) => (
        <AccordionItem value={subject} key={subject}>
          <AccordionTrigger>{subject}</AccordionTrigger>
          {classes.map((classItem: CourseType, index: number) => (
            <AccordionContent key={index}>
              <DraggableClass
                classItem={classItem}
                isInUse={getUsedCourses.has(classItem.course)}
              />
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SubjectAccordion;
