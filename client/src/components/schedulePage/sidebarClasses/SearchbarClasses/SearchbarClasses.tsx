import { formatClassList } from "../helpers/formatClasses";
import DraggableClass from "../DraggableClass/DraggableClass";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useMemo, useState } from "react";
import { findUsedCourses } from "../helpers/findUsedCourses";
import styles from "./SearchbarClasses.module.css";
import { useSchedule } from "@/contexts";
import { ScheduleContextType } from "@/contexts/scheduleContext";

const SearchbarClasses = (): JSX.Element => {
  const { classList, schedule } = useSchedule() as ScheduleContextType;
  const [isInputFocused, setIsInputFocused] = useState(false);

  const formattedList = formatClassList(classList);

  useEffect(() => {
    // Add event listener to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (event.target.closest(`.${styles.command}`)) {
        return;
      }
      setIsInputFocused(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to get used courses from the schedule
  const getUsedCourses = useMemo(() => {
    return findUsedCourses(schedule);
  }, [schedule]); // Recompute when schedule changes

  return (
    <Command className={styles.command}>
      <CommandInput
        placeholder="Search for a class..."
        onFocus={() => setIsInputFocused(true)}
      />
      <div
        className={
          isInputFocused ? styles.commandList : styles.commandListHidden
        }
      >
        <CommandList>
          <CommandEmpty>
            The class you are searching does not transfer to CalPoly SLO
          </CommandEmpty>
          {formattedList.map((course) => (
            <CommandItem key={course.course} className={styles.commandItem}>
              <DraggableClass
                classItem={course}
                isInUse={getUsedCourses.has(course.course)}
              />
            </CommandItem>
          ))}
        </CommandList>
      </div>
    </Command>
  );
};

export default SearchbarClasses;
