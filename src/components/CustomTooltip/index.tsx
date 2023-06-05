import { useContext } from "react";
import { CryptoContext } from "@/context/crypto";
import { CryptoContextType } from "@/types/crypto";

export default function CustomTooltip({ active, payload }: any) {
  const cryptoContext = useContext<CryptoContextType | null>(CryptoContext);

  if (cryptoContext === null) return <div></div>;

  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 rounded-md p-2 flex flex-col gap-4">
        <p className="">Date: {payload[0].payload.name}</p>
        <p className="text-yellow-500">
          <span>Price:</span> {cryptoContext.currentFiat?.symbol}{" "}
          {payload[0].payload.price}
        </p>
      </div>
    );
  }

  return null;
}
