import React, { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Make sure the path is correct for your project
import { classData, GE, SemesterType } from "@/types"; // Your GERequirements type or wherever you defined Course
import { findUsedCourses } from "./helpers/findUsedCourses";
import DraggableClass from "./DraggableClass/DraggableClass";
import { prepareFormattedAccordionData } from "./helpers/formatClasses";
// ui
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AccordionGEProps {
  ge: GE;
  schedule: SemesterType[];
}

const AccordionGE: React.FC<AccordionGEProps> = ({ ge, schedule }) => {
  console.log("ge.GE", ge.GE);

  // Function to get used courses from the schedule
  const getUsedCourses = useMemo(() => {
    return findUsedCourses(schedule);
  }, [schedule]); // Recompute when schedule changes

  const accordionData = prepareFormattedAccordionData(ge);

  console.log("ACCORDION DATA: ", accordionData);
  return (
    <Accordion type="multiple">
      {accordionData.map(({ title, subAreas, requirements }) => (
        <AccordionItem value={title} key={title}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AccordionTrigger className="text-left align-top whitespace-normal">
                  {title}
                </AccordionTrigger>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-white p-2 rounded shadow-lg max-w-xs break-words w-3/4"
              >
                <p>{requirements}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AccordionContent>
            <Accordion type="multiple">
              {Object.entries(subAreas)
                .filter(([key]) => key !== "requirements")
                .map(
                  ([
                    subAreaKey,
                    { subjects, title: subAreaTitle, requirements },
                  ]) => (
                    <AccordionItem value={subAreaKey} key={subAreaKey}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AccordionTrigger className="text-left align-top whitespace-normal">
                              {subAreaTitle}
                            </AccordionTrigger>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-white p-2 rounded shadow-lg max-w-xs break-words w-3/4"
                          >
                            <p>{requirements}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <AccordionContent>
                        <Accordion type="multiple">
                          {Object.entries(subjects).map(
                            ([subjectTitle, courses]) => (
                              <AccordionItem
                                value={subjectTitle}
                                key={subjectTitle}
                              >
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <AccordionTrigger className="text-left align-top whitespace-normal">
                                        {subjectTitle}
                                      </AccordionTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="top"
                                      className="bg-white p-2 rounded shadow-lg max-w-xs break-words w-3/4"
                                    >
                                      <p>Specific class requirements</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <AccordionContent>
                                  {courses.map((classData, idx2) => (
                                    <div className="mb-2 last:mb-0" key={idx2}>
                                      <DraggableClass
                                        classItem={classData}
                                        isInUse={getUsedCourses.has(
                                          classData.course
                                        )}
                                      />
                                    </div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            )
                          )}
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionGE;
