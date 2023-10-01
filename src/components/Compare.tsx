import { useState } from "react";

export default function Compare() {
  const [count, setCount] = useState(1)

  return (
    <div className="flex flex-col gap-5 px-5 lg:pt-0 md:px-10 xl:px-16 pb-10">
      <span className="text-slate-50 font-semibold">{count}</span>
      <button
        className="text-slate-50 font-semibold"
        onClick={() => setCount(count + 1)}
      >
        Soma
      </button>
    </div>
  );
}
