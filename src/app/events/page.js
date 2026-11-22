"use client";
import React, { useState, useEffect } from 'react';
import { Search, Calendar, ArrowRight, X, Clock, Pin } from 'lucide-react';
import { EVENTS, CATEGORIES, COLORS } from '../../data/gdgData';
import { buildGoogleCalendarUrl } from '../../utils/calendar';

const Pill = ({ color, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
    <i className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
    {children}
  </span>
);

const Chip = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 ${active
      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
      : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 hover:border-slate-500'
      }`}
  >
    {children}
  </button>
);

const card = "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/75 backdrop-blur";

export default function EventsPage() {
  const [filter, setFilter] = useState('all');
  const [upcoming, setUpcoming] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  const filtered = EVENTS.filter(
    (e) =>
      (upcoming ? Boolean(e.up) : !e.up) &&
      (filter === 'all' || e.cat === filter) &&
      (e.t + e.tag.join(' ')).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-10">
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Events</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Hackathons, Study Jams and sessions from GDG on Campus RVCE.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Time" className="inline-flex rounded-full border border-slate-300 dark:border-slate-700 p-1 bg-white/70 dark:bg-slate-900/60">
          {[
            [true, 'Upcoming'],
            [false, 'Past'],
          ].map(([val, label]) => (
            <button
              key={label}
              onClick={() => setUpcoming(val)}
              aria-pressed={upcoming === val}
              className={`rounded-full px-4 py-1 text-sm font-medium transition ${upcoming === val ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : ''
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="relative flex-1 min-w-[180px] max-w-xs">
          <span className="sr-only">Search events</span>
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events"
            className="w-full rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 pl-9 pr-4 py-2 text-sm"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          ['all', 'All'],
          ['hack', 'Hackathons'],
          ['work', 'Workshops & Study Jams'],
          ['talk', 'Speaker Sessions'],
        ].map(([k, l]) => (
          <Chip key={k} active={filter === k} onClick={() => setFilter(k)}>
            {l}
          </Chip>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((e) => (
          <button
            key={e.id}
            onClick={() => setModal(e)}
            className={`${card} text-left overflow-hidden transition hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="h-2" style={{ background: e.c }} />
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <Pill color={e.c}>{CATEGORIES[e.cat]}</Pill>
                <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {e.d}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold leading-snug">{e.t}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{e.ds}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {e.tag.map((t) => (
                  <span key={t} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No events match. Try another filter or switch between Upcoming and Past.
        </p>
      )}

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/60"
          onClick={() => setModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={modal.t}
            onClick={(e) => e.stopPropagation()}
            className="pop w-full max-w-lg max-h-[92vh] overflow-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="h-3" style={{ background: modal.c }} />
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Pill color={modal.c}>{CATEGORIES[modal.cat]}</Pill>
                  <Pill color={modal.up ? COLORS.g : COLORS.y}>{modal.up ? 'Upcoming' : 'Past'}</Pill>
                </div>
                <button
                  onClick={() => setModal(null)}
                  aria-label="Close"
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold leading-tight">{modal.t}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{modal.ds}</p>
              <dl className="mt-5 grid gap-3 text-sm">
                {[
                  [Calendar, 'Date', modal.d],
                  [Clock, 'Time', modal.tm],
                  [Pin, 'Venue', modal.v],
                ].map(([IconComp, l, v]) => (
                  <div key={l} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
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
                {modal.tag.map((t) => (
                  <span key={t} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={buildGoogleCalendarUrl(modal)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-full py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: COLORS.b }}
              >
                {modal.up ? 'Add to Google Calendar' : 'Save Event to Calendar'} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}