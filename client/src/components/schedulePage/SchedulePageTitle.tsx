import { Fragment } from "react";

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
  selectedMajor
}: SchedulePageTitleProps): JSX.Element => {
  return (
    <Fragment>
      <h1 className="text-2xl font-bold text-center mt-4 mb-2">
        {selectedTransferCollege}: {selectedMajor}
      </h1>
      <p className="text-center font-bold text-2xl text-gray-800 my-4">
        Transferring from {selectedCCC}
      </p>
      <p className="text-center font-bold text-2xl text-gray-800 my-4">
        Starting year: {selectedYear}
      </p>
    </Fragment>
  );
};
export default SchedulePageTitle;
