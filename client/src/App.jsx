import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar.component/Navbar";
import Footer from "./components/footer.component/Footer";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
