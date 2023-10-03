import { useContext } from "react";
import { Coin } from "../types/crypto";
import { CryptoContext } from "../context/CryptoContext";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

type PropsType = {
  coin: Coin;
  toggleModal: () => void;
};

export default function SearchedCoin({ coin, toggleModal }: PropsType) {
  const { changeCurrentCoin } = useContext(CryptoContext);

  function handleChangeCoin() {
    changeCurrentCoin(coin);
    toggleModal();
  }

  return (
    <button
      onClick={handleChangeCoin}
      className="bg-slate-900/30 flex w-full backdrop-blur-md rounded-md border-2 border-slate-800 shadow-xl"
    >
      <div className="w-1 bg-purple-600 h-full rounded-tl-md rounded-bl-md" />
      <div className="p-3 md:p-5 gap-2 flex flex-col md:flex-row md:items-center w-full justify-between">
        <div className="flex gap-2 items-center">
          <img className="h-8 w-8" src={coin.icon} alt={`Ícone ${coin.name}`} />
          <span className="text-sm text-slate-400 font-semibold">
            {coin.name}
          </span>
          <span className="text-sm text-purple-600 font-semibold">
            {coin.symbol}
          </span>
        </div>

        <div className="flex justify-end">
          {coin.priceChange1h > 0 ? (
            <div className="flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-5 text-green-600" />
              <span className="text-sm text-green-600 font-semibold">
                +{coin.priceChange1h}%
              </span>
            </div>
          ) : coin.priceChange1h < 0 ? (
            <div className="flex items-center gap-2">
              <ArrowTrendingDownIcon className="w-5 text-red-600" />
              <span className="text-sm text-red-600 font-semibold">
                {coin.priceChange1h}%
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MinusIcon className="w-5 text-purple-600" />
              <span className="text-sm text-neutral-50 font-semibold">
                {coin.priceChange1h}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-1 h-full rounded-tr-md rounded-br-md ${
          coin.priceChange1h > 0
            ? "bg-green-600"
            : coin.priceChange1h < 0
            ? "bg-red-600"
            : "bg-purple-600"
        }`}
      />
    </button>
  );
}
