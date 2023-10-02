import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Chart from "./Chart";
import SavedCoinList from "./SavedCoinList";

export default function Currency() {
  const { chartData, currentCoin, period, setPeriod, getChartDataCoin } =
    useContext(CryptoContext);

  const periods = [
    { period: "24h", text: "24 horas" },
    { period: "1w", text: "1 semana" },
    { period: "1m ", text: "1 mês" },
    { period: "3m", text: "3 meses" },
    { period: "6m", text: "6 meses" },
    { period: "1y", text: "1 ano" },
  ];

  function handleChangePeriod(
    periodForChange: "24h" | "1w" | "1m" | "3m" | "6m" | "1y"
  ) {
    if (periodForChange === period || !currentCoin) return;

    setPeriod(periodForChange);
    getChartDataCoin(currentCoin, periodForChange);
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-5 px-5 lg:pt-0 md:px-10 xl:px-16 pb-5">
        <h3 className="font-semibold text-slate-300 text-lg">
          Criptomoedas salvas
        </h3>
        <SavedCoinList />
      </div>

      <div className="flex flex-1 flex-col xl:flex-row font-semibold px-2 sm:px-5 md:px-10 xl:px-16">
        {chartData && (
          <>
            <div className="w-full xl:w-9/12 h-96 sm:h-full">
              <Chart data={chartData} />
            </div>
            <div className="flex-1 flex flex-col pl-5 pt-5 pb-5 pr-5 xl:pr-0 gap-5">
              <h3 className="text-slate-50 text-lg font-semibold">
                Gráfico de preços
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-1 gap-5">
                {periods.map((handlePeriod) => {
                  return (
                    <button
                      key={handlePeriod.period}
                      onClick={() =>
                        handleChangePeriod(
                          handlePeriod.period as
                            | "24h"
                            | "1w"
                            | "1m"
                            | "3m"
                            | "6m"
                            | "1y"
                        )
                      }
                      className={`text-left ${
                        period === handlePeriod.period
                          ? "bg-purple-700 border-purple-700 shadow-purple-700/50 text-slate-50"
                          : "transition-colors backdrop-blur-sm text-slate-500 bg-slate-800/30 hover:bg-slate-800/10 border-slate-700"
                      } flex items-center gap-5 rounded-md border-2 shadow-lg py-2 px-4`}
                    >
                      {handlePeriod.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
