import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#252525] border-t border-white/5 rounded-t-xl shadow-inner px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 sticky bottom-0">
      
      {/* Track Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-red-600 to-red-900"></div>
        <div>
          <h4 className="text-white font-semibold text-sm">Midnight Symphony</h4>
          <p className="text-gray-400 text-xs">Orchestral Beats</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center flex-1 w-full md:w-auto">
        <div className="flex items-center gap-4 mb-2">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600 transition">
            ⏮
          </button>
          <button className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-500 shadow-md transition">
            ▶
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600 transition">
            ⏭
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full md:w-80">
          <span className="text-xs text-gray-400">1:45</span>
          <div className="flex-1 h-1 bg-white/10 rounded relative cursor-pointer">
            <div className="absolute top-0 left-0 h-1 bg-red-600 rounded w-1/3"></div>
          </div>
          <span className="text-xs text-gray-400">3:30</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600 transition">
          🔊
        </button>
      </div>
    </footer>
  );
};

export default Footer;
