"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useContext } from "react";
import { CryptoContext } from "@/context/crypto";
import { CryptoContextType } from "@/types/crypto";
import Image from "next/image";
import Charts from "@/components/Charts";
import Conversor from "@/components/Conversor";

export default function Home() {
  const cryptoContext = useContext<CryptoContextType | null>(CryptoContext);

  if (cryptoContext === null) return <div></div>;

  const { sectionMode } = cryptoContext;

  return (
    <div className="h-screen w-full flex bg-zinc-950 overflow-y-hidden">
      <SideBar />
      <main className="flex flex-col w-full items-center gap-16">
        <Header />
        {sectionMode === "charts" ? <Charts /> : <Conversor />}
      </main>
    </div>
  );
}
