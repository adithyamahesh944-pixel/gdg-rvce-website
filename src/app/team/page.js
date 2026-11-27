"use client";
import React, { useState } from 'react';
import { Github, Linkedin, Search, X, Check } from 'lucide-react';
import { TEAM } from '../../data/gdgData';

const Pill = ({ color, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
    <i className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
    {children}
  </span>
);

const Chip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`min-h-[44px] shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition active:scale-95 hover:-translate-y-0.5 ${active
        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
        : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 hover:border-slate-500'
      }`}
  >
    {children}
  </button>
);

const card = "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/75 backdrop-blur";

export default function TeamPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const categories = [
    ['all', 'All'],
    ['org', 'Organizers'],
    ['ai', 'AI/ML & Cloud'],
    ['dev', 'Dev & Open Source'],
    ['cp', 'CP & Cybersecurity'],
    ['res', 'Research & Events'],
  ];

  const filtered = TEAM.filter(
    ([name, role, group, vertical]) =>
      (filter === 'all' || group === filter) &&
      `${name} ${role} ${vertical}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleProfileAction = async (name, platform) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const handle = `@${slug} · GDG on Campus RVCE (${platform})`;
    try {
      await navigator.clipboard?.writeText(handle);
    } catch {
      // Fallback silently if clipboard permission is blocked
    }
    const key = `${name}-${platform}`;
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 1800);
  };

  return (
    <div className="py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Meet the team</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Student organizers and domain leads powering GDG on Campus RVCE.
          </p>
        </div>

        <label className="relative w-full sm:max-w-xs">
          <span className="sr-only">Search team members</span>
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or vertical"
            className="min-h-[44px] w-full rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 pl-10 pr-10 py-2 text-base sm:text-sm outline-none focus:border-slate-500"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200/70 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </label>
      </div>

      <div className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 pb-1">
        {categories.map(([k, l]) => (
          <Chip key={k} active={filter === k} onClick={() => setFilter(k)}>
            {l}
          </Chip>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {filtered.map(([name, role, group, vertical, color]) => {
          const isCopied = copiedKey?.startsWith(`${name}-`);
          return (
            <article
              key={name}
              className={`${card} group relative overflow-hidden p-5 text-center transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <div
                className="absolute left-0 top-0 h-1.5 w-1/4 transition-all duration-300 group-hover:w-full"
                style={{ background: color }}
              />
              <div
                className="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-slate-900 transition group-hover:rotate-6"
                style={{ background: color }}
                aria-label={`${name} avatar`}
              >
                {name
                  .split(' ')
                  .filter((w) => !w.endsWith('.'))
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <h3 className="mt-4 font-bold">{name}</h3>
              <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                <span className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-0.5 text-xs font-semibold">
                  {role}
                </span>
                <Pill color={color}>{vertical}</Pill>
              </div>
              <div className="mt-4 flex justify-center items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleProfileAction(name, 'GitHub')}
                  aria-label={`Copy ${name} GitHub handle`}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
                >
                  {copiedKey === `${name}-GitHub` ? <Check className="w-4 h-4 text-emerald-500" /> : <Github className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleProfileAction(name, 'LinkedIn')}
                  aria-label={`Copy ${name} LinkedIn handle`}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
                >
                  {copiedKey === `${name}-LinkedIn` ? <Check className="w-4 h-4 text-emerald-500" /> : <Linkedin className="w-4 h-4" />}
                </button>
              </div>
              {isCopied && (
                <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Handle copied!
                </p>
              )}
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-slate-500">No team members match your filter.</p>
          <button
            type="button"
            onClick={() => {
              setFilter('all');
              setSearch('');
            }}
            className="mt-4 min-h-[44px] inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 px-5 py-2 text-sm font-medium transition active:scale-95 hover:border-slate-500"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}