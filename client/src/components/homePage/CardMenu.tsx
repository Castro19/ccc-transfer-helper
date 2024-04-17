import { useEffect, useState } from "react";
import ccc from "@/assets/json_files/community_colleges.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// Helpers:
import fetchUnivsById, { fetchMajors, fetchPDF } from "./utils/getAssistData";

type Univ = {
  id: number;
  name: string;
  code: string;
  year?: number;
};

type MajorPair = {
  major: string;
  key: string | number;
};

// type
const CardMenu = () => {
  // The following 3 are lists that populate the dropdowns
  const communityCollegeData: Univ[] = ccc; // JSON Data of CCCs
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [majorList, setMajorList] = useState<MajorPair[]>([]);

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
    setMajorList([]);

    // 1b. Fetch the new list of universities that have agreements with the CCC
    if (selectedCommunityCollege !== undefined) {
      const fetchData = async () => {
        try {
          // const ccc_id: number = selectedCommunityCollege.id;
          const data = await fetchUnivsById(selectedCommunityCollege);
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
    const chosenCommunityCollege = communityCollegeData.find(
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
      let transferCollegeParam = encodeURIComponent(
        selectedTransferCollege.name
      );
      let cccParam = encodeURIComponent(selectedCommunityCollege.name);
      const majorParam = encodeURIComponent(selectedMajor.major);

      const url = `/schedule?year=${year}&ccc=${cccParam}&college=${transferCollegeParam}&major=${majorParam}`;
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");

      if (newWindow) newWindow.opener = null;
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Input your Transfer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-3.5">
            <Label htmlFor="year">Choose your Starting Year</Label>
            <Select onValueChange={(value) => handleSelectedYear(value)}>
              <SelectTrigger id="year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="university">Choose your Community College</Label>
            <Select
              onValueChange={(value) => handleSelectedCommunityCollege(value)}
            >
              <SelectTrigger id="ccc">
                <SelectValue placeholder="Community College" />
              </SelectTrigger>
              <SelectContent position="popper">
                {communityCollegeData.map((college, index) => (
                  <SelectItem
                    key={index}
                    value={college.code}
                    onClick={() => handleSelectedCommunityCollege(college.code)}
                  >
                    {college.name} ({college.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label htmlFor="university">
              Choose the University you want to transfer to
            </Label>
            <Select
              value={selectedTransferCollege?.code || ""}
              onValueChange={(value) => handleSelectedTransferCollege(value)}
            >
              <SelectTrigger id="university">
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent position="popper">
                {univList.map((college, index) => (
                  <SelectItem
                    key={index}
                    value={college.code}
                    onClick={() => handleSelectedTransferCollege(college.code)}
                  >
                    {college.name} ({college.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label htmlFor="major">Choose your Major</Label>
            <Select
              value={selectedMajor?.major || ""}
              onValueChange={(value) => handleSelectedMajor(value)}
            >
              <SelectTrigger id="major">
                <SelectValue placeholder="Major" />
              </SelectTrigger>
              <SelectContent position="popper">
                {majorList.map((major, index) => (
                  <SelectItem key={index} value={major.major}>
                    {major.major}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
