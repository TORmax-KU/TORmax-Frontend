'use client';

import { useState } from 'react';
import LogoSignature from '@/component/LogoSignature';

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
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-800 dark:text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
            {/* Decorative background glow elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Main Container */}
            <div className="relative w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center text-center transition-all duration-300">

                {/* Brand/Product Identity */}
                <div className="flex items-center mb-5">
                    <LogoSignature/>
                </div>

                {/* Heading Section */}
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                    Welcome back
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
                    Sign in to access your TORmax workspace and qualification engine.
                </p>

                {/* Google OAuth Action Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="relative w-full h-12 flex items-center justify-center gap-3 px-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99] transition-all duration-200 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-slate-500 dark:text-slate-400">Authenticating...</span>
                        </div>
                    ) : (
                        <>
                            <svg className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
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

                {/* Visual Divider */}
                <div className="w-full flex items-center my-6 gap-3">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Protected by Google
                    </span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Scope / Terms Notice */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    By continuing, Google will share your name, email address, language preference, and profile picture with <span className="font-semibold text-slate-700 dark:text-slate-300">TORmax</span>.
                </p>
            </div>

            {/* Footer Controls */}
            <footer className="w-full max-w-md mt-8 flex justify-between items-center px-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="relative">
                    <select className="bg-transparent hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none cursor-pointer pr-4 appearance-none">
                        <option value="en" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">English (United States)</option>
                        <option value="th" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">ไทย (Thai)</option>
                    </select>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]">▼</span>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Help</a>
                    <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Terms</a>
                </div>
            </footer>
        </div>
    );
}