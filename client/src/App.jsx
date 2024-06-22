import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar_Comp/Navbar";
import Footer from "./components/footer_Comp/Footer";
import Disclaimer from "./components/Disclaimer";


function App() {
  const location = useLocation();
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      {location.pathname !== "/admin-panel" && <Footer />}
      <Disclaimer />
    </div>
  );
}

export default App;
