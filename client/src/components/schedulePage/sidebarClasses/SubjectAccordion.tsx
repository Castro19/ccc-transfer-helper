import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClassType, SubjectType } from "@/types";

interface SubjectAccordionProps {
  subjects: SubjectType[];
}
const SubjectAccordion = ({ subjects }: SubjectAccordionProps) => {
  const entries = Object.entries(subjects);
  return (
    <Accordion type="multiple">
      {entries.map(([subject, classes]) => (
        <AccordionItem value={subject} key={subject}>
          <AccordionTrigger>{subject}</AccordionTrigger>
          {classes.map((classItem: ClassType, index: number) => (
            <AccordionContent key={index}>
              {classItem.course} ({classItem.units})
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SubjectAccordion;
