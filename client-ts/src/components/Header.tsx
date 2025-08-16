import { Bell } from "lucide-react";
import { Link } from "react-router";

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  return (
    <header className="h-16 flex justify-between items-center p-4 bg-white shadow">
      <Link to="/" className="text-xl font-bold">{""}</Link>
      <div className="flex items-center gap-4">
        <span>{userName}</span>
        <button>
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
};
