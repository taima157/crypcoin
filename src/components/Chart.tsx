import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ChartData } from "../types/crypto";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import CustomTooltip from "./CustomTooltip";

type PropsType = {
  data: ChartData[];
};

type AxisProps = {
  x?: number;
  y?: number;
  payload?: {
    value: number | string;
  };
};

function CustomizedYAxisTick({ x, y, payload }: AxisProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        dx={-22}
        textAnchor="middle"
        className="text-xs md:text-sm fill-slate-600" // Classes Tailwind CSS responsivas
        transform="rotate(0)"
      >
        {payload ? payload.value : ""}
      </text>
    </g>
  );
}

function CustomizedXAxisTick({ x, y, payload }: AxisProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        className="text-xs md:text-sm fill-slate-600" // Classes Tailwind CSS responsivas
        transform="rotate(0)"
      >
        {payload ? payload.value : ""}
      </text>
    </g>
  );
}

export default function Chart({ data }: PropsType) {
  const { currentCoin, currentFiat } = useContext(CryptoContext);

  if (!currentFiat) return <></>;

  const handleData: ChartData[] = [];

  data.forEach((point) => {
    const convertedPoint: ChartData = {
      datetime: point.datetime,
      price: point.price * currentFiat.rate,
    };

    handleData.push(convertedPoint);
  });

  function getYTicks() {
    let maxYTick = 0;
    let minYTick = 0;

    handleData.forEach((chartPoint, index) => {
      if (index == 0) {
        maxYTick = minYTick = chartPoint.price;
      }

      if (chartPoint.price > maxYTick) {
        maxYTick = chartPoint.price;
      }

      if (chartPoint.price < minYTick) {
        minYTick = chartPoint.price;
      }
    });

    const truncMaxYTick = Math.trunc(maxYTick);
    const maxYTickUnits = Number(String(truncMaxYTick).length) - 1;
    const firstMaxYTickUnit = Number(String(truncMaxYTick)[maxYTickUnits]);
    const roundedMaxYTick = truncMaxYTick + (10 - firstMaxYTickUnit) + 10;

    const truncMinYTick = Math.trunc(minYTick);
    const minYTickUnits = Number(String(truncMinYTick).length) - 1;
    const firstMinYTickUnit = Number(String(truncMinYTick)[minYTickUnits]);
    const roundedMinYTick = truncMinYTick - firstMinYTickUnit - 10;

    return [roundedMinYTick < 0 ? 0 : roundedMinYTick, roundedMaxYTick];
  }

  const yTicks = getYTicks();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={handleData} >
        <CartesianGrid strokeDasharray="3 3" fill="#0f172a" fillOpacity={0.2} />
        <XAxis
          dataKey="datetime"
          allowDataOverflow={true}
          tick={<CustomizedXAxisTick />}
        />
        <YAxis
          domain={yTicks}
          allowDecimals={false}
          tick={<CustomizedYAxisTick />}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          name={currentCoin ? currentCoin.name : "Coin"}
          type="monotone"
          dataKey="price"
          stroke="#9333ea"
          strokeWidth={2}
          dot={<></>}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
