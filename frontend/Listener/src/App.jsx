import NavBar from "./components/NavBar";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const App = () => {
  let [theme, setTheme] = useState({
    background: "black",
    text: "gray-300",
    hoverText: "white",
  });
  function toggleTheme() {
    if (theme.background === "black") {
      setTheme({
        background: "white",
        text: "black",
        hoverText: "gray-800",
      });
    } else {
      setTheme({
        background: "black",
        text: "gray-300",
        hoverText: "white",
      });
    }
  }
  return (
    <div
      className={`min-h-screen bg-${theme.background} text-${theme.text} flex flex-col`}
    >
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-3 md:p-4">
        <SideBarLeft theme={theme} />
        <Outlet context={theme} />
        <SideBarRight theme={theme} />
      </div>
    </div>
  );
};

export default App;
