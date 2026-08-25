'use client';

import React from "react";
import { UserSettings } from "@/interface/settings";
import { RiShieldLine, RiEyeLine, RiMailLine, RiPhoneLine, RiDeleteBin7Line } from "@remixicon/react";

interface PrivacySettingsProps {
  settings: UserSettings;
  onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function PrivacySettings({ settings, onUpdate }: PrivacySettingsProps) {
  return (
    <React.Fragment>
      {/* Header Section with Subdued Grey Surface Separation */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
          <RiShieldLine className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Privacy & Visibility</h2>
          <p className="text-sm text-slate-500">Control data exposure and manage public profile scope</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Profile Visibility Dropdown Card */}
        <div className="p-5 bg-slate-50/60 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <RiEyeLine className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Public Profile Visibility</p>
              <p className="text-xs text-slate-500">Select who can view your profile metrics</p>
            </div>
          </div>
          <select 
            className="bg-white border border-indigo-500 text-slate-900 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            value={settings.profileVisibility}
            onChange={(e) => onUpdate('profileVisibility', e.target.value as UserSettings['profileVisibility'])}
          >
            <option value="public" className="bg-white text-slate-900">Public (Everyone)</option>
            <option value="employers" className="bg-white text-slate-900">Verified Employers Only</option>
            <option value="private" className="bg-white text-slate-900">Strictly Private</option>
          </select>
        </div>

        {/* Contact Field Toggles */}
        {[
          { key: 'showEmail' as const, label: 'Expose Email Address', icon: RiMailLine },
          { key: 'showPhone' as const, label: 'Expose Phone Number', icon: RiPhoneLine },
        ].map((item) => {
          const Icon = item.icon;
          const isEnabled = settings[item.key];
          return (
            <div 
              key={item.key} 
              className="p-4 bg-slate-50/60 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              </div>
              <button
                onClick={() => onUpdate(item.key, !isEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  isEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  isEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          );
        })}

        {/* Danger Zone */}
        <div className="mt-8 border-t border-rose-200 pt-6">
          <div className="p-5 bg-rose-50/50 border border-rose-200/80 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-rose-700">Purge Account Data</p>
              <p className="text-xs text-rose-600/80 mt-1">Permanently erase profile settings and associated metadata.</p>
            </div>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm">
              <RiDeleteBin7Line className="h-4 w-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}