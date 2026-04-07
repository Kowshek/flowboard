import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = { title: "Sign Up — Flowboard" };

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Flowboard</h1>
          <p className="text-text-secondary mt-2">Create your account</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
