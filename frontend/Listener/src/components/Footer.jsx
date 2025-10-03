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

const Footer = ({ theme }) => {
  const [mute, setMute] = useState(false);
  const [control, setControl] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  function muteHandler() {
    setMute(!mute);
  }

  function playHandler() {
    setControl(!control);
  }

  return (
    <>
      {/* Floating Player Component */}
      {showPlayer && (
        <FloatingPlayer
          theme={theme}
          control={control}
          setControl={setControl}
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
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-gradient-to-br from-red-600 to-red-900 flex-shrink-0"></div>
          <div className="min-w-0">
            <h4 className={`text-${theme.text} font-semibold text-sm truncate`}>
              Midnight Symphony
            </h4>
            <p className="text-gray-400 text-xs truncate">Orchestral Beats</p>
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
            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <FaBackward />
            </button>
            <button
              onClick={playHandler}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white"
            >
              {control ? <FaPause /> : <FaPlay />}
            </button>
            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
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
