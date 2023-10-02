import { ReactNode, createContext, useEffect, useState } from "react";
import { ChartData, Coin, CryptoContextType, Fiat } from "../types/crypto";
import { api } from "../services/api";
import moment from "moment";

type ProviderProps = {
  children: ReactNode;
};

export const CryptoContext = createContext<CryptoContextType>({
  currentCoin: null,
  trendingCoins: null,
  coinList: null,
  fiatList: null,
  currentFiat: null,
  setCurrentFiat: () => {},
  changeCurrentCoin: () => {},
  chartData: null,
  period: "24h",
  setPeriod: () => {},
  getChartDataCoin: () => {},
  savedCoinList: [],
  updateSavedCoinList: () => {},
});

export function CryptoProvider({ children }: ProviderProps) {
  const [currentCoin, setCurrentCoin] = useState<Coin | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<Coin[] | null>(null);
  const [coinList, setCoinList] = useState<Coin[] | null>(null);

  const [savedCoinList, setSavedCoinList] = useState<string[]>([]);

  const [period, setPeriod] = useState<
    "24h" | "1w" | "1m" | "3m" | "6m" | "1y"
  >("24h");

  const [fiatList, setFiatList] = useState<Fiat[] | null>(null);
  const [currentFiat, setCurrentFiat] = useState<Fiat | null>(null);

  const [chartData, setChartData] = useState<ChartData[] | null>(null);

  async function handleRequest() {
    const handleCoinList: Coin[] = await getCoinList();

    setCoinList(handleCoinList);

    setCurrentCoin(handleCoinList[0]);

    setTrendingCoins(
      handleCoinList.filter((coin) => {
        if (coin.rank <= 6) {
          return coin;
        }
      })
    );

    await getFiatList();
    await getChartDataCoin(handleCoinList[0]);
  }

  async function getCoinList() {
    try {
      const response = await api.get("coins");

      return response.data.coins;
    } catch (error) {
      console.error(error);
    }
  }

  async function getFiatList() {
    try {
      const response = await api.get("fiats");
      const data: Fiat[] = await response.data;

      setFiatList(data);

      data.forEach((fiat) => {
        if (fiat.name === "BRL") {
          setCurrentFiat(fiat);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  function formatDatetime(
    timestamp: number,
    period: "24h" | "1w" | "1m" | "3m" | "6m" | "1y"
  ) {
    let format: string = "";

    switch (period) {
      case "24h":
        format = "DD/MM - HH:mm";
        break;
      case "1w":
        format = "DD/MMMM";
        break;
      case "1m":
        format = "DD/MMMM";
        break;
      case "3m":
        format = "MMMM/YY";
        break;
      case "6m":
        format = "MMMM/YY";
        break;
      case "1y":
        format = "MMMM/YY";
        break;
    }

    return moment(new Date(timestamp * 1000)).format(format);
  }

  async function getChartDataCoin(
    coin: Coin,
    periodParam?: "24h" | "1w" | "1m" | "3m" | "6m" | "1y"
  ) {
    try {
      const currentPeriod = periodParam ? periodParam : period;

      const response = await api.get(
        `charts?period=${currentPeriod}&coinId=${coin.id}`
      );

      const data: Array<Array<4>> = await response.data.chart;

      const handleChartData: ChartData[] = [];

      data.forEach((chartPoint) => {
        const [timestamp, price] = chartPoint;

        handleChartData.push({
          datetime: moment(new Date(timestamp * 1000)).format(
            "DD/MM/YYYY - HH:mm"
          ),
          shortDate: formatDatetime(timestamp, currentPeriod),
          price: price,
        });
      });

      setChartData(handleChartData);
    } catch (error) {
      console.error(error);
    }
  }

  async function changeCurrentCoin(coin: Coin) {
    if (coin.id === currentCoin?.id) return;

    setCurrentCoin(coin);
    getChartDataCoin(coin);
  }

  function getSavedCoinList() {
    const localSavedCoinList = localStorage.getItem("savedCoinList");
    const handleSavedCoinList: string[] = localSavedCoinList
      ? JSON.parse(localSavedCoinList)
      : [];

    setSavedCoinList(handleSavedCoinList);
  }

  function updateSavedCoinList(handlerSavedCoinList: string[]) {
    localStorage.setItem("savedCoinList", JSON.stringify(handlerSavedCoinList));
    setSavedCoinList(handlerSavedCoinList);
  }

  useEffect(() => {
    handleRequest();
    getSavedCoinList();
  }, []); // eslint-disable-line

  return (
    <CryptoContext.Provider
      value={{
        currentCoin,
        trendingCoins,
        coinList,
        fiatList,
        currentFiat,
        setCurrentFiat,
        changeCurrentCoin,
        chartData,
        period,
        setPeriod,
        getChartDataCoin,
        updateSavedCoinList,
        savedCoinList
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
