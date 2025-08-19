import { useEffect, useState } from "react";
import { AppRouter } from "./router";
import api from "./api/api";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // warm up the server
  useEffect(() => {
    api
      .get("/ping")
      .then(() => {
        console.log("Server is warmed up");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error warming up the server:", error);
        setIsLoading(false);
        setError("No se pudo conectar al servidor. Por favor, inténtalo más tarde.");
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="loading loading-ring loading-xl text-primary"></div> 
        <div className="mt-2 text-gray-700">Cargando</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return <AppRouter />;
}

export default App;
