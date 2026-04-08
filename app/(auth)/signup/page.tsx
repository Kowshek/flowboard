import { BarChart3 } from "lucide-react";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = { title: "Create account — FlowBoard" };

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: "var(--font-display)" }}>
            FlowBoard
          </span>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm dark:shadow-none dark:border dark:border-white/10 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Create your account
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-1">
              Start your 14-day free trial. No card required.
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
