"use client";
import React, { useState } from 'react';
import { Sparkles, Check, Share2, QrCode } from 'lucide-react';
import { COLORS } from '../data/gdgData';

const TRACKS = [
    { name: 'Web & Next.js', color: COLORS.b, code: 'WEB-01' },
    { name: 'AI & ML', color: COLORS.r, code: 'AIML-02' },
    { name: 'Cloud & DevOps', color: COLORS.g, code: 'CLD-03' },
    { name: 'Android & UI/UX', color: COLORS.y, code: 'APP-04' },
];

export default function MemberPass() {
    const [name, setName] = useState('Adithya M');
    const [track, setTrack] = useState(TRACKS[0]);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [copied, setCopied] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
        setTilt({ x, y });
    };

    const handleShare = () => {
        const text = `I just minted my GDG on Campus RVCE Developer Pass (${track.name} Track) — https://gdg-rvce-website.vercel.app`;
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="developer-pass" className="mt-16 scroll-mt-24">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/75 backdrop-blur p-6 sm:p-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Controls */}
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs font-medium">
                            <Sparkles className="w-3.5 h-3.5" style={{ color: track.color }} />
                            Interactive Builder Pass
                        </span>
                        <h2 className="mt-4 text-2xl sm:text-3xl font-bold">Mint your GDG RVCE Pass</h2>
                        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                            Customize your campus developer badge, preview the 3D card tilt, and share your track with fellow builders.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    maxLength={24}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm font-medium outline-none focus:border-slate-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Select Primary Track
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {TRACKS.map((t) => (
                                        <button
                                            key={t.name}
                                            type="button"
                                            onClick={() => setTrack(t)}
                                            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${track.name === t.name
                                                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                                                    : 'border-slate-300 dark:border-slate-700 hover:border-slate-500'
                                                }`}
                                        >
                                            <span
                                                className="inline-block w-2 h-2 rounded-full mr-1.5"
                                                style={{ background: t.color }}
                                            />
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleShare}
                                className="mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                                style={{ background: track.color === COLORS.y ? '#d97706' : track.color }}
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                {copied ? 'Badge Invite Copied!' : 'Copy Shareable Pass'}
                            </button>
                        </div>
                    </div>

                    {/* Right 3D Interactive Card */}
                    <div className="flex justify-center" style={{ perspective: '1000px' }}>
                        <div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                            style={{
                                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                                transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.4s ease' : 'transform 0.08s ease-out',
                            }}
                            className="relative w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-6 shadow-xl select-none cursor-grab"
                        >
                            {/* Google 4-color top bar */}
                            <div className="flex gap-1.5 mb-6">
                                <span className="h-1.5 flex-1 rounded-full" style={{ background: COLORS.b }} />
                                <span className="h-1.5 flex-1 rounded-full" style={{ background: COLORS.r }} />
                                <span className="h-1.5 flex-1 rounded-full" style={{ background: COLORS.y }} />
                                <span className="h-1.5 flex-1 rounded-full" style={{ background: COLORS.g }} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">GDG on Campus</div>
                                    <div className="text-sm font-semibold">RV College of Engineering</div>
                                </div>
                                <span
                                    className="rounded-full px-2.5 py-0.5 text-xs font-bold text-slate-900"
                                    style={{ background: track.color }}
                                >
                                    {track.code}
                                </span>
                            </div>

                            <div className="my-8">
                                <div className="text-xs text-slate-500">BUILDER PASS</div>
                                <div className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight truncate">
                                    {name.trim() || 'RVCE Developer'}
                                </div>
                                <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium" style={{ color: track.color === COLORS.y ? '#d97706' : track.color }}>
                                    ● {track.name}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                                <span>BENGALURU · 2026–27</span>
                                <QrCode className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}