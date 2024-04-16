import { useLocation } from "react-router-dom";

const SchedulePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedYear = queryParams.get("year");
  const selectedCCC = queryParams.get("ccc");
  const selectedTransferCollege = queryParams.get("college");
  const selectedMajor = queryParams.get("major");
  return (
    <div>
      {selectedTransferCollege}: {selectedMajor} transferring from {selectedCCC}
      , year: {selectedYear}
    </div>
  );
};

export default SchedulePage;
