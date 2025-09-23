import React, { useState } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-[#1e1e1e]/90 backdrop-blur-md border border-white/5 rounded-xl shadow-md px-4 py-3 md:px-6 md:py-3 flex items-center justify-between sticky top-3 z-50 mx-3 md:mx-4 mt-3">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white font-bold text-lg md:text-xl cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
        <span className="text-red-600 text-xl md:text-2xl">♫</span> 
        <span className="hidden sm:inline">Harmony</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 lg:gap-6">
        {["Discover", "Library", "Playlists", "Radio"].map((link) => (
          <a
            key={link}
            href="#"
            className="relative text-gray-400 hover:text-white transition duration-300 group px-2 py-1"
          >
            {link}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Search + User */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 w-40 lg:w-44 xl:w-60 transition-all duration-300"
          />
          <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:scale-110 transition">
          U
        </div>
      </div>

      {/* Mobile Search & Menu */}
      <div className="flex items-center gap-3 md:hidden">
        {/* Mobile Search Button */}
        <button 
          onClick={() => setSearchOpen(!searchOpen)}
          className="text-white p-2"
        >
          <HiSearch className="text-xl" />
        </button>

        {/* Mobile Hamburger */}
        <button
          className="text-white text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="absolute top-16 left-3 right-3 bg-[#1e1e1e] border border-white/10 rounded-xl p-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 w-full pr-10"
            />
            <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-3 right-3 bg-[#1e1e1e] border border-white/10 rounded-xl flex flex-col items-center gap-4 py-6 md:hidden z-50">
          {["Discover", "Library", "Playlists", "Radio"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-300 hover:text-red-500 transition text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer">
            U
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;