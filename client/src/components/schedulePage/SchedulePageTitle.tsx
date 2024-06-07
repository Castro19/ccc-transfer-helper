import { Fragment } from "react";
import styles from "./SchedulePageTitle.module.css";
import { MajorPair, Univ } from "@/types";
// import { Univ } from "@/types";

type SchedulePageTitleProps = {
  selectedYear: number | null;
  selectedCCC: string | null;
  selectedTransferCollege: string | Univ | null;
  selectedMajor: MajorPair | string | null;
};

const SchedulePageTitle = ({
  selectedYear,
  selectedCCC,
  selectedTransferCollege,
  selectedMajor,
}: SchedulePageTitleProps): JSX.Element => {
  // Helper function to format the major text
  const formatMajor = () => {
    if (
      selectedTransferCollege &&
      typeof selectedTransferCollege === "object"
    ) {
      if (typeof selectedMajor === "object" && "major" in selectedMajor) {
        return `${selectedTransferCollege.name}: ${selectedMajor.major}`;
      } else {
        return `${selectedTransferCollege.name}: ${selectedMajor}`;
      }
    } else {
      if (typeof selectedMajor === "object" && "major" in selectedMajor) {
        return `${selectedTransferCollege}: ${selectedMajor.major}`;
      } else {
        return `${selectedTransferCollege}: ${selectedMajor}`;
      }
    }
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.header} data-testid="schedule-header">
          {formatMajor()}
        </h1>
        <p className={styles.ccc} data-testid="schedule-ccc">
          Transferring from {selectedCCC}
        </p>
        <p className={styles.year} data-testid="schedule-year">
          Starting year: {selectedYear}
        </p>
      </div>
    </Fragment>
  );
};

export default SchedulePageTitle;
