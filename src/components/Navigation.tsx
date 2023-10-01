import { useState } from "react";
import Currency from "./Currency";
import Compare from "./Compare";

export default function Navigation() {
  const [tab, setTab] = useState<"currency" | "compare">("currency");

  return (
    <div className="flex flex-1 w-full h-full flex-col gap-10">
      <div className="flex w-full flex-col">
        <nav className="flex w-full justify-around pb-1">
          <button
            onClick={() => setTab("currency")}
            className={`w-2/5 ${
              tab === "currency" ? "text-slate-200 " : "text-slate-600"
            }  font-semibold p-2 rounded-sm `}
          >
            Criptomoeda
          </button>
          <button
            onClick={() => setTab("compare")}
            className={`w-2/5 ${
              tab === "compare" ? "text-slate-200 " : "text-slate-600"
            } font-semibold pt-2 rounded-sm `}
          >
            Comparar
          </button>
        </nav>
        <div
          className={`w-1/4 h-1 ${
            tab === "currency" ? "translate-x-1/2" : "translate-x-[250%]"
          } duration-500 bg-purple-600 rounded-sm `}
        />
      </div>

      <div
        className={`flex-1 w-full flex ${tab !== "currency" ? "hidden" : ""}`}
      >
        <Currency />
      </div>

      <div
        className={`flex-1 w-full flex ${tab !== "compare" ? "hidden" : ""}`}
      >
        <Compare />
      </div>
    </div>
  );
}
