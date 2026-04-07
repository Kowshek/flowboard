import { StatCard } from "@/components/dashboard/StatCard";
import { monthlyMetrics } from "@/lib/seed-data";
import { Users, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

export const metadata = { title: "Dashboard — Flowboard" };

export default function DashboardPage() {
  const latest = monthlyMetrics[monthlyMetrics.length - 1];
  const prev = monthlyMetrics[monthlyMetrics.length - 2];

  const mrrChange = (((latest.mrr - prev.mrr) / prev.mrr) * 100).toFixed(1);
  const usersChange = (((latest.users - prev.users) / prev.users) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">
          {latest.month} — your key metrics at a glance
        </p>
      </div>

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
          value={latest.users.toString()}
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
          title="Revenue"
          value={`$${latest.revenue.toLocaleString()}`}
          change="+8.4%"
          trend="up"
          icon={TrendingUp}
        />
      </div>
    </div>
  );
}
