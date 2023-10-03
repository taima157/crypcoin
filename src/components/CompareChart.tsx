import { useContext } from "react";
import { CompareChartData } from "../types/crypto";
import { CryptoContext } from "../context/CryptoContext";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CompareCryptoContext } from "../context/CompareCryptoContext";
import CustomCompareTooltip from "./CustomCompareTooltip";

type PropsType = {
  data: CompareChartData[] | null;
};

type AxisProps = {
  x?: number;
  y?: number;
  payload?: {
    value: number | string;
  };
  side?: "left" | "right";
};

function CustomizedYAxisTick({ x, y, payload, side }: AxisProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        dx={side === "left" ? -22 : 14}
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

export default function CompareChart({ data }: PropsType) {
  const { currentFiat } = useContext(CryptoContext);
  const { firstCoin, secondCoin } = useContext(CompareCryptoContext);

  if (!data) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={[]}>
          <CartesianGrid
            strokeDasharray="3 3"
            fill="#0f172a"
            fillOpacity={0.4}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (!currentFiat) return <></>;

  const handleData: CompareChartData[] = [];

  data.forEach((point) => {
    const convertedPoint: CompareChartData = {
      datetime: point.datetime,
      shortDate: point.shortDate,
      firstPrice: point.firstPrice * currentFiat.rate,
      secondPrice: point.secondPrice * currentFiat.rate,
    };

    handleData.push(convertedPoint);
  });

  function getYTicks(side: "left" | "right") {
    let maxYTick = 0;
    let minYTick = 0;

    handleData.forEach((chartPoint, index) => {
      if (index == 0) {
        maxYTick = minYTick =
          side === "left" ? chartPoint.firstPrice : chartPoint.secondPrice;
      }

      if (side === "left") {
        if (chartPoint.firstPrice > maxYTick) {
          maxYTick = chartPoint.firstPrice;
        }

        if (chartPoint.firstPrice < minYTick) {
          minYTick = chartPoint.firstPrice;
        }
      } else {
        if (chartPoint.secondPrice > maxYTick) {
          maxYTick = chartPoint.secondPrice;
        }

        if (chartPoint.secondPrice < minYTick) {
          minYTick = chartPoint.secondPrice;
        }
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

  const firstYTicks = getYTicks("left");
  const secondYTicks = getYTicks("right");

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={handleData}>
        <CartesianGrid strokeDasharray="3 3" fill="#0f172a" fillOpacity={0.4} />
        <XAxis
          dataKey="shortDate"
          allowDataOverflow={true}
          tick={<CustomizedXAxisTick />}
        />
        <YAxis
          domain={firstYTicks}
          allowDecimals={false}
          tick={<CustomizedYAxisTick side="left" />}
          yAxisId="1"
        />
        <YAxis
          orientation="right"
          domain={secondYTicks}
          allowDecimals={false}
          tick={<CustomizedYAxisTick side="right" />}
          yAxisId="2"
        />
        <Tooltip content={<CustomCompareTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          yAxisId="1"
          name={firstCoin?.name}
          type="monotone"
          dataKey="firstPrice"
          stroke="#9333ea"
          strokeWidth={2}
          dot={<></>}
        />
        <Line
          yAxisId="2"
          name={secondCoin?.name}
          type="monotone"
          dataKey="secondPrice"
          stroke="#ea580c"
          strokeWidth={2}
          dot={<></>}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
