import { useState } from "react";

type Profile = {
  fullName: string;
  email: string;
  avatarUrl: string;
};

export default function ProfilePage() {
  // TODO: Replace with real fetch to /api/v1/admin/me
  const [profile, setProfile] = useState<Profile>({
    fullName: "Admin User",
    email: "admin@you.com",
    avatarUrl: "https://ui-avatars.com/api/?name=AD&background=EEE&color=555",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      // TODO: POST to something like /api/v1/admin/profile
      await new Promise((r) => setTimeout(r, 600));
      setMsg("Profile updated.");
    } catch (err) {
      setMsg((err as Error).message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("Password updated."); // TODO: call /api/v1/admin/change-password
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-gray-500">Manage your account information.</p>
      </header>

      {msg && (
        <div className="rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-700">
          {msg}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile info */}
        <form onSubmit={handleSave} className="rounded-lg border bg-white p-4 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatarUrl}
              alt="avatar"
              className="h-16 w-16 rounded-full border object-cover"
            />
            <div className="flex-1">
              <label className="block text-sm mb-1">Avatar URL</label>
              <input
                className="w-full rounded-md border px-3 py-2"
                value={profile.avatarUrl}
                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                placeholder="https://…"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Full name</label>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full rounded-md border px-3 py-2 bg-gray-50"
              value={profile.email}
              readOnly
            />
            <p className="mt-1 text-xs text-gray-500">Email is read-only in this demo.</p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>

        {/* Change password */}
        <form
          onSubmit={handleChangePassword}
          className="rounded-lg border bg-white p-4 space-y-4"
        >
          <h2 className="font-medium">Change Password</h2>
          <div>
            <label className="block text-sm mb-1">Current password</label>
            <input type="password" className="w-full rounded-md border px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm mb-1">New password</label>
            <input type="password" className="w-full rounded-md border px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm new password</label>
            <input type="password" className="w-full rounded-md border px-3 py-2" required />
          </div>
          <button className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
            Update password
          </button>
        </form>
      </div>
    </section>
  );
}
