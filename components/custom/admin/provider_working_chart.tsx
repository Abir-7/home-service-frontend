"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2019", value: 0 },
  { year: "2020", value: 20000 },
  { year: "2021", value: 15000 },
  { year: "2022", value: 20000 },
  { year: "2023", value: 10000 },
  { year: "2024", value: 50000 },
  { year: "2025", value: 55000 },
  { year: "2026", value: 100000 },
];

const formatY = (value: number) => {
  if (value === 0) return "0";
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
};

export function ProvidedWorkingGrowthChart() {
  return (
    <div className="bg-white w-full rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">
          Provided Working Growth
        </h3>
        <span className="text-xs text-gray-400 font-medium">Yearly</span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#f0f0f0"
            strokeDasharray="4 4"
            vertical={true}
          />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatY}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 10000, 20000, 50000, 100000]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            formatter={(v) => [`${(Number(v) / 1000).toFixed(0)}k`, "Work"]}
            labelStyle={{ fontWeight: 600, color: "#374151" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#818cf8"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#818cf8", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
