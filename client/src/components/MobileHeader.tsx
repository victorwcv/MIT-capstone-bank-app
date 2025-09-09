import { Link } from "react-router";
import logo from "@/assets/vc-logo.png";

export const MobileHeader = () => {
  return (
    <header className="py-4 px-2">
      <Link to="/" className="text-3xl font-bold flex items-center">
        <img src={logo} alt="vc logo" className="w-12 h-auto" />
        Wallet
      </Link>
    </header>
  );
};
