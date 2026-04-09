import { DataTable } from "@/components/dashboard/DataTable";
import { seedCustomers } from "@/lib/seed-data";

export const metadata = { title: "Customers" };

export default function CustomersPage() {
  const active  = seedCustomers.filter((c) => c.status === "active").length;
  const trial   = seedCustomers.filter((c) => c.status === "trial").length;
  const churned = seedCustomers.filter((c) => c.status === "churned").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Customers
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            {seedCustomers.length} total · {active} active · {trial} trial · {churned} churned
          </p>
        </div>
      </div>
      <DataTable customers={seedCustomers} />
    </div>
  );
}
