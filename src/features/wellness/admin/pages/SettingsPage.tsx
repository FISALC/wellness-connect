import { useState } from "react";

type Settings = {
  theme: "light" | "dark" | "system";
  emailReports: boolean;
  marketingEmails: boolean;
  language: "en" | "ar";
  twoFactor: boolean;
};

export default function SettingsPage() {
  // TODO: fetch real settings from /api/v1/admin/settings
  const [s, setS] = useState<Settings>({
    theme: "light",
    emailReports: true,
    marketingEmails: false,
    language: "en",
    twoFactor: false,
  });

  function save() {
    // TODO: POST to /api/v1/admin/settings
    console.log("Saving settings:", s);
    alert("Settings saved.");
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">Admin preferences for your account.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance & language */}
        <div className="rounded-lg border bg-white p-4 space-y-4">
          <h2 className="font-medium">Appearance</h2>

          <div>
            <label className="block text-sm mb-1">Theme</label>
            <select
              className="w-full rounded-md border px-3 py-2 bg-white"
              value={s.theme}
              onChange={(e) => setS({ ...s, theme: e.target.value as Settings["theme"] })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Language</label>
            <select
              className="w-full rounded-md border px-3 py-2 bg-white"
              value={s.language}
              onChange={(e) => setS({ ...s, language: e.target.value as Settings["language"] })}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>

        {/* Notifications & security */}
        <div className="rounded-lg border bg-white p-4 space-y-4">
          <h2 className="font-medium">Notifications & Security</h2>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={s.emailReports}
              onChange={(e) => setS({ ...s, emailReports: e.target.checked })}
            />
            <span className="text-sm">Email me weekly admin reports</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={s.marketingEmails}
              onChange={(e) => setS({ ...s, marketingEmails: e.target.checked })}
            />
            <span className="text-sm">Receive product updates & tips</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={s.twoFactor}
              onChange={(e) => setS({ ...s, twoFactor: e.target.checked })}
            />
            <span className="text-sm">Enable 2-factor authentication</span>
          </label>

          <div className="pt-2">
            <button
              onClick={save}
              className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm"
            >
              Save settings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
