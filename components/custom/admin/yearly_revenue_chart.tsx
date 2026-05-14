/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2019", value: 50000 },
  { year: "2020", value: 80000 },
  { year: "2021", value: 130000 },
  { year: "2022", value: 1200000 },
  { year: "2023", value: 1050000 },
  { year: "2024", value: 1600000 },
  { year: "2025", value: 2100000 },
  { year: "2026", value: 3000000 },
];

const formatY = (value: number) => {
  if (value === 0) return "0";
  if (value >= 1_000_000) return `${value / 1_000_000}M`;
  if (value >= 1_000) return `${value / 1_000}K`;
  return `${value}`;
};

// Custom bar shape with top-to-bottom gradient via SVG linearGradient
const GradientBar = (props: any) => {
  const { x, y, width, height, index } = props;
  const id = `barGrad-${index}`;
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.85} />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        ry={8}
        fill={`url(#${id})`}
      />
    </g>
  );
};

export function YearlyRevenueChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-900">Yearly Revenue</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Total revenue over the years
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
          barCategoryGap="30%"
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatY}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 100000, 1000000, 2000000, 5000000]}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)", radius: 8 }}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
            labelStyle={{ fontWeight: 600, color: "#374151" }}
          />
          <Bar dataKey="value" shape={<GradientBar />} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
