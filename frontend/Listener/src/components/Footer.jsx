import {
  FaPause,
  FaPlay,
  FaForward,
  FaBackward,
  FaVolumeOff,
  FaVolumeUp,
  FaRandom,
  FaSync,
} from "react-icons/fa";
import { useState } from "react";
import FloatingPlayer from "./FloatingPlayer";

const Footer = ({ theme, audioRef, songPlay, songToggle, currentSong }) => {
  const [mute, setMute] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  function backwardHandler() {
    // console.log(audioRef.current.currentTime);
    audioRef.current.currentTime -= 10;
  }

  function forwardHandler() {
    // console.log(audioRef.current.currentTime);
    audioRef.current.currentTime += 10;
  }

  function muteHandler() {
    setMute(!mute);
    audioRef.current.muted = !mute;
  }

  return (
    <>
      {/* Floating Player Component */}
      {showPlayer && (
        <FloatingPlayer
          theme={theme}
          control={songToggle[audioRef.current.src]}
          audioRef={audioRef}
          songPlay={songPlay}
          mute={mute}
          setMute={setMute}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {/* Footer */}
      <footer
        className={`bg-${theme.background} text-${theme.text} border-t border-white/5 rounded-t-xl shadow-inner px-3 py-3 md:px-4 flex flex-col md:flex-row items-center justify-between gap-3 sticky bottom-0 z-50`}
      >
        {/* Track Info (👉 only this opens floating player) */}
        <div
          onClick={() => setShowPlayer(true)}
          className={`flex items-center gap-2 md:gap-3 min-w-0 flex-1 md:flex-none cursor-pointer`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-gradient-to-br from-red-600 to-red-900 flex-shrink-0">
            <img
              className="w-10 h-10 md:w-12 md:h-12 rounded-md"
              src={currentSong.img}
              alt=""
            />
          </div>
          <div className="min-w-0">
            <h4 className={`text-${theme.text} font-semibold text-sm truncate`}>
              {currentSong.sname || "No song playing"}
            </h4>
            <p className="text-gray-400 text-xs truncate">
              {currentSong.aname || "Orcestral Band"}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div
          className={`flex text-${theme.text} flex-col items-center flex-1 w-full md:w-auto order-3 md:order-2`}
        >
          <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-2">
            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <FaSync />
            </button>
            <button
              onClick={backwardHandler}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
            >
              <FaBackward />
            </button>
            <button
              onClick={() => {
                songPlay(audioRef.current.src);
              }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white"
            >
              {songToggle[audioRef.current.src] ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={forwardHandler}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
            >
              <FaForward />
            </button>
            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <FaRandom />
            </button>
          </div>
        </div>

        {/* Volume */}
        <div
          className={`flex items-center gap-2 order-2 md:order-3 md:flex-none`}
        >
          <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            {mute ? (
              <FaVolumeOff onClick={muteHandler} />
            ) : (
              <FaVolumeUp onClick={muteHandler} />
            )}
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
