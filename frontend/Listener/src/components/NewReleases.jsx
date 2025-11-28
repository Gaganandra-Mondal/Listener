import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Playing from "./Playing";
import toast from 'react-hot-toast'

const NewReleases = () => {
  let { theme, songToggle } = useOutletContext();
  let [songs, setSongs] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isSmall = screenWidth < 600;

  useEffect(() => {
    async function getNewReleases() {
      try {
        const response = await fetch("http://localhost:3333/newReleases");
        if (!response.ok) {
          const data = await response.json();
          toast('No new released songs !', {
            duration: 3500,
            position: 'top-center',
            style: {
              background: 'crimson',
              color: 'white'
            },
          });
          return;
        } else {
          const data = await response.json();
          setSongs(data.message);
        }
      } catch (err) {
        // console.log(err.message);
        toast(err.message, {
          duration: 3500,
          position: 'top-center',
          style: {
            background: 'crimson',
            color: 'white'
          },
        });
      }
    }
    getNewReleases();
  }, []);

  return (
    <main
      className={` h-screen overflow-y-auto flex-1 bg-${theme.background} text-${theme.text} border border-white/5 rounded-xl shadow-md 
      p-4 md:p-6 overflow-y-auto min-h-[500px] lg:min-h-[100%]`} style={{
        maxHeight: isSmall ? "200px" : "250px",
        scrollbarWidth: "thin",
        scrollbarColor: "red transparent",
      }}
    >
      {/* Modern Bento Grid */}
      <section className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 auto-rows-[120px] md:auto-rows-[140px] lg:auto-rows-[160px]">
        {songs?.map((song, i) => {
          // Define bento grid patterns
          const getCardSize = (index) => {
            const patterns = [
              // Pattern 1: Featured large card
              {
                colSpan: "col-span-2 row-span-2",
                contentSize: "text-lg",
              },
              // Pattern 2: Regular cards
              {
                colSpan: "col-span-1 row-span-1",
                contentSize: "text-sm",
              },
              {
                colSpan: "col-span-1 row-span-1",
                contentSize: "text-sm",
              },
              // Pattern 3: Mixed sizes
              // {
              //   colSpan: "col-span-1 row-span-2",
              //   contentSize: "text-md",
              // },
              {
                colSpan: "col-span-1 row-span-1",
                contentSize: "text-sm",
              },
              {
                colSpan: "col-span-1 row-span-1",
                contentSize: "text-sm",
              },
              // {
              //   colSpan: "col-span-2 row-span-1",
              //   contentSize: "text-md",
              // },
            ];
            return patterns[index % patterns.length];
          };

          const size = getCardSize(i);

          return (
            <div
              key={i}
              className={`
          relative rounded-2xl overflow-hidden group
          cursor-pointer transition-all duration-500
          hover:scale-[1.02] hover:shadow-2xl
          border border-white/10
          ${size.colSpan}
        `}
              style={{
                backgroundImage: `url(${song.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Link to={`/songs/${song.sid}`}>
                {/* Dark overlay for readability */}
                <div
                  className={`absolute inset-0 bg-${theme.background}/50 group-hover:bg${theme.background}/40 transition-all duration-300`}
                ></div>

                {/* Content container */}
                <div className="relative h-full flex flex-col justify-between p-4 text-white">
                  {/* Top section - Genre badge */}
                  <div className="flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <span className="text-xs font-medium">
                        {songToggle[song.url] ? <Playing /> : song.genre}
                      </span>
                    </div>
                  </div>

                  {/* Bottom section - Song info */}
                  <div className="space-y-1">
                    <h3
                      className={`font-semibold truncate ${size.contentSize}`}
                    >
                      {song.sname}
                    </h3>
                    <p className="text-white/80 text-xs truncate">
                      {song.aname}
                    </p>
                  </div>
                </div>

                {/* Subtle gradient border effect */}
                <div className="absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-to-br from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>
            </div>
          );
        })}
      </section>{" "}
    </main>
  );
};

export default NewReleases;
