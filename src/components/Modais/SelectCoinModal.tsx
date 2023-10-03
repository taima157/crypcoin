import { useContext, useState } from "react";
import { CryptoContext } from "../../context/CryptoContext";
import SelectedCoinItem from "../SelectedCoinItem";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type PropsType = {
  toggleModal: () => void;
};

export default function SelectCoinModal({ toggleModal }: PropsType) {
  const { coinList, savedCoinList, updateSavedCoinList } =
    useContext(CryptoContext);

  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  function addCoin(coinId: string) {
    const handleCoinList = [...savedCoinList];

    handleCoinList.push(coinId);

    updateSavedCoinList(handleCoinList);
    toggleModal();
  }

  function handleSelectCoin(coinId: string) {
    if (coinId === selectedCoin) {
      setSelectedCoin("");
    } else {
      setSelectedCoin(coinId);
    }
  }

  return (
    <div className="fixed overflow-y-auto z-10 inset-0 w-screen h-screen flex justify-center items-center">
      <div
        onClick={() => {
          setSelectedCoin("");
          toggleModal();
        }}
        className="absolute w-full h-full bg-slate-950/90 scroll-smooth"
      />
      <div className="z-50 flex flex-col p-5 h-2/3 backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="self-start font-semibold text-lg text-slate-400">
            Lista de criptomoedas.
          </h3>
          <p className="text-slate-50 text-sm font-semibold">
            Selecione alguma criptomoeda e depois clique em salvar.
          </p>
        </div>

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

        <div className="flex-1 overflow-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 items-start gap-5 pr-3">
            {coinList?.map((coin) => {
              if (!savedCoinList.includes(coin.id)) {
                if (searchInput !== "") {
                  if (
                    coin.name.toLowerCase().includes(searchInput.toLowerCase())
                  ) {
                    return (
                      <SelectedCoinItem
                        key={coin.id}
                        coin={coin}
                        handleSelectCoin={handleSelectCoin}
                        selectedCoin={selectedCoin}
                      />
                    );
                  } else {
                    return <></>;
                  }
                } else {
                  return (
                    <SelectedCoinItem
                      key={coin.id}
                      coin={coin}
                      handleSelectCoin={handleSelectCoin}
                      selectedCoin={selectedCoin}
                    />
                  );
                }
              }
            })}
          </div>
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
