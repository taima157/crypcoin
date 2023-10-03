import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchedCoin from "../SearchedCoin";
import { useContext, useState } from "react";
import { CryptoContext } from "../../context/CryptoContext";

type PropsType = {
  toggleModal: () => void;
};

export default function SearchCoinModal({ toggleModal }: PropsType) {
  const { coinList } = useContext(CryptoContext);
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className="fixed transition-opacity overflow-y-auto z-10 inset-0 w-screen h-screen flex justify-center items-center">
      <div
        onClick={toggleModal}
        className="absolute w-full h-full bg-slate-950/50 backdrop-blur-md"
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

        <div className="flex flex-col items-start gap-5 pr-3 flex-1 overflow-y-auto ">
          {coinList &&
            coinList.map((coin) => {
              if (searchInput !== "") {
                if (
                  coin.name.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                  return (
                    <SearchedCoin
                      key={coin.id}
                      coin={coin}
                      toggleModal={toggleModal}
                    />
                  );
                } else {
                  return <></>;
                }
              } else {
                if (coin.rank <= 10) {
                  return (
                    <SearchedCoin
                      key={coin.id}
                      coin={coin}
                      toggleModal={toggleModal}
                    />
                  );
                }
              }
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
