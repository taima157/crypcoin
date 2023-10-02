import { useContext, useState } from "react";
import { CryptoContext } from "../../context/CryptoContext";

type PropsType = {
  toggleModal: () => void;
};

export default function SavedCoinModal({ toggleModal }: PropsType) {
  const { coinList, savedCoinList, updateSavedCoinList } =
    useContext(CryptoContext);
    
  const [selectedCoin, setSelectedCoin] = useState<string>("");

  function addCoin(coinId: string) {
    const handleCoinList = [...savedCoinList];

    handleCoinList.push(coinId);

    updateSavedCoinList(handleCoinList);
    toggleModal();
  }

  return (
    <div className="fixed overflow-y-auto z-10 inset-0 w-screen h-screen flex justify-center items-center">
      <div
        onClick={() => {
          setSelectedCoin("");
          toggleModal();
        }}
        className="absolute w-full h-full bg-slate-950/60 backdrop-blur-md"
      />
      <div className="z-10 flex flex-col p-5 h-2/3 backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="self-start font-semibold text-lg text-slate-400">
            Lista de criptomoedas.
          </h3>
          <p className="text-slate-50 text-sm font-semibold">
            Selecione alguma criptomoeda e depois clique em salvar.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 pr-2 sm:grid-cols-2 md:grid-cols-3 gap-5 overflow-y-auto">
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
              toggleModal();
            }}
            className="bg-slate-900 text-sm px-5 py-2 self-end text-slate-400 rounded-lg shadow-lg font-semibold hover:bg-slate-800/20 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              addCoin(selectedCoin);
              toggleModal();
            }}
            disabled={selectedCoin === ""}
            className="bg-purple-600 shadow-purple-600/50 text-sm px-5 py-2 self-end text-slate-50 rounded-lg shadow-lg font-semibold hover:bg-purple-600/50 transition-colors disabled:bg-purple-600/50 disabled:shadow-none disabled:cursor-not-allowed disabled:text-slate-400"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
