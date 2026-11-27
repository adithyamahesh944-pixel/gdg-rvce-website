"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Pin, X, Cpu, Cloud, Code, Trophy, Shield, FlaskConical, Palette } from 'lucide-react';
import { VERTICALS, MILESTONES, EVENTS, CATEGORIES, COLORS } from '../data/gdgData';
import MemberPass from '../components/MemberPass';
import { buildGoogleCalendarUrl } from '../utils/calendar';

const Pill = ({ color, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
    <i className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
    {children}
  </span>
);

const card = "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/75 backdrop-blur";

const ICONS = {
  cpu: Cpu,
  cloud: Cloud,
  code: Code,
  trophy: Trophy,
  shield: Shield,
  flask: FlaskConical,
  palette: Palette,
};

export default function Home() {
  const [modalEvent, setModalEvent] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const featured = EVENTS.find((e) => e.t === 'TechTank') || EVENTS[4] || EVENTS[0];

  useEffect(() => {
    if (!modalEvent) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setModalEvent(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modalEvent]);

  const updateHeroOffset = (clientX, clientY, rect) => {
    setMouse({
      x: ((clientX - rect.left) / rect.width - 0.5) * 24,
      y: ((clientY - rect.top) / rect.height - 0.5) * 24,
    });
  };

  const handleHeroMove = (e) => {
    updateHeroOffset(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  const handleHeroTouch = (e) => {
    if (!e.touches?.[0]) return;
    updateHeroOffset(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget.getBoundingClientRect());
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        onMouseMove={handleHeroMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        onTouchMove={handleHeroTouch}
        onTouchEnd={() => setMouse({ x: 0, y: 0 })}
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center py-8 sm:py-12 md:py-20">
          <div>
            <Pill color={COLORS.g}>Open community · RV College of Engineering</Pill>
            <h1 className="mt-4 sm:mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.06]">
              GDG on Campus<br />RVCE
            </h1>
            <p className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-semibold flex flex-wrap gap-x-3">
              <span style={{ color: COLORS.b }}>Learn.</span>
              <span style={{ color: COLORS.r }}>Build.</span>
              <span className="text-amber-600 dark:text-[#FBBC05]">Connect.</span>
            </p>
            <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400">
              A student-run developer community in Bengaluru. Study Jams, hackathons and sessions with people who like building things.
            </p>
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/team"
                className="group min-h-[48px] w-full sm:w-auto justify-center rounded-full px-6 py-3 font-semibold text-white transition active:scale-95 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
                style={{ background: COLORS.b }}
              >
                Join Community <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/events"
                className="min-h-[48px] w-full sm:w-auto flex items-center justify-center rounded-full px-6 py-3 font-semibold border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 transition active:scale-95 hover:-translate-y-0.5"
              >
                See events
              </Link>
            </div>
          </div>

          {/* Interactive Mouse & Touch-Reactive 5-Shape Composition */}
          <div className="relative h-56 sm:h-80" aria-hidden="true">
            <div
              className="fl absolute left-[8%] top-[8%] w-28 h-28 sm:w-44 sm:h-44 rounded-full transition-transform duration-200 ease-out"
              style={{ background: COLORS.b, transform: `translate(${mouse.x * 0.8}px, ${mouse.y * 0.8}px)` }}
            />
            <div
              className="fl absolute right-[10%] top-[2%] w-20 h-20 sm:w-32 sm:h-32 rounded-2xl transition-transform duration-200 ease-out"
              style={{ background: COLORS.r, '--r': '12deg', animationDelay: '-2s', transform: `translate(${-mouse.x * 1.1}px, ${mouse.y * 0.9}px)` }}
            />
            <div
              className="fl absolute left-[34%] bottom-[6%] w-24 h-24 sm:w-36 sm:h-36 transition-transform duration-200 ease-out"
              style={{ background: COLORS.y, clipPath: 'polygon(50% 0,100% 100%,0 100%)', animationDelay: '-4s', transform: `translate(${mouse.x * 1.2}px, ${-mouse.y * 1.1}px)` }}
            />
            <div
              className="fl absolute right-[8%] bottom-[14%] w-32 h-12 sm:w-48 sm:h-16 rounded-full transition-transform duration-200 ease-out"
              style={{ background: COLORS.g, '--r': '-14deg', animationDelay: '-1s', transform: `translate(${-mouse.x * 0.9}px, ${-mouse.y * 0.8}px)` }}
            />
            <div
              className="absolute left-[2%] bottom-[18%] w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-dashed border-slate-400 dark:border-slate-600 transition-transform duration-200 ease-out"
              style={{ transform: `translate(${mouse.x * 0.5}px, ${mouse.y * 0.5}px)` }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`${card} grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800`}>
        {[
          ['1,100+', 'Community Members', COLORS.b],
          ['7+', 'Technical & Creative Verticals', COLORS.r],
          ['Flagship', 'Hackathons & Study Jams', COLORS.g],
        ].map(([a, b, c]) => (
          <div key={b} className="p-5 sm:p-6 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold" style={{ borderBottom: `4px solid ${c}`, display: 'inline-block' }}>
              {a}
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{b}</div>
          </div>
        ))}
      </section>

      {/* Core verticals */}
      <section className="mt-14 sm:mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold">Core verticals</h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400">Pick a track and build with people who share it.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VERTICALS.map(([t, ic, c, d], idx) => {
            const Fallbacks = [Cpu, Cloud, Code, Trophy, Shield, FlaskConical, Palette];
            const IconComp = ICONS[ic] || Fallbacks[idx % Fallbacks.length];
            return (
              <div key={t} className={`${card} p-5 transition hover:-translate-y-1 hover:shadow-lg`}>
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl text-slate-900" style={{ background: c }}>
                  <IconComp className="w-5 h-5" />
                </span>
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured event */}
      {featured && (
        <section className="mt-14 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold">Featured event</h2>
          <button
            type="button"
            onClick={() => setModalEvent(featured)}
            className={`${card} mt-6 w-full text-left grid md:grid-cols-[1fr_auto] overflow-hidden transition active:scale-[0.99] hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="p-5 sm:p-8 border-l-8" style={{ borderColor: featured.c }}>
              <div className="flex flex-wrap gap-2">
                <Pill color={featured.c}>Upcoming</Pill>
                <Pill color={COLORS.y}>{CATEGORIES[featured.cat]}</Pill>
                <span className="md:hidden">
                  <Pill color={COLORS.b}>{featured.d}</Pill>
                </span>
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl font-bold">{featured.t}</h3>
              <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400">{featured.ds}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold">
                View details <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center px-12" aria-hidden="true">
              <div className="text-center">
                <div className="text-6xl font-bold" style={{ color: featured.c }}>
                  {featured.d.split(' ')[0]}
                </div>
                <div className="text-slate-500">{featured.d.split(' ')[1] || '2027'}</div>
              </div>
            </div>
          </button>
        </section>
      )}

      {/* Interactive 3D Developer Pass */}
      <MemberPass />

      {/* Milestones */}
      <section className="mt-14 sm:mt-16 mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Milestones</h2>
        <ol className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {MILESTONES.map(([y, t], i) => (
            <li key={y} className="relative pt-4 sm:pt-5 border-t-4" style={{ borderColor: [COLORS.b, COLORS.r, COLORS.y, COLORS.g][i % 4] }}>
              <div className="text-xl sm:text-2xl font-bold">{y}</div>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">{t}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Bottom-Sheet Modal on Mobile / Centered Modal on Desktop */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/60" onClick={() => setModalEvent(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={modalEvent.t}
            onClick={(e) => e.stopPropagation()}
            className="pop w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="h-3" style={{ background: modalEvent.c }} />
            <div className="sm:hidden flex justify-center pt-2.5">
              <span className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="p-5 sm:p-8 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Pill color={modalEvent.c}>{CATEGORIES[modalEvent.cat]}</Pill>
                  <Pill color={modalEvent.up ? COLORS.g : COLORS.y}>{modalEvent.up ? 'Upcoming' : 'Past'}</Pill>
                </div>
                <button
                  type="button"
                  onClick={() => setModalEvent(null)}
                  aria-label="Close"
                  className="min-h-[44px] min-w-[44px] -mr-2 -mt-2 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold leading-tight">{modalEvent.t}</h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">{modalEvent.ds}</p>
              <dl className="mt-5 grid gap-3 text-sm">
                {[
                  [Calendar, 'Date', modalEvent.d],
                  [Clock, 'Time', modalEvent.tm],
                  [Pin, 'Venue', modalEvent.v],
                ].map(([IconComp, l, v]) => (
                  <div key={l} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <IconComp className="w-4 h-4" />
                    </span>
                    <div>
                      <dt className="text-xs text-slate-500">{l}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {modalEvent.tag.map((t) => (
                  <span key={t} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={buildGoogleCalendarUrl(modalEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 min-h-[48px] flex items-center justify-center gap-2 rounded-full py-3 font-semibold text-white transition active:scale-95 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: COLORS.b }}
              >
                {modalEvent.up ? 'Add to Google Calendar' : 'Save Event to Calendar'} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}