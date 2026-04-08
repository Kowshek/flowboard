import { BarChart3 } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Sign in — FlowBoard" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 bg-violet-600 p-10">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-white/15 flex items-center justify-center">
            <BarChart3 className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
            FlowBoard
          </span>
        </div>

        <div>
          <blockquote className="text-white/90 text-lg leading-relaxed font-medium mb-4">
            &ldquo;FlowBoard gave us the visibility we were missing. We went from gut-feel decisions to data-driven sprints in a week.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">SL</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Sarah Liu</p>
              <p className="text-white/60 text-xs">CTO, Brightwave</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="h-7 w-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              FlowBoard
            </span>
          </div>

          <div className="mb-8">
            <h1
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to your FlowBoard account
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
