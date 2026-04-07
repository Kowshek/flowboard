"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { SeedCustomer } from "@/lib/seed-data";

const planVariant = {
  starter: "neutral",
  pro: "info",
  enterprise: "success",
} as const;

const statusVariant = {
  active: "success",
  churned: "danger",
  trial: "warning",
} as const;

interface DataTableProps {
  customers: SeedCustomer[];
}

export function DataTable({ customers }: DataTableProps) {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Search */}
      <div className="px-5 py-4 border-b border-border">
        <input
          type="text"
          placeholder="Search customers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs h-9 px-3 rounded-lg bg-surface-hover border border-border text-text-primary text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Name", "Company", "Plan", "MRR", "Status", "Joined"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((c, i) => (
              <tr
                key={i}
                className="hover:bg-surface-hover transition-colors"
              >
                <td className="px-5 py-3">
                  <div>
                    <p className="font-medium text-text-primary">{c.name}</p>
                    <p className="text-text-secondary text-xs">{c.email}</p>
                  </div>
                </td>
                <td className="px-5 py-3 text-text-secondary">{c.company}</td>
                <td className="px-5 py-3">
                  <Badge variant={planVariant[c.plan]}>
                    {c.plan.charAt(0).toUpperCase() + c.plan.slice(1)}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-text-primary font-medium">
                  {c.mrr > 0 ? `$${c.mrr}` : "—"}
                </td>
                <td className="px-5 py-3">
                  <Badge variant={statusVariant[c.status]}>
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-text-secondary">
                  {new Date(c.joinedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-text-secondary"
                >
                  No customers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border text-xs text-text-secondary">
        Showing {filtered.length} of {customers.length} customers
      </div>
    </div>
  );
}
