import { Coin } from "../types/crypto";

type PropsType = {
  coin: Coin;
  handleSelectCoin: (coinId: string) => void;
  selectedCoin: string;
};

export default function SelectedCoinItem({
  coin,
  handleSelectCoin,
  selectedCoin,
}: PropsType) {
  return (
    <button
      onClick={() => handleSelectCoin(coin.id)}
      className={`text-left ${
        coin.id === selectedCoin
          ? "bg-purple-700 border-purple-700 shadow-purple-700/50"
          : "bg-slate-900/30 border-slate-800 backdrop-blur-md"
      } flex items-center gap-5 rounded-md border-2 shadow-lg p-2`}
      key={coin.id}
    >
      <img className="h-8 w-8" src={coin.icon} alt={`Ícone ${coin.name}`} />
      <div className="flex flex-col">
        <p className="text-slate-50 font-semibold">{coin.name}</p>
        <p
          className={`${
            coin.id === selectedCoin ? "text-slate-400" : "text-purple-600"
          } font-semibold text-sm`}
        >
          {coin.symbol}
        </p>
      </div>
    </button>
  );
}
