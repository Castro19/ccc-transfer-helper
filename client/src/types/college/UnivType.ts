export type Univ = {
  id: number;
  name: string;
  code: string;
  year?: number;
};

export type MajorPair = {
  major: string;
  key: string | number;
};

export type DropdownType = {
  name: string;
  labelText: string;
  handleFunction: (selectedId: string) => void;
  listOfItems: Univ[] | string[];
  isCollege: boolean;
  selectedValue?: string; // Optional property to handle selected value
};

export interface CollegeContextType {
  year: number | undefined;
  ccc: Univ | undefined;
  univ: Univ | undefined;
  major: MajorPair | undefined;
  handleSelectedYear: (collegeYear: string) => void;
  handleSelectedCommunityCollege: (collegeCode: string) => void;
  handleSelectedTransferCollege: (collegeCode: string) => void;
  handleSelectedMajor: (collegeMajor: string) => void;
  CCCList: Univ[];
  univList: Univ[];
  setUnivList: React.Dispatch<React.SetStateAction<Univ[]>>;
  majorList: MajorPair[];
  setMajorList: React.Dispatch<React.SetStateAction<MajorPair[]>>;
}
