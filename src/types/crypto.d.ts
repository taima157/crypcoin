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

export type CryptoContextType = {
  currentCoin: Coin | null;
  coinList: Coin[] | null;
  trendingCoins: Coin[] | null;
  fiatList: Fiat[] | null;
  currentFiat: Fiat | null;
  setCurrentFiat: Dispatch<SetStateAction<Fiat | null>>;
  changeCurrentCoin: (coin: Coin) => void;
};
