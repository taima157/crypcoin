import Header from "./components/Header";
import SideBarCoins from "./components/SideBarCoins";

export default function App() {
  return (
    <div className="w-full h-screen bg-slate-950 flex ">
      <SideBarCoins />
      <div className="flex-1">
        <Header />
        <main className="px-5 pt-6 lg:pt-0 md:px-10 xl:px-16">
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-slate-300 text-lg">
              Criptomoedas salvas
            </h3>
            <div className="flex overflow-x-auto">
              <div className="p-6 border-2 backdrop-blur bg-slate-800/30 hover:bg-slate-800/10 border-slate-700 rounded-xl cursor-pointer transition-colors shadow-md drop-shadow-md">
                <span className="text-slate-500 font-semibold">
                  + Adicionar criptomoeda
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
