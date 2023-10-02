import { Dispatch, SetStateAction } from "react";

export type Coin = {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  websiteUrl: string;
};

export type Fiat = {
  name: string;
  rate: number;
  symbol: string;
  imageUrl: string;
};

export type ChartData = {
  datetime: string | number | Array;
  shortDate: string | number | Array;
  price: string | number | Array;
};

export type CryptoContextType = {
  currentCoin: Coin | null;
  coinList: Coin[] | null;
  trendingCoins: Coin[] | null;
  fiatList: Fiat[] | null;
  currentFiat: Fiat | null;
  setCurrentFiat: Dispatch<SetStateAction<Fiat | null>>;
  changeCurrentCoin: (coin: Coin) => void;
  chartData: ChartData[] | null;
  period: "24h" | "1w" | "1m" | "3m" | "6m" | "1y";
  setPeriod: Dispatch<SetStateAction<"24h" | "1w" | "1m" | "3m" | "6m" | "1y">>;
  getChartDataCoin: (
    coin: Coin,
    period?: "24h" | "1w" | "1m" | "3m" | "6m" | "1y"
  ) => void;
  updateSavedCoinList: (handlerSavedCoinList: string[]) => void;
  savedCoinList: string[];
};
