import CardMenu from "@/components/homePage/CardMenu";
import { useCollege } from "@/contexts/collegeContext";
import { fetchPDF } from "./getAssistData";
import { UnivHome } from "@/types";
import { useLayout } from "@/contexts";
import { useNavigate } from "react-router-dom";

const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  // Context Variables
  const { year, ccc, univ, major } = useCollege() as UnivHome;
  const { handleSidebarVisibility } = useLayout();

  handleSidebarVisibility(false);

  // 4.) Button Handler Functions:
  // 4a. Button to get their ASSIST PDF
  const handlePDF = async () => {
    if (major !== undefined && univ !== undefined) {
      fetchPDF(major["key"]);
    } else {
      alert("Please complete all fields before generating the PDF.");
    }
  };

  // 4b. Button to get their Schedule on the next page
  const handleNewWindow = () => {
    if (!ccc || !univ || !major || !year) {
      alert("Please complete all fields before getting the schedule.");
    } else {
      const transferCollegeParam = encodeURIComponent(univ.name);
      const cccParam = encodeURIComponent(ccc.name);
      const cccCode = encodeURIComponent(ccc.code);
      const majorParam = encodeURIComponent(major.major);

      const url = `/schedule/${year}/${cccParam}/${cccCode}/${transferCollegeParam}/${majorParam}`;
      navigate(url);
      // const newWindow = window.open(url, "_blank", "noopener,noreferrer");

      // if (newWindow) newWindow.opener = null;
    }
  };

  return (
    <div className="w-full items-center justify-center">
      <CardMenu handlePDF={handlePDF} handleNewWindow={handleNewWindow} />
      {/* <PDFCard /> */}
    </div>
  );
};

export default HomePage;
