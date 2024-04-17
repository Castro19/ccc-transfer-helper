import CardMenu from "./CardMenu";
import HomePageTitle from "./HomePageTitle";
// import PDFCard from "./PDFCard";
// import YouTubeEmbed from "./YouTubeEmbed";

const HomePage = () => {
  return (
    <div className="space-y-6">
      {" "}
      <HomePageTitle />
      <div className="flex flex-col space-y-10">
        <CardMenu />
        {/* <PDFCard /> */}
      </div>
    </div>
  );
};

export default HomePage;
