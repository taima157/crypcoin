import { useContext } from "react";
import { Coin } from "../types/crypto";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { CryptoContext } from "../context/CryptoContext";

type PropsType = {
  coin: Coin;
};

export default function TrendingCoin({ coin }: PropsType) {
  const { changeCurrentCoin, currentFiat } = useContext(CryptoContext);

  const convertedPriceCoin = coin.price * (currentFiat ? currentFiat.rate : 1);

  return (
    <div
      onClick={() => changeCurrentCoin(coin)}
      className="w-full rounded-md border-2 border-slate-800 backdrop-blur-sm bg-slate-800/30 shadow-md drop-shadow-md hover:bg-slate-800/50 transition-colors overflow-auto cursor-pointer"
    >
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="text-neutral-50 font-semibold">{coin.rank}º</span>
          <img className="h-8 w-8" src={coin.icon} alt={`Ícone ${coin.name}`} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-neutral-50 font-semibold">
              {convertedPriceCoin.toLocaleString("pt-br", {
                style: "currency",
                currency: currentFiat ? currentFiat.name : "USD",
              })}
            </span>
            <span className="text-sm text-purple-600 font-semibold ">
              {coin.symbol}
            </span>
          </div>
          <div className="flex justify-end">
            {coin.priceChange1h > 0 ? (
              <div className="flex items-center gap-2">
                <ArrowTrendingUpIcon className="w-5 text-green-600" />
                <span className="text-xs text-green-600 font-semibold">
                  +{coin.priceChange1h}%
                </span>
              </div>
            ) : coin.priceChange1h < 0 ? (
              <div className="flex items-center gap-2">
                <ArrowTrendingDownIcon className="w-5 text-red-600" />
                <span className="text-xs text-red-600 font-semibold">
                  {coin.priceChange1h}%
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MinusIcon className="w-5 text-purple-600" />
                <span className="text-xs text-neutral-50 font-semibold">
                  {coin.priceChange1h}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`w-full h-[2px] ${
          coin.priceChange1h > 0
            ? "bg-green-600"
            : coin.priceChange1h < 0
            ? "bg-red-600"
            : "bg-purple-600"
        }`}
      />
    </div>
  );
}
