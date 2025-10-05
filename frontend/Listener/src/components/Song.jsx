import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";

const Song = () => {
  let { id } = useParams();
  let [song, setSong] = useState({});
  let { theme, songToggle, songPlay } = useOutletContext();

  // Track screen width for responsive design
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await fetch(`http://localhost:3333/songs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSong(data.message);
        }
      } catch (error) {
        console.error("Error fetching song:", error.message);
      }
    }
    fetchSong();
  }, [id]);

  // Responsive sizes
  const isSmall = screenWidth < 600;
  const isMedium = screenWidth >= 600 && screenWidth < 1024;

  const albumSize = isSmall ? 120 : isMedium ? 130 : 150;
  const buttonSize = isSmall ? 55 : isMedium ? 60 : 65;

  return (
    <div
      className={`rounded-3xl bg-${theme.background} text-${theme.text} relative shadow-2xl`}
      style={{
        width: "100%",
        maxWidth: isSmall ? "100%" : "900px",
        minWidth: "300px",
        padding: isSmall ? "1.8rem 1.5rem" : "2.5rem 2rem",
      }}
    >
      <div
        className={`flex ${
          isSmall ? "flex-col items-center" : "flex-row items-center"
        } justify-between gap-6`}
      >
        {/* Album Art */}
        {song.img && (
          <img
            src={song.img}
            alt={song.name}
            className={`rounded-xl bg-${theme.background} border-2 border-[rgba(255,23,68,0.35)] shadow-lg flex-shrink-0 object-cover`}
            style={{
              width: `${albumSize}px`,
              height: `${albumSize}px`,
            }}
          />
        )}

        {/* Song Info */}
        <div className={`flex-1 ${isSmall ? "text-center" : "text-left"}`}>
          <div className="text-xs text-[#ff3b3b] tracking-wider font-semibold opacity-80">
            SONG
          </div>

          <h1
            className={`font-bold text-${theme.text} ${
              isSmall ? "text-2xl mt-2 mb-1" : "text-3xl mt-2 mb-1"
            }`}
          >
            {song.name}
          </h1>

          <h2
            className={`text-[#999] font-medium ${
              isSmall ? "text-base" : "text-xl"
            }`}
          >
            {song.aname}
          </h2>

          <div
            className={`text-[#ff3b3b] font-semibold opacity-70 ${
              isSmall ? "text-sm mt-3" : "text-base mt-3"
            }`}
          >
            {song.genre}
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={() => songPlay(song.url)}
          className={`
        bg-[#ff1744] rounded-full flex items-center justify-center text-white cursor-pointer
        transition-all duration-200 ease-in-out hover:scale-105
        shadow-[0_6px_20px_rgba(255,23,68,0.5)] hover:shadow-[0_8px_28px_rgba(255,23,68,0.7)]
        ${isSmall ? "mx-auto mt-4" : "ml-2"}
      `}
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            fontSize: isSmall ? "1.1rem" : "1.3rem",
          }}
        >
          {songToggle[song.url] ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* Lyrics Section */}
      {song.lyrics && (
        <div className="mt-6">
          <div className="text-xs text-[#ff3b3b] tracking-wider font-semibold opacity-80 mb-3">
            LYRICS
          </div>
          <div
            className={`text-${theme.text}/50 text-base leading-7 overflow-y-auto`}
            style={{
              maxHeight: isSmall ? "200px" : "250px",
              scrollbarWidth: "thin",
              scrollbarColor: "red transparent",
            }}
          >
            <div className="whitespace-pre-line">{song.lyrics}</div>
          </div>
        </div>
      )}

      {/* Glow Circle
  <div
    className="absolute rounded-full blur-3xl -z-10"
    style={{
      right: "-70px",
      bottom: "-70px",
      width: "200px",
      height: "200px",
      background: "radial-gradient(circle, rgba(255,23,68,0.12), transparent)",
    }}
  ></div> */}
    </div>
  );
};

export default Song;
