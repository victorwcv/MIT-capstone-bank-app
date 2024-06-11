import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar_Comp/Navbar";
import Footer from "./components/footer_Comp/Footer";
import Disclaimer from "./components/Disclaimer";


function App() {
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      <Footer />
      <Disclaimer />
    </div>
  );
}

export default App;
