import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1e1e1e]/90 backdrop-blur-md border border-white/5 rounded-xl shadow-md px-6 py-3 flex items-center justify-between sticky top-3 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white font-bold text-xl cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
        <span className="text-red-600 text-2xl">♫</span> Harmony
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6">
        {["Discover", "Library", "Playlists", "Radio"].map((link) => (
          <a
            key={link}
            href="#"
            className="relative text-gray-400 hover:text-white transition duration-300"
          >
            {link}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Search + User */}
      <div className="hidden md:flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white/10 border border-white/10 rounded-full px-3 py-1 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 w-44 focus:w-60 transition-all duration-300"
        />
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:scale-110 transition">
          U
        </div>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1e1e1e] border-t border-white/10 flex flex-col items-center gap-4 py-6 md:hidden">
          {["Discover", "Library", "Playlists", "Radio"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-300 hover:text-red-500 transition text-lg"
            >
              {link}
            </a>
          ))}
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/10 border border-white/10 rounded-full px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 w-64 transition-all duration-300"
          />
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer">
            U
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
