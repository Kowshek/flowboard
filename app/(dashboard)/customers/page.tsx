import { DataTable } from "@/components/dashboard/DataTable";
import { seedCustomers } from "@/lib/seed-data";

export const metadata = { title: "Customers — Flowboard" };

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Customers</h1>
        <p className="text-text-secondary text-sm mt-1">
          {seedCustomers.length} total customers
        </p>
      </div>
      <DataTable customers={seedCustomers} />
    </div>
  );
}
