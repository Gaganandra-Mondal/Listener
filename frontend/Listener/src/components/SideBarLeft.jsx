import { useEffect, useState } from "react";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const SideBarLeft = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [singers, setSingers] = useState([]);

  // Get actual Tailwind classes based on theme
  const getThemeClasses = () => {
    const isDark = theme.background === "black";
    return {
      background: isDark ? "bg-black" : "bg-white",
      text: isDark ? "text-gray-300" : "text-black",
      hoverText: isDark ? "hover:text-white" : "hover:text-gray-800",
      overlay: isDark ? "bg-black" : "bg-white",
    };
  };

  const themeClasses = getThemeClasses();

  useEffect(() => {
    async function getSingers() {
      let response = await fetch("http://localhost:3333/allsingers");
      let data = await response.json();
      setSingers(data.message);
    }
    getSingers();
  }, []); // Added empty dependency array to prevent infinite re-renders

  return (
    <aside className="w-full lg:w-64 relative">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden flex items-center gap-2 text-white bg-red-600 px-4 py-3 rounded-lg mb-3 w-full justify-center z-40 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <HiX className="text-xl" />
        ) : (
          <HiMenuAlt2 className="text-xl" />
        )}
        Artists
      </button>

      {/* Sidebar Content */}
      <div
        className={`
          ${themeClasses.background} ${themeClasses.text}
          rounded-xl shadow-lg p-4 overflow-y-auto transition-all duration-300 
          ${
            isOpen
              ? "fixed top-20 left-4 right-4 z-50 max-h-[80vh] overflow-y-auto"
              : "hidden"
          } 
          lg:block lg:relative lg:top-0 lg:left-0 lg:right-0 lg:z-auto lg:max-h-none
        `}
      >
        {/* Close button for mobile */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-3 right-3 text-lg z-50"
            style={{ color: theme.text }}
          >
            <HiX />
          </button>
        )}

        <h2 className="text-red-600 text-lg font-semibold uppercase flex items-center gap-2 mb-4 pr-8">
          Artists
          <span className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent" />
        </h2>

        <div className="flex flex-col gap-2">
          {singers?.map((singer, i) => (
            <Link to={`/singerProfile/`} ><button
              key={i}
              className={`
                ${themeClasses.text} ${themeClasses.background} 
                flex flex-row gap-2 items-center justify-start px-3 py-3 rounded-md 
                cursor-pointer border-l-4 border-transparent transition-all duration-200 
                hover:border-red-600 ${themeClasses.hoverText} 
                hover:bg-gray-100 dark:hover:bg-white/10 text-left w-full
              `}
              onClick={() => { 
                setIsOpen(false);
              }}
            >
              <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                {singer.name[0].toUpperCase()}
              </div>
              <span className="truncate">{singer.name}</span>
            </button></Link>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className={`fixed inset-0 ${themeClasses.background} opacity-50 z-40 lg:hidden`}
          onClick={() => setIsOpen(false)}
        />
      )}
    </aside>
  );
};

export default SideBarLeft;
