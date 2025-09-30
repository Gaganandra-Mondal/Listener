import { useEffect, useState } from "react";
import { HiMenuAlt2, HiX } from "react-icons/hi";

const SideBarLeft = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [singers, setSingers] = useState([]);
  useEffect(() => {
    async function getSingers() {
      let response = await fetch("http://localhost:3333/allsingers");
      let data = await response.json();
      setSingers(data.message);
    }
    getSingers();
  });
  return (
    <aside className="lg:w-64">
      {/* Mobile Toggle Button */}
      <button
        className={`lg:hidden flex items-center gap-2 text-white bg-red-600 px-4 py-3 rounded-lg mb-3 w-full justify-center`}
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
        className={`bg-${theme.background} text-${
          theme.text
        } rounded-xl shadow-md p-4 overflow-y-auto transition-all duration-300 
        ${
          isOpen ? "block absolute left-3 right-3 z-40" : "hidden"
        } lg:block lg:relative lg:left-0 lg:right-0`}
      >
        {/* Close button for mobile */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className={`lg:hidden absolute top-3 right-3 text-${theme.text} text-lg`}
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
            <button
              key={i}
              className={`text-${theme.text} bg-${theme.background} flex flex-row gap-2 items-center justify-start px-3 py-3 rounded-md cursor-pointer border-l-4 border-transparent transition hover:border-red-600 hover:text-${theme.hoverText} hover:bg-white/10 text-left`}
              onClick={() => setIsOpen(false)}
            >
              <p className="bg-red-500 text-white rounded-full w-10 text-center h-10 cir p-2">
                {singer.name[0].toUpperCase()}
              </p>
              {singer.name}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-${theme.background} z-30 lg:hidden`}
          onClick={() => setIsOpen(false)}
        />
      )}
    </aside>
  );
};

export default SideBarLeft;
