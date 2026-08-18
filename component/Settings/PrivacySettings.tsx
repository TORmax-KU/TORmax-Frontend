'use client';

import { UserSettings } from "@/interface/settings";
import { RiShieldLine, RiEyeLine, RiUserLine, RiDeleteBinLine } from "@remixicon/react";

interface PrivacySettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function PrivacySettings({ settings, onUpdate }: PrivacySettingsProps) {
    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <RiShieldLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Privacy</h2>
                    <p className="text-sm text-base-content/50">Control your privacy settings</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Profile Visibility */}
                <div className="p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <RiEyeLine className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-medium">Profile Visibility</p>
                                <p className="text-sm text-base-content/50">Control who can see your profile</p>
                            </div>
                        </div>
                        <select 
                            className="select select-bordered select-sm"
                            value={settings.profileVisibility}
                            onChange={(e) => onUpdate('profileVisibility', e.target.value as any)}
                        >
                            <option value="public">Public</option>
                            <option value="employers">Employers Only</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>

                {/* Show Email */}
                <div className="flex items-center justify-between p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <RiUserLine className="h-5 w-5 text-info" />
                        <div>
                            <p className="font-medium">Show Email</p>
                            <p className="text-sm text-base-content/50">Display email on your profile</p>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        className="toggle toggle-primary"
                        checked={settings.showEmail}
                        onChange={(e) => onUpdate('showEmail', e.target.checked)}
                    />
                </div>

                {/* Show Phone */}
                <div className="flex items-center justify-between p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <RiUserLine className="h-5 w-5 text-info" />
                        <div>
                            <p className="font-medium">Show Phone</p>
                            <p className="text-sm text-base-content/50">Display phone on your profile</p>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        className="toggle toggle-primary"
                        checked={settings.showPhone}
                        onChange={(e) => onUpdate('showPhone', e.target.checked)}
                    />
                </div>

                {/* Danger Zone */}
                <div className="mt-8 pt-6 border-t border-error/20">
                    <div className="p-4 bg-error/5 border border-error/20 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-error">Danger Zone</p>
                                <p className="text-sm text-base-content/50">Permanently delete your account</p>
                            </div>
                            <button className="btn btn-error btn-sm gap-2">
                                <RiDeleteBinLine className="h-4 w-4" />
                                Delete Account
                            </button>
                        </div>
                        <p className="text-xs text-error/60 mt-2">This action cannot be undone. All your data will be permanently removed.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}