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

const Footer = ({ theme }) => {
  const [control, setControl] = useState(false);
  function playHandler() {
    setControl(!control);
  }
  return (
    <footer
      className={`bg-${theme.background} text-${theme.text} border-t border-white/5 rounded-t-xl shadow-inner px-3 py-3 md:px-4 flex flex-col md:flex-row items-center justify-between gap-3 sticky bottom-0`}
    >
      {/* Track Info */}
      <div
        className={`flex items-center gap-2 md:gap-3 min-w-0 flex-1 md:flex-none`}
      >
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-md bg-gradient-to-br from-red-600 to-red-900 flex-shrink-0`}
        ></div>
        <div className="min-w-0">
          <h4 className={`text-${theme.text} font-semibold text-sm truncate`}>
            Midnight Symphony
          </h4>
          <p className="text-gray-400 text-xs truncate">Orchestral Beats</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className={`flex text-${theme.text} flex-col items-center flex-1 w-full md:w-auto order-3 md:order-2`}>
        <div className="flex items-center gap-2 md:gap-4 mb-1 md:mb-2">
          <button className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/0 flex items-center justify-center text-${theme.text} hover:${theme.hoverText} transition text-sm md:text-base`}>
            <FaSync />
          </button>
          <button className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/0 flex items-center justify-center text-${theme.text} hover:${theme.hoverText} transition text-sm md:text-base`}>
            <FaBackward />
          </button>
          <button
            onClick={playHandler}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-500 shadow-md transition text-lg md:text-xl`}
          >
            {control ? <FaPause /> : <FaPlay />}
          </button>
          <button className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/0 flex items-center justify-center text-${theme.text} hover:${theme.hoverText} transition text-sm md:text-base`}>
            <FaForward />
          </button>
          <button className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/0 flex items-center justify-center text-${theme.text} hover:${theme.hoverText} transition text-sm md:text-base`}>
            <FaRandom />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 md:gap-3 w-full max-w-xs">
          <span className="text-xs text-gray-400 hidden xs:inline">1:45</span>
          <div className="flex-1 h-1 bg-white/10 rounded relative cursor-pointer min-w-[100px]">
            <div className="absolute top-0 left-0 h-1 bg-red-600 rounded w-1/3"></div>
          </div>
          <span className="text-xs text-gray-400 hidden xs:inline">3:30</span>
        </div>
      </div>

      {/* Volume */}
      <div className={`flex items-center gap-2 order-2 md:order-3 md:flex-none`}>
        <button className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/0 flex items-center justify-center text-${theme.text} hover:${theme.hoverText} transition text-sm md:text-base`}>
          <FaVolumeUp />
          <FaVolumeOff className="hidden" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
