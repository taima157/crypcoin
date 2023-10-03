import { ReactNode, createContext, useEffect, useState } from "react";
import {
  Coin,
  CompareChartData,
  CompareCryptoContextType,
} from "../types/crypto";
import { api } from "../services/api";
import moment from "moment";
import formatTimestamp from "../functions/formatTimestamp";

type PropsType = {
  children: ReactNode;
};

export const CompareCryptoContext = createContext<CompareCryptoContextType>({
  firstCoin: null,
  secondCoin: null,
  compareChartData: null,
  handleChoiceCoin: () => {},
  removeSelectedCoin: () => {},
  period: "24h",
  setPeriod: () => {},
});

export function CompareCryptoProvider({ children }: PropsType) {
  const [firstCoin, setFirstCoin] = useState<Coin | null>(null);
  const [secondCoin, setSecondCoin] = useState<Coin | null>(null);
  const [period, setPeriod] = useState<
    "24h" | "1w" | "1m" | "3m" | "6m" | "1y"
  >("24h");

  const [compareChartData, setCompareChartData] = useState<
    CompareChartData[] | null
  >(null);

  function handleChoiceCoin(coin: Coin, side: string) {
    console.log("testando teste");

    if (side === "left") {
      setFirstCoin(coin);
    } else {
      setSecondCoin(coin);
    }
  }

  function removeSelectedCoin(side: "left" | "right") {
    if (side === "left") {
      setFirstCoin(null);
    } else {
      setSecondCoin(null);
    }
  }

  async function getCompareChartData() {
    if (!firstCoin || !secondCoin) {
      setCompareChartData(null);
      return;
    }

    try {
      const firstResponse = await api.get(
        `charts?period=${period}&coinId=${firstCoin.id}`
      );
      const secondResponse = await api.get(
        `charts?period=${period}&coinId=${secondCoin.id}`
      );

      const firstData: Array<Array<4>> = await firstResponse.data.chart;
      const secondData: Array<Array<4>> = await secondResponse.data.chart;

      const handleCompareChartData: CompareChartData[] = [];

      firstData.forEach((chartPoint, index) => {
        const [timestamp, firstPrice] = chartPoint;

        handleCompareChartData.push({
          datetime: moment(new Date(timestamp * 1000)).format(
            "DD/MM/YYYY - HH:mm"
          ),
          shortDate: formatTimestamp(timestamp, "24h"),
          firstPrice: firstPrice,
          secondPrice: secondData[index][1],
        });
      });

      setCompareChartData(handleCompareChartData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCompareChartData();
  }, [firstCoin, secondCoin, period]); // eslint-disable-line

  return (
    <CompareCryptoContext.Provider
      value={{
        firstCoin,
        secondCoin,
        handleChoiceCoin,
        compareChartData,
        removeSelectedCoin,
        period,
        setPeriod,
      }}
    >
      {children}
    </CompareCryptoContext.Provider>
  );
}