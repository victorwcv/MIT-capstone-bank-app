import { Outlet } from "react-router";
import { Menubar } from "primereact/menubar";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useUIStore } from "@/stores";
import { useNavigate } from "react-router";
import { useIsMobile } from "@/hooks";
import logo from "@/assets/vc-logo.png";

export const DashboardLayout = () => {
  const { theme, sidebarOpen, toggleSidebar, setTheme } = useUIStore();
  const nav = useNavigate();
  const isMobile = useIsMobile();

  const items = [
    {
      label: "Overview",
      icon: "pi pi-home",
      command: () => nav("/"),
    },
    {
      label: "Accounts",
      icon: "pi pi-credit-card",
      command: () => nav("accounts"),
    },
    {
      label: "Send",
      icon: "pi pi-send",
      command: () => nav("send"),
    },
    {
      label: "Activity",
      icon: "pi pi-list",
      command: () => nav("activity"),
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => nav("settings"),
    },
  ];

  const header = (
    <div className="flex align-items-center text-xl font-bold">
      <img src={logo} alt="vc logo" style={{ width: "2.5rem", height: "auto" }} className="mr-2" />
      <p>Wallet</p>
    </div>
  );

  const start = (
    <div className="flex align-items-center text-xl font-bold mr-4">
      <Button icon="pi pi-bars" rounded text onClick={toggleSidebar} className="mr-2" />
      <img src={logo} alt="vc logo" style={{ width: "2rem", height: "auto" }} />
      <p>Wallet</p>
    </div>
  );
  const end =  isMobile ? null : (
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
      <Menubar
        start={start}
        end={end}
        pt={{
          button: { style: { display: "none" } },
        }}
      />
      <Sidebar
        header={header}
        visible={sidebarOpen}
        onHide={toggleSidebar}
        modal={true}
        dismissable={false}
        showCloseIcon={true}
        fullScreen={isMobile}
        blockScroll
      >
        <nav className="flex flex-column gap-3 p-3">
          {items.map((i) => (
            <Button key={i.label} label={i.label} icon={i.icon} onClick={i.command} text />
          ))}
        </nav>
      </Sidebar>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};
