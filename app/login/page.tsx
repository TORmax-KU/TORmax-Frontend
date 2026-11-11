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

    const inputClass = 'ui-field h-11';
    const labelClass = 'ui-label mb-1.5';

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 sm:p-6 text-ink relative">

            {/* Main Container */}
            <div className="relative w-full max-w-[26rem] ui-card rounded-panel p-7 sm:p-10 shadow-raised flex flex-col items-center text-center">

                {/* Brand/Product Identity */}
                <div className="flex items-center mb-6">
                    <LogoSignature />
                </div>

                {/* Heading Section */}
                <h1 className="text-2xl font-semibold tracking-[-0.02em] text-ink mb-2">
                    {isSignup
                        ? (th ? 'สร้างบัญชีของคุณ' : 'Create your account')
                        : (th ? 'ยินดีต้อนรับกลับเข้าสู่ระบบ' : 'Welcome back')}
                </h1>
                <p className="text-sm text-ink-3 mb-8 max-w-xs leading-relaxed">
                    {lang === 'TH'
                        ? 'เข้าสู่ระบบเพื่อเข้าใช้งานพื้นที่ทำงาน TORmax และระบบวิเคราะห์คุณสมบัติ'
                        : 'Sign in to access your TORmax workspace and qualification engine.'}
                </p>

                {authFailed && (
                    <p className="ui-alert ui-alert-danger w-full mb-4 text-left text-[13px]">
                        {lang === 'TH'
                            ? 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
                            : 'Sign-in failed. Please try again.'}
                    </p>
                )}

                {/* Google OAuth Action Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="ui-btn ui-btn-secondary w-full h-11 gap-3 group"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <span className="ui-spinner text-brand-soft" aria-hidden />
                            <span className="text-ink-3">
                                {lang === 'TH' ? 'กำลังยืนยันตัวตน...' : 'Authenticating...'}
                            </span>
                        </div>
                    ) : (
                        <>
                            <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24">
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
                <p className="mt-3 text-xs text-ink-3 leading-relaxed text-center">
                    {lang === 'TH' ? (
                        <>
                            หากดำเนินการต่อด้วย Google ระบบจะแชร์ชื่อ อีเมล การตั้งค่าภาษา และรูปโปรไฟล์ของคุณกับ{' '}
                            <span className="font-medium text-ink-2">TORmax</span>
                        </>
                    ) : (
                        <>
                            If you continue with Google, it will share your name, email address, language preference, and profile picture with{' '}
                            <span className="font-medium text-ink-2">TORmax</span>.
                        </>
                    )}
                </p>

                {/* Visual Divider */}
                <div className="w-full flex items-center my-7 gap-3">
                    <div className="flex-1 h-px bg-line" />
                    <span className="text-[11px] font-medium text-ink-4 uppercase tracking-[0.08em]">
                        {th ? 'หรือใช้อีเมล' : 'or use email'}
                    </span>
                    <div className="flex-1 h-px bg-line" />
                </div>

                {/* Email / Password Form (FR-01) */}
                <form onSubmit={handlePasswordSubmit} className="w-full space-y-4 text-left">
                    {isSignup && (
                        <div className="ui-reveal">
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
                            <p className="ui-hint mt-1.5">
                                {th ? 'อย่างน้อย 8 ตัวอักษร' : 'At least 8 characters'}
                            </p>
                        )}
                    </div>

                    {isSignup && (
                        <fieldset className="ui-reveal">
                            <legend className={labelClass}>{th ? 'ประเภทบัญชี' : 'Account type'}</legend>
                            <div className="grid grid-cols-2 gap-2">
                                {([
                                    ['Vendor', th ? 'ผู้ให้บริการ' : 'Vendor', th ? 'ค้นหางาน TOR' : 'Find TOR opportunities'],
                                    ['JobLister', th ? 'ผู้ประกาศงาน' : 'Job Lister', th ? 'ประกาศงานด้าน IT' : 'Post IT projects'],
                                ] as const).map(([value, title, desc]) => (
                                    <label
                                        key={value}
                                        className={`cursor-pointer rounded-control border p-3 transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--focus)] ${role === value
                                            ? 'border-brand-soft bg-brand-tint shadow-[0_0_0_3px_var(--brand-tint)]'
                                            : 'border-line-strong hover:bg-surface-2'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={value}
                                            checked={role === value}
                                            onChange={() => setRole(value)}
                                            className="sr-only"
                                        />
                                        <span className={`block text-sm font-medium ${role === value ? 'text-accent' : 'text-ink'}`}>{title}</span>
                                        <span className="block text-[11px] text-ink-3 mt-0.5">{desc}</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    )}

                    {formError && (
                        <p role="alert" className="ui-alert ui-alert-danger text-[13px]">
                            {formError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ui-btn ui-btn-primary w-full h-11 mt-2"
                    >
                        {isSubmitting && <span className="ui-spinner" aria-hidden />}
                        {isSignup ? (th ? 'สร้างบัญชี' : 'Create account') : (th ? 'เข้าสู่ระบบ' : 'Sign in')}
                    </button>
                </form>

                <p className="mt-6 text-[13px] text-ink-3">
                    {isSignup ? (th ? 'มีบัญชีอยู่แล้ว?' : 'Already have an account?') : (th ? 'ยังไม่มีบัญชี?' : "Don't have an account?")}{' '}
                    <button type="button" onClick={switchMode} className="ui-link cursor-pointer">
                        {isSignup ? (th ? 'เข้าสู่ระบบ' : 'Sign in') : (th ? 'สมัครสมาชิก' : 'Sign up')}
                    </button>
                </p>
            </div>

            {/* Footer Controls */}
            <footer className="w-full max-w-[26rem] mt-6 flex justify-between items-center px-2 text-xs text-ink-3">
                <div className="relative">
                    <select
                        value={lang.toLowerCase()}
                        onChange={(e) => {
                            if (e.target.value.toUpperCase() !== lang) {
                                toggleLanguage();
                            }
                        }}
                        className="bg-transparent hover:text-ink focus:outline-none cursor-pointer pr-4 appearance-none transition-colors"
                    >
                        <option value="en">
                            English (United States)
                        </option>
                        <option value="th">
                            ไทย (Thai)
                        </option>
                    </select>
                    <RiArrowDownSLine size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-ink transition-colors">
                        {lang === 'TH' ? 'ช่วยเหลือ' : 'Help'}
                    </a>
                    <a href="#" className="hover:text-ink transition-colors">
                        {lang === 'TH' ? 'ความเป็นส่วนตัว' : 'Privacy'}
                    </a>
                    <a href="#" className="hover:text-ink transition-colors">
                        {lang === 'TH' ? 'ข้อกำหนด' : 'Terms'}
                    </a>
                </div>
            </footer>
        </div>
    );
}
