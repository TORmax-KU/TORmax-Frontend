'use client';

import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

export default function SettingsHeader() {
    return (
        <div className="flex items-center gap-5">
            <Link 
                href="/" 
                className="group flex items-center justify-center h-11 w-11 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/80 dark:border-white/10 text-[#6a509a] dark:text-[#ad96cc] hover:bg-[#6a509a] hover:text-white dark:hover:bg-[#ad96cc] dark:hover:text-[#352b33] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                aria-label="Go back"
            >
                <RiArrowLeftLine className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </Link>
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-[#352b33] dark:text-[#e6e6e6]">
                    Settings
                </h1>
                <p className="text-sm font-medium text-[#91868e] dark:text-[#d3d3df]/70 mt-0.5">
                    Preferences & System Controls
                </p>
            </div>
        </div>
    );
}