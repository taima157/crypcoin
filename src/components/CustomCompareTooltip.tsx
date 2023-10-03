import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { CompareChartData } from "../types/crypto";

type PropsType = {
  active?: boolean;
  payload?: Array<{ payload: CompareChartData; name: string }>;
};

export default function CustomCompareTooltip({ active, payload }: PropsType) {
  const { currentFiat } = useContext(CryptoContext);

  if (active && payload && payload.length && currentFiat) {
    const date = payload[0].payload.datetime;

    const firstPrice = payload[0].payload.firstPrice;
    const secondPrice = payload[0].payload.secondPrice;

    return (
      <div className="bg-slate-900/40 backdrop-blur-sm border-2 border-slate-900 rounded-md p-5 flex flex-col gap-2">
        <span className="text-slate-400 font-semibold">
          Data: <span className="text-slate-300">{`${date}`}</span>
        </span>
        <span className="text-slate-300">
          <span className="text-purple-600">{payload[0].name}: </span>
          {Number(firstPrice).toLocaleString("pt-br", {
            style: "currency",
            currency: currentFiat.name,
          })}
        </span>
        <span className="text-slate-300">
          <span className="text-orange-600">{payload[1].name}: </span>
          {Number(secondPrice).toLocaleString("pt-br", {
            style: "currency",
            currency: currentFiat.name,
          })}
        </span>
      </div>
    );
  }

  return null;
}
