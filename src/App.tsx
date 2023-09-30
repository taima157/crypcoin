import { useContext } from "react";
import Chart from "./components/Chart";
import Header from "./components/Header";
import SideBarCoins from "./components/SideBarCoins";
import { CryptoContext } from "./context/CryptoContext";

export default function App() {
  const { chartData } = useContext(CryptoContext);

  return (
    <div className="w-full h-screen bg-slate-950 flex">
      <SideBarCoins />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col pt-6 gap-14">
          <div className="flex flex-col gap-5 px-5 lg:pt-0 md:px-10 xl:px-16">
            <h3 className="font-semibold text-slate-300 text-lg">
              Criptomoedas salvas
            </h3>
            <div className="flex flex-col overflow-x-auto">
              <div className="p-6 border-2 backdrop-blur bg-slate-800/30 hover:bg-slate-800/10 border-slate-700 rounded-xl cursor-pointer transition-colors shadow-md drop-shadow-md">
                <span className="text-slate-500 font-semibold">
                  + Adicionar criptomoeda
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 font-semibold pb-10 px-0 sm:px-5 md:px-10 xl:px-16">
            {chartData && <Chart data={chartData} />}
          </div>
        </main>
      </div>
    </div>
  );
}
