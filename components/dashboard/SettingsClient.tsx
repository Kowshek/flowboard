"use client";

import { useState } from "react";
import {
  User, Bell, Shield, CreditCard, AlertTriangle, Check,
} from "lucide-react";

interface SettingsClientProps {
  initialName:  string | null | undefined;
  email:        string | null | undefined;
  accountId:    string | null | undefined;
}

/* ── Section wrapper ──────────────────────────────────────────────────── */
function SectionWrapper({
  icon: Icon, title, description, children, danger = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  const borderClass = danger
    ? "border border-red-200 dark:border-red-500/20"
    : "shadow-sm dark:shadow-none dark:border dark:border-white/10";
  const headerBorder = danger
    ? "border-b border-red-100 dark:border-red-500/10"
    : "border-b border-gray-100 dark:border-white/[0.06]";
  const iconBg = danger
    ? "bg-red-50 dark:bg-red-500/10"
    : "bg-violet-50 dark:bg-violet-500/10";
  const iconColor = danger
    ? "text-red-600 dark:text-red-400"
    : "text-violet-600 dark:text-violet-400";

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl overflow-hidden transition-colors ${borderClass}`}>
      <div className={`px-6 py-5 flex items-center gap-3 ${headerBorder}`}>
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

/* ── Toggle row ───────────────────────────────────────────────────────── */
function ToggleRow({
  label, description, enabled, onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-white/[0.04] last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        role="switch"
        aria-checked={enabled}
        className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500/30 ${
          enabled ? "bg-violet-600" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/* ── Static field row ─────────────────────────────────────────────────── */
function FieldRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-white/[0.04] last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{value ?? "—"}</span>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
export function SettingsClient({ initialName, email, accountId }: SettingsClientProps) {
  const [name,             setName]             = useState(initialName ?? "");
  const [showToast,        setShowToast]        = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [prefs, setPrefs] = useState({
    emailNotif:    true,
    weeklyDigest:  true,
    marketing:     false,
  });

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const setPref = (key: keyof typeof prefs) => (v: boolean) =>
    setPrefs((p) => ({ ...p, [key]: v }));

  return (
    <div className="space-y-6 max-w-2xl mx-auto">

      {/* ── Toast notification ─────────────────────────────────────────── */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-xl shadow-xl text-sm font-medium">
          <Check className="h-4 w-4 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
          Profile updated
        </div>
      )}

      {/* ── Delete Account Dialog ──────────────────────────────────────── */}
      {showDeleteDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowDeleteDialog(false); }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Delete Account</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              All your data, customers, and settings will be permanently deleted. Are you sure you want to continue?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 h-9 rounded-lg border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 h-9 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page header ────────────────────────────────────────────────── */}
      <div>
        <h1
          className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Settings
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* ── Profile ────────────────────────────────────────────────────── */}
      <SectionWrapper icon={User} title="Profile" description="Your personal information">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Display name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 dark:focus:border-violet-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Email address
            </label>
            <input
              type="email"
              value={email ?? ""}
              readOnly
              className="w-full h-9 px-3 rounded-lg bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 text-sm cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Role
            </label>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 h-9 flex items-center">Admin</p>
          </div>
          <div className="pt-3 flex justify-end border-t border-gray-50 dark:border-white/[0.04]">
            <button
              onClick={handleSave}
              className="h-9 px-5 rounded-lg bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Preferences ────────────────────────────────────────────────── */}
      <SectionWrapper icon={Bell} title="Preferences" description="Choose how you want to be notified">
        <ToggleRow
          label="Email notifications"
          description="Receive emails about account activity and updates"
          enabled={prefs.emailNotif}
          onChange={setPref("emailNotif")}
        />
        <ToggleRow
          label="Weekly digest"
          description="Summary of your key metrics every Monday"
          enabled={prefs.weeklyDigest}
          onChange={setPref("weeklyDigest")}
        />
        <ToggleRow
          label="Marketing emails"
          description="Product news, tips, and feature announcements"
          enabled={prefs.marketing}
          onChange={setPref("marketing")}
        />
      </SectionWrapper>

      {/* ── Security ───────────────────────────────────────────────────── */}
      <SectionWrapper icon={Shield} title="Security" description="Manage your account security">
        <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-white/[0.04]">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Two-factor authentication</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
          </div>
          <div className="relative w-9 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
            <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
          </div>
        </div>
        <FieldRow label="Last sign-in" value="Today" />
      </SectionWrapper>

      {/* ── Billing ────────────────────────────────────────────────────── */}
      <SectionWrapper icon={CreditCard} title="Billing" description="Your subscription and usage">
        <FieldRow label="Current plan"  value="Pro" />
        <FieldRow label="Billing cycle" value="Monthly" />
        <FieldRow label="Next invoice"  value="May 1, 2026" />
      </SectionWrapper>

      {/* ── Danger Zone ────────────────────────────────────────────────── */}
      <SectionWrapper icon={AlertTriangle} title="Danger Zone" description="Irreversible and destructive actions" danger>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Delete Account</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Permanently delete your account and all associated data
            </p>
          </div>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="h-9 px-4 rounded-lg border border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex-shrink-0"
          >
            Delete Account
          </button>
        </div>
      </SectionWrapper>

    </div>
  );
}
