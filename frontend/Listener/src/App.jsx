import NavBar from "./components/NavBar";
import SideBarLeft from "./components/SideBarLeft";
import MainContent from "./components/MainContent";
import SideBarRight from "./components/SideBarRight";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
      <NavBar/>
      <div style={{display:"flex"}}>
      <SideBarLeft/>
      <MainContent/>
      <SideBarRight/>  
      </div>
      <Footer/>  
    </div>
  )
}

export default App;