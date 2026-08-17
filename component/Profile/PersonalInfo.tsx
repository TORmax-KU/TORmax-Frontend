'use client';

import { UserProfile } from "@/interface/UserProfile/UserProfile";
import { RiUserLine, RiMailLine, RiPhoneLine, RiMapPinLine } from "@remixicon/react";

interface PersonalInfoProps {
    profile: UserProfile;
    isEditing: boolean;
    onUpdate: (field: string, value: string) => void;
}

export default function PersonalInfo({ profile, isEditing, onUpdate }: PersonalInfoProps) {
    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <RiUserLine className="h-5 w-5 text-primary" />
                Personal Information
            </h3>
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                    <RiUserLine className="h-4 w-4 text-base-content/40" />
                    {isEditing ? (
                        <input 
                            type="text" 
                            className="input input-bordered input-sm flex-1" 
                            value={profile.name}
                            onChange={(e) => onUpdate('name', e.target.value)}
                        />
                    ) : (
                        <span>{profile.name}</span>
                    )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <RiMailLine className="h-4 w-4 text-base-content/40" />
                    {isEditing ? (
                        <input 
                            type="email" 
                            className="input input-bordered input-sm flex-1" 
                            value={profile.email}
                            onChange={(e) => onUpdate('email', e.target.value)}
                        />
                    ) : (
                        <span>{profile.email}</span>
                    )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <RiPhoneLine className="h-4 w-4 text-base-content/40" />
                    {isEditing ? (
                        <input 
                            type="tel" 
                            className="input input-bordered input-sm flex-1" 
                            value={profile.phone}
                            onChange={(e) => onUpdate('phone', e.target.value)}
                        />
                    ) : (
                        <span>{profile.phone}</span>
                    )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <RiMapPinLine className="h-4 w-4 text-base-content/40" />
                    {isEditing ? (
                        <input 
                            type="text" 
                            className="input input-bordered input-sm flex-1" 
                            value={profile.location}
                            onChange={(e) => onUpdate('location', e.target.value)}
                        />
                    ) : (
                        <span>{profile.location}</span>
                    )}
                </div>
            </div>
        </div>
    );
}