"use client";
import React, { useState } from 'react';
import { Sparkles, Check, Share2, Download, QrCode } from 'lucide-react';
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

    const updateTilt = (clientX, clientY, rect) => {
        const x = ((clientX - rect.left) / rect.width - 0.5) * 16;
        const y = ((clientY - rect.top) / rect.height - 0.5) * -16;
        setTilt({ x, y });
    };

    const handleMouseMove = (e) => {
        updateTilt(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
    };

    const handleTouchMove = (e) => {
        if (!e.touches?.[0]) return;
        updateTilt(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget.getBoundingClientRect());
    };

    const handleShare = async () => {
        const shareData = {
            title: 'GDG on Campus RVCE — Builder Pass',
            text: `I just minted my GDG on Campus RVCE Developer Pass (${track.name} Track)!`,
            url: 'https://gdg-rvce-website.vercel.app',
        };

        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch {
                // User cancelled or share unavailable; fall back to clipboard
            }
        }

        navigator.clipboard?.writeText(`${shareData.text} — ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadPng = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 660;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Dark sleek card background
        const grad = ctx.createLinearGradient(0, 0, 1080, 660);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(0.5, '#020617');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(0, 0, 1080, 660, 48);
        ctx.fill();

        // Subtle card border
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(2, 2, 1076, 656, 48);
        ctx.stroke();

        // Google 4-color top bars
        const barColors = [COLORS.b, COLORS.r, COLORS.y, COLORS.g];
        const barWidth = (1080 - 120 - 45) / 4;
        barColors.forEach((c, i) => {
            ctx.fillStyle = c;
            ctx.beginPath();
            ctx.roundRect(60 + i * (barWidth + 15), 54, barWidth, 12, 6);
            ctx.fill();
        });

        // Header text
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
        ctx.fillText('GDG ON CAMPUS', 60, 130);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 28px system-ui, -apple-system, sans-serif';
        ctx.fillText('RV College of Engineering', 60, 168);

        // Track code pill
        ctx.fillStyle = track.color;
        ctx.beginPath();
        ctx.roundRect(850, 112, 170, 48, 24);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(track.code, 935, 144);
        ctx.textAlign = 'left';

        // Builder Pass Label & Name
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
        ctx.fillText('BUILDER PASS', 60, 290);

        const displayName = (name.trim() || 'RVCE Developer').slice(0, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px system-ui, -apple-system, sans-serif';
        ctx.fillText(displayName, 60, 368);

        // Track dot + name
        ctx.fillStyle = track.color;
        ctx.beginPath();
        ctx.arc(72, 422, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '600 30px system-ui, -apple-system, sans-serif';
        ctx.fillText(track.name, 96, 432);

        // Divider + Footer
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, 535);
        ctx.lineTo(1020, 535);
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 22px system-ui, -apple-system, sans-serif';
        ctx.fillText('BENGALURU · 2026–27', 60, 595);
        ctx.textAlign = 'right';
        ctx.fillText('gdg-rvce-website.vercel.app', 1020, 595);

        const link = document.createElement('a');
        link.download = `GDG-RVCE-Pass-${displayName.replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <section id="developer-pass" className="mt-16 scroll-mt-24">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/75 backdrop-blur p-5 sm:p-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Controls */}
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs font-medium">
                            <Sparkles className="w-3.5 h-3.5" style={{ color: track.color }} />
                            Interactive Builder Pass
                        </span>
                        <h2 className="mt-4 text-2xl sm:text-3xl font-bold">Mint your GDG RVCE Pass</h2>
                        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                            Customize your campus developer badge, tilt it with your cursor or thumb, and download or share your pass.
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
                                    className="w-full min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-base sm:text-sm font-medium outline-none focus:border-slate-500"
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
                                            className={`min-h-[40px] rounded-full border px-3.5 py-2 text-xs font-semibold transition active:scale-95 ${track.name === t.name
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

                            <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={handleDownloadPng}
                                    className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition active:scale-95 hover:-translate-y-0.5 hover:shadow-lg"
                                    style={{ background: track.color === COLORS.y ? '#d97706' : track.color }}
                                >
                                    <Download className="w-4 h-4" />
                                    Download PNG
                                </button>

                                <button
                                    type="button"
                                    onClick={handleShare}
                                    className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold transition active:scale-95 hover:border-slate-500"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                    {copied ? 'Badge Invite Copied!' : 'Share Pass'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right 3D Interactive Card (Mouse + Mobile Touch) */}
                    <div className="flex flex-col items-center" style={{ perspective: '1000px' }}>
                        <div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={() => setTilt({ x: 0, y: 0 })}
                            style={{
                                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                                transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.4s ease' : 'transform 0.08s ease-out',
                                touchAction: 'none',
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
                        <span className="mt-3 text-[11px] text-slate-400 sm:hidden">
                            Drag finger across card to tilt in 3D
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}