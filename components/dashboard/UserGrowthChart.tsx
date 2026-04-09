"use client";

import {
  BarChart, Bar, XAxis, YAxis,
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
        {payload[0].value.toLocaleString()} users
      </p>
    </div>
  );
}

export function UserGrowthChart({ data }: { data: MonthlyMetric[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = data.map((d) => ({
    month: d.month.split(" ")[0].slice(0, 3),
    users: d.users,
  }));

  const tickColor  = isDark ? "#6B7280" : "#9CA3AF";
  const gridColor  = isDark ? "#1F2937" : "#F3F4F6";
  const barColor   = isDark ? "#7C3AED" : "#8B5CF6";
  const cursorFill = isDark ? "rgba(255,255,255,0.03)" : "#F9FAFB";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-white/10 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            User Growth
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Monthly active users
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-1 rounded-full">
          +136% YoY
        </span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barCategoryGap="35%">
          <CartesianGrid strokeDasharray="0" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false} tickLine={false} dy={8}
          />
          <YAxis
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false} tickLine={false}
            dx={-4} width={36}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: cursorFill }}
          />
          <Bar
            dataKey="users"
            fill={barColor}
            radius={[4, 4, 0, 0]}
            opacity={0.9}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
