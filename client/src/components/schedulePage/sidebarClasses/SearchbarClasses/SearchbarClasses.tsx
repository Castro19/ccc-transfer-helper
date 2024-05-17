import { classData } from "@/types";
import { formatClassList } from "./formatClasses";
type SearchbarClassesProps = {
  classList: classData[];
};
const SearchbarClasses = ({ classList }: SearchbarClassesProps) => {
  const formattedList = formatClassList(classList);
  console.log("CLASSLIST IN SEARCHBAR CLASSES: ", formattedList);
  return <div>S</div>;
};

export default SearchbarClasses;
