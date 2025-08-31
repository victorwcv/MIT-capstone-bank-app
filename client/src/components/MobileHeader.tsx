import { AlignJustify } from "lucide-react";
import { Link } from "react-router";

export const MobileHeader = () => {
  return (
    <header className="h-16 flex justify-between items-center px-4 bg-gradient-to-t from-accent-700 to-accent-800 text-white shadow-md sm:hidden">
      <Link to="/" className="text-xl font-bold">
        VWCV BANK
      </Link>
      <div className="flex items-center gap-4">
        <AlignJustify size={24} />
      </div>
    </header>
  );
};
