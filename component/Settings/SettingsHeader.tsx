'use client';

import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

export default function SettingsHeader() {
    return (
        <div className="flex items-center gap-4">
            <Link 
                href="/" 
                className="btn btn-ghost btn-sm btn-square"
                aria-label="Go back"
            >
                <RiArrowLeftLine className="h-5 w-5" />
            </Link>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-sm text-base-content/50">Manage your account preferences</p>
            </div>
        </div>
    );
}