import React from "react";

function Layout({ children }) {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto min-h-[calc(100vh-65px)]">
      {children}
    </div>
  );
}

export default Layout;
