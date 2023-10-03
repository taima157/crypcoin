import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import SearchCoinModal from "./Modais/SearchCoinModal";
import FiatModal from "./Modais/FiatModal";

type PropsType = {
  toggleMenu: () => void;
};

export default function Header({ toggleMenu }: PropsType) {
  const { currentFiat } = useContext(CryptoContext);

  const [isFiatModalOpen, setIsFiatModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  function toggleIsFiatModalOpen() {
    setIsFiatModalOpen(!isFiatModalOpen);
    document.body.classList.toggle("overflow-hidden");
  }

  function toggleIsSearchModalOpen(): void {
    setIsSearchModalOpen(!isSearchModalOpen);
    document.body.classList.toggle("overflow-hidden");
  }

  return (
    <header className="w-full flex flex-col gap-8 px-5 md:px-10 xl:px-16 py-5 lg:py-8">
      <div className="flex w-full justify-between lg:justify-end">
        <button onClick={toggleMenu} className="lg:hidden self-start">
          <Bars3Icon className="w-9 text-slate-400" />
        </button>
        <div className="flex gap-5 items-center">
          <button onClick={toggleIsSearchModalOpen}>
            <MagnifyingGlassIcon className="w-7 text-slate-400 hover:text-purple-600 transition-colors" />
          </button>
          {currentFiat ? (
            <button
              className="flex gap-2 items-center"
              onClick={toggleIsFiatModalOpen}
            >
              <span className="text-slate-400 font-semibold text-sm">
                {currentFiat.symbol} {currentFiat.name}
              </span>
              <img
                className="w-7"
                src={currentFiat.imageUrl}
                alt={`Icone da moeda ${currentFiat.name}`}
              />
            </button>
          ) : (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-10 h-4 bg-slate-800 rounded-sm" />
              <div className="w-7 h-7 rounded-full bg-slate-800" />
            </div>
          )}
        </div>
      </div>

      {isSearchModalOpen && (
        <SearchCoinModal toggleModal={toggleIsSearchModalOpen} />
      )}

      {isFiatModalOpen && <FiatModal toggleModal={toggleIsFiatModalOpen} />}
    </header>
  );
}
