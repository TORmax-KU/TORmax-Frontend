'use client';

import { useState } from "react";
import { RiLockLine, RiShieldCheckLine, RiTimeLine, RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { UserSettings } from "@/interface/settings";

interface SecuritySettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <RiLockLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Security</h2>
                    <p className="text-sm text-base-content/50">Manage your security preferences</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Two-Factor Auth */}
                <div className="flex items-center justify-between p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <RiShieldCheckLine className="h-5 w-5 text-success" />
                        <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-base-content/50">Add an extra layer of security</p>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        className="toggle toggle-primary"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => onUpdate('twoFactorAuth', e.target.checked)}
                    />
                </div>

                {/* Session Timeout */}
                <div className="flex items-center justify-between p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <RiTimeLine className="h-5 w-5 text-primary" />
                        <div>
                            <p className="font-medium">Session Timeout</p>
                            <p className="text-sm text-base-content/50">Auto-logout after inactivity</p>
                        </div>
                    </div>
                    <select 
                        className="select select-bordered select-sm"
                        value={settings.sessionTimeout}
                        onChange={(e) => onUpdate('sessionTimeout', e.target.value)}
                    >
                        <option value="15 minutes">15 minutes</option>
                        <option value="30 minutes">30 minutes</option>
                        <option value="1 hour">1 hour</option>
                        <option value="2 hours">2 hours</option>
                        <option value="8 hours">8 hours</option>
                        <option value="24 hours">24 hours</option>
                    </select>
                </div>

                {/* Login Alerts */}
                <div className="flex items-center justify-between p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <RiLockLine className="h-5 w-5 text-info" />
                        <div>
                            <p className="font-medium">Login Alerts</p>
                            <p className="text-sm text-base-content/50">Get notified of new sign-ins</p>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        className="toggle toggle-primary"
                        checked={settings.loginAlerts}
                        onChange={(e) => onUpdate('loginAlerts', e.target.checked)}
                    />
                </div>

                {/* Change Password */}
                <div className="p-4 bg-base-200/30 rounded-xl">
                    <button 
                        className="btn btn-ghost btn-sm gap-2"
                        onClick={() => setShowChangePassword(!showChangePassword)}
                    >
                        <RiLockLine className="h-4 w-4" />
                        Change Password
                    </button>
                    
                    {showChangePassword && (
                        <div className="mt-4 space-y-3">
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    className="input input-bordered w-full pr-24"
                                    placeholder="Current password"
                                />
                            </div>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    className="input input-bordered w-full pr-24"
                                    placeholder="New password"
                                />
                                <button 
                                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <RiEyeOffLine className="h-4 w-4" /> : <RiEyeLine className="h-4 w-4" />}
                                </button>
                            </div>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    className="input input-bordered w-full pr-24"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-primary btn-sm">Update Password</button>
                                <button 
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => setShowChangePassword(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}