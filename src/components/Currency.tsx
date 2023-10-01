import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Chart from "./Chart";
import SavedCoinList from "./SavedCoinList";

export default function Currency() {
  const { chartData } = useContext(CryptoContext);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-5 px-5 lg:pt-0 md:px-10 xl:px-16 pb-10">
        <h3 className="font-semibold text-slate-300 text-lg">
          Criptomoedas salvas
        </h3>
        <SavedCoinList />
      </div>

      <div className="flex flex-1 font-semibold px-2 sm:px-5 md:px-10 xl:px-16">
        {chartData && <Chart data={chartData} />}
      </div>
    </div>
  );
}
