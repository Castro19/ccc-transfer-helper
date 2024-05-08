type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

const YouTubeEmbed = ({ videoId, title }: YouTubeEmbedProps): JSX.Element => {
  const src = `https://www.youtube.com/embed/${videoId}?rel=0`; // Append correct URL parameters

  return (
    // Center content horizontally and manage aspect ratio
    <div className="flex justify-center items-center w-full bg-black">
      {/* Aspect Ratio Box */}
      <div
        style={{
          position: "relative",
          width: "100%", // Full width of the container
          maxWidth: "1080px", // Maximum video width
          height: 0, // Initial height to 0
          paddingBottom: "56.25%", // Top padding controls height, 56.25% for 16:9 aspect ratio
        }}
      >
        <iframe
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }} // Ensures iframe fills the container
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeEmbed;

{
  /* <div className="m-30">
{" "}
<YouTubeEmbed
  videoId="ujrUG-_EiVA" // Correct video ID
  title="Tutorial Video"
/>
</div> */
}
