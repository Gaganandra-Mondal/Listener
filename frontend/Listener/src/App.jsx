import NavBar from "./components/NavBar";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const App = () => {
  const audioRef = useRef(new Audio());
  let [songToggle, setSongToggle] = useState({});
  let [songs, setSongs] = useState([]);
  let [currentSong, setCurrentSong] = useState({});
  useEffect(() => {
    async function getSongs() {
      try {
        let response = await fetch("http://localhost:3333/");
        let data = await response.json();
        setSongs(data.message);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setSongs([]);
      }
    }
    getSongs();
  }, []);

  function songPlay(url) {
    // Stop any currently playing audio
    if (!audioRef.current) return;

    for (let song of songs) {
      if (song.url === url) {
        // console.log("Found song:", song);
        setCurrentSong(song);
        break;
      }
    }

    if (audioRef.current.src === url && !audioRef.current.paused) {
      console.log("Same");
      audioRef.current.pause();
      setSongToggle((prev) => {
        return {
          ...prev,
          [audioRef.current.src]: !prev[audioRef.current.src],
        };
      });
      return;
    }

    setSongToggle((prev) => {
      let newState = {};
      for (let key in prev) {
        newState[key] = false;
      }
      newState[url] = true;
      return { ...newState };
    });

    audioRef.current.pause();
    audioRef.current.src = url;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }
  let [theme, setTheme] = useState({
    background: "black",
    text: "gray-300",
    hoverText: "white",
  });
  function toggleTheme() {
    if (theme.background === "black") {
      setTheme({
        background: "white",
        text: "black",
        hoverText: "gray-800",
      });
    } else {
      setTheme({
        background: "black",
        text: "gray-300",
        hoverText: "white",
      });
    }
  }
  return (
    <div
      className={`min-h-screen bg-${theme.background} text-${theme.text} flex flex-col`}
    >
      <NavBar
        theme={theme}
        toggleTheme={toggleTheme}
        audioRef={audioRef}
        songToggle={songToggle}
        songPlay={songPlay}
      />
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-3 md:p-4">
        <SideBarLeft
          theme={theme}
          audioRef={audioRef}
          songToggle={songToggle}
          songPlay={songPlay}
        />
        <Outlet context={{ theme, audioRef, songToggle, songPlay, songs }} />
        <SideBarRight
          theme={theme}
          audioRef={audioRef}
          songToggle={songToggle}
          songPlay={songPlay}
        />
      </div>
      <Footer
        theme={theme}
        audioRef={audioRef}
        songToggle={songToggle}
        songPlay={songPlay}
        currentSong={currentSong}
      />
    </div>
  );
};

export default App;
