import { auth } from "@/lib/auth";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <SettingsClient
      initialName={user?.name}
      email={user?.email}
      accountId={user?.id}
    />
  );
}
