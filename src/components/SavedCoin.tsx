import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Coin } from "../types/crypto";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

type PropsType = {
  coin: Coin;
  removeCoin: (coinId: string) => void;
};

export default function SavedCoin({ coin, removeCoin }: PropsType) {
  const { changeCurrentCoin, currentFiat, currentCoin } =
    useContext(CryptoContext);

  if (!currentCoin) return <></>;

  const convertedPriceCoin = coin.price * (currentFiat ? currentFiat.rate : 1);

  return (
    <div
      className={`group flex items-start cursor-pointer ${
        coin.id === currentCoin.id
          ? "bg-purple-700 border-purple-700 shadow-purple-700/50"
          : "bg-slate-800/30 hover:bg-slate-800/10 border-slate-700 backdrop-blur "
      }  transition-colors rounded-xl border-2 pt-1 pr-1 shadow-lg`}
    >
      <div
        onClick={() => changeCurrentCoin(coin)}
        className="flex items-center gap-5 py-3 pl-4 pr-2 group relative"
      >
        <img className="h-8 w-8" src={coin.icon} alt={`Ícone ${coin.name}`} />

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-neutral-50 font-semibold text-sm">
              {convertedPriceCoin.toLocaleString("pt-br", {
                style: "currency",
                currency: currentFiat ? currentFiat.name : "USD",
              })}
            </span>
            <span
              className={`text-xs ${
                coin.id === currentCoin.id
                  ? "text-neutral-400"
                  : "text-purple-600"
              } font-semibold `}
            >
              {coin.symbol}
            </span>
          </div>
          <div className="flex justify-end">
            {coin.priceChange1h > 0 ? (
              <div className="flex items-center gap-2">
                <ArrowTrendingUpIcon
                  className={`w-5 ${
                    coin.id === currentCoin.id
                      ? "text-slate-400"
                      : "text-green-600"
                  }`}
                />
                <span
                  className={`text-xs ${
                    coin.id === currentCoin.id
                      ? "text-slate-50"
                      : "text-green-600"
                  }  font-semibold`}
                >
                  +{coin.priceChange1h}%
                </span>
              </div>
            ) : coin.priceChange1h < 0 ? (
              <div className="flex items-center gap-2">
                <ArrowTrendingDownIcon
                  className={`w-5 ${
                    coin.id === currentCoin.id
                      ? "text-slate-400"
                      : "text-red-600"
                  }`}
                />
                <span
                  className={`text-xs ${
                    coin.id === currentCoin.id
                      ? "text-slate-50"
                      : "text-red-600"
                  }  font-semibold`}
                >
                  {coin.priceChange1h}%
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MinusIcon
                  className={`w-5 ${
                    coin.id === currentCoin.id
                      ? "text-slate-400"
                      : "text-purple-600"
                  }`}
                />
                <span className="text-xs text-neutral-50 font-semibold">
                  {coin.priceChange1h}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => removeCoin(coin.id)}
        className="invisible group-hover:visible z-50"
      >
        <XMarkIcon
          className={`w-6 ${
            coin.id === currentCoin.id ? "text-slate-50" : "text-purple-600"
          }`}
        />
      </button>
    </div>
  );
}
