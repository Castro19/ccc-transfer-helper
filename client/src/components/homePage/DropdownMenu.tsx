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
}: DropdownType): JSX.Element => {
  const [position, setPosition] = useState<"item-aligned" | "popper">("popper");

  useEffect(() => {
    const adjustDropdownPosition = () => {
      const selectElem = document.getElementById(name);
      if (selectElem) {
        const rect = selectElem.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const bottomSpace = viewportHeight - rect.bottom;
        if (bottomSpace < 200) {
          setPosition("item-aligned");
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
        <SelectContent
          position={position}
          data-testid={`home-dropdown-${name}-list`}
        >
          {isCollege
            ? listOfItems.map((value, index) => (
                <SelectItem
                  key={index}
                  value={value.code}
                  onClick={() => handleFunction(value.code)}
                  data-testid={`home-dropdown-${name}-item-${index}`}
                >
                  {value.name} ({value.code})
                </SelectItem>
              ))
            : listOfItems.map((value, index) => (
                <SelectItem
                  key={index}
                  value={value}
                  data-testid={`home-dropdown-${name}-item-${index}`}
                >
                  {value}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default DropdownMenu;
