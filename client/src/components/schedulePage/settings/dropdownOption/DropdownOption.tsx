// import styles from "./DropdownOption.module.css";

type DropdownOptionProps = {
  label: string;
  onClick: () => void;
  isSelected: boolean;
};
const DropdownOption = ({
  label,
  onClick,
  isSelected,
}: DropdownOptionProps) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: isSelected ? "lightgray" : "white" }}
    >
      {label}
    </button>
  );
};

export default DropdownOption;
