import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Key } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Settings() {
  const { user, updateProfile, deleteAccount } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    if (!name) return toast.error("Name cannot be empty");
    setSaving(true);
    try {
      await updateProfile(name);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to completely delete your account? This cannot be undone.")) {
      try {
        await deleteAccount();
        toast.success("Account deleted");
      } catch (err) {
        toast.error("Failed to delete account");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 py-6 w-full max-w-4xl mx-auto text-[var(--color-text-primary)]">
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="text-3xl font-bold tracking-tight font-serif flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-[var(--color-accent-gold)]" />
          Settings
        </h1>
        <p className="text-[var(--color-text-secondary)]">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Nav for Settings */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white font-medium border border-[var(--color-accent-gold)]/20">
            <User className="w-5 h-5 text-[var(--color-accent-gold)]" /> Profile
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-colors">
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-colors">
            <Shield className="w-5 h-5" /> Privacy & Security
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-colors">
            <Key className="w-5 h-5" /> API Keys
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6 rounded-xl border border-white/10 flex flex-col gap-6">
            <h2 className="text-xl font-semibold font-serif border-b border-white/10 pb-4">Profile Information</h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-accent-gold)]/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || ""}
                  className="bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-accent-gold)]/50 text-gray-500"
                  disabled
                />
              </div>

              <button 
                onClick={handleUpdate}
                disabled={saving}
                className="mt-2 self-start bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-terracotta)] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl border border-white/10 flex flex-col gap-6">
            <h2 className="text-xl font-semibold font-serif border-b border-white/10 pb-4 text-red-400">Danger Zone</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Permanently delete your account and all associated data.</p>
            <button 
              onClick={handleDelete}
              className="self-start px-6 py-2 rounded-lg text-sm font-semibold border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
