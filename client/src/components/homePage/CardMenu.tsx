import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DropdownMenu from "./DropdownMenu";
// Helpers:
import fetchUnivsById, {
  fetchColleges,
  fetchMajors,
  fetchPDF,
} from "./utils/getAssistData";
// Types
import { Univ, MajorPair, DropdownType } from "@/types";

// type
const CardMenu = ({ colleges }: { colleges: Univ[] }) => {
  // The following 3 are lists that populate the dropdowns
  const CCCList = colleges; // JSON Data of CCCs
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [majorList, setMajorList] = useState<MajorPair[]>([]);
  fetchColleges;
  // The following 4 are the selected values that will be transferred to the next page
  const [year, setYear] = useState<number | undefined>();
  const [selectedCommunityCollege, setSelectedCommunityCollege] =
    useState<Univ>();
  const [selectedTransferCollege, setSelectedTransferCollege] = useState<
    Univ | undefined
  >();
  const [selectedMajor, setSelectedMajor] = useState<MajorPair>();

  // Use Effects: Handle when state vars change:
  // 1. When the user selects a new CCC, do:
  // 1a. Reset State vars
  // 1b. Fetch the new list of universities
  useEffect(() => {
    // 1a. Reset the Transfer College, Major, and list of majors
    setSelectedTransferCollege(undefined);
    setSelectedMajor(undefined);
    // setUnivList([]);
    setMajorList([]);

    // 1b. Fetch the new list of universities that have agreements with the CCC
    if (selectedCommunityCollege !== undefined) {
      const fetchData = async () => {
        try {
          // const ccc_id: number = selectedCommunityCollege.id;
          const data = await fetchUnivsById(selectedCommunityCollege);
          console.log("DATAAA: ", data);
          setUnivList(data); // Assuming setUnivList updates a state with the fetched data
        } catch (error) {
          console.error("Failed to fetch university data:", error);
        }
      };

      fetchData();
    }
  }, [selectedCommunityCollege]);

  // 2. When the user selects their transfer university,:
  // 2a. Fetch the corresponding majors and their key values
  useEffect(() => {
    if (selectedTransferCollege && selectedCommunityCollege) {
      const fetchData = async () => {
        try {
          const data = await fetchMajors(
            selectedCommunityCollege,
            selectedTransferCollege
          );
          console.log("Majors:", data);
          setMajorList(data);
        } catch (error) {
          console.error("Failed to fetch the majors: ", error);
        }
      };
      fetchData();
    }
  }, [selectedTransferCollege]);

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

    setSelectedCommunityCollege(chosenCommunityCollege);
  };
  // 3c. Select their Transfer University
  const handleSelectedTransferCollege = (collegeCode: string) => {
    const chosenTransferCollege = univList.find(
      (college) => college.code === collegeCode
    );
    setSelectedTransferCollege(chosenTransferCollege);
  };

  // 3d. Select their major
  const handleSelectedMajor = (collegeMajor: string) => {
    const chosenMajor: MajorPair | undefined = majorList.find(
      (major) => major.major === collegeMajor
    );

    setSelectedMajor(chosenMajor);
  };

  // 4.) Button Handler Functions:
  // 4a. Button to get their ASSIST PDF
  const handlePDF = async () => {
    if (selectedMajor !== undefined && selectedTransferCollege !== undefined) {
      fetchPDF(selectedMajor["key"]);
    } else {
      alert("Please complete all fields before generating the PDF.");
    }
  };

  // 4b. Button to get their Schedule on the next page
  const handleNewWindow = () => {
    if (
      !selectedCommunityCollege ||
      !selectedTransferCollege ||
      !selectedMajor ||
      !year
    ) {
      alert("Please complete all fields before getting the schedule.");
    } else {
      const transferCollegeParam = encodeURIComponent(
        selectedTransferCollege.name
      );
      const cccParam = encodeURIComponent(selectedCommunityCollege.name);
      const majorParam = encodeURIComponent(selectedMajor.major);

      const url = `/schedule/${year}/${cccParam}/${transferCollegeParam}/${majorParam}`;
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");

      if (newWindow) newWindow.opener = null;
    }
  };

  const yearList = ["2021", "2022", "2023", "2024"];
  const yearDropdown: DropdownType = {
    name: "Year",
    labelText: "Choose your Starting Year",
    handleFunction: handleSelectedYear,
    listOfItems: yearList,
    isCollege: false,
  };
  const CCCDropdown: DropdownType = {
    name: "Community College",
    labelText: "Choose your Community College",
    handleFunction: handleSelectedCommunityCollege,
    listOfItems: CCCList,
    isCollege: true,
  };
  const univDropdown: DropdownType = {
    name: "University",
    labelText: "Choose your University",
    handleFunction: handleSelectedTransferCollege,
    listOfItems: univList,
    isCollege: true,
  };
  const majorDropdown: DropdownType = {
    name: "Major",
    labelText: "Choose your Major",
    handleFunction: handleSelectedMajor,
    listOfItems: majorList.map((major) => major.major),
    isCollege: false,
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center">
            <CardTitle>Input your Transfer Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-3.5">
            <DropdownMenu items={yearDropdown} />
            <DropdownMenu items={CCCDropdown} />
            <DropdownMenu
              items={univDropdown}
              selectedValue={selectedTransferCollege?.code || ""}
            />
            <DropdownMenu
              items={majorDropdown}
              selectedValue={selectedMajor?.major || ""}
            />
          </div>
        </CardContent>
        <div className="flex flex-col space-y-3.5 w-10/12 mx-auto justify-center mb-10">
          <Button onClick={handlePDF}>Get PDF</Button>
          <Button onClick={handleNewWindow}>Get Schedule</Button>
        </div>
      </Card>
    </div>
  );
};

export default CardMenu;

// Debugging UseEffect
// useEffect(() => {
//   console.log("CCC: ", selectedCommunityCollege);
//   console.log("College Selected: ", selectedTransferCollege);
//   console.log("Major Selected: ", selectedMajor);
//   console.log("Year Chosen: ", year);
// }, [year, selectedMajor, selectedTransferCollege, selectedCommunityCollege]);
