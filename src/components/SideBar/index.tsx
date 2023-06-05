"use client";

import {
  HiChevronDown,
  HiChevronLeft,
  HiLockClosed,
  HiOutlineX,
} from "react-icons/hi";
import CryptoList from "../CryptoList";
import { useContext, useState } from "react";
import { CryptoContext } from "@/context/crypto";
import { CryptoContextType } from "@/types/crypto";
import CoinCard from "../CoinCard";

export default function SideBar() {
  const cryptoContext = useContext<CryptoContextType | null>(CryptoContext);
  const [open, setOpen] = useState<boolean>(true);

  if (cryptoContext === null) return <div></div>;

  return (
    <aside
      className={`${
        cryptoContext.sideBarOpen
          ? "w-4/5 absolute md:w-1/2 lg:w-1/4 z-50 p-5 h-screen"
          : "w-0"
      } duration-300 bg-zinc-900 flex flex-col gap-10 overflow-hidden z-50`}
    >
      <div className="flex justify-between items-center">
        <a href="/">
          <h1 className="text-yellow-500 font-bold text-3xl">
            {"CrypCoin</>"}
          </h1>
        </a>
        <button
          className={`${
            !cryptoContext.sideBarOpen ? "rotate-180" : ""
          } duration-300`}
          onClick={() =>
            cryptoContext.setSideBarOpen(!cryptoContext.sideBarOpen)
          }
        >
          <HiOutlineX className="w-8 h-8" />
        </button>
      </div>
      <h2 className="text-slate-100 font-normal border-yellow-500 border-b-2 pb-2">
        Top 10 Crypto Coins
      </h2>
      <CryptoList />
    </aside>
  );
}
