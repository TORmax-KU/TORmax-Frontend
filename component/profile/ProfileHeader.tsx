'use client';

interface ProfileHeaderProps {
  title: string;
  subtitle: string;
}

export function ProfileHeader({ title, subtitle }: ProfileHeaderProps) {
  return (
    <header className="bg-slate-900 text-white min-h-[220px] px-6 sm:px-8 py-10 flex flex-col justify-center border-b border-slate-800">
      <div className="max-w-5xl mx-auto w-full space-y-2">
        <h1 className="text-3xl font-black font-display text-white tracking-tight">
          {title}
        </h1>
        <p className="text-slate-300 text-xs font-medium">
          {subtitle}
        </p>
      </div>
    </header>
  );
}