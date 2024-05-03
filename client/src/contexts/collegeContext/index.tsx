import { useState, useContext, createContext } from "react";
import { Univ, MajorPair } from "@/types";
import colleges from "@/assets/json_files/community_colleges.json";
const CollegeContext = createContext(undefined);

export const CollegeProvider = ({ children }: any) => {
  //   Lists:
  const CCCList = colleges;
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [majorList, setMajorList] = useState<MajorPair[]>([]);

  const [year, setYear] = useState<number | undefined>();
  const [ccc, setCCC] = useState<Univ>();
  useState<Univ>();
  const [univ, setUniv] = useState<Univ | undefined>();
  const [major, setMajor] = useState<MajorPair>();

  // 3.) Selection Handler Functions: When the user selects from the dropdowns
  // 3a. Select their starting year
  const handleSelectedYear = (collegeYear: string) => {
    setYear(Number(collegeYear));
  };
  // 3b. Select their CCC
  const handleSelectedCommunityCollege = async (collegeCode: string) => {
    console.log("CCC CODE: ", collegeCode);
    const chosenCommunityCollege = CCCList.find(
      (college) => college.code === collegeCode
    );

    setCCC(chosenCommunityCollege);
  };
  // 3c. Select their Transfer University
  const handleSelectedTransferCollege = (collegeCode: string) => {
    const chosenTransferCollege = univList.find(
      (college) => college.code === collegeCode
    );
    setUniv(chosenTransferCollege);
  };

  // 3d. Select their major
  const handleSelectedMajor = (collegeMajor: string) => {
    const chosenMajor: MajorPair | undefined = majorList.find(
      (major) => major.major === collegeMajor
    );

    setMajor(chosenMajor);
  };

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
        setMajorList,
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollege = () => useContext(CollegeContext);
