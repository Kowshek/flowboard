import { Bell } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-100 flex-shrink-0">
      <div />
      {/* Right-side actions */}
      <div className="flex items-center gap-2">
        <button
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="h-4 w-px bg-gray-200 mx-1" />
        <div className="h-7 w-7 rounded-full bg-violet-100 flex items-center justify-center">
          <span className="text-[10px] font-semibold text-violet-700">FB</span>
        </div>
      </div>
    </header>
  );
}
