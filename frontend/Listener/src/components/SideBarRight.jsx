import { useState } from "react";
import { Link } from "react-router-dom";

const SideBarRight = ({ theme }) => {
  const sections = ["Top Tracks", "New Releases", "Recommended"];
  const urls = ["/topTracks", "/newReleases", "/recommended"];
  
  // Mock data for trending items with images
  const trendingItems = [
    {
      id: 1,
      name: "Top Tracks",
      url: "/topTracks",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "New Releases",
      url: "/newReleases", 
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Recommended",
      url: "/recommended",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=center"
    }
  ];

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

  return (
    <aside className="w-full lg:w-64">
      {/* Mobile Trending Slider - Full Width */}
      <div className="lg:hidden mb-6 w-full">
        <div className="flex items-center justify-between mb-4 px-4">
          <h2 className="text-red-600 text-lg font-semibold uppercase">
            Trending
          </h2>
          <span className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent ml-3" />
        </div>
        
        <div className="w-full relative">
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide w-full px-4">
            {trendingItems?.map((item, i) => (
              <Link 
                to={item.url} 
                key={item.id}
                className="flex-shrink-0 flex flex-col items-center space-y-2 group"
              >
                <h1 className={`border-2 border-red-600 text-xl font-medium text-center ${themeClasses.text} group-hover:text-red-600 transition-colors duration-200`}>
                  {item.name}
                </h1>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Vertical List */}
      <div className={`hidden lg:block ${themeClasses.background} ${themeClasses.text} rounded-xl shadow-lg p-4 overflow-y-auto`}>
        <h2 className="text-red-600 text-lg font-semibold uppercase flex items-center gap-2 mb-4">
          Trending
          <span className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent" />
        </h2>

        <div className="flex flex-col gap-2">
          {sections.map((item, idx) => (
            <Link
              to={urls[idx]}
              key={idx}
              className={`
                ${themeClasses.background} ${themeClasses.text} 
                px-3 py-3 rounded-md cursor-pointer border-l-4 border-transparent 
                transition-all duration-200 hover:border-red-600 
                ${themeClasses.hoverText} hover:bg-gray-100 dark:hover:bg-white/10 text-left
              `}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBarRight;