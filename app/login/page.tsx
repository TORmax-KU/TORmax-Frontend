'use client';

import React, { useState } from 'react';

export default function GoogleLoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        // Replace this with your actual NextAuth / Firebase / OAuth logic
        // e.g., signIn('google', { callbackUrl: '/dashboard' });
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F0F4F9] dark:bg-[#131314] flex flex-col items-center justify-center p-4 text-[#1F1F1F] dark:text-[#E3E3E3] font-sans">
            {/* Main Card */}
            <div className="w-full max-w-md bg-white dark:bg-[#1E1E20] rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/60 dark:border-slate-800 flex flex-col items-center text-center">

                {/* Google Logo */}
                <div className="mb-6">
                    <svg className="w-10 h-10" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-normal tracking-tight mb-2">
                    Sign in
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
                    to continue to <span className="font-semibold text-slate-800 dark:text-slate-200">TORmax App</span>
                </p>

                {/* Primary Action Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full h-12 flex items-center justify-center gap-3 px-6 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E1E20] hover:bg-slate-50 dark:hover:bg-[#2A2A2D] focus:outline-none focus:ring-2 focus:ring-[#0B57D0] transition-colors text-sm font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </>
                    )}
                </button>

                {/* Divider */}
                <div className="w-full flex items-center my-6 gap-3">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    <span className="text-xs text-slate-400 font-medium">or</span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Subtext info */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                    To continue, Google will share your name, email address, language preference, and profile picture with TORmax.
                </p>
            </div>

            {/* Footer Links */}
            <footer className="w-full max-w-md mt-6 flex justify-between items-center px-4 text-xs text-slate-500 dark:text-slate-400">
                <select className="bg-transparent focus:outline-none cursor-pointer">
                    <option value="en">English (United States)</option>
                    <option value="th">ไทย (Thai)</option>
                </select>
                <div className="flex gap-4">
                    <a href="#" className="hover:underline">Help</a>
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Terms</a>
                </div>
            </footer>
        </div>
    );
}