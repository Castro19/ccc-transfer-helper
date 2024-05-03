import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownType } from "@/types";

const DropdownMenu = ({
  name,
  labelText,
  handleFunction,
  listOfItems,
  isCollege,
  selectedValue,
}: DropdownType) => {
  const [position, setPosition] = useState("popper");

  useEffect(() => {
    const adjustDropdownPosition = () => {
      const selectElem = document.getElementById(name);
      if (selectElem) {
        const rect = selectElem.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const bottomSpace = viewportHeight - rect.bottom;
        if (bottomSpace < 200) {
          // 200px is arbitrary, adjust based on your needs
          setPosition("top");
        } else {
          setPosition("popper");
        }
      }
    };

    window.addEventListener("resize", adjustDropdownPosition);
    adjustDropdownPosition();

    return () => {
      window.removeEventListener("resize", adjustDropdownPosition);
    };
  }, [name]);

  return (
    <>
      <Label htmlFor={name}>{labelText}</Label>
      <Select
        onValueChange={(value) => handleFunction(value)}
        value={selectedValue} // Controlled component
      >
        <SelectTrigger id={name}>
          <SelectValue placeholder={name} />
        </SelectTrigger>
        <SelectContent position={position}>
          {isCollege
            ? listOfItems.map((value, index) => (
                <SelectItem
                  key={index}
                  value={value.code}
                  onClick={() => handleFunction(value.code)}
                >
                  {value.name} ({value.code})
                </SelectItem>
              ))
            : listOfItems.map((value, index) => (
                <SelectItem key={index} value={value}>
                  {value}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default DropdownMenu;
