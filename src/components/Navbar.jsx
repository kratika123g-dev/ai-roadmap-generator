import { Compass, Home, Map, TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';

const LINKS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'create', label: 'Create Roadmap', icon: Compass },
  { id: 'roadmap', label: 'My Roadmap', icon: Map },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

export default function Navbar({ current, onNavigate, hasRoadmap }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[#0a0e1a]/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2 text-left transition hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-btn">
            <Compass className="h-5 w-5 text-white" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold leading-tight text-[var(--color-text)]">
              AI Roadmap
            </span>
            <span className="block text-[11px] leading-tight text-[var(--color-text-muted)]">
              Generator
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const Icon = l.icon;
            const disabled = (l.id === 'roadmap' || l.id === 'progress') && !hasRoadmap;
            const active = current === l.id;
            return (
              <button
                key={l.id}
                onClick={() => !disabled && go(l.id)}
                disabled={disabled}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-[var(--color-surface-2)] text-white'
                    : disabled
                      ? 'cursor-not-allowed text-[var(--color-text-dim)]'
                      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {LINKS.map((l) => {
              const Icon = l.icon;
              const disabled = (l.id === 'roadmap' || l.id === 'progress') && !hasRoadmap;
              const active = current === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => !disabled && go(l.id)}
                  disabled={disabled}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? 'bg-[var(--color-surface-2)] text-white'
                      : disabled
                        ? 'cursor-not-allowed text-[var(--color-text-dim)]'
                        : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
