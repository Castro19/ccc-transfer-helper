import CardMenu from "@/components/homePage/CardMenu";
import HomePageTitle from "@/components/homePage/HomePageTitle";
import { useLoaderData } from "react-router-dom";
// import PDFCard from "./PDFCard";
// import YouTubeEmbed from "./YouTubeEmbed";
// types:
import { Univ } from "@/types";

const HomePage = () => {
  const colleges: Univ[] = useLoaderData() as Univ[];
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-6">
        <HomePageTitle />
        <div className="flex flex-col space-y-10">
          <CardMenu colleges={colleges} />
          {/* <PDFCard /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
