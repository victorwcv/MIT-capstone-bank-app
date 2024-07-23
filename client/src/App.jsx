import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar.component/Navbar";
import Footer from "./components/footer.component/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      {location.pathname === "/" && <Footer />}
      <Disclaimer />
    </div>
  );
}

export default App;
