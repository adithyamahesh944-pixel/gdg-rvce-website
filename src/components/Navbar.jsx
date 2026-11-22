"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
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
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/85 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
        <Link href="/" className="flex items-center gap-2.5" aria-label="GDG on Campus RVCE (placeholder logo)">
          <span className="flex gap-0.5">
            {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((c) => (
              <i key={c} className="w-2.5 h-5 rounded-full first:-rotate-12 last:rotate-12" style={{ background: c }} />
            ))}
          </span>
          <span className="font-bold leading-tight text-sm sm:text-base">
            GDG on Campus
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">RVCE</span>
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
                className={`flex-1 sm:flex-none text-center rounded-full px-5 py-1.5 text-sm font-semibold transition ${active
                    ? 'bg-white dark:bg-slate-700 shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setDark(!dark)}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="order-2 sm:order-3 p-2.5 rounded-full border border-slate-300 dark:border-slate-700 transition hover:rotate-12"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}