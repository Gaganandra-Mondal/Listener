import { useState } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [session, setSession] = useState(true);

  const styles = {
    link: "relative text-gray-400 hover:text-black/90 transition duration-300 group px-2 py-1",
    underline:
      "absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full",
  };

  return (
    <nav className="bg-[#ffffff] text-black backdrop-blur-md border border-white/5 rounded-xl shadow-md px-4 py-3 md:px-6 md:py-3 flex items-center justify-between sticky top-3 z-50 mx-3 md:mx-4 mt-3">
      {/* Logo */}
      <div className="flex items-center gap-2 text-black/70 font-bold text-lg md:text-xl cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
        <span className="text-red-600 sm:text-lg md:text-2xl">♫</span>
        <span className=" md:text-2xl sm:inline sm:text-lg">Listener</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 lg:gap-6">
        <Link to="/" className={styles.link}>
          Home
          <span className={styles.underline}></span>
        </Link>
        <Link to="/discover" className={styles.link}>
          Discover
          <span className={styles.underline}></span>
        </Link>
        <Link to="/library" className={styles.link}>
          Library
          <span className={styles.underline}></span>
        </Link>
        <Link to="/playlist" className={styles.link}>
          Playlist
          <span className={styles.underline}></span>
        </Link>
      </div>

      {/* Search + User (Desktop) */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-black placeholder-gray-400 
                       focus:outline-none focus:border-red-600 
                       w-40 lg:w-44 xl:w-60 focus:w-72 
                       transition-all duration-300"
          />
          <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {session ? (
          <Link to="/profile">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:scale-110 transition">
              U
            </div>
          </Link>
        ) : (
          <Link>Login</Link>
        )}
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
          className="text-black text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="absolute top-16 left-3 right-3 bg-[#1e1e1e] border border-white/10 rounded-xl p-3 md:hidden">
          <div className="relative flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-white placeholder-gray-400 
                         focus:outline-none focus:border-red-600 
                         w-4/5 pr-10 
                         transition-transform duration-300 focus:scale-110"
            />
            <HiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-3 right-3 bg-[#1e1e1e] border border-white/10 rounded-xl flex flex-col items-center gap-4 py-6 md:hidden z-50">
          {["/", "/Discover", "/library", "/playlist"].map((link) => (
            <Link
              key={link}
              to={link}
              className="text-gray-300 hover:text-red-500 transition text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link === "/"
                ? "Home"
                : link.slice(1).charAt(0).toUpperCase() + link.slice(2)}
            </Link>
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
