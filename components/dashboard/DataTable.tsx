"use client";

import { useState, useMemo } from "react";
import { Search, Plus, ChevronUp, ChevronDown, ChevronsUpDown, X, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SeedCustomer } from "@/lib/seed-data";

type SortKey = "name" | "company" | "plan" | "mrr" | "status" | "joinedAt";
type SortDir = "asc" | "desc";
type StatusFilter = "all" | "active" | "trial" | "churned";

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

const ROWS_PER_PAGE = 10;

const columns: { label: string; key: SortKey }[] = [
  { label: "Name",    key: "name"     },
  { label: "Company", key: "company"  },
  { label: "Plan",    key: "plan"     },
  { label: "MRR",     key: "mrr"      },
  { label: "Status",  key: "status"   },
  { label: "Joined",  key: "joinedAt" },
];

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="h-3 w-3 text-gray-300 dark:text-gray-600 ml-1 inline-block" />;
  return dir === "asc"
    ? <ChevronUp   className="h-3 w-3 text-violet-500 ml-1 inline-block" />
    : <ChevronDown className="h-3 w-3 text-violet-500 ml-1 inline-block" />;
}

export function DataTable({ customers }: { customers: SeedCustomer[] }) {
  const [search,         setSearch]         = useState("");
  const [statusFilter,   setStatusFilter]   = useState<StatusFilter>("all");
  const [sortKey,        setSortKey]        = useState<SortKey>("name");
  const [sortDir,        setSortDir]        = useState<SortDir>("asc");
  const [page,           setPage]           = useState(1);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const result = customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      switch (sortKey) {
        case "joinedAt": return (a.joinedAt.getTime() - b.joinedAt.getTime()) * mul;
        case "mrr":      return (a.mrr - b.mrr) * mul;
        case "name":     return a.name.localeCompare(b.name) * mul;
        case "company":  return a.company.localeCompare(b.company) * mul;
        case "plan":     return a.plan.localeCompare(b.plan) * mul;
        case "status":   return a.status.localeCompare(b.status) * mul;
        default:         return 0;
      }
    });

    return result;
  }, [customers, search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paged      = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const start = filtered.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1;
  const end   = Math.min(page * ROWS_PER_PAGE, filtered.length);

  const resetPage = () => setPage(1);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-white/10 overflow-hidden transition-colors duration-200">

      {/* Coming Soon modal */}
      {showComingSoon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowComingSoon(false); }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 p-6 max-w-sm w-full mx-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Coming Soon</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Full version feature</p>
                </div>
              </div>
              <button
                onClick={() => setShowComingSoon(false)}
                className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              This feature is available in the full version of FlowBoard, including customer creation, bulk imports, and CRM integrations.
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="w-full h-9 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-white/[0.06] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search customers…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="w-full h-9 pl-8 pr-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 dark:focus:border-violet-500 transition-all"
            />
          </div>
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); resetPage(); }}
            className="h-9 px-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 dark:focus:border-violet-500 transition-all cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="churned">Churned</option>
          </select>
        </div>
        {/* Add Customer */}
        <button
          onClick={() => setShowComingSoon(true)}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-medium transition-colors flex-shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Customer
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/[0.03] border-b border-gray-100 dark:border-white/[0.06]">
              {columns.map(({ label, key }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 select-none transition-colors whitespace-nowrap"
                >
                  {label}
                  <SortIcon active={sortKey === key} dir={sortDir} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((c, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 dark:border-white/[0.04] hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
              >
                {/* Name + email */}
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
                {/* MRR — muted dash for churned */}
                <td className="px-5 py-3.5">
                  {c.status === "churned" || c.mrr === 0 ? (
                    <span className="text-gray-300 dark:text-gray-600 font-medium">—</span>
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-gray-100">${c.mrr}</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={statusVariant[c.status]}>
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
                  {new Date(c.joinedAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-gray-400 dark:text-gray-500 text-sm">
                  No customers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer — count + pagination */}
      <div className="px-5 py-3 border-t border-gray-50 dark:border-white/[0.04] flex items-center justify-between gap-4">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-600 dark:text-gray-300">{start}–{end}</span>
          {" "}of{" "}
          <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length}</span>
          {" "}customers
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-7 px-3 rounded-md text-xs font-medium border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="h-7 px-3 rounded-md text-xs font-medium border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
