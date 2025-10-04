import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";

const Song = () => {
  let { id } = useParams();
  let [song, setSong] = useState({});
  let { songToggle, songPlay } = useOutletContext();

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
      style={{
        width: "90%",
        maxWidth: isSmall ? "95%" : "700px",
        minWidth: "300px",
        margin: "2rem auto",
        padding: isSmall ? "1.8rem 1.5rem" : "2.5rem 2rem",
        borderRadius: "24px",
        background: "linear-gradient(135deg, #111 0%, #191919 100%)",
        color: "#fff",
        position: "relative",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          alignItems: isSmall ? "center" : "center",
          justifyContent: "space-between",
          gap: isSmall ? "1.2rem" : "1.5rem",
        }}
      >
        {/* Album Art */}
        {song.img && (
          <img
            src={song.img}
            alt={song.name}
            style={{
              width: `${albumSize}px`,
              height: `${albumSize}px`,
              borderRadius: "14px",
              objectFit: "cover",
              background: "#222",
              border: "2px solid rgba(255, 23, 68, 0.35)",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.7)",
              flexShrink: 0,
            }}
          />
        )}

        {/* Song Info */}
        <div
          style={{
            flex: 1,
            textAlign: isSmall ? "center" : "left",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: "#ff3b3b",
              letterSpacing: "2px",
              fontWeight: 600,
              opacity: 0.8,
            }}
          >
            SONG
          </div>

          <h1
            style={{
              margin: "0.5rem 0 0.25rem",
              fontSize: isSmall ? "1.8rem" : "2.4rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {song.name}
          </h1>

          <h2
            style={{
              margin: 0,
              fontSize: isSmall ? "1rem" : "1.2rem",
              color: "#999",
              fontWeight: 500,
            }}
          >
            {song.aname}
          </h2>

          <div
            style={{
              marginTop: "0.75rem",
              fontSize: isSmall ? "0.95rem" : "1.05rem",
              color: "#ff3b3b",
              fontWeight: 600,
              opacity: 0.7,
            }}
          >
            {song.genre}
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={() => songPlay(song.url)}
          style={{
            background: "#ff1744",
            border: "none",
            borderRadius: "50%",
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            marginLeft: isSmall ? "0" : "0.5rem",
            marginTop: isSmall ? "1rem" : "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isSmall ? "1.1rem" : "1.3rem",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(255, 23, 68, 0.5)",
            transition: "transform 0.2s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow =
              "0 8px 28px rgba(255, 23, 68, 0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(255, 23, 68, 0.5)";
          }}
        >
          {songToggle[song.url] ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* Glow Circle */}
      <div
        style={{
          position: "absolute",
          right: "-70px",
          bottom: "-70px",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(255,23,68,0.12), transparent)",
          borderRadius: "50%",
          filter: "blur(45px)",
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

export default Song;
