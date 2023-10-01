import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import TrendingCoin from "./TrendingCoin";

type PropsType = {
  toggleMenu: () => void;
};

export default function SideBarCoinsMobile({ toggleMenu }: PropsType) {
  const { trendingCoins } = useContext(CryptoContext);

  return (
    <div className="absolute flex w-screen h-screen lg:hidden">
      <div className="z-10 w-3/4 h-full bg-slate-900/60 backdrop-blur-lg shadow-lg drop-shadow-md overflow-y-auto">
        <div className="px-10 pt-16 pb-5 flex flex-col gap-2">
          <h1 className="text-xl font-bold border-l-2 border-purple-600 pl-2">
            <span className="text-neutral-100">Cryp</span>
            <span className="text-purple-500">Coin</span>
          </h1>
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
          <div className="py-10 flex flex-col gap-5 overflow-y-auto">
            {trendingCoins
              ? trendingCoins.map((coin) => {
                  return <TrendingCoin key={coin.id} coin={coin} />;
                })
              : null}
          </div>
        </div>
      </div>
      <div
        onClick={toggleMenu}
        className="z-10 flex-1 h-full bg-slate-950/50 backdrop-blur-sm"
      />
    </div>
  );
}
