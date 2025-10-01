import { useOutletContext } from "react-router-dom";
import { useEffect,useState } from "react";

const Trending = () => {
  let theme = useOutletContext();
  
  let [songs,setSongs] = useState([]);

  useEffect(()=>{
    async function getTopTracks(){
    const response =  await fetch("http://localhost:3333/topTracks"); 
    const data = await response.json();
    setSongs(data.message);
  }
  getTopTracks();
  },[]);

  return (
    <main
      className={`flex-1 bg-${theme.background} text-${theme.text} border border-white/5 rounded-xl shadow-md p-4 md:p-6 overflow-y-auto min-h-[500px]`}
    >
      {/* Hero Cards */}
      <section className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-4 xl:grid-cols-4">
        {songs?.map((song, i) => (
          <div
            key={i}
            className={`relative h-30 w-full md:h-50 xl:h-65 rounded-xl overflow-hidden shadow-md group border border-white/5 bg-${theme.background} cursor-pointer transform transition hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl`}
            style={{
              backgroundImage: `url(${song.img})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat:"no-repeat"
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Badge */}
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full">
              {song.genre}
            </div>

            {/* Content */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-base sm:text-lg font-semibold">
                {song.sname}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">{song.aname}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Trending;
