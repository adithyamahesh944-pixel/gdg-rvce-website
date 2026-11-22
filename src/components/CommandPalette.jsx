"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, Calendar, Users, Sparkles, SunMoon, Check, Copy, ArrowRight } from 'lucide-react';
import { EVENTS, TEAM, COLORS } from '../data/gdgData';

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((prev) => !prev);
            } else if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        const onOpenEvent = () => setOpen(true);

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('gdg-open-palette', onOpenEvent);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('gdg-open-palette', onOpenEvent);
        };
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    const toggleTheme = () => {
        window.dispatchEvent(new Event('gdg-toggle-theme'));
        setOpen(false);
    };

    const copyClubUrl = () => {
        navigator.clipboard?.writeText('https://gdg-rvce-website.vercel.app');
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
            setOpen(false);
        }, 800);
    };

    const actions = [
        { id: 'home', label: 'Go to Home', group: 'Navigation', icon: Home, color: COLORS.b, run: () => router.push('/') },
        { id: 'events', label: 'Browse All Events & Hackathons', group: 'Navigation', icon: Calendar, color: COLORS.r, run: () => router.push('/events') },
        { id: 'team', label: 'Meet the Core Team', group: 'Navigation', icon: Users, color: COLORS.g, run: () => router.push('/team') },
        { id: 'pass', label: 'Mint Your GDG RVCE Builder Pass', group: 'Interactive', icon: Sparkles, color: COLORS.y, run: () => router.push('/#developer-pass') },
        { id: 'theme', label: 'Toggle Light / Dark Mode', group: 'Quick Actions', icon: SunMoon, color: COLORS.b, run: toggleTheme },
        { id: 'copy', label: copied ? 'Copied Live URL!' : 'Copy Website Link', group: 'Quick Actions', icon: copied ? Check : Copy, color: COLORS.g, run: copyClubUrl },
        ...EVENTS.map((ev) => ({
            id: `ev-${ev.id}`,
            label: `${ev.t} (${ev.d})`,
            group: `Event · ${ev.v}`,
            icon: Calendar,
            color: ev.c,
            run: () => router.push('/events'),
        })),
        ...TEAM.map(([name, role, , vertical, color]) => ({
            id: `tm-${name}`,
            label: `${name} — ${role}`,
            group: `Team · ${vertical}`,
            icon: Users,
            color,
            run: () => router.push('/team'),
        })),
    ];

    const filtered = actions.filter((item) =>
        (item.label + ' ' + item.group).toLowerCase().includes(query.toLowerCase())
    );

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setOpen(false)}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Command Palette"
                onClick={(e) => e.stopPropagation()}
                className="pop w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl"
            >
                <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search events, team leads, or commands..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                    <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] text-slate-500">ESC</kbd>
                </div>

                <div className="max-h-80 overflow-y-auto p-2">
                    {filtered.length === 0 ? (
                        <p className="py-8 text-center text-sm text-slate-500">No matching commands found.</p>
                    ) : (
                        filtered.map((item) => {
                            const IconComp = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        item.run();
                                        if (item.id !== 'copy') setOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800/80"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                                            style={{ background: item.color }}
                                        >
                                            <IconComp className="w-3.5 h-3.5" />
                                        </span>
                                        <div className="truncate">
                                            <div className="font-medium truncate">{item.label}</div>
                                            <div className="text-[11px] text-slate-500 truncate">{item.group}</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}