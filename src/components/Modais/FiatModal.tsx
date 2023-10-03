import { useContext } from "react";
import { CryptoContext } from "../../context/CryptoContext";
import FiatItem from "../FiatItem";

type PropsType = {
  toggleModal: () => void;
};

export default function FiatModal({ toggleModal }: PropsType) {
  const { fiatList } = useContext(CryptoContext);

  return (
    <div className="fixed transition-opacity overflow-y-auto z-10 inset-0 w-screen h-screen flex justify-center items-center">
      <div
        onClick={toggleModal}
        className="absolute w-full h-full bg-slate-950/60 backdrop-blur-md"
      />
      <div className="z-10 flex flex-col p-5 h-2/3 backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10">
        <h3 className="self-start font-semibold text-lg text-slate-400">
          Selecionar moeda de conversão.
        </h3>
        <div className="flex-1 grid pr-2 grid-cols-2 md:grid-cols-3 gap-5 overflow-y-auto">
          {fiatList &&
            fiatList.map((fiat) => {
              return (
                <FiatItem
                  key={fiat.name}
                  fiat={fiat}
                  toggleModal={toggleModal}
                />
              );
            })}
        </div>
        <button
          onClick={toggleModal}
          className="bg-slate-900 text-sm px-5 py-2 self-end text-slate-400 rounded-lg shadow-lg font-semibold hover:bg-slate-800/20 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
