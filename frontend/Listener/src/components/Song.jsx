import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { FaPause, FaPlay, FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast'

const Song = () => {
  let [liked, setLiked] = useState(false);
  let { id } = useParams();
  let [song, setSong] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);
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
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3333/songs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSong(data.message);
        } else {
          toast('Failed to fetch song !', {
            duration: 3500,
            position: 'top-center',
            style: {
              background: 'crimson',
              color: 'white'
            },
          });
        }
      } catch (error) {
        console.error("Error fetching song:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSong();
  }, [id]);

  // Responsive breakpoints
  const isSmall = screenWidth < 600;
  const isMedium = screenWidth >= 600 && screenWidth < 1024;

  // Responsive sizes
  const albumSize = isSmall ? 140 : isMedium ? 160 : 180;
  const buttonSize = isSmall ? 60 : isMedium ? 70 : 80;

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`rounded-3xl bg-${theme.background} text-${theme.text} relative shadow-2xl flex items-center justify-center`}
        style={{
          width: "100%",
          maxWidth: "900px",
          minWidth: "300px",
          padding: "3rem 2rem",
          minHeight: "400px",
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff1744] mx-auto mb-4"></div>
          <p className="text-lg">Loading song...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`rounded-3xl bg-${theme.background} text-${theme.text} relative shadow-2xl flex items-center justify-center`}
        style={{
          width: "100%",
          maxWidth: "900px",
          minWidth: "300px",
          padding: "3rem 2rem",
          minHeight: "400px",
        }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎵</div>
          <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#ff1744] text-white px-6 py-2 rounded-full hover:bg-[#e0143c] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen overflow-y-auto flex-1 bg-${theme.background} text-${theme.text} border border-white/5 shadow-md p-4 md:p-6 max-h-[580px]`}
      style={{
        width: "100%",
        maxWidth: "900px",
        minWidth: "280px",
        margin: "0 auto",
        padding: isSmall
          ? "1.5rem 1rem"
          : isMedium
            ? "2rem 1.5rem"
            : "2.5rem 2rem",
        scrollbarWidth: "thin",
        scrollbarColor: "red transparent",
      }}
    >
      {/* Album Art */}
        {song.img && (
          <div className={`flex-shrink-0 ${isSmall ? "mb-4" : ""}`}>
            <img
              src={song.img}
              alt={song.name}
              className={`w-[100%] lg:w-150 h-50 lg:h-70 m-auto rounded-xl shadow-lg object-stretch`}
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMkQyRDJEIi8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWODBIMzBWMTQwSDEyMFYxNjBIODBWMTQwSDEyMFY4MFY2MFoiIGZpbGw9IiM1RTVFNjQiLz4KPC9zdmc+";
              }}
            />
          </div>
        )}
      {/* Main Content */}
      <div
        className={`flex ${isSmall ? "flex-col items-center text-center" : "flex-row items-start"
          } gap-6 mb-6`}
      >

        {/* Song Info */}
        <div className={`flex-1 flex flex-col justify-center gap-1 items-center ${isSmall ? "w-full" : ""}`}>
          <h1
            className={`font-bold text-${theme.text} ${isSmall
              ? "text-2xl"
              : isMedium
                ? "text-3xl"
                : "text-4xl"
              } leading-tight break-words`}
          >
            {song.name || "Unknown Song"}
          </h1>

          <h2
            className={`text-[#999] font-medium ${isSmall ? "text-lg" : "text-x"
              } leading-tight`}
          >
            {song.aname || "Unknown Artist"}
          </h2>

          {song.genre && (
            <div
              className={`inline-block bg-[rgba(255,59,59,0.1)] text-[#ff3b3b] font-semibold px-3 py-1 rounded-full ${isSmall ? "text-sm" : "text-base"
                }`}
            >
              {song.genre}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={` flex-0.5 flex lg:w-[50%] m-auto justify-between items-center ${isSmall ? "flex-col-reverse gap-4" : "flex-row"
          } mb-6`}
      >
        {/* Love Button */}
        <button
          onClick={() => setLiked(!liked)}
          className={`
            rounded-full cursor-pointer transition-all duration-200 ease-in-out
            hover:scale-110 active:scale-95
            ${isSmall ? "order-2" : ""}
          `}
          aria-label={liked ? "Unlike song" : "Like song"}
          style={{
            fontSize: isSmall ? "1.3rem" : "1.5rem",
          }}
        >
          <FaHeart
            className={`transition-colors duration-200 ${liked ? "text-[#ff3b3b] fill-current" : "text-white fill-current"
              }`}
            style={{ fontSize: "2em" }}
          />
        </button>

        {/* Play Button */}
        <button
          onClick={() => songPlay(song.url)}
          className={`
            bg-[#ff1744] rounded-full flex items-center justify-center text-white cursor-pointer
            transition-all duration-200 ease-in-out hover:scale-105 active:scale-95
            shadow-[0_6px_20px_rgba(255,23,68,0.5)] hover:shadow-[0_8px_28px_rgba(255,23,68,0.7)]
            ${isSmall ? "order-1" : ""}
          `}
          aria-label={songToggle[song.url] ? "Pause song" : "Play song"}
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            fontSize: isSmall ? "1.3rem" : "1.5rem",
          }}
        >
          {songToggle[song.url] ? <FaPause /> : <FaPlay className="ml-1" />}
        </button>
      </div>

      {/* Lyrics Section */}
      {song.lyrics && (
        <div className="mt-8">
          <div className="text-xs text-[#ff3b3b] tracking-wider font-semibold opacity-80 mb-3">
            LYRICS
          </div>
          <div
            className={`text-${theme.text} opacity-80 leading-relaxed`}
          >
            <div className="whitespace-pre-line font-light">{song.lyrics}</div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      {/* <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 59, 59);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 59, 59, 0.8);
        }
      `}</style> */}
    </div>
  );
};

export default Song;
