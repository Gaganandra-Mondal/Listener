import React from "react";

const Discover = () => {
  return (
    <main className="flex-1 bg-[#111111] border border-white/5 rounded-xl shadow-md p-4 md:p-6 overflow-y-auto min-h-[500px]">
      <h2 className="text-red-600 text-5xl font-semibold  flex items-center gap-2 mb-4 pr-8">
        Discover
        <span className="mt-4 flex-1 h-px bg-gradient-to-r from-red-600 to-transparent item-center" />
      </h2>
    </main>
  );
};

export default Discover;
