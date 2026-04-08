"use client";

import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/components/providers/ThemeProvider";
import { MonthlyMetric } from "@/lib/seed-data";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 rounded-lg shadow-lg px-3 py-2.5 text-sm">
      <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">{label}</p>
      <p className="font-semibold text-gray-900 dark:text-gray-100">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export function RevenueChart({ data }: { data: MonthlyMetric[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = data.map((d) => ({
    month: d.month.split(" ")[0].slice(0, 3),
    mrr: d.mrr,
  }));

  const tickColor  = isDark ? "#6B7280" : "#9CA3AF";
  const gridColor  = isDark ? "#1F2937" : "#F3F4F6";
  const cursorColor = isDark ? "rgba(255,255,255,0.05)" : "#E5E7EB";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-white/10 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Revenue Growth
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Monthly recurring revenue
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
          +153% YoY
        </span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#7C3AED" stopOpacity={isDark ? 0.25 : 0.15} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false} tickLine={false} dy={8}
          />
          <YAxis
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            dx={-4} width={36}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: cursorColor, strokeWidth: 1 }}
          />
          <Area
            type="monotone" dataKey="mrr"
            stroke="#7C3AED" strokeWidth={2}
            fill="url(#mrrGradient)" dot={false}
            activeDot={{ r: 4, fill: "#7C3AED", stroke: isDark ? "#111827" : "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
