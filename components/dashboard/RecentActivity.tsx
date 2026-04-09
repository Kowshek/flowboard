type ActivityItem = {
  dot: "green" | "blue" | "amber" | "red" | "violet";
  text: string;
  time: string;
};

const dotColors: Record<ActivityItem["dot"], string> = {
  green:  "bg-emerald-500",
  blue:   "bg-blue-500",
  amber:  "bg-amber-500",
  red:    "bg-red-500",
  violet: "bg-violet-500",
};

const activities: ActivityItem[] = [
  { dot: "green",  text: "New signup: Sarah Chen (Acme Corp)",        time: "2h ago" },
  { dot: "blue",   text: "Plan upgrade: Pro → Enterprise · Datastream", time: "5h ago" },
  { dot: "green",  text: "Payment received: $299 · Brightwave",        time: "8h ago" },
  { dot: "amber",  text: "Churn alert: Michael Torres (Flowsync)",      time: "1d ago" },
  { dot: "green",  text: "New signup: Emma Rodriguez (Skybridge)",      time: "1d ago" },
  { dot: "violet", text: "Trial started: Lucas Kim (Quantum Soft)",     time: "2d ago" },
];

export function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-white/10 p-6 transition-colors duration-200">
      <div className="mb-4">
        <h3
          className="text-sm font-semibold text-gray-900 dark:text-gray-100"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Recent Activity
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Latest events across your account
        </p>
      </div>

      <div>
        {activities.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-3 border-b border-gray-50 dark:border-white/[0.04] last:border-0"
          >
            <span className={`h-2 w-2 rounded-full flex-shrink-0 ${dotColors[item.dot]}`} />
            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{item.text}</p>
            <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 tabular-nums">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
