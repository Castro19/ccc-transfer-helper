import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DropdownMenu from "./DropdownMenu";
// Context Variables:
import { useCollege } from "@/contexts/collegeContext";
// Helpers:
import fetchUnivsById, { fetchMajors } from "./utils/getAssistData";
// Types
import { MajorPair } from "@/types";

interface CardMenuProps {
  handlePDF: () => void;
  handleNewWindow: () => void;
}

// type
const CardMenu = ({
  handlePDF,
  handleNewWindow,
}: CardMenuProps): JSX.Element => {
  // Context Variables
  const {
    handleSelectedYear,
    ccc,
    handleSelectedCommunityCollege,
    univ,
    handleSelectedTransferCollege,
    major,
    handleSelectedMajor,
    // lists
    CCCList,
    univList,
    setUnivList,
    majorList,
    setMajorList,
  } = useCollege();

  // Use Effects: Handle when state vars change:
  // 1. When the user selects a new CCC, do:
  // 1a. Reset State vars
  // 1b. Fetch the new list of universities
  useEffect(() => {
    // 1a. Reset the Transfer College, Major, and list of majors
    handleSelectedTransferCollege(undefined);
    handleSelectedMajor(undefined);
    // setUnivList([]);
    setMajorList([]);

    // 1b. Fetch the new list of universities that have agreements with the CCC
    if (ccc) {
      const fetchData = async () => {
        try {
          const data = await fetchUnivsById(ccc);
          setUnivList(data);
        } catch (error) {
          console.error("Failed to fetch university data:", error);
        }
      };

      fetchData();
    }
  }, [ccc, setMajorList, setUnivList]);

  // 2. When the user selects their transfer university,:
  // 2a. Fetch the corresponding majors and their key values
  useEffect(() => {
    if (univ && ccc) {
      const fetchData = async () => {
        try {
          const data = await fetchMajors(ccc, univ);
          console.log("Majors:", data);
          setMajorList(data);
        } catch (error) {
          console.error("Failed to fetch the majors: ", error);
        }
      };
      fetchData();
    }
  }, [ccc, univ, setMajorList]);

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
            <DropdownMenu
              name="Year"
              labelText="Choose your Starting Year"
              handleFunction={handleSelectedYear}
              listOfItems={["2021", "2022", "2023", "2024"]}
              isCollege={false}
            />
            <DropdownMenu
              name="Community College"
              labelText="Choose your Community College"
              handleFunction={handleSelectedCommunityCollege}
              listOfItems={CCCList}
              isCollege={true}
            />
            <DropdownMenu
              name="University"
              labelText="Choose your University"
              handleFunction={handleSelectedTransferCollege}
              listOfItems={univList}
              isCollege={true}
              selectedValue={univ?.code || ""}
            />
            <DropdownMenu
              name="Major"
              labelText="Choose your Major"
              handleFunction={handleSelectedMajor}
              listOfItems={majorList.map((major: MajorPair) => major.major)}
              isCollege={false}
              selectedValue={major?.major || ""}
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
//   console.log("CCC: ", ccc);
//   console.log("College Selected: ", univ);
//   console.log("Major Selected: ", major);
// }, [major, univ, ccc]);
