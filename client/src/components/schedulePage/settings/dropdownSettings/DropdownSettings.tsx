import { useState } from "react";
import DropdownOption from "../dropdownOption/DropdownOption";
import styles from "./DropdownSettings.module.css";

const DropdownSettings = (): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<
    string[]
  >([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownOptions = [
    { label: "Fill in all general Ed Classes", value: "GE" },
    { label: "Finish in 2 years", value: "2yrs" },
    { label: "Finish in 3 years", value: "3yrs" }
  ];

  const toggleDropdown = () =>
    setDropdownVisible(!dropdownVisible);

  const handleOptionSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(
      optionValue
    )
      ? selectedOptions.filter((opt) => opt !== optionValue)
      : [...selectedOptions, optionValue];
    setSelectedOptions(newSelectedOptions);
  };
  const handleOptionSubmit = () => {
    console.log("Selected options: ", selectedOptions);
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.button}
        onClick={toggleDropdown}
      >
        Generate Schedule Settings
      </button>
      <div
        className={
          dropdownVisible
            ? styles.dropdownContent
            : styles.dropdownContentClosed
        }
      >
        {dropdownVisible && (
          <div className={styles.options}>
            {dropdownOptions.map((option) => (
              <DropdownOption
                key={option.value}
                label={option.label}
                onClick={() => handleOptionSelect(option.value)}
                isSelected={selectedOptions.includes(
                  option.value
                )}
              />
            ))}
          </div>
        )}
        <button
          className={styles.submitButton}
          onClick={handleOptionSubmit}
        >
          Submit Selections
        </button>
      </div>
    </div>
  );
};

export default DropdownSettings;
