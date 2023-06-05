import { ChartPoint } from "./chart";

export interface CryptoCoin {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: 1;
  price: number;
  priceBtc: 1;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  websiteUrl: string;
}

export interface Fiat {
  name: string;
  rate: number;
  symbol: string;
  imageUrl: string;
}

type CryptoContextType = {
  topCryptoCoins: CryptoCoin[] | null;
  fiatList: Fiat[] | null;
  currentCryptoCoin: CryptoCoin | null;
  currentFiat: Fiat | null;
  setCurrentFiat: (fiat: Fiat) => void;
  sectionMode: "charts" | "conversor";
  setSectionMode: (cryptonCoin: "charts" | "conversor") => void;
  setCurrentCryptoCoin: (cryptoCoin: CryptoCoin) => void;
  chartData: ChartPoint[] | null;
  chartPeriod: "24h" | "1w" | "1m" | "3m";
  setChartPeriod: (period: "24h" | "1w" | "1m" | "3m") => void;
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
};
