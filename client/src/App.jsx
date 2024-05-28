import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar_Comp/navbar.jsx";
import Home from "./pages/home_Page/home.jsx";
import "./App.css";
import CreateAccount from "./pages/createAccount_Page/createAccount.jsx";
import ErrorPage from "./errorPage.jsx";
import OnlineBanking from "./pages/onlineBanking_Page/onlineBanking.jsx";
import Footer from "./components/footer_Comp/footer.jsx";

function App() {
  return (
    <BrowserRouter >
      <a className="block text-center bg-yellow-300 text-xs font-light">
        Attention! This is an educational project and does not represent a real
        bank. Do not enter personal information. This website is fictitious and
        is for demonstration purposes only.
      </a>
      <Navbar />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/online-banking" element={<OnlineBanking />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
