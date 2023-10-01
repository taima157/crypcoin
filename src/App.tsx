import { useState } from "react";
import Header from "./components/Header";
import SideBarCoins from "./components/SideBarCoins";
import SideBarCoinsMobile from "./components/SideBarCoinsMobile";
import Navigation from "./components/Navigation";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function toggleIsMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="w-full h-screen bg-slate-950 flex">
      {isMenuOpen && <SideBarCoinsMobile toggleMenu={toggleIsMenuOpen} />}
      <SideBarCoins />

      <div className="flex-1 flex flex-col">
        <Header toggleMenu={toggleIsMenuOpen} />
        <main className="flex-1 flex flex-col pt-6 gap-14 overflow-y-auto">
          <Navigation />
        </main>
      </div>
    </div>
  );
}
