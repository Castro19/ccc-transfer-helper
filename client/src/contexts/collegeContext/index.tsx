/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  useContext,
  createContext,
  ReactNode
} from "react";
import { Univ, MajorPair } from "@/types";
import colleges from "@/assets/json_files/community_colleges.json";
import { CollegeContextType } from "@/types";

interface CollegeProviderProps {
  children: ReactNode;
}

const CollegeContext = createContext<
  CollegeContextType | undefined
>(undefined);

export const CollegeProvider = ({
  children
}: CollegeProviderProps): JSX.Element => {
  // 1.) Define our state variables
  //  1a. Lists:
  const CCCList = colleges;
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [majorList, setMajorList] = useState<MajorPair[]>([]);
  //  1b. The 4 selected items from the homepage
  const [year, setYear] = useState<number | undefined>();
  const [ccc, setCCC] = useState<Univ>();
  useState<Univ>();
  const [univ, setUniv] = useState<Univ | undefined>();
  const [major, setMajor] = useState<MajorPair>();

  // 2.) Selection Handler Functions: When the user selects from the dropdowns
  // 2a. Select their starting year
  const handleSelectedYear = (collegeYear: string) => {
    setYear(Number(collegeYear));
  };
  // 2b. Select their CCC
  const handleSelectedCommunityCollege = async (
    collegeCode: string
  ) => {
    console.log("CCC CODE: ", collegeCode);
    const chosenCommunityCollege = CCCList.find(
      (college) => college.code === collegeCode
    );

    setCCC(chosenCommunityCollege);
  };
  // 2c. Select their Transfer University
  const handleSelectedTransferCollege = (
    collegeCode: string
  ) => {
    const chosenTransferCollege = univList.find(
      (college) => college.code === collegeCode
    );
    setUniv(chosenTransferCollege);
  };

  // 2d. Select their major
  const handleSelectedMajor = (collegeMajor: string) => {
    const chosenMajor: MajorPair | undefined = majorList.find(
      (major) => major.major === collegeMajor
    );

    setMajor(chosenMajor);
  };

  // 3. Create our provider and pass down the necessary values to it.
  return (
    <CollegeContext.Provider
      value={{
        year,
        handleSelectedYear,
        ccc,
        handleSelectedCommunityCollege,
        univ,
        handleSelectedTransferCollege,
        major,
        handleSelectedMajor,
        // Lists
        CCCList,
        univList,
        setUnivList,
        majorList,
        setMajorList
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

// 4. Export our custom hook and make sure we use it within the correct Provider
export const useCollege = (): CollegeContextType => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error(
      "useCollege must be used within a CollegeProvider"
    );
  }
  return context;
};
