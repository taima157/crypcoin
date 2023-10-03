import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { Coin } from "../types/crypto";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

type PropsType = {
  coin: Coin;
  side: "left" | "right";
  toggleModal: (side?: "left" | "right") => void;
};

export default function CompareCoinSelected({
  coin,
  side,
  toggleModal,
}: PropsType) {
  const { currentFiat } = useContext(CryptoContext);

  const convertedPriceCoin = coin.price * (currentFiat ? currentFiat.rate : 1);

  return (
    <div className="group w-1/2 md:w-2/5 sm:h-28 flex flex-col md:flex-row items-start cursor-pointer bg-purple-700 border-purple-700 shadow-purple-700/50 transition-colors rounded-xl border-2 pt-1 pr-1 shadow-lg">
      <button
        onClick={() => toggleModal(side)}
        className="flex w-full h-full flex-col justify-between sm:items-center gap-2 py-3 px-2 group relative"
      >
        <div className="flex justify-between w-full gap-2">
          <img
            className="w-8 sm:w-12"
            src={coin.icon}
            alt={`Ícone ${coin.name}`}
          />
          <div className="flex sm:gap-2 flex-col sm:flex-row items-end sm:items-center">
            <span className="text-xs text-neutral-50 font-semibold sm:text-lg">
              {convertedPriceCoin.toLocaleString("pt-br", {
                style: "currency",
                currency: currentFiat ? currentFiat.name : "USD",
              })}
            </span>
            <span className="text-xs text-neutral-400 font-semibold ">
              {coin.symbol}
            </span>
          </div>
        </div>
        <div className="flex justify-end w-full">
          {coin.priceChange1h > 0 ? (
            <div className="flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-6 sm:w-8 text-slate-400" />
              <span className="text-xs sm:text-base text-slate-50 font-semibold">
                +{coin.priceChange1h}%
              </span>
            </div>
          ) : coin.priceChange1h < 0 ? (
            <div className="flex items-center gap-2">
              <ArrowTrendingDownIcon className="w-6 sm:w-8 text-slate-400" />
              <span className="text-xs sm:text-base text-slate-50 font-semibold">
                {coin.priceChange1h}%
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MinusIcon className="w-6 sm:w-8 text-slate-400" />
              <span className="text-xs sm:text-base text-neutral-50 font-semibold">
                {coin.priceChange1h}%
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
