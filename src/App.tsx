import { useState } from "react";
import Header from "./components/Header";
import SideBarCoins from "./components/SideBarCoins";
import SideBarCoinsMobile from "./components/SideBarCoinsMobile";
import Navigation from "./components/Navigation";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function toggleIsMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("overflow-hidden");
  }

  return (
    <div className="w-screen h-screen bg-slate-950 flex overflow-auto">
      {isMenuOpen && <SideBarCoinsMobile toggleMenu={toggleIsMenuOpen} />}
      <SideBarCoins />

      <div className="w-full flex-1 flex flex-col">
        <Header toggleMenu={toggleIsMenuOpen} />

        <main className="flex-1 w-full flex flex-col  gap-14 pb-12 sm:pb-0 ">
          <Navigation />
        </main>
      </div>
    </div>
  );
}
