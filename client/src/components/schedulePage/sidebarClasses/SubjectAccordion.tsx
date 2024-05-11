import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import DraggableClass from "./DraggableClass";
import { ClassType, SubjectType } from "@/types";

interface SubjectAccordionProps {
  subjects: SubjectType[];
}
const SubjectAccordion = ({
  subjects
}: SubjectAccordionProps): JSX.Element => {
  const entries = Object.entries(subjects);

  return (
    <Accordion type="multiple">
      {entries.map(([subject, classes]) => (
        <AccordionItem value={subject} key={subject}>
          <AccordionTrigger>{subject}</AccordionTrigger>
          {classes.map(
            (classItem: ClassType, index: number) => (
              <AccordionContent key={index}>
                <DraggableClass classItem={classItem} />
              </AccordionContent>
            )
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SubjectAccordion;
