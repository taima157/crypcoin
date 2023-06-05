"use client";

import Image from "next/image";
import {
  CryptoCoin as CryptoCoinType,
  CryptoContextType,
} from "@/types/crypto";
import { useContext } from "react";
import { CryptoContext } from "@/context/crypto";

import { HiChevronDown, HiChevronUp, HiMinus } from "react-icons/hi";

type PropsType = {
  cryptoCoin: CryptoCoinType;
};

export default function CryptoCoin({ cryptoCoin }: PropsType) {
  const cryptoContext = useContext<CryptoContextType | null>(CryptoContext);

  if (cryptoContext === null) return <div></div>;

  return (
    <div
      onClick={() => {
        cryptoContext.setCurrentCryptoCoin(cryptoCoin);
        cryptoContext.setSideBarOpen(!cryptoContext.sideBarOpen);
      }}
      className="px-2 py-4 bg-zinc-950 rounded-lg flex gap-4 items-center align-middle cursor-pointer hover:bg-neutral-500/10 transition-colors"
    >
      <span className="text-neutral-100 text-lg">{cryptoCoin.rank}º</span>
      <div className="flex gap-2 items-center w-full">
        <Image
          width={100}
          height={100}
          className="h-8 w-8"
          src={cryptoCoin.icon}
          alt="crypto icon"
        />
        <div className="flex flex-col w-full">
          <span className="text-neutral-100">{cryptoCoin.name}</span>
          <div className="flex justify-between w-full items-center">
            <span
              className={`${
                cryptoCoin.priceChange1h > 0
                  ? "text-green-500"
                  : cryptoCoin.priceChange1h < 0
                  ? "text-red-500"
                  : "text-neutral-100"
              }`}
            >
              {cryptoContext.currentFiat?.symbol}{" "}
              {Number(
                cryptoCoin.price *
                  (cryptoContext.currentFiat
                    ? cryptoContext.currentFiat?.rate
                    : 1)
              ).toFixed(2)}
            </span>
            {cryptoCoin.priceChange1h > 0 ? (
              <HiChevronUp className="text-green-500 w-6 h-6" />
            ) : cryptoCoin.priceChange1h < 0 ? (
              <HiChevronDown className="text-red-500 w-6 h-6" />
            ) : (
              <HiMinus className="text-neutral-100 w-6 h-6" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
