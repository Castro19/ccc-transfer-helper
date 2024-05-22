import { Fragment } from "react";
import styles from "./SchedulePageTitle.module.css";


type SchedulePageTitleProps = {
  selectedYear: string | null;
  selectedCCC: string | null;
  selectedTransferCollege: string | null;
  selectedMajor: string | null;
};

const SchedulePageTitle = ({
  selectedYear,
  selectedCCC,
  selectedTransferCollege,
  selectedMajor,
}: SchedulePageTitleProps): JSX.Element => {
  return (
    <Fragment>
      <div className = {styles.container}>

      
      <h1 className={styles.header}>
        {selectedTransferCollege}: {selectedMajor}
      </h1>
      <p className={styles.ccc}>
        Transferring from {selectedCCC}
      </p>
      <p className={styles.year}>
        Starting year: {selectedYear}
      </p>
      </div>
    </Fragment>
  );
};
export default SchedulePageTitle;

