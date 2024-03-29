import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { CompareCryptoContext } from "../../context/CompareCryptoContext";
import { CryptoContext } from "../../context/CryptoContext";
import CompareSelectedCoinItem from "../CompareSelectedCoinItem";

type PropsType = {
  toggleModal: () => void;
  side: "left" | "right";
};

export default function CompareCoinModal({ toggleModal, side }: PropsType) {
  const { coinList } = useContext(CryptoContext);
  const { firstCoin, secondCoin, removeSelectedCoin } =
    useContext(CompareCryptoContext);

  let isRemove = false;

  if (side === "left") {
    isRemove = firstCoin ? true : false;
  } else {
    isRemove = secondCoin ? true : false;
  }

  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className="fixed transition-opacity overflow-y-auto z-10 inset-0 w-screen h-screen flex justify-center items-center">
      <div
        onClick={toggleModal}
        className="absolute w-full h-full bg-slate-950/90 scroll-smooth"
      />
      <div className="z-50 flex flex-col p-5 h-2/3 backdrop-blur-xl border-2 border-slate-900 bg-slate-900/30 w-[90%] md:2/3 lg:w-[800px] rounded-xl gap-10 ">
        <h3 className="self-start font-semibold text-lg text-slate-400">
          Pesquise por uma criptomoeda.
        </h3>

        <div className="w-full flex gap-2">
          <input
            type="search"
            className="outline-none w-full p-2 border-2 border-slate-800 rounded-md bg-slate-800/50 backdrop-blur-md text-slate-200 font-semibold shadow-xl"
            placeholder="Ex..: Bitcoin"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-8 text-slate-600" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 items-start gap-5 pr-3">
            {coinList &&
              coinList.map((coin) => {
                let isSelected: boolean = false;

                if (side === "left") {
                  if (firstCoin) {
                    if (firstCoin.id === coin.id) {
                      isSelected = true;
                    }
                  }
                  if (secondCoin) {
                    if (secondCoin.id === coin.id) {
                      return <></>;
                    }
                  }
                } else {
                  if (secondCoin) {
                    if (secondCoin.id === coin.id) {
                      isSelected = true;
                    }
                  }
                  if (firstCoin) {
                    if (firstCoin.id === coin.id) {
                      return <></>;
                    }
                  }
                }

                if (searchInput !== "") {
                  if (
                    coin.name.toLowerCase().includes(searchInput.toLowerCase())
                  ) {
                    return (
                      <CompareSelectedCoinItem
                        key={coin.id}
                        coin={coin}
                        selected={isSelected}
                        toggleModal={toggleModal}
                        side={side}
                      />
                    );
                  } else {
                    return <></>;
                  }
                } else {
                  return (
                    <CompareSelectedCoinItem
                      key={coin.id}
                      coin={coin}
                      selected={isSelected}
                      toggleModal={toggleModal}
                      side={side}
                    />
                  );
                }
              })}
          </div>
        </div>

        <div className="w-full flex justify-end gap-5">
          <button
            onClick={() => {
              removeSelectedCoin(side);
              toggleModal();
            }}
            disabled={!isRemove}
            className="bg-purple-600 shadow-purple-600/50 text-sm px-5 py-2 self-end text-slate-50 rounded-lg shadow-lg font-semibold hover:bg-purple-600/50 transition-colors disabled:bg-purple-600/50 disabled:shadow-none disabled:cursor-not-allowed disabled:text-slate-400"
          >
            Remover
          </button>
          <button
            onClick={toggleModal}
            className="bg-slate-900 text-sm px-5 py-2 text-slate-400 rounded-lg shadow-lg font-semibold hover:bg-slate-800/20 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
