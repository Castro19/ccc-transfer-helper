import CardMenu from "@/components/homePage/CardMenu";
import HomePageTitle from "@/components/homePage/HomePageTitle";
// import PDFCard from "./PDFCard";
// import YouTubeEmbed from "./YouTubeEmbed";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-6">
        <HomePageTitle />
        <div className="flex flex-col space-y-10">
          <CardMenu />
          {/* <PDFCard /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
