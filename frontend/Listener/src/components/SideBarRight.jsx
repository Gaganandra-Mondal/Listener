import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

const SideBarRight = () => {
  const sections = ["Top Tracks", "Viral Hits", "New Releases", "Charts", "Recommended"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="md:w-64">
      {/* Mobile Toggle */}
      <button
        className="md:hidden flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-lg mb-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiMenuAlt3 className="text-xl" /> Trending
      </button>

      {/* Sidebar Content */}
      <div
        className={`bg-[#252525] border border-white/5 rounded-xl shadow-md p-4 overflow-y-auto transition-all duration-300 
        ${isOpen ? "block" : "hidden"} md:block`}
      >
        <h2 className="text-red-600 text-lg font-semibold uppercase flex items-center gap-2 mb-4">
          Trending
          <span className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent" />
        </h2>

        <div className="flex flex-col gap-3">
          {sections.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 text-gray-400 px-3 py-2 rounded-md cursor-pointer border-l-4 border-transparent transition hover:border-red-600 hover:text-white hover:bg-white/10"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBarRight;
