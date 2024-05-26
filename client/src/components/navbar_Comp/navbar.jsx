import { Link } from "react-router-dom";
import "./navbar.scss";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav">
          <h1>
            <Link><span className="logo">VWCV</span> Bank</Link>
          </h1>
          <div className="links">
            <Link className="link ">Home</Link>
            <Link className="link ">Products</Link>
            <Link className="link ">Suport</Link>
          </div>
        </div>
        <div className="button-links">
          <Link className="btn-link">Open Your Account</Link>
          <Link className="link">Online Banking</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
