import { useContext } from "react";
import { Coin } from "../types/crypto";
import { CompareCryptoContext } from "../context/CompareCryptoContext";

type PropsType = {
  coin: Coin;
  selected: boolean;
  toggleModal: () => void;
  side: "left" | "right";
};

export default function CompareSelectedCoinItem({
  coin,
  selected,
  toggleModal,
  side,
}: PropsType) {
  const { handleChoiceCoin } = useContext(CompareCryptoContext);

  function handleChoice() {
    handleChoiceCoin(coin, side);
    toggleModal();
  }

  return (
    <button
      onClick={handleChoice}
      className={`text-left ${
        selected
          ? "bg-purple-700 border-purple-700 shadow-purple-700/50"
          : "bg-slate-900/30 border-slate-800 backdrop-blur-md"
      } flex items-center gap-5 rounded-md border-2 shadow-lg p-2`}
      key={coin.id}
    >
      <img className="h-8 w-8" src={coin.icon} alt={`Ícone ${coin.name}`} />
      <div className="flex flex-col">
        <p className="text-slate-50 font-semibold">{coin.name}</p>
        <p
          className={`${
            selected ? "text-slate-400" : "text-purple-600"
          } font-semibold text-sm`}
        >
          {coin.symbol}
        </p>
      </div>
    </button>
  );
}
