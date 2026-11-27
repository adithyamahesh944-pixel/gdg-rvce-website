import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { COLORS } from '../data/gdgData';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-12 px-4">
            <div className="flex items-center gap-2 mb-6" aria-hidden="true">
                {[COLORS.b, COLORS.r, COLORS.y, COLORS.g].map((c) => (
                    <span key={c} className="w-3.5 h-3.5 rounded-full" style={{ background: c }} />
                ))}
            </div>

            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight">404</h1>
            <p className="mt-3 text-xl sm:text-2xl font-semibold">Page not found</p>
            <p className="mt-2 max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Looks like this route isn't on the GDG RVCE map yet. Jump back home or explore upcoming campus events.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                    href="/"
                    className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition active:scale-95 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: COLORS.b }}
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <Link
                    href="/events"
                    className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 transition active:scale-95 hover:-translate-y-0.5"
                >
                    <Calendar className="w-4 h-4" /> Browse Events
                </Link>
            </div>
        </div>
    );
}