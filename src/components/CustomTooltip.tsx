import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { ChartData } from "../types/crypto";

type PropsType = {
  active?: boolean;
  payload?: [{ payload: ChartData }];
};

export default function CustomTooltip({ active, payload }: PropsType) {
  const { currentFiat } = useContext(CryptoContext);

  if (active && payload && payload.length && currentFiat) {
    const date = payload[0].payload.datetime;
    const price = payload[0].payload.price;

    return (
      <div className="bg-slate-900/40 backdrop-blur-sm border-2 border-slate-900 rounded-md p-5 flex flex-col gap-4">
        <span className="text-slate-400 font-semibold">
          Date: <span className="text-slate-300">{`${date}`}</span>
        </span>
        <span className="text-slate-300">
          <span className="text-purple-600">Price: </span>
          {Number(price).toLocaleString("pt-br", {
            style: "currency",
            currency: currentFiat.name,
          })}
        </span>
      </div>
    );
  }

  return null;
}