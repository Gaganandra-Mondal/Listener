import React from "react";

const MainContent = () => {
  const cards = [
    {
      title: "Card 1",
      desc: "Featured Artist",
      badge: "HOT",
      img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Card 2",
      desc: "New Release",
      badge: "NEW",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Card 3",
      desc: "Popular Track",
      badge: "TRENDING",
      img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <main className="flex-1 bg-[#252525] border border-white/5 rounded-xl shadow-md p-4 md:p-6 overflow-y-auto min-h-[500px]">
      {/* Outlet */}
      <div className="mb-6 relative bg-white/5 border-l-4 border-red-600 rounded-md p-4 italic text-white text-sm md:text-base">
        Dynamic Outlet Component - Now Playing: Midnight Symphony
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-bl-md">
          LIVE
        </span>
      </div>

      {/* Hero Cards */}
      <section className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-md group border border-white/5 bg-[#1e1e1e] cursor-pointer transform transition hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl"
            style={{
              backgroundImage: `url(${card.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Badge */}
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full">
              {card.badge}
            </div>

            {/* Content */}
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-base sm:text-lg font-semibold">{card.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MainContent;