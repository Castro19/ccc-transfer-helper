import { useEffect, useState } from "react";
import uMap from "@/assets/json_files/u_map.json";
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

type CollegeData = {
  institutionName: string;
  majors: string[];
  receivingYearIds: number[];
  institutionParentId: number;
  code: string;
};

const CardMenu = () => {
  const collegeData: CollegeData[] = Object.values(uMap);
  const [count, setCount] = useState<number | null>(0);
  const [selectedCollege, setSelectedCollege] = useState<number | null>(null);
  const [majorList, setMajorList] = useState<string[]>([]);
  const [selectMajor, setSelectedMajor] = useState<string | null>(null);

  const handleCount = (count: number | null): void => {
    if (count !== null) {
      setCount(count + 1);
    }
  };

  const handleSelectedCollege = (collegeCode: string) => {
    const chosenCollegeData = collegeData.find(
      (college) => college.code === collegeCode
    );

    setSelectedCollege(
      chosenCollegeData !== undefined
        ? chosenCollegeData.institutionParentId
        : null
    );
  };

  const handleSelectedMajor = (collegeMajor: string) => {
    setSelectedMajor(collegeMajor);
  };

  useEffect(() => {
    if (selectedCollege) {
      // Find the college by its code
      const selectedCollegeData = collegeData.find(
        (college) => college.institutionParentId === selectedCollege
      );
      if (selectedCollegeData) {
        setMajorList(selectedCollegeData.majors);
      } else {
        setMajorList([]); // Reset if not found
      }
    } else {
      setMajorList([]);
    }
  }, [selectedCollege]);

  useEffect(() => {
    console.log("College Selected: ", selectedCollege);
    console.log("Major Selected: ", selectMajor);
  }, [selectMajor]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Input your Transfer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-3.5">
            <Label htmlFor="year">Choose your Starting Year</Label>
            <Select>
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
            <Label htmlFor="university">
              Choose the University you want to transfer to
            </Label>
            <Select onValueChange={(value) => handleSelectedCollege(value)}>
              <SelectTrigger id="university">
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent position="popper">
                {collegeData.map((college, index) => (
                  <SelectItem
                    key={index}
                    value={college.code}
                    onClick={() => handleSelectedCollege(college.code)}
                  >
                    {college.institutionName} ({college.code})
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
          <Button onClick={() => handleCount(count)}>
            Get Schedule: {count}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CardMenu;
