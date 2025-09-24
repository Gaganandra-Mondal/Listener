import NavBar from "./components/NavBar";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-black flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-3 md:p-4">
        <SideBarLeft />
        <Outlet />
        <SideBarRight />
      </div>
      <Footer />
    </div>
  );
};

export default App;
