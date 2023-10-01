import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import FiatItem from "./FiatItem";
import SearchedCoin from "./SearchedCoin";

type PropsType = {
  toggleMenu: () => void;
};

export default function Header({ toggleMenu }: PropsType) {
  const { currentFiat, fiatList, coinList } = useContext(CryptoContext);

  const [isFiatModalOpen, setIsFiatModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>("");

  function toggleIsFiatModalOpen() {
    setIsFiatModalOpen(!isFiatModalOpen);
  }

  function toggleIsSearchModalOpen(): void {
    setIsSearchModalOpen(!isSearchModalOpen);
    setSearchInput("");
  }

  return (
    <header className="w-full flex flex-col gap-8 px-5 md:px-10 xl:px-16 py-5 lg:py-8">
      <button onClick={toggleMenu} className="lg:hidden self-start">
        <Bars3Icon className="w-8 text-slate-400" />
      </button>
      <div className="flex w-full justify-between">
        <div className="w-1/2 pr-2">
          <h2 className="text-3xl font-bold text-neutral-50">Gráficos</h2>
        </div>
        <div className="flex gap-5 items-center">
          <button onClick={toggleIsSearchModalOpen}>
            <MagnifyingGlassIcon className="w-7 text-slate-50 hover:text-purple-600 transition-colors" />
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
        <div className="fixed transition-opacity overflow-y-auto z-10 inset-0 w-screen h-screen flex justify-center items-center">
          <div
            onClick={toggleIsSearchModalOpen}
            className="absolute w-full h-full bg-slate-950/50 backdrop-blur-sm"
          />
          <div className="z-50 flex flex-col p-5 h-2/3 backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10 shadow-xl drop-shadow-xl">
            <h3 className="self-start font-semibold text-lg text-slate-400">
              Pesquise por uma criptomoeda.
            </h3>

            <div className="w-full flex gap-2">
              <input
                type="search"
                className="outline-none w-full p-2 border-2 border-slate-800 rounded-md bg-slate-800/50 backdrop-blur-md text-slate-200 font-semibold shadow-xl"
                placeholder="Ex..: Bitcoin"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <MagnifyingGlassIcon className="w-8 text-slate-600" />
            </div>

            <div className="flex flex-col items-start gap-5 pr-3 flex-1 overflow-y-auto ">
              {coinList &&
                coinList.map((coin) => {
                  if (searchInput !== "") {
                    if (
                      coin.name
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    ) {
                      return (
                        <SearchedCoin
                          key={coin.id}
                          coin={coin}
                          toggleModal={toggleIsSearchModalOpen}
                        />
                      );
                    } else {
                      return <></>;
                    }
                  } else {
                    if (coin.rank <= 10) {
                      return (
                        <SearchedCoin
                          key={coin.id}
                          coin={coin}
                          toggleModal={toggleIsSearchModalOpen}
                        />
                      );
                    }
                  }
                })}
            </div>

            <button
              onClick={toggleIsSearchModalOpen}
              className="bg-slate-900 text-sm px-5 py-2 self-end text-slate-400 rounded-lg shadow-lg font-semibold hover:bg-slate-800/20 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {isFiatModalOpen && (
        <div className="fixed transition-opacity overflow-y-auto z-10 inset-0 w-screen h-screen flex justify-center items-center">
          <div
            onClick={toggleIsFiatModalOpen}
            className="absolute w-full h-full bg-slate-950/50 backdrop-blur-sm"
          />
          <div className="flex flex-col p-5 backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10 shadow-xl drop-shadow-xl">
            <h3 className="self-start font-semibold text-lg text-slate-400">
              Selecionar moeda de conversão.
            </h3>
            <div className="flex flex-wrap gap-3 h-64 overflow-y-auto pr-5">
              {fiatList &&
                fiatList.map((fiat) => {
                  return (
                    <FiatItem
                      key={fiat.name}
                      fiat={fiat}
                      toggleModal={toggleIsFiatModalOpen}
                    />
                  );
                })}
            </div>
            <button
              onClick={toggleIsFiatModalOpen}
              className="bg-slate-900 text-sm px-5 py-2 self-end text-slate-400 rounded-lg shadow-lg font-semibold hover:bg-slate-800/20 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
