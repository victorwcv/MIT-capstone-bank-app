import { Button } from "primereact/button";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className="flex flex-column align-items-center justify-content-center h-screen">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <p className="text-xl">Page not found</p>
      <Button label="Go Home" icon="pi pi-home" text onClick={() => nav("/")} />
    </div>
  );
};
