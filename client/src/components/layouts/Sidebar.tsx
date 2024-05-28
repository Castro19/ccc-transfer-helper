import { MdClose, MdArrowRight } from "react-icons/md";
import SubjectAccordion from "../schedulePage/sidebarClasses/accordions/SubjectAccordion";
import SearchbarClasses from "../schedulePage/sidebarClasses/SearchbarClasses/SearchbarClasses";
import { GEDataType, SemesterType, SubjectType, ClassData } from "@/types";
import AccordionGE from "../schedulePage/sidebarClasses/accordions/AccordionGE";
type SidebarProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  subjectClasses: SubjectType;
  ge: GEDataType;
  classList: ClassData[];
  schedule: SemesterType[];
};
const Sidebar = ({
  isVisible,
  setIsVisible,
  subjectClasses,
  ge,
  classList,
  schedule,
}: SidebarProps): JSX.Element => {
  const sidebarClasses: string = `fixed top-0 left-0 h-screen w-72 bg-white dark:bg-gray-800 z-40 overflow-y-auto shadow-lg p-4 transition-transform duration-300 ease-in-out ${
    isVisible ? "translate-x-0" : "-translate-x-full"
  }`;

  return (
    <>
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="
            fixed left-0 top-1/2 -translate-y-1/2 z-50
            p-3
            rounded-r-full
            bg-gray-200 dark:bg-gray-700
            text-gray-600 dark:text-gray-300
            hover:bg-gray-300 dark:hover:bg-gray-600
            focus:outline-none focus:ring-4 focus:ring-gray-500 dark:focus:ring-gray-300
            transition ease-in-out duration-300
            shadow-lg hover:shadow-xl
          "
          aria-label="Open sidebar"
        >
          <div className="text-3xl transform transition-transform ease-in-out duration-300">
            <MdArrowRight />
          </div>
        </button>
      )}

      <aside className={sidebarClasses}>
        <div className="text-gray-700 dark:text-white">
          <button
            onClick={() => setIsVisible(false)}
            className="
              absolute top-4 right-4
              p-3
              rounded-full
              bg-gray-200 dark:bg-gray-700
              text-gray-600 dark:text-gray-300
              hover:bg-gray-300 dark:hover:bg-gray-600
              focus:outline-none focus:ring-4 focus:ring-gray-500 dark:focus:ring-gray-300 text-xl
              transition ease-in-out duration-300
              shadow-lg hover:shadow-xl
            "
            aria-label="Close sidebar"
          >
            <div className="transform transition-transform ease-in-out duration-300">
              <MdClose />
            </div>
          </button>
          <h2 className="font-semibold text-xl">Classes</h2>
          <div className="mt-5">
            <SubjectAccordion subjects={subjectClasses} schedule={schedule} />
          </div>
          <div className="mt-5">
            <AccordionGE ge={ge} schedule={schedule} />
          </div>
          <div>
            <SearchbarClasses classList={classList} schedule={schedule} />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
