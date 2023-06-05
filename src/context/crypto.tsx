"use client";

import { api } from "@/services/api";
import { ChartPoint } from "@/types/chart";
import { CryptoCoin, CryptoContextType, Fiat } from "@/types/crypto";
import { createContext, useEffect, useState } from "react";
import moment from "moment";

type ProviderProps = {
  children: string | JSX.Element | JSX.Element[] | any;
};

export const CryptoContext = createContext<CryptoContextType | null>(null);

export function CryptoProvider({ children }: ProviderProps) {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  async function getTopCryptoCoins() {
    try {
      const { data } = await api.get("/coins?currency=USD");

      let coins: CryptoCoin[] = await data.coins;

      return coins;
    } catch (error) {
      return null;
    }
  }

  async function getFiatList() {
    try {
      const { data }: { data: Fiat[] } = await api.get("/fiats");

      return data;
    } catch (error) {
      return null;
    }
  }

  const [topCryptoCoins, setTopCryptoCoins] = useState<CryptoCoin[] | null>(
    null
  );
  const [fiatList, setFiatList] = useState<Fiat[] | null>(null);

  const [currentCryptoCoin, setCurrentCryptoCoin] = useState<CryptoCoin | null>(
    null
  );
  const [currentFiat, setCurrentFiat] = useState<Fiat | null>(null);

  const [sectionMode, setSectionMode] = useState<"charts" | "conversor">(
    "charts"
  );

  const [chartData, setChartData] = useState<ChartPoint[] | null>(null);
  const [chartPeriod, setChartPeriod] = useState<"24h" | "1w" | "1m" | "3m">(
    "1m"
  );

  async function handleRequest() {
    let fiatResponse: Fiat[] | null = await getFiatList();
    setFiatList(fiatResponse);

    let handleCurrentFiat = fiatResponse?.filter((fiat) => {
      if (fiat.name === "BRL") {
        return fiat;
      }
    });

    if (handleCurrentFiat !== undefined) {
      setCurrentFiat(handleCurrentFiat[0]);
    }

    let cryptoCoinsResponse = await getTopCryptoCoins();
    setTopCryptoCoins(cryptoCoinsResponse);

    if (cryptoCoinsResponse !== null) {
      setCurrentCryptoCoin(cryptoCoinsResponse[0]);
    }
  }

  async function configureChartData() {
    if (
      currentCryptoCoin === null ||
      currentCryptoCoin === null ||
      currentFiat === null
    )
      return;

    try {
      const { data } = await api.get(
        `/charts?period=${chartPeriod}&coinId=${currentCryptoCoin.id}`
      );

      let chartPoints: Array<Array<4>> = await data.chart;

      let handleChartData: ChartPoint[] = [];

      chartPoints.forEach((chartPoint) => {
        const [timestamp, price] = chartPoint;
        const date = moment(new Date(timestamp * 1000)).format("MMMM DD HH:mm");

        handleChartData.push({
          name: date,
          price: Number((price * currentFiat.rate).toFixed(2)),
        });
      });

      setChartData(handleChartData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleRequest();
  }, []); // eslint-disable-line

  useEffect(() => {
    configureChartData();
  }, [chartPeriod, currentCryptoCoin, currentFiat]); // eslint-disable-line

  return (
    <CryptoContext.Provider
      value={{
        topCryptoCoins,
        fiatList,
        currentCryptoCoin,
        currentFiat,
        setCurrentFiat,
        setCurrentCryptoCoin,
        sectionMode,
        setSectionMode,
        chartData,
        chartPeriod,
        setChartPeriod,
        sideBarOpen,
        setSideBarOpen,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
