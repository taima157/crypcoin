import { ReactNode, createContext, useEffect, useState } from "react";
import { Coin, CryptoContextType, Fiat } from "../types/crypto";
import { api } from "../services/api";

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
});

export function CryptoProvider({ children }: ProviderProps) {
  const [currentCoin, setCurrentCoin] = useState<Coin | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<Coin[] | null>(null);
  const [coinList, setCoinList] = useState<Coin[] | null>(null);

  const [fiatList, setFiatList] = useState<Fiat[] | null>(null);
  const [currentFiat, setCurrentFiat] = useState<Fiat | null>(null);

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

  async function changeCurrentCoin(coin: Coin) {
    setCurrentCoin(coin);
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
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
