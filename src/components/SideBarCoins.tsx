import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import TrendingCoin from "./TrendingCoin";

export default function SideBarCoins() {
  const { trendingCoins } = useContext(CryptoContext);

  return (
    <aside className="w-96 h-full bg-slate-900/60  hidden lg:block xl:block overflow-y-auto sm:overflow-hidden">
      <div className="px-10 pt-16 pb-5 flex flex-col gap-2">
        <a href="/" className="self-start">
          <h1 className="text-xl font-bold border-l-2 border-purple-600 pl-2">
            <span className="text-neutral-100">Cryp</span>
            <span className="text-purple-500">Coin</span>
          </h1>
        </a>
        <h2 className="text-sm text-slate-500 font-semibold">
          Analise e compare suas principais criptomoedas.
        </h2>
      </div>

      <div className="p-5">
        <div className="flex gap-2">
          <h2 className="text-neutral-50 font-semibold">
            Moedas em relevância
          </h2>
          <ArrowTrendingUpIcon className="w-6 text-purple-600" />
        </div>
        <div className="py-10 flex flex-col gap-5 ">
          {trendingCoins
            ? trendingCoins.map((coin) => {
                return <TrendingCoin key={coin.id} coin={coin} />;
              })
            : null}
        </div>
      </div>
    </aside>
  );
}
