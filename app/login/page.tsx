'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RiArrowDownSLine } from '@remixicon/react';
import LogoSignature from '@/component/LogoSignature';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export default function GoogleLoginPage() {
    return <Suspense fallback={<div className="p-10 text-center">Loading...</div>}><GoogleLoginContent /></Suspense>;
}

function GoogleLoginContent() {
    const { lang, toggleLanguage } = useApp();
    const { user, isLoading: isAuthLoading, loginWithGoogle, loginWithPassword, register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [realName, setRealName] = useState('');
    const [role, setRole] = useState<'Vendor' | 'JobLister'>('Vendor');
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const th = lang === 'TH';
    const isSignup = mode === 'signup';
    const router = useRouter();
    const searchParams = useSearchParams();
    const authFailed = searchParams.get('error') === 'auth_failed';

    // Already signed in: skip the login screen entirely
    useEffect(() => {
        if (!isAuthLoading && user) {
            router.replace('/');
        }
    }, [isAuthLoading, user, router]);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        loginWithGoogle();
    };

    // On success the context sets `user`, and the effect above redirects home.
    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormError('');
        setIsSubmitting(true);
        try {
            if (isSignup) {
                await register({ email, password, realName, role });
            } else {
                await loginWithPassword(email, password);
            }
        } catch (error) {
            setFormError(error instanceof Error ? error.message : String(error));
            setIsSubmitting(false);
        }
    };

    const switchMode = () => {
        setMode(isSignup ? 'signin' : 'signup');
        setFormError('');
    };

    const inputClass =
        'w-full h-12 px-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200';
    const labelClass = 'block mb-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-800 dark:text-slate-100 antialiased selection:bg-blue-500 selection:text-white transition-colors duration-300 relative">


            {/* Decorative background glow elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Main Container */}
            <div className="relative w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center text-center transition-all duration-300">

                {/* Brand/Product Identity */}
                <div className="flex items-center mb-5">
                    <LogoSignature />
                </div>

                {/* Heading Section */}
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                    {isSignup
                        ? (th ? 'สร้างบัญชีของคุณ' : 'Create your account')
                        : (th ? 'ยินดีต้อนรับกลับเข้าสู่ระบบ' : 'Welcome back')}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
                    {lang === 'TH'
                        ? 'เข้าสู่ระบบเพื่อเข้าใช้งานพื้นที่ทำงาน TORmax และระบบวิเคราะห์คุณสมบัติ'
                        : 'Sign in to access your TORmax workspace and qualification engine.'}
                </p>

                {authFailed && (
                    <p className="w-full mb-4 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-600 bg-rose-500/10 border border-rose-500/20">
                        {lang === 'TH'
                            ? 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
                            : 'Sign-in failed. Please try again.'}
                    </p>
                )}

                {/* Google OAuth Action Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="relative w-full h-12 flex items-center justify-center gap-3 px-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99] transition-all duration-200 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-slate-500 dark:text-slate-400">
                                {lang === 'TH' ? 'กำลังยืนยันตัวตน...' : 'Authenticating...'}
                            </span>
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
                            <span>
                                {lang === 'TH' ? 'ดำเนินการต่อด้วย Google' : 'Continue with Google'}
                            </span>
                        </>
                    )}
                </button>

                {/* Scope / Terms Notice */}
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    {lang === 'TH' ? (
                        <>
                            หากดำเนินการต่อด้วย Google ระบบจะแชร์ชื่อ อีเมล การตั้งค่าภาษา และรูปโปรไฟล์ของคุณกับ{' '}
                            <span className="font-semibold text-slate-700 dark:text-slate-300">TORmax</span>
                        </>
                    ) : (
                        <>
                            If you continue with Google, it will share your name, email address, language preference, and profile picture with{' '}
                            <span className="font-semibold text-slate-700 dark:text-slate-300">TORmax</span>.
                        </>
                    )}
                </p>

                {/* Visual Divider */}
                <div className="w-full flex items-center my-6 gap-3">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {th ? 'หรือใช้อีเมล' : 'or use email'}
                    </span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Email / Password Form (FR-01) */}
                <form onSubmit={handlePasswordSubmit} className="w-full space-y-4 text-left">
                    {isSignup && (
                        <div>
                            <label htmlFor="realName" className={labelClass}>
                                {th ? 'ชื่อ-นามสกุล' : 'Full name'}
                            </label>
                            <input
                                id="realName"
                                type="text"
                                autoComplete="name"
                                value={realName}
                                onChange={(e) => setRealName(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className={labelClass}>
                            {th ? 'อีเมล' : 'Email'}
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className={labelClass}>
                            {th ? 'รหัสผ่าน' : 'Password'}
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            minLength={isSignup ? 8 : undefined}
                            autoComplete={isSignup ? 'new-password' : 'current-password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClass}
                        />
                        {isSignup && (
                            <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                                {th ? 'อย่างน้อย 8 ตัวอักษร' : 'At least 8 characters'}
                            </p>
                        )}
                    </div>

                    {isSignup && (
                        <fieldset>
                            <legend className={labelClass}>{th ? 'ประเภทบัญชี' : 'Account type'}</legend>
                            <div className="grid grid-cols-2 gap-2">
                                {([
                                    ['Vendor', th ? 'ผู้ให้บริการ' : 'Vendor', th ? 'ค้นหางาน TOR' : 'Find TOR opportunities'],
                                    ['JobLister', th ? 'ผู้ประกาศงาน' : 'Job Lister', th ? 'ประกาศงานด้าน IT' : 'Post IT projects'],
                                ] as const).map(([value, title, desc]) => (
                                    <label
                                        key={value}
                                        className={`cursor-pointer rounded-2xl border p-3 transition-all duration-200 ${role === value
                                            ? 'border-blue-500 bg-blue-500/5 ring-4 ring-blue-500/10'
                                            : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={value}
                                            checked={role === value}
                                            onChange={() => setRole(value)}
                                            className="sr-only"
                                        />
                                        <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</span>
                                        <span className="block text-[11px] text-slate-500 dark:text-slate-400">{desc}</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    )}

                    {formError && (
                        <p role="alert" className="px-4 py-2.5 rounded-xl text-xs font-medium text-rose-600 bg-rose-500/10 border border-rose-500/20">
                            {formError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-[0.99] transition-all duration-200 text-sm font-semibold text-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {isSignup ? (th ? 'สร้างบัญชี' : 'Create account') : (th ? 'เข้าสู่ระบบ' : 'Sign in')}
                    </button>
                </form>

                <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                    {isSignup ? (th ? 'มีบัญชีอยู่แล้ว?' : 'Already have an account?') : (th ? 'ยังไม่มีบัญชี?' : "Don't have an account?")}{' '}
                    <button type="button" onClick={switchMode} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        {isSignup ? (th ? 'เข้าสู่ระบบ' : 'Sign in') : (th ? 'สมัครสมาชิก' : 'Sign up')}
                    </button>
                </p>
            </div>

            {/* Footer Controls */}
            <footer className="w-full max-w-md mt-8 flex justify-between items-center px-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="relative">
                    <select
                        value={lang.toLowerCase()}
                        onChange={(e) => {
                            if (e.target.value.toUpperCase() !== lang) {
                                toggleLanguage();
                            }
                        }}
                        className="bg-transparent hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none cursor-pointer pr-4 appearance-none"
                    >
                        <option value="en" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                            English (United States)
                        </option>
                        <option value="th" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                            ไทย (Thai)
                        </option>
                    </select>
                    <RiArrowDownSLine size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                        {lang === 'TH' ? 'ช่วยเหลือ' : 'Help'}
                    </a>
                    <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                        {lang === 'TH' ? 'ความเป็นส่วนตัว' : 'Privacy'}
                    </a>
                    <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                        {lang === 'TH' ? 'ข้อกำหนด' : 'Terms'}
                    </a>
                </div>
            </footer>
        </div>
    );
}
