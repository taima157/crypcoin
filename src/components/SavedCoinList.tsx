import { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import SavedCoin from "./SavedCoin";
import SelectCoinModal from "./Modais/SelectCoinModal";

export default function SavedCoinList() {
  const { coinList, savedCoinList, updateSavedCoinList } =
    useContext(CryptoContext);
  const [isAddCoinModal, setIsAddCoinModal] = useState<boolean>(false);

  function toggleIsAddCoinModal() {
    setIsAddCoinModal(!isAddCoinModal);
    document.body.classList.toggle("overflow-hidden");
  }

  function removeSavedCoin(coinId: string) {
    const filteredCoins = savedCoinList.filter((savedCoin) => {
      if (savedCoin !== coinId) {
        return savedCoin;
      }
    });

    updateSavedCoinList(filteredCoins);
  }

  return (
    <div className="overflow-x-auto min-w-0 relative h-28">
      <div className="absolute min-w-max flex gap-5">
        {savedCoinList &&
          coinList &&
          coinList.map((coin) => {
            if (savedCoinList.includes(coin.id)) {
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

      {isAddCoinModal && <SelectCoinModal toggleModal={toggleIsAddCoinModal} />}
    </div>
  );
}
