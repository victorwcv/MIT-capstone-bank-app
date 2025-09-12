import { useEffect } from "react";
import { useUIStore } from "@/stores";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    let link = document.getElementById("prime-theme") as HTMLLinkElement;

    if (!link) {
      link = document.createElement("link");
      link.id = "prime-theme";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href =
      theme === "dark"
        ? "./themes/lara-dark-cyan/theme.css"
        : "./themes/lara-light-cyan/theme.css";
  }, [theme]);

  return <>{children}</>;
}
