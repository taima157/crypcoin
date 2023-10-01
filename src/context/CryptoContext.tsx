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
});

export function CryptoProvider({ children }: ProviderProps) {
  const [currentCoin, setCurrentCoin] = useState<Coin | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<Coin[] | null>(null);
  const [coinList, setCoinList] = useState<Coin[] | null>(null);

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
    getChartDataCoin(handleCoinList[0]);
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

  async function getChartDataCoin(coin: Coin) {
    try {
      const response = await api.get(`charts?period=1w&coinId=${coin.id}`);

      const data: Array<Array<4>> = await response.data.chart;

      const handleChartData: ChartData[] = [];

      data.forEach((chartPoint) => {
        const [timestamp, price] = chartPoint;

        handleChartData.push({
          datetime: moment(new Date(timestamp * 1000)).format("DD MMMM HH:mm"),
          price: price,
        });
      });

      setChartData(handleChartData);
    } catch (error) {
      console.error(error);
    }
  }

  async function changeCurrentCoin(coin: Coin) {
    setCurrentCoin(coin);
    getChartDataCoin(coin);
  }

  useEffect(() => {
    handleRequest();
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
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
