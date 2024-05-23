import CardMenu from "@/components/homePage/CardMenu";
import HomePageTitle from "@/components/homePage/HomePageTitle";
import { useCollege } from "@/contexts/collegeContext";
import { fetchPDF } from "./getAssistData";

const HomePage = (): JSX.Element => {
  // Context Variables
  const { year, ccc, univ, major } = useCollege();

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
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");

      if (newWindow) newWindow.opener = null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-6">
        <HomePageTitle />
        <div className="flex flex-col space-y-10">
          <CardMenu handlePDF={handlePDF} handleNewWindow={handleNewWindow} />
          {/* <PDFCard /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
