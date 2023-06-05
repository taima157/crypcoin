"use client";

import { useContext, useState } from "react";
import { CryptoContext } from "@/context/crypto";
import { CryptoContextType } from "@/types/crypto";
import Image from "next/image";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  Label,
  ResponsiveContainer,
} from "recharts";

import CustomTooltip from "../CustomTooltip";

import { HiChevronDown, HiChevronUp, HiMinus } from "react-icons/hi";

export default function Charts() {
  const cryptoContext = useContext<CryptoContextType | null>(CryptoContext);
  const [selectPeriodOpen, setSelectPeriodOpen] = useState<boolean>(false);

  if (cryptoContext === null) return <div></div>;

  const { currentCryptoCoin, chartPeriod, chartData } = cryptoContext;

  if (currentCryptoCoin === null || chartPeriod === null) return <div></div>;

  return (
    <section className="px-5 w-full lg:w-3/4 flex flex-col gap-5">
      <div className="flex justify-between w-full">
        <div className="flex gap-5 items-center">
          {currentCryptoCoin && (
            <Image
              width={120}
              height={120}
              className="h-12 w-12 md:h-16 md:w-16"
              src={currentCryptoCoin.icon}
              alt="crypto icon"
            />
          )}

          <h2 className="text-2xl md:text-4xl font-normal text-neutral-200">
            {currentCryptoCoin?.name}
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          {currentCryptoCoin.priceChange1h > 0 ? (
            <HiChevronUp className="text-green-500 w-6 h-6 md:w-10 md:h-10" />
          ) : currentCryptoCoin.priceChange1h < 0 ? (
            <HiChevronDown className="text-red-500 w-6 h-6 md:w-10 md:h-10" />
          ) : (
            <HiMinus className="text-neutral-100 w-6 h-6 md:w-10 md:h-10" />
          )}
          <span
            className={`text-xl md:text-2xl ${
              currentCryptoCoin.priceChange1h > 0
                ? "text-green-500"
                : currentCryptoCoin.priceChange1h < 0
                ? "text-red-500"
                : "text-neutral-100"
            }`}
          >
            {cryptoContext.currentFiat?.symbol}{" "}
            {Number(
              currentCryptoCoin.price *
                (cryptoContext.currentFiat
                  ? cryptoContext.currentFiat?.rate
                  : 1)
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {chartData && (
        <div className="w-full text-sm sm:text-lg">
          <div className="w-full md:px-5 flex justify-end">
            <div className="hidden md:flex gap-4 items-center">
              <span>Period:</span>
              <button
                onClick={() => cryptoContext.setChartPeriod("24h")}
                className={`${
                  chartPeriod === "24h"
                    ? "bg-yellow-500 text-zinc-950"
                    : "bg-zinc-800 text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                } px-2 py-1 rounded-md font-semibold`}
              >
                24 hours
              </button>
              <button
                onClick={() => cryptoContext.setChartPeriod("1w")}
                className={`${
                  chartPeriod === "1w"
                    ? "bg-yellow-500 text-zinc-950"
                    : "bg-zinc-800 text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                } px-2 py-1 rounded-md font-semibold`}
              >
                7 days
              </button>
              <button
                onClick={() => cryptoContext.setChartPeriod("1m")}
                className={`${
                  chartPeriod === "1m"
                    ? "bg-yellow-500 text-zinc-950"
                    : "bg-zinc-800 text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                } px-2 py-1 rounded-md font-semibold`}
              >
                1 months
              </button>
              <button
                onClick={() => cryptoContext.setChartPeriod("3m")}
                className={`${
                  chartPeriod === "3m"
                    ? "bg-yellow-500 text-zinc-950"
                    : "bg-zinc-800 text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                } px-2 py-1 rounded-md font-semibold`}
              >
                3 months
              </button>
            </div>

            <div className="relative justify-end flex md:hidden">
              <div className="flex gap-2 items-center">
                <span>Period: </span>
                <button
                  onClick={() => setSelectPeriodOpen(!selectPeriodOpen)}
                  className="bg-neutral-200/10 flex gap-5 justify-between items-center rounded-lg py-1 px-2"
                >
                  <span>
                    {chartPeriod === "24h"
                      ? "24 hours"
                      : chartPeriod === "1w"
                      ? "7 days"
                      : chartPeriod === "1m"
                      ? "1 months"
                      : "3 months"}
                  </span>
                  <HiChevronDown className="h-6 w-6 text-yellow-500" />
                </button>
              </div>

              {selectPeriodOpen && (
                <div className="flex gap-5 absolute flex-col bg-zinc-900 z-40 p-2 rounded-md w-full mt-10 duration-300">
                  <button
                    onClick={() => {
                      setSelectPeriodOpen(!selectPeriodOpen);
                      cryptoContext.setChartPeriod("24h");
                    }}
                    className={`${
                      chartPeriod === "24h"
                        ? "bg-yellow-500 text-zinc-950"
                        : "bg-zinc-800 text-zinc-200 "
                    } px-2 py-1 rounded-md font-semibold`}
                  >
                    24 hours
                  </button>
                  <button
                    onClick={() => {
                      setSelectPeriodOpen(!selectPeriodOpen);
                      cryptoContext.setChartPeriod("1w");
                    }}
                    className={`${
                      chartPeriod === "1w"
                        ? "bg-yellow-500 text-zinc-950"
                        : "bg-zinc-800 text-zinc-200 "
                    } px-2 py-1 rounded-md font-semibold`}
                  >
                    7 days
                  </button>
                  <button
                    onClick={() => {
                      setSelectPeriodOpen(!selectPeriodOpen);
                      cryptoContext.setChartPeriod("1m");
                    }}
                    className={`${
                      chartPeriod === "1m"
                        ? "bg-yellow-500 text-zinc-950"
                        : "bg-zinc-800 text-zinc-200 "
                    } px-2 py-1 rounded-md font-semibold`}
                  >
                    1 months
                  </button>
                  <button
                    onClick={() => {
                      setSelectPeriodOpen(!selectPeriodOpen);
                      cryptoContext.setChartPeriod("3m");
                    }}
                    className={`${
                      chartPeriod === "3m"
                        ? "bg-yellow-500 text-zinc-950"
                        : "bg-zinc-800 text-zinc-200 "
                    } px-2 py-1 rounded-md font-semibold`}
                  >
                    3 months
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 h-96 mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  right: 30,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Legend />
                <YAxis dataKey="price" allowDataOverflow={true}>
                  <Label value="Price" angle={-90} position="left" dy="-10" />
                </YAxis>
                <Tooltip content={<CustomTooltip payload={chartData} />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="yellow"
                  dot={<></>}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
}
