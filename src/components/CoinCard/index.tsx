import { CryptoCoin } from "@/types/crypto";
import Image from "next/image";
import { useContext } from "react";
import { CryptoContext } from "@/context/crypto";
import { CryptoContextType } from "@/types/crypto";

type PropsType = {
  cryptoCoin: CryptoCoin;
  toggleModal: () => void;
};

export default function CoinCard({ cryptoCoin, toggleModal }: PropsType) {
  const cryptoContext = useContext<CryptoContextType | null>(CryptoContext);

  if (cryptoContext === null) return <div></div>;

  function handleChange() {
    cryptoContext?.setCurrentCryptoCoin(cryptoCoin);
    toggleModal();
  }

  return (
    <div
      onClick={handleChange}
      className="p-2 hover:bg-neutral-200/10 rounded-md w-full cursor-pointer flex gap-3 items-center"
    >
      <Image
        width={100}
        height={100}
        className="h-6 w-6"
        src={cryptoCoin.icon}
        alt="crypto icon"
      />
      <span>{cryptoCoin.name}</span>
    </div>
  );
}
