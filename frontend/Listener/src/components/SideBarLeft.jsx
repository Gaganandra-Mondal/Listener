import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideBarLeft = ({ theme }) => {
  const [singers, setSingers] = useState([]);

  // Get actual Tailwind classes based on theme
  const getThemeClasses = () => {
    const isDark = theme.background === "black";
    return {
      background: isDark ? "bg-black" : "bg-white",
      text: isDark ? "text-gray-300" : "text-black",
      hoverText: isDark ? "hover:text-white" : "hover:text-gray-800",
      overlay: isDark ? "bg-black" : "bg-white",
      border: isDark ? "border-gray-800" : "border-gray-200",
    };
  };

  const themeClasses = getThemeClasses();

  useEffect(() => {
    async function getSingers() {
      try {
        let response = await fetch("http://localhost:3333/allsingers");
        let data = await response.json();
        setSingers(data.message);
      } catch (error) {
        console.error("Error fetching singers:", error);
      }
    }
    getSingers();
  }, []);

  return (
    <aside className="w-full lg:w-64">
      {/* Mobile Artist Slider - Full Width */}
      <div className="lg:hidden mb-6 w-full">
        <div className="flex items-center justify-between mb-4 px-4">
          <h2 className="text-red-600 text-lg font-semibold uppercase">
            Artists
          </h2>
          <span className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent ml-3" />
        </div>
        
        <div className="w-full relative">
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide w-full px-4">
            {singers?.map((singer, i) => (
              <Link 
                to={`/singerProfile`} 
                key={i}
                className="flex-shrink-0 flex flex-col items-center space-y-2 group"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-red-600 transition-all duration-300 shadow-lg">
                    <img 
                      src={singer.img} 
                      alt={singer.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-full bg-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <span className={`text-xs font-medium text-center max-w-20 truncate ${themeClasses.text} group-hover:text-red-600 transition-colors duration-200`}>
                  {singer.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Vertical List */}
      <div className={`hidden lg:block ${themeClasses.background} ${themeClasses.text} rounded-xl shadow-lg p-4 overflow-y-auto max-h-[80vh]`}>
        <h2 className="text-red-600 text-lg font-semibold uppercase flex items-center gap-2 mb-4">
          Artists
          <span className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent" />
        </h2>

        <div className="flex flex-col gap-2">
          {singers?.map((singer, i) => (
            <Link 
              to={`/singerProfile`} 
              key={i}
              className={`
                ${themeClasses.text} ${themeClasses.background} 
                flex flex-row gap-3 items-center justify-start px-3 py-3 rounded-lg 
                cursor-pointer border-l-4 border-transparent transition-all duration-200 
                hover:border-red-600 ${themeClasses.hoverText} 
                hover:bg-gray-100 dark:hover:bg-white/10 text-left w-full
                group
              `}
            >
              <div className="relative flex-shrink-0">
                <img 
                  className="rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 object-cover shadow-md transition-shadow duration-200" 
                  src={singer.img} 
                  alt={singer.name}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
              </div>
              <span className="truncate font-medium transition-colors duration-200">
                {singer.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBarLeft;