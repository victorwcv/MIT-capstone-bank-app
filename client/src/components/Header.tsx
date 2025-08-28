import { Bell } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "@/stores";

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const userName = user?.fullName || "";
  const userEmail = user?.email || "";

  return (
    <header className="h-16 flex justify-between items-center p-4 bg-white shadow-md z-20">
      <Link to="/" className="text-xl font-bold">
        {""}
      </Link>
      <div className="flex items-center gap-4">
        <span className="font-semibold" title={userEmail}>
          {userName}
        </span>
        <button>
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
};
