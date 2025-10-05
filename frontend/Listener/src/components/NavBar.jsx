import { useEffect, useState } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import { NavLink, Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [session, setSession] = useState(false);
  const [btntheme, setbtnTheme] = useState(false);
  const [profile, setProfile] = useState("U");
  const [searchArea, setSearchArea] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [search, setSearch] = useState([]);
  // const [search, setSearch] = useState([
  //   {
  //     id: 1,
  //     name: "Song 1",
  //     img: "https://klkpybbgsjpkgwurrxkw.supabase.co/storage/v1/object/public/images/Haseen.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Song 2",
  //     img: "https://klkpybbgsjpkgwurrxkw.supabase.co/storage/v1/object/public/images/Ami_sei_manus_ta_ar_nei.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Song 3",
  //     img: "https://www.ilyricshub.com/wp-content/uploads/2022/11/4-din-mc-square-448x245.jpg",
  //   },
  // ]);

  useEffect(() => {
    let id = null;
    setSearch([]);
    function fetchSearchSong() {
      if (searchData.length > 0) {
        id = setTimeout(async () => {
          try {
            let response = await fetch("http://localhost:3333/search", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ searchData }),
              credentials: "include",
            });
            if (response.ok) {
              let data = await response.json();
              setSearch(data.message);
            } else {
              setSearch([]);
            }
          } catch (err) {
            console.log(err.message);
          }
        }, 200);
      }
    }
    fetchSearchSong();
    return () => {
      clearTimeout(id);
    };
  }, [searchData]);

  useEffect(() => {
    async function fetchSessionStatus() {
      try {
        let u_type = localStorage.getItem("u_type");
        if (u_type === "user") {
          let response = await fetch("http://localhost:3333/userProfile", {
            method: "GET",
            credentials: "include",
          });
          let data = await response.json();
          if (response.ok) {
            setSession(true);
            setProfile(data.message.name[0].toUpperCase());
          } //  else {
          //   alert(data.message);
          // }
        } else if (u_type === "singer") {
          let response = await fetch("http://localhost:3333/singerProfile", {
            method: "GET",
            credentials: "include",
          });
          let data = await response.json();
          if (response.ok) {
            setSession(true);
            setProfile(data.message.name[0].toUpperCase());
          }
        }
      } catch (err) {
        console.log(err.message);
        setSession(false);
        alert(err.message);
      }
    }
    fetchSessionStatus();
  }, []);

  const styles = {
    link: `relative transition duration-300 group px-2 py-1`,
    underline:
      "absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full",
  };

  return (
    <nav
      className={`bg-${theme.background}/90 text-${theme.text} backdrop-blur-md border border-white/5 rounded-xl shadow-md px-4 py-3 md:px-6 md:py-3 flex items-center justify-between sticky top-3 z-50 mx-3 md:mx-4 mt-3`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-2 text-${theme.text} font-bold text-lg md:text-xl cursor-pointer transition-transform duration-300 hover:-translate-y-0.5`}
      >
        <span className="text-red-600 sm:text-lg md:text-2xl">♫</span>
        <span className=" md:text-2xl sm:inline sm:text-lg">Listener</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 lg:gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? `text-red-500` : `text-${theme.text}`}`
          }
        >
          Home
          <span className={styles.underline}></span>
        </NavLink>
        <NavLink
          to="/discover"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? `text-red-700` : `text-${theme.text}`}`
          }
        >
          Discover
          <span className={styles.underline}></span>
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? `text-red-700` : `text-${theme.text}`}`
          }
        >
          Albums
          <span className={styles.underline}></span>
        </NavLink>
        <NavLink
          to="/playlist"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? `text-red-700` : `text-${theme.text}`}`
          }
        >
          Playlist
          <span className={styles.underline}></span>
        </NavLink>
      </div>

      {/* Search + User (Desktop) */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        <div className="relative">
          <input
            type="text"
            onBlur={() => {
              setTimeout(() => {
                setSearch([]);
                setSearchArea(false);
              }, 500);
            }}
            placeholder="Search..."
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setSearchArea(true);
              } else {
                setSearchArea(false);
              }
              // console.log(e.target.value);
              setSearchData(e.target.value);
            }}
            value={searchData}
            className={`bg-${theme.background} border border-white/10 rounded-full px-4 py-2 text-${theme.text} placeholder-gray-400 
                       focus:outline-none focus:border-red-400 
                       w-40 lg:w-44 xl:w-60 focus:w-72 
                       transition-all duration-300`}
          />
          <HiSearch
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-${theme.text}`}
          />
          {searchArea && (
            <div
              className={`bg-${theme.background} text-${theme.text} 
              absolute w-96 max-h-60 overflow-y-auto 
              rounded-lg shadow-lg p-4`}
            >
              <h2 className="font-semibold mb-3">Songs</h2>

              {search.length === 0 ? (
                <p className="text-gray-400">No results found</p>
              ) : (
                <ul className="space-y-2">
                  {search?.map((song) => (
                    <li key={song.id}>
                      <Link
                        to={`/songs/${song.id}`}
                        className="flex items-center gap-3 p-2 
                   hover:bg-opacity-10 hover:bg-red-700 
                   rounded-md cursor-pointer"
                      >
                        <img
                          src={song.img}
                          alt={song.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <span className="font-medium truncate">
                          {song.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <button
          className="cursor-pointer"
          onClick={() => {
            setbtnTheme(!btntheme);
            toggleTheme();
          }}
        >
          {btntheme ? (
            <FaMoon className="w-4 h-4" />
          ) : (
            <FaSun className="w-4 h-4" />
          )}
        </button>
        {session ? (
          <Link to="/profile">
            <div
              className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:scale-110 transition`}
            >
              {profile}
            </div>
          </Link>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>

      {/* Mobile Search & Menu */}
      <div className="flex items-center gap-3 md:hidden">
        {/* Mobile Search Button */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className={`text-${theme.text} p-2`}
        >
          <HiSearch className="text-xl" />
        </button>

        {/* Mobile Hamburger */}
        <button
          className="cursor-pointer"
          onClick={() => {
            setbtnTheme(!btntheme);
            toggleTheme();
          }}
        >
          {btntheme ? (
            <FaMoon className="w-4 h-4" />
          ) : (
            <FaSun className="w-4 h-4" />
          )}
        </button>

        <button
          className={`text-${theme.text} text-xl`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div
          className={`absolute top-16 left-3 right-3 bg-${theme.background} border border-white/10 rounded-xl p-3 md:hidden`}
        >
          <div className="relative flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className={`bg-${theme.text} border border-${theme.text}/10 rounded-full px-4 py-2 text-${theme.text} placeholder-gray-400 
                         focus:outline-none focus:border-red-600 
                         w-4/5 pr-10 
                         transition-transform duration-300 focus:scale-110`}
            />
            <HiSearch
              className={`absolute right-6 top-1/2 transform -translate-y-1/2 text-${theme.background}`}
            />
          </div>
        </div>
      )}
      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`absolute top-16 left-3 right-3 bg-${theme.background} border border-${theme.background}/10 rounded-xl flex flex-col items-center gap-4 py-6 md:hidden z-50`}
        >
          {["/", "/discover", "/library", "/playlist"].map((link) => (
            <Link
              key={link}
              to={link}
              className={`text-${theme.text} hover:text-red-500 transition text-lg font-medium`}
              onClick={() => setIsOpen(false)}
            >
              {link === "/"
                ? "Home"
                : link.slice(1).charAt(0).toUpperCase() + link.slice(2)}
            </Link>
          ))}
          {session ? (
            <Link to="/profile">
              <div
                className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:scale-110 transition`}
              >
                {profile}
              </div>
            </Link>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
