import { useContext } from "react";
import { Fiat } from "../types/crypto";
import { CryptoContext } from "../context/CryptoContext";

type PropsType = {
  fiat: Fiat;
  toggleModal: () => void;
};

export default function FiatItem({ fiat, toggleModal }: PropsType) {
  const { currentFiat, setCurrentFiat } = useContext(CryptoContext);

  function handleSetCurrentFiat() {
    setCurrentFiat(fiat);
    toggleModal();
  }

  return (
    <button
      onClick={handleSetCurrentFiat}
      className={`flex backdrop-blur-md rounded-md overflow-auto border-slate-900 border-2 gap-2 ${
        currentFiat?.name == fiat.name
          ? "bg-purple-600 hover:bg-purple-500"
          : "bg-slate-900/30 hover:bg-slate-900"
      }  transition-colors`}
    >
      {currentFiat?.name !== fiat.name && (
        <div className="h-full bg-purple-600 w-[2px]" />
      )}
      <div className="flex gap-3 items-center p-2">
        <img
          className="w-7"
          src={fiat.imageUrl}
          alt={`Icone da moeda ${fiat.name}`}
        />
        <span
          className={`${
            currentFiat?.name == fiat.name ? "text-slate-50" : "text-slate-400"
          } text-sm font-semibold`}
        >
          {fiat.symbol} {fiat.name}
        </span>
      </div>
    </button>
  );
}
