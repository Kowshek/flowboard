import { BarChart3 } from "lucide-react";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = { title: "Create account — FlowBoard" };

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <BarChart3 className="h-4.5 w-4.5 text-white" />
          </div>
          <span
            className="text-lg font-bold text-gray-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FlowBoard
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h1
              className="text-xl font-bold text-gray-900 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Create your account
            </h1>
            <p className="text-sm text-gray-400 text-center mt-1">
              Start your 14-day free trial. No card required.
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
