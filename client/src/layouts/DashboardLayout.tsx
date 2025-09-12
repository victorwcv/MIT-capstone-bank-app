import { Outlet } from "react-router";
import { Menubar } from "primereact/menubar";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useUIStore } from "@/stores";
import { useNavigate } from "react-router";

export const DashboardLayout = () => {
  const { theme, sidebarOpen, toggleSidebar, setTheme } = useUIStore();
  const nav = useNavigate();

  const items = [
    {
      label: "Overview",
      icon: "pi pi-home",
      command: () => nav("/dashboard"),
    },
    {
      label: "Accounts",
      icon: "pi pi-credit-card",
      command: () => nav("/dashboard/accounts"),
    },
    {
      label: "Send",
      icon: "pi pi-send",
      command: () => nav("/dashboard/send"),
    },
    {
      label: "Activity",
      icon: "pi pi-list",
      command: () => nav("/dashboard/activity"),
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => nav("/dashboard/settings"),
    },
  ];

  const start = <span className="text-xl font-bold">Wallet</span>;
  const end = (
    <div className="flex align-items-center gap-2">
      <Button
        icon={`pi ${theme === "light" ? "pi-moon" : "pi-sun"}`}
        rounded
        text
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-column" data-theme={theme}>
      <Menubar model={items} start={start} end={end} className="border-noround" />
      <Sidebar
        visible={sidebarOpen}
        onHide={toggleSidebar}
        modal={false}
        dismissable={false}
        showCloseIcon={false}
        className="w-18rem"
      >
        <nav className="flex flex-column gap-3 p-3">
          {items.map((i) => (
            <Button key={i.label} label={i.label} icon={i.icon} text onClick={i.command} />
          ))}
        </nav>
      </Sidebar>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};
