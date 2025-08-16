import { Link, NavLink } from "react-router";
import { Home, List, PlusCircle, Settings } from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "Transacciones", path: "/transactions", icon: <List size={20} /> },
    { name: "Realizar Transacción", path: "/transaction/new", icon: <PlusCircle size={20} /> },
    { name: "Solicitar Tarjeta", path: "/card-request", icon: <PlusCircle size={20} /> },
    {
      name: "Crear Cuenta de Ahorro",
      path: "/create-account",
      icon: <PlusCircle size={20} />,
    },
    { name: "Configuración", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow h-screen flex flex-col">
      <div className="h-16 flex items-center border-b">
        <Link to="/" className="p-4 font-bold text-lg text-gray-800">
          BankApp
        </Link>
      </div>
      <nav className="flex-1 flex flex-col mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 hover:bg-gray-100 ${
                isActive ? "bg-gray-200 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
