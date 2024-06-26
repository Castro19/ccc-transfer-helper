import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Make sure the path is correct for your project
import { FaSquareCheck } from "react-icons/fa6";
import { GEAccordionSubArea } from "@/types"; // Your GERequirements type or wherever you defined Course
import { findGeCompletion, findUsedCourses } from "../helpers/findUsedCourses";
import DraggableClass from "../DraggableClass/DraggableClass";

// ui
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSchedule } from "@/contexts";
import { ScheduleContextType } from "@/contexts/scheduleContext";

const AccordionGE = (): JSX.Element => {
  const { accordionGE, updateAccordionGE, schedule } =
    useSchedule() as ScheduleContextType;
  console.log("ACCORDION DATA: ", accordionGE);

  // Function to get used courses from the schedule
  const usedCourses = useMemo(() => {
    const usedCourses = findUsedCourses(schedule);
    const updatedAccordionData = findGeCompletion(usedCourses, accordionGE);
    console.log("UPDATED ACCORDION DATA: ", accordionGE);
    updateAccordionGE(updatedAccordionData);
    return usedCourses;
  }, [accordionGE, schedule, updateAccordionGE]); // Recompute when schedule changes

  return (
    <Accordion type="multiple">
      {accordionGE.map(({ title, subAreas, requirementsText, completed }) => (
        <AccordionItem value={title} key={title}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AccordionTrigger className="text-left align-top whitespace-normal">
                  {title}
                  {completed && <FaSquareCheck style={{ color: "#2ECC71" }} />}
                </AccordionTrigger>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-white p-2 rounded shadow-lg max-w-xs break-words w-3/4"
              >
                <p>{requirementsText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AccordionContent>
            <Accordion type="multiple">
              {Object.entries(subAreas)
                .filter(([key]) => key !== "requirements")
                .map(([subAreaKey, subAreaValue]) => {
                  const {
                    subjects,
                    title: subAreaTitle,
                    requirementsText,
                    completed: subAreaCompleted,
                    completedSubjects: subjectsCompleted,
                  } = subAreaValue as unknown as GEAccordionSubArea; // Type Assertion
                  console.log("COMPLETED:::", completed);
                  return (
                    <AccordionItem value={subAreaKey} key={subAreaKey}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AccordionTrigger className="text-left align-top whitespace-normal">
                              {subAreaTitle}
                              {subAreaCompleted && (
                                <FaSquareCheck style={{ color: "#2ECC71" }} />
                              )}
                            </AccordionTrigger>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-white p-2 rounded shadow-lg max-w-xs break-words w-3/4"
                          >
                            <p>{requirementsText}</p>
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
                                        {subjectsCompleted.includes(
                                          subjectTitle
                                        ) && (
                                          <FaSquareCheck
                                            style={{ color: "#2ECC71" }}
                                          />
                                        )}
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
                                  {courses.map((classData, idx2: number) => (
                                    <div className="mb-2 last:mb-0" key={idx2}>
                                      <DraggableClass
                                        classItem={classData}
                                        isInUse={usedCourses.has(
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
                  );
                })}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionGE;
