"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SeedCustomer } from "@/lib/seed-data";

const planVariant = {
  starter:    "neutral",
  pro:        "info",
  enterprise: "success",
} as const;

const statusVariant = {
  active:  "success",
  churned: "danger",
  trial:   "warning",
} as const;

export function DataTable({ customers }: { customers: SeedCustomer[] }) {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-white/10 overflow-hidden transition-colors duration-200">
      {/* Search bar */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search customers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 dark:focus:border-violet-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/[0.03] border-b border-gray-100 dark:border-white/[0.06]">
              {["Name", "Company", "Plan", "MRR", "Status", "Joined"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 dark:border-white/[0.04] hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                        {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100 leading-tight">
                        {c.name}
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs leading-tight mt-0.5">
                        {c.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{c.company}</td>
                <td className="px-5 py-3.5">
                  <Badge variant={planVariant[c.plan]}>
                    {c.plan.charAt(0).toUpperCase() + c.plan.slice(1)}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 font-semibold text-gray-900 dark:text-gray-100">
                  {c.mrr > 0 ? `$${c.mrr}` : (
                    <span className="text-gray-300 dark:text-gray-600">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={statusVariant[c.status]}>
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 text-gray-400 dark:text-gray-500 text-xs">
                  {new Date(c.joinedAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-gray-400 dark:text-gray-500 text-sm">
                  No customers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-50 dark:border-white/[0.04]">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length}</span>{" "}
          of{" "}
          <span className="font-medium text-gray-600 dark:text-gray-300">{customers.length}</span>{" "}
          customers
        </p>
      </div>
    </div>
  );
}
