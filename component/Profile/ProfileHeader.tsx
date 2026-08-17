'use client';

import { UserProfile } from "@/interface/UserProfile/UserProfile";
import { RiEditLine, RiSaveLine, RiCloseLine, RiShareLine, RiMapPinLine } from "@remixicon/react";
import Image from "next/image";
import { useState } from "react";

interface ProfileHeaderProps {
    profile: UserProfile;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    onUpdate?: (field: string, value: string) => void;
}

export default function ProfileHeader({ 
    profile, 
    isEditing, 
    setIsEditing,
    onUpdate 
}: ProfileHeaderProps) {
    const [editTitle, setEditTitle] = useState(profile.title);

    const handleSave = () => {
        if (onUpdate && editTitle !== profile.title) {
            onUpdate('title', editTitle);
        }
        setIsEditing(false);
    };

    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {profile.avatar ? (
                            <Image src={profile.avatar} alt={profile.name} width={96} height={96} className="object-cover" />
                        ) : (
                            <span className="text-3xl font-bold text-primary">
                                {profile.name.charAt(0)}
                            </span>
                        )}
                    </div>
                    <button className="absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary">
                        <RiEditLine className="h-4 w-4" />
                    </button>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-2xl font-bold">{profile.name}</h1>
                        {/* Edit mode for title */}
                        {isEditing ? (
                            <input 
                                type="text" 
                                className="input input-bordered input-sm max-w-xs"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Your title..."
                            />
                        ) : (
                            <span className="badge badge-primary">{profile.title}</span>
                        )}
                    </div>
                    <p className="text-sm text-base-content/60">{profile.company}</p>
                    <p className="text-sm text-base-content/60 flex items-center gap-1 mt-1">
                        <RiMapPinLine className="h-4 w-4" />
                        {profile.location}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button 
                                className="btn btn-success btn-sm gap-1"
                                onClick={handleSave}
                            >
                                <RiSaveLine className="h-4 w-4" />
                                Save
                            </button>
                            <button 
                                className="btn btn-ghost btn-sm gap-1"
                                onClick={() => {
                                    setEditTitle(profile.title);
                                    setIsEditing(false);
                                }}
                            >
                                <RiCloseLine className="h-4 w-4" />
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button 
                            className="btn btn-primary btn-sm gap-1"
                            onClick={() => setIsEditing(true)}
                        >
                            <RiEditLine className="h-4 w-4" />
                            Edit Profile
                        </button>
                    )}
                    <button className="btn btn-ghost btn-sm btn-square">
                        <RiShareLine className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}