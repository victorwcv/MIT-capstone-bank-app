import { Home, List, Repeat, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";
import { NavLink } from "react-router"; // Asegúrate de importar bien

const footerItems = [
  { name: "Depósito", path: "/deposit", icon: <BanknoteArrowUp size={20} /> },
  { name: "Retiro", path: "/withdraw", icon: <BanknoteArrowDown size={20} /> },
  { name: "Dashboard", path: "/", icon: <Home size={20} /> },
  { name: "Transferencia", path: "/transfer", icon: <Repeat size={20} /> },
  { name: "Mis Transacciones", path: "/transactions", icon: <List size={20} /> },
];

export const MobileFooter = () => {
  return (
    <nav className="fixed bottom-0 w-full h-16 sm:hidden bg-gradient-to-b from-accent-700 to-accent-800 text-white shadow-lg">
      <div className="h-full flex items-center justify-between px-1">
        {footerItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-1 p-2 min-w-0 rounded-sm text-xs transition-colors duration-200 ${
                isActive
                  ? "bg-accent-900 font-semibold"
                  : "bg-transparent"
              }`
            }
          >
            <div className="shrink-0">{item.icon}</div>
            <span className="truncate w-full max-w-[60px] text-center">
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};