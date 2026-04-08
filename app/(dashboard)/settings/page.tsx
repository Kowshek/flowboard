import { auth } from "@/lib/auth";
import { User, Bell, Shield, CreditCard } from "lucide-react";

export const metadata = { title: "Settings — FlowBoard" };

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
          <Icon className="h-4 w-4 text-violet-600" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value ?? "—"}</span>
    </div>
  );
}

function ToggleRow({ label, description, enabled }: { label: string; description: string; enabled?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      <div
        className={`relative w-9 h-5 rounded-full transition-colors ${enabled ? "bg-violet-600" : "bg-gray-200"}`}
      >
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-4" : "translate-x-0.5"}`}
        />
      </div>
    </div>
  );
}

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile */}
      <SettingsSection
        icon={User}
        title="Profile"
        description="Your personal information"
      >
        <FieldRow label="Display name" value={user?.name} />
        <FieldRow label="Email address" value={user?.email} />
        <FieldRow label="Account ID"    value={user?.id?.slice(0, 8).concat("…")} />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        icon={Bell}
        title="Notifications"
        description="Choose what you want to be notified about"
      >
        <ToggleRow
          label="Product updates"
          description="New features and improvements"
          enabled
        />
        <ToggleRow
          label="Weekly digest"
          description="Summary of your key metrics every Monday"
          enabled
        />
        <ToggleRow
          label="Churn alerts"
          description="Notify me when a customer churns"
        />
      </SettingsSection>

      {/* Security */}
      <SettingsSection
        icon={Shield}
        title="Security"
        description="Manage your account security"
      >
        <ToggleRow
          label="Two-factor authentication"
          description="Add an extra layer of security to your account"
        />
        <FieldRow label="Last sign-in" value="Today" />
      </SettingsSection>

      {/* Billing */}
      <SettingsSection
        icon={CreditCard}
        title="Billing"
        description="Your subscription and usage"
      >
        <FieldRow label="Current plan"   value="Pro" />
        <FieldRow label="Billing cycle"  value="Monthly" />
        <FieldRow label="Next invoice"   value="May 1, 2026" />
      </SettingsSection>
    </div>
  );
}
