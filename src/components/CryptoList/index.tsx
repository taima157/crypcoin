"use client";

import { CryptoContext } from "@/context/crypto";
import { CryptoContextType } from "@/types/crypto";
import { useContext } from "react";
import CryptoCoin from "../CryptoCoin";

export default function CryptoList() {
  const cryptoContext = useContext<CryptoContextType | null>(CryptoContext);

  if (cryptoContext === null) return <div></div>;

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
      <div className="flex flex-col gap-4 h-full pr-5">
        {cryptoContext.topCryptoCoins?.map((cryptoCoin, index) => {
          if (index < 10) {
            return <CryptoCoin key={cryptoCoin.id} cryptoCoin={cryptoCoin} />;
          }
        })}
      </div>
    </div>
  );
}
