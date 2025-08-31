import { Link, NavLink } from "react-router";
import {
  Home,
  List,
  BadgeDollarSign,
  Settings,
  BanknoteArrowUp,
  BanknoteArrowDown,
  AppWindowMac,
  Repeat,
} from "lucide-react";
import { CustomButton } from "./ui";
import { logoutService } from "@/services";
import { useAuthStore } from "@/stores";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <Home size={26} /> },
  { name: "Deposito", path: "/deposit", icon: <BanknoteArrowUp size={26} /> },
  { name: "Retiro", path: "/withdraw", icon: <BanknoteArrowDown size={26} /> },
  { name: "Transferencia", path: "/transfer", icon: <Repeat size={26} /> },
  { name: "Mis Transacciones", path: "/transactions", icon: <List size={26} /> },
  { name: "Solicitar Tarjeta", path: "/new-card", icon: <AppWindowMac size={26} /> },
  {
    name: "Solicitar Cuenta",
    path: "/new-money-account",
    icon: <BadgeDollarSign size={26} />,
  },
  { name: "Configuración", path: "/settings", icon: <Settings size={26} /> },
];

export const Sidebar = () => {
  const { logout } = useAuthStore();

  const handleclick = async() => {
    try {
      await logoutService();
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="w-xs bg-gradient-to-t from-accent-700 to-accent-800 text-white shadow-md h-dvh min-h-auto overflow-auto sm:flex flex-col p-6 hidden">
      <div className="flex items-center justify-center">
        <Link to="/" className="py-6 font-extrabold text-3xl">
          VWCV BANK
        </Link>
      </div>
      <nav className="flex-1 flex flex-col font-semibold text-white/90">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-4 text-xl rounded-sm  transition-colors duration-300 ${
                isActive ? "bg-accent-900 hover:bg-accent-900 font-bold" : "hover:bg-accent-900/50"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="flex-none">
        <CustomButton onClick={handleclick} className="font-semibold text-xl">
          Salir
        </CustomButton>
      </div>
    </aside>
  );
};
