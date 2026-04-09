import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { UserGrowthChart } from "@/components/dashboard/UserGrowthChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { monthlyMetrics } from "@/lib/seed-data";
import { Users, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

export const metadata = { title: "Overview" };

export default function DashboardPage() {
  const latest = monthlyMetrics[monthlyMetrics.length - 1];
  const prev   = monthlyMetrics[monthlyMetrics.length - 2];

  const mrrChange   = (((latest.mrr   - prev.mrr)   / prev.mrr)   * 100).toFixed(1);
  const usersChange = (((latest.users - prev.users) / prev.users) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1
          className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Overview
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          {latest.month} — your key metrics at a glance
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Recurring Revenue"
          value={`$${latest.mrr.toLocaleString()}`}
          change={`+${mrrChange}%`}
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Active Users"
          value={latest.users.toLocaleString()}
          change={`+${usersChange}%`}
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Churn Rate"
          value={`${latest.churn}%`}
          change="-0.3%"
          trend="down"
          icon={TrendingDown}
        />
        <StatCard
          title="Total Revenue"
          value={`$${latest.revenue.toLocaleString()}`}
          change="+8.4%"
          trend="up"
          icon={TrendingUp}
        />
      </div>

      {/* Charts — 2-column grid, stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyMetrics} />
        <UserGrowthChart data={monthlyMetrics} />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
