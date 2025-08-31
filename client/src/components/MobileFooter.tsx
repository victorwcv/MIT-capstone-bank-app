import { Home, List, BadgeDollarSign, Settings, Repeat } from "lucide-react";

export const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 w-full h-16 block sm:hidden px-4 bg-gradient-to-b from-accent-700 to-accent-800 text-white shadow-md">
      <div className="h-full flex items-center justify-around gap-4">
        <List size={24} />
        <Repeat size={24} />
        <Home size={24} />
        <BadgeDollarSign size={24} />
        <Settings size={24} />
      </div>
    </div>
  );
};
