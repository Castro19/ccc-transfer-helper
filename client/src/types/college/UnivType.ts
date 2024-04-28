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
};
