import { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import SavedCoin from "./SavedCoin";

export default function SavedCoinList() {
  const { coinList } = useContext(CryptoContext);
  const [isAddCoinModal, setIsAddCoinModal] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string>("");

  function toggleIsAddCoinModal() {
    setIsAddCoinModal(!isAddCoinModal);
  }

  const localSavedCoinList = localStorage.getItem("savedCoinList");
  const handleSavedCoinList: string[] = localSavedCoinList
    ? JSON.parse(localSavedCoinList)
    : [];

  const [savedCoinList, setSavedCoinList] =
    useState<string[]>(handleSavedCoinList);

  function removeSavedCoin(coinId: string) {
    const filteredCoins = handleSavedCoinList.filter((savedCoin) => {
      if (savedCoin !== coinId) {
        return savedCoin;
      }
    });

    localStorage.setItem("savedCoinList", JSON.stringify(filteredCoins));
    setSavedCoinList(filteredCoins);
  }

  function addCoin(coinId: string) {
    const handleCoinList = [...savedCoinList];

    handleCoinList.push(coinId);

    localStorage.setItem("savedCoinList", JSON.stringify(handleCoinList));
    setSavedCoinList(handleCoinList);
    toggleIsAddCoinModal();
  }

  return (
    <div className="overflow-x-scroll min-w-0 relative h-24">
      <div className="absolute min-w-max flex gap-5">
        {savedCoinList &&
          coinList &&
          coinList.map((coin) => {
            if (handleSavedCoinList.includes(coin.id)) {
              return (
                <SavedCoin
                  key={coin.id}
                  coin={coin}
                  removeCoin={removeSavedCoin}
                />
              );
            }
          })}

        <button
          onClick={toggleIsAddCoinModal}
          className="p-6 border-2 backdrop-blur bg-slate-800/30 hover:bg-slate-800/10 border-slate-700 rounded-xl transition-colors shadow-md drop-shadow-md"
        >
          <span className="text-slate-500 font-semibold">
            + Adicionar criptomoeda
          </span>
        </button>
      </div>
      (
      <div
        className={`${
          isAddCoinModal ? "fixed" : "hidden"
        } transition-opacity overflow-y-auto z-10 inset-0 w-screen h-screen flex justify-center items-center`}
      >
        <div
          onClick={toggleIsAddCoinModal}
          className="absolute w-full h-full bg-slate-950/50 backdrop-blur-sm"
        />
        <div className="z-10 flex flex-col p-5 h-2/3 backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10 shadow-xl drop-shadow-xl">
          <div className="flex flex-col gap-2">
            <h3 className="self-start font-semibold text-lg text-slate-400">
              Lista de criptomoedas.
            </h3>
            <p className="text-slate-50 text-sm font-semibold">
              Selecione alguma criptomoeda e depois clique em salvar.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 pr-2 sm:grid-cols-2 md:grid-cols-1 gap-5 overflow-y-auto">
            {coinList?.map((coin) => {
              if (!savedCoinList.includes(coin.id)) {
                return (
                  <button
                    onClick={() => {
                      if (coin.id === selectedCoin) {
                        setSelectedCoin("");
                      } else {
                        setSelectedCoin(coin.id);
                      }
                    }}
                    className={`text-left ${
                      coin.id === selectedCoin
                        ? "bg-purple-700 border-purple-700 shadow-purple-700/50"
                        : "bg-slate-900/30 border-slate-800 backdrop-blur-md"
                    } flex items-center gap-5 rounded-md border-2 shadow-lg p-2`}
                    key={coin.id}
                  >
                    <img
                      className="h-8 w-8"
                      src={coin.icon}
                      alt={`Ícone ${coin.name}`}
                    />
                    <div className="flex flex-col">
                      <p className="text-slate-50 font-semibold">{coin.name}</p>
                      <p
                        className={`${
                          coin.id === selectedCoin
                            ? "text-slate-400"
                            : "text-purple-600"
                        } font-semibold text-sm`}
                      >
                        {coin.symbol}
                      </p>
                    </div>
                  </button>
                );
              }
            })}
          </div>
          <div className="w-full flex justify-end gap-5">
            <button
              onClick={() => {
                setSelectedCoin("");
                toggleIsAddCoinModal();
              }}
              className="bg-slate-900 text-sm px-5 py-2 self-end text-slate-400 rounded-lg shadow-lg font-semibold hover:bg-slate-800/20 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                addCoin(selectedCoin);
                toggleIsAddCoinModal();
              }}
              disabled={selectedCoin === ""}
              className="bg-purple-600 shadow-purple-600/50 text-sm px-5 py-2 self-end text-slate-50 rounded-lg shadow-lg font-semibold hover:bg-purple-600/50 transition-colors disabled:bg-purple-600/50 disabled:shadow-none disabled:cursor-not-allowed disabled:text-slate-400"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
      )
    </div>
  );
}
