import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useContext, useState, Fragment } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { Dialog, Transition } from "@headlessui/react";
import FiatItem from "./FiatItem";
import SearchedCoin from "./SearchedCoin";

export default function Header() {
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
    <header className="w-full flex flex-col gap-8 px-5 md:px-10 xl:px-16 py-5 lg:py-16">
      <button className="lg:hidden self-start">
        <Bars3Icon className="w-8 text-slate-400" />
      </button>
      <div className="flex w-full justify-between">
        <div className="w-1/2 pr-2">
          <h2 className="text-3xl font-bold text-neutral-50">Gráficos</h2>
          <p className="text-sm text-slate-500 font-semibold">
            Analise e compare suas principais criptomoedas.
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <button onClick={toggleIsSearchModalOpen}>
            <MagnifyingGlassIcon className="w-7 text-slate-50 hover:text-purple-600 transition-colors" />
          </button>
          {currentFiat && (
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
          )}
        </div>
      </div>

      <Transition appear show={isFiatModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={toggleIsFiatModalOpen}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col p-5 backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10 shadow-xl drop-shadow-xl">
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isSearchModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={toggleIsSearchModalOpen}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full pt-40 lg:pt-20 justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col p-5 h-full backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10 shadow-xl drop-shadow-xl">
                  <h3 className="self-start font-semibold text-lg text-slate-400">
                    Pesquise por uma criptomoeda.
                  </h3>

                  <div className="w-full flex gap-2">
                    <input
                      type="search"
                      className="outline-none w-full p-2 border-2 border-slate-800 rounded-lg bg-slate-800/50 backdrop-blur-md text-slate-200 font-semibold shadow-xl"
                      placeholder="Ex..: Bitcoin"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <MagnifyingGlassIcon className="w-8 text-slate-600" />
                  </div>

                  <div className="flex flex-col items-start gap-5 pr-3 h-64 overflow-y-auto ">
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
                          return (
                            <SearchedCoin
                              key={coin.id}
                              coin={coin}
                              toggleModal={toggleIsSearchModalOpen}
                            />
                          );
                        }
                      })}
                  </div>

                  <button
                    onClick={toggleIsSearchModalOpen}
                    className="bg-slate-900 text-sm px-5 py-2 self-end text-slate-400 rounded-lg shadow-lg font-semibold hover:bg-slate-800/20 transition-colors"
                  >
                    Fechar
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
