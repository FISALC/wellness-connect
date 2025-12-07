import { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
  AdminProfileDto,
} from "../api/profile.api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<AdminProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // For password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      setMsg("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setMsg(null);
    try {
      const updated = await updateProfile({
        fullName: profile.fullName,
        avatarUrl: profile.avatarUrl,
      });
      setProfile(updated);
      setMsg("Profile updated successfully.");
    } catch (err) {
      setMsg((err as Error).message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg("New passwords do not match.");
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });
      setPasswordMsg("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMsg("Failed to update password. Check your current password.");
    }
  }

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Error loading profile.</div>;

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
            <p className="mt-1 text-xs text-gray-500">Email is read-only.</p>
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

          {passwordMsg && (
            <div className="rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-700">
              {passwordMsg}
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Current password</label>
            <input
              type="password"
              className="w-full rounded-md border px-3 py-2"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">New password</label>
            <input
              type="password"
              className="w-full rounded-md border px-3 py-2"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm new password</label>
            <input
              type="password"
              className="w-full rounded-md border px-3 py-2"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="pt-2">
            <button className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
              Update password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

