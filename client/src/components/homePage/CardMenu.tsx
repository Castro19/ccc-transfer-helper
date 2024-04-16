import { useEffect, useState } from "react";
import uMap from "@/assets/json_files/u_map.json";
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
import fetchUnivsById from "./utils/getAssistData";

type TransferCollegeData = {
  institutionName: string;
  majors: string[];
  receivingYearIds: number[];
  institutionParentId: number;
  code: string;
};

type CommunityCollegeData = {
  id: number;
  name: string;
  code: string;
};

type Univ = {
  id: number;
  code: string;
  name: string;
};
// type
const CardMenu = () => {
  const transferCollegeData: TransferCollegeData[] = Object.values(uMap);
  const communityCollegeData: CommunityCollegeData[] = ccc;

  const [count, setCount] = useState<number | null>(0);

  const [univList, setUnivList] = useState<Univ[]>([]);

  const [majorList, setMajorList] = useState<string[]>([]);
  const [selectedTransferCollege, setSelectedTransferCollege] = useState<
    number | null
  >(null);
  const [selectedCommunityCollege, setSelectedCommunityCollege] = useState<
    number | null
  >(null);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2021);

  useEffect(() => {
    console.log("CCC: ", selectedCommunityCollege);
    console.log("College Selected: ", selectedTransferCollege);
    console.log("Major Selected: ", selectedMajor);
    console.log("Year Chosen: ", year);
  }, [year, selectedMajor, selectedTransferCollege, selectedCommunityCollege]);

  const handleSelectedMajor = (collegeMajor: string) => {
    setSelectedMajor(collegeMajor);
  };

  const handleCount = (count: number | null): void => {
    if (count !== null) {
      setCount(count + 1);
    }
  };

  const handleNewWindow = () => {
    // Check if the values are not null, otherwise use a default value or handle as needed
    let transferCollegeParam: string | undefined = undefined;
    let cccParam: string | undefined = undefined;

    if (selectedCommunityCollege !== null) {
      cccParam = communityCollegeData.find(
        (college) => college.id === selectedCommunityCollege
      )?.name;
    }
    if (selectedTransferCollege !== null) {
      transferCollegeParam = transferCollegeData.find(
        (college) => college.institutionParentId === selectedTransferCollege
      )?.institutionName;
    }
    const majorParam =
      selectedMajor !== null
        ? encodeURIComponent(selectedMajor)
        : "default_major";

    const url = `/schedule?year=${year}&ccc=${cccParam}&college=${transferCollegeParam}&major=${majorParam}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");

    if (newWindow) newWindow.opener = null;
  };

  const handleSelectedYear = (collegeYear: string) => {
    setYear(Number(collegeYear));
  };

  const handleSelectedCommunityCollege = async (collegeCode: string) => {
    console.log("CCC CODE: ", collegeCode);
    const chosenCommunityCollegeData = communityCollegeData.find(
      (college) => college.code === collegeCode
    );

    setSelectedCommunityCollege(
      chosenCommunityCollegeData !== undefined
        ? chosenCommunityCollegeData.id
        : null
    );
    // setUnivList(data)
  };

  useEffect(() => {
    if (selectedCommunityCollege !== null) {
      const fetchData = async () => {
        try {
          const data = await fetchUnivsById(selectedCommunityCollege);
          console.log(data);
          setUnivList(data); // Assuming setUnivList updates a state with the fetched data
        } catch (error) {
          console.error("Failed to fetch university data:", error);
        }
      };

      fetchData();
    }
  }, [selectedCommunityCollege]);

  const handleSelectedTransferCollege = (collegeCode: string) => {
    const chosenTransferCollegeData = transferCollegeData.find(
      (college) => college.code === collegeCode
    );

    setSelectedTransferCollege(
      chosenTransferCollegeData !== undefined
        ? chosenTransferCollegeData.institutionParentId
        : null
    );
  };

  useEffect(() => {
    if (selectedTransferCollege) {
      // Find the college by its code
      const selectedTransferCollegeData = transferCollegeData.find(
        (college) => college.institutionParentId === selectedTransferCollege
      );
      if (selectedTransferCollegeData) {
        setMajorList(selectedTransferCollegeData.majors);
      } else {
        setMajorList([]); // Reset if not found
      }
    } else {
      setMajorList([]);
    }
  }, [selectedTransferCollege]);

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
            <Select onValueChange={(value) => handleSelectedMajor(value)}>
              <SelectTrigger id="major">
                <SelectValue placeholder="Major" />
              </SelectTrigger>
              <SelectContent position="popper">
                {majorList.map((major, index) => (
                  <SelectItem key={index} value={major}>
                    {major}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <div className="flex flex-col space-y-3.5 w-10/12 mx-auto justify-center mb-10">
          <Button onClick={() => handleCount(count)}>Get PDF: {count}</Button>
          <Button onClick={handleNewWindow}>Get Schedule: {count}</Button>
        </div>
      </Card>
    </div>
  );
};

export default CardMenu;
