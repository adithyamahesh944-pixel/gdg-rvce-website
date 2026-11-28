"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initDark = stored ? stored === 'dark' : prefers;
    setDark(initDark);
    document.documentElement.classList.toggle('dark', initDark);

    const onExternalToggle = () => {
      setDark((prev) => {
        const next = !prev;
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
        return next;
      });
    };
    window.addEventListener('gdg-toggle-theme', onExternalToggle);
    return () => window.removeEventListener('gdg-toggle-theme', onExternalToggle);
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/85 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
        <Link href="/" className="flex items-center gap-2.5 min-h-[44px]" aria-label="GDG on Campus RVCE">
          <span className="flex gap-0.5 shrink-0">
            {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((c) => (
              <i key={c} className="w-2.5 h-5 rounded-full first:-rotate-12 last:rotate-12" style={{ background: c }} />
            ))}
          </span>
          <span className="font-bold leading-tight text-sm sm:text-base">
            GDG on Campus
            <span className="block text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">RVCE</span>
          </span>
        </Link>

        <nav aria-label="Main" className="order-3 sm:order-2 w-full sm:w-auto flex gap-1 rounded-full bg-slate-100 dark:bg-slate-900 p-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex-1 sm:flex-none min-h-[38px] flex items-center justify-center rounded-full px-4 sm:px-5 py-1.5 text-sm font-semibold transition active:scale-95 ${active
                    ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="order-2 sm:order-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('gdg-open-palette'))}
            aria-label="Open quick search"
            className="min-h-[44px] min-w-[44px] sm:min-h-[38px] sm:min-w-0 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 transition active:scale-95 hover:border-slate-500"
          >
            <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden sm:inline-block rounded bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold border border-slate-200 dark:border-slate-700">
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="min-h-[44px] min-w-[44px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 transition active:scale-95 hover:rotate-12"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}