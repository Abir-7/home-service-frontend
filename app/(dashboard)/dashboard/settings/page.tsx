"use client";

import { useState } from "react";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PasswordInfo {
  current: string;
  newPassword: string;
  confirm: string;
}

export default function ProfilePage() {
  const [editingAccount, setEditingAccount] = useState(false);
  const [editingSecurity, setEditingSecurity] = useState(false);

  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    name: "Sarah",
    email: "example@gmail.com",
    phone: "000-0000-000",
    address: "123 Admin Street, Dhaka",
  });

  const [accountDraft, setAccountDraft] = useState<AccountInfo>(accountInfo);

  const [passwords, setPasswords] = useState<PasswordInfo>({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEditAccount = () => {
    setAccountDraft({ ...accountInfo });
    setEditingAccount(true);
  };

  const handleSaveAccount = () => {
    setAccountInfo({ ...accountDraft });
    setEditingAccount(false);
  };

  const handleCancelAccount = () => {
    setAccountDraft({ ...accountInfo });
    setEditingAccount(false);
  };

  const handleEditSecurity = () => {
    setPasswords({ current: "", newPassword: "", confirm: "" });
    setEditingSecurity(true);
  };

  const handleUpdatePassword = () => {
    // TODO: wire to your API
    setPasswords({ current: "", newPassword: "", confirm: "" });
    setEditingSecurity(false);
  };

  const handleCancelSecurity = () => {
    setPasswords({ current: "", newPassword: "", confirm: "" });
    setEditingSecurity(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className=" mx-auto space-y-4">
        {/* ── Account Information ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Account Information
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Update your account details
              </p>
            </div>
            {!editingAccount && (
              <button
                onClick={handleEditAccount}
                className="text-violet-500 hover:text-violet-700 transition-colors"
                aria-label="Edit account information"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4">
            {editingAccount ? (
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">
                    Name
                  </Label>
                  <Input
                    value={accountDraft.name}
                    onChange={(e) =>
                      setAccountDraft((d) => ({ ...d, name: e.target.value }))
                    }
                    className="h-9 rounded-lg border-gray-200 text-sm"
                  />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    value={accountDraft.email}
                    onChange={(e) =>
                      setAccountDraft((d) => ({ ...d, email: e.target.value }))
                    }
                    className="h-9 rounded-lg border-gray-200 text-sm"
                  />
                </div>
                {/* Phone */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    value={accountDraft.phone}
                    onChange={(e) =>
                      setAccountDraft((d) => ({ ...d, phone: e.target.value }))
                    }
                    className="h-9 rounded-lg border-gray-200 text-sm"
                  />
                </div>
                {/* Address */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">
                    Address
                  </Label>
                  <Input
                    value={accountDraft.address}
                    onChange={(e) =>
                      setAccountDraft((d) => ({
                        ...d,
                        address: e.target.value,
                      }))
                    }
                    className="h-9 rounded-lg border-gray-200 text-sm"
                  />
                </div>

                {/* Save / Cancel */}
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-gray-200 text-gray-500 text-xs"
                    onClick={handleCancelAccount}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold"
                    onClick={handleSaveAccount}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Field label="Name" value={accountInfo.name} />
                <Field label="Email Address" value={accountInfo.email} />
                <Field label="Phone Number" value={accountInfo.phone} />
                <Field label="Address" value={accountInfo.address} />
              </div>
            )}
          </div>
        </section>

        {/* ── Security ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Security</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage password and security settings
              </p>
            </div>
            {!editingSecurity && (
              <button
                onClick={handleEditSecurity}
                className="text-violet-500 hover:text-violet-700 transition-colors"
                aria-label="Edit security settings"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4">
            {editingSecurity ? (
              <div className="space-y-4">
                {/* Current Password */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showCurrent ? "text" : "password"}
                      placeholder="Enter Password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords((p) => ({
                          ...p,
                          current: e.target.value,
                        }))
                      }
                      className="h-9 rounded-lg border-gray-200 text-sm pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowCurrent((v) => !v)}
                    >
                      {showCurrent ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New + Confirm side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={showNew ? "text" : "password"}
                        placeholder="Enter New Password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                          setPasswords((p) => ({
                            ...p,
                            newPassword: e.target.value,
                          }))
                        }
                        className="h-9 rounded-lg border-gray-200 text-sm pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowNew((v) => !v)}
                      >
                        {showNew ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter Password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords((p) => ({
                            ...p,
                            confirm: e.target.value,
                          }))
                        }
                        className="h-9 rounded-lg border-gray-200 text-sm pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirm((v) => !v)}
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Update / Cancel */}
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-gray-200 text-gray-500 text-xs"
                    onClick={handleCancelSecurity}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold"
                    onClick={handleUpdatePassword}
                    disabled={
                      !passwords.current ||
                      !passwords.newPassword ||
                      passwords.newPassword !== passwords.confirm
                    }
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Field label="Current Password" value="••••••••" />
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/* ── Read-only field ── */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-800">{label}</p>
      <p className="text-sm text-gray-400 mt-0.5">{value}</p>
    </div>
  );
}
