import { PlusIcon, ScaleIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { CompareCryptoContext } from "../context/CompareCryptoContext";
import CompareCoinModal from "./Modais/CompareCoinModal";
import CompareCoinSelected from "./CompareCoinSelected";
import CompareChart from "./CompareChart";

export default function Compare() {
  const { firstCoin, secondCoin, compareChartData, period, setPeriod } =
    useContext(CompareCryptoContext);

  const periods = [
    { period: "24h", text: "24 horas" },
    { period: "1w", text: "1 semana" },
    { period: "1m", text: "1 mês" },
    { period: "3m", text: "3 meses" },
    { period: "6m", text: "6 meses" },
    { period: "1y", text: "1 ano" },
  ];

  function handleChangePeriod(
    periodForChange: "24h" | "1w" | "1m" | "3m" | "6m" | "1y"
  ) {
    if (periodForChange === period) return;

    setPeriod(periodForChange);
  }

  const [isCompareModal, setIsCompareModal] = useState<{
    isOpen: boolean;
    side: "left" | "right";
  }>({
    isOpen: false,
    side: "left",
  });

  function toggleIsCompareModal(side?: "left" | "right") {
    setIsCompareModal({
      ...isCompareModal,
      isOpen: !isCompareModal.isOpen,
      side: side ? side : "left",
    });
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-5 px-5 lg:pt-0 md:px-10 xl:px-16 pb-5">
        <h3 className="font-semibold text-slate-300 text-lg">
          Selecione criptomoedas para comparar.
        </h3>

        <div className="w-full flex justify-between gap-2">
          {firstCoin ? (
            <CompareCoinSelected
              coin={firstCoin}
              side="left"
              toggleModal={toggleIsCompareModal}
            />
          ) : (
            <button
              onClick={() => toggleIsCompareModal("left")}
              className="py-2 md:py-4 w-1/2 md:w-2/5 px-6 md:h-28 flex items-center flex-col gap-2 border-2 backdrop-blur bg-slate-800/30 hover:bg-slate-800/10 border-slate-700 rounded-xl transition-colors shadow-md drop-shadow-md"
            >
              <PlusIcon className="w-8 sm:w-12 text-slate-400" />
              <span className="text-slate-400 font-semibold text-sm sm:text-base">
                Selecionar criptomoeda
              </span>
            </button>
          )}

          <ScaleIcon className="w-8 md:w-10 xl:w-14 text-slate-400" />

          {secondCoin ? (
            <CompareCoinSelected
              coin={secondCoin}
              side="right"
              toggleModal={toggleIsCompareModal}
            />
          ) : (
            <button
              onClick={() => toggleIsCompareModal("right")}
              className="py-2 md:py-4 w-1/2 md:w-2/5 px-6 md:h-28 flex items-center flex-col gap-2 border-2 backdrop-blur bg-slate-800/30 hover:bg-slate-800/10 border-slate-700 rounded-xl transition-colors shadow-md drop-shadow-md"
            >
              <PlusIcon className="w-8 sm:w-12 text-slate-400" />
              <span className="text-slate-400 font-semibold text-sm sm:text-base">
                Selecionar criptomoeda
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col xl:flex-row font-semibold px-2 sm:px-5 md:px-10 xl:px-16 pb-5">
        <div className="w-full xl:w-9/12 h-96 sm:h-full">
          <CompareChart data={compareChartData} />
        </div>
        <div className="flex-1 flex flex-col pl-5 pt-5 pr-5 xl:pr-0 gap-5">
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
      </div>

      {isCompareModal.isOpen && (
        <CompareCoinModal
          toggleModal={toggleIsCompareModal}
          side={isCompareModal.side}
        />
      )}
    </div>
  );
}
