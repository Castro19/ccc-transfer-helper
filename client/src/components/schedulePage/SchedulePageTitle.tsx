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
  return (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.header}>
          {selectedTransferCollege &&
          typeof selectedTransferCollege === "object"
            ? `${selectedTransferCollege.name}: ${selectedMajor}`
            : `${selectedTransferCollege}: ${selectedMajor}`}
        </h1>
        <p className={styles.ccc}>Transferring from {selectedCCC}</p>
        <p className={styles.year}>Starting year: {selectedYear}</p>
      </div>
    </Fragment>
  );
};
export default SchedulePageTitle;
