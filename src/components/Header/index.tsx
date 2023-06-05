"use client";

import { useContext, useState } from "react";
import { CryptoContextType, Fiat } from "@/types/crypto";
import { CryptoContext } from "@/context/crypto";
import Image from "next/image";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import CoinCard from "../CoinCard";

export default function Header() {
  const cryptoContext = useContext<CryptoContextType | null>(CryptoContext);
  const [fiatList, setFiatList] = useState<boolean>(false);
  const [coinSelect, setCoinSelect] = useState<boolean>(false);

  function toggleCoinSelect() {
    setCoinSelect(!coinSelect);
  }

  function toggleFiatList() {
    setFiatList(!fiatList);
  }

  function handleChangeFiat(fiat: Fiat) {
    cryptoContext?.setCurrentFiat(fiat);
    toggleFiatList();
  }

  if (cryptoContext === null) return <div></div>;

  return (
    <header className="bg-zinc-800 flex-col lg:flex-row gap-5 flex items-start sm:items-center w-full justify-between p-2">
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <div className="flex gap-2 w-full items-center">
          <button
            className="duration-300 flex justify-start items-start"
            onClick={() =>
              cryptoContext.setSideBarOpen(!cryptoContext.sideBarOpen)
            }
          >
            <HiChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
          <a href="/" className="w-full">
            <p className="text-yellow-500 font-bold text-3xl">
              {"CrypCoin</>"}
            </p>
          </a>
        </div>
        <div className="flex gap-2 md:gap-6 sm:items-center w-full">
          <div className="w-56 relative">
            <button
              onClick={toggleCoinSelect}
              className="w-full bg-neutral-200/10 flex justify-between rounded-lg py-1 px-2"
            >
              <span>Coin list</span>
              <HiChevronDown className="h-6 w-6 text-yellow-500" />
            </button>
            {coinSelect && (
              <div className="absolute top-10 h-48 bg-zinc-900 flex flex-col w-64 rounded-md p-2 overflow-hidden overflow-y-scroll gap-2 z-50">
                {cryptoContext.topCryptoCoins?.map((cryptoCoin) => {
                  return (
                    <CoinCard
                      key={cryptoCoin.id}
                      cryptoCoin={cryptoCoin}
                      toggleModal={toggleCoinSelect}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex gap-8">
            <button
              onClick={() => cryptoContext.setSectionMode("charts")}
              className={`${
                cryptoContext.sectionMode === "charts"
                  ? "text-yellow-500"
                  : "text-neutral-300"
              } hover:text-yellow-500 transition-colors`}
            >
              Charts
            </button>
            <button
              onClick={() => cryptoContext.setSectionMode("conversor")}
              className={`${
                cryptoContext.sectionMode === "conversor"
                  ? "text-yellow-500"
                  : "text-neutral-300"
              } hover:text-yellow-500 transition-colors`}
            >
              Conversor
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 relative w-full justify-end">
        {cryptoContext.currentFiat && (
          <>
            <Image
              width={100}
              height={100}
              className="h-8 w-8"
              src={cryptoContext.currentFiat.imageUrl}
              alt="Currency Icon"
            />
            <button
              onClick={toggleFiatList}
              className="bg-neutral-200/10 px-2 gap-2 rounded-md flex items-center text-neutral-200"
            >
              <span>
                {cryptoContext.currentFiat?.symbol}{" "}
                {cryptoContext.currentFiat?.name}
              </span>
              <HiChevronDown className="h-6 w-6 text-yellow-500" />
            </button>
            {fiatList && (
              <div className="absolute right-0 md:right-0 top-10 h-48 bg-zinc-900 flex flex-col w-44 rounded-md p-2 overflow-hidden overflow-y-scroll gap-2 z-50">
                {cryptoContext.fiatList?.map((fiat, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleChangeFiat(fiat)}
                      className="py-1 px-2 rounded-sm hover:bg-neutral-200/10 transition-colors text-left flex justify-between"
                    >
                      <span>{fiat.name}</span>
                      <Image
                        width={100}
                        height={100}
                        className="h-6 w-6"
                        src={fiat.imageUrl}
                        alt="Currency Icon"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
