"use client";
import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { TEAM } from '../../data/gdgData';

const Pill = ({ color, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
    <i className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
    {children}
  </span>
);

const Chip = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${active
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
  const categories = [
    ['all', 'All'],
    ['org', 'Organizers'],
    ['ai', 'AI/ML & Cloud'],
    ['dev', 'Dev & Open Source'],
    ['cp', 'CP & Cybersecurity'],
    ['res', 'Research & Events'],
  ];

  const filtered = TEAM.filter((m) => filter === 'all' || m[2] === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Meet the team</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Student organizers and domain leads powering GDG on Campus RVCE.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map(([k, l]) => (
            <Chip key={k} active={filter === k} onClick={() => setFilter(k)}>
              {l}
            </Chip>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(([name, role, group, vertical, color]) => (
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
                aria-label="avatar placeholder"
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
              <div className="mt-4 flex justify-center gap-2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`${name} GitHub`}
                  className="p-2 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`${name} LinkedIn`}
                  className="p-2 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}