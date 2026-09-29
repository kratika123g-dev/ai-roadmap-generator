import { Loader2 } from 'lucide-react';

export default function Loader({ label = 'Generating your roadmap…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center animate-fade">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-btn" style={{ animation: 'pulseGlow 2s ease infinite' }}>
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </span>
      <div>
        <p className="text-lg font-semibold text-[var(--color-text)]">{label}</p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Tailoring topics, tasks and practice to your inputs…
        </p>
      </div>
    </div>
  );
}
