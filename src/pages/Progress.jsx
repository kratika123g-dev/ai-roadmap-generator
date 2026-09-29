import {
  TrendingUp, CheckCircle2, Circle, ListTodo, Target,
  Clock, Gauge, Calendar, ChevronRight, BookOpen, Compass,
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar.jsx';

export default function Progress({
  roadmap,
  inputs,
  completed,
  progress,
  onContinue,
  onNavigate,
}) {
  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center animate-fade">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-2)]">
          <TrendingUp className="h-7 w-7 text-[var(--color-text-dim)]" />
        </div>
        <p className="text-lg text-[var(--color-text-muted)]">No roadmap to track yet.</p>
        <button
          onClick={() => onNavigate('create')}
          className="mt-4 gradient-btn rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
        >
          Create a Roadmap
        </button>
      </div>
    );
  }

  const stats = [
    { label: 'Total Tasks', value: progress.total, icon: ListTodo, color: 'var(--color-primary)' },
    { label: 'Completed', value: progress.completed, icon: CheckCircle2, color: 'var(--color-success)' },
    { label: 'Remaining', value: progress.remaining, icon: Circle, color: 'var(--color-warning)' },
    { label: 'Progress', value: `${progress.percent}%`, icon: TrendingUp, color: 'var(--color-secondary)' },
  ];

  const next = firstIncomplete(roadmap, completed);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 animate-fade">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-btn">
          <TrendingUp className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">Your Progress</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Track your learning journey for <span className="text-[var(--color-text)]">{inputs?.topic}</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="card mb-6 p-6">
        <div className="mb-3 flex items-end justify-between">
          <span className="text-sm font-medium text-[var(--color-text-muted)]">Overall Progress</span>
          <span className="text-3xl font-bold gradient-text">{progress.percent}%</span>
        </div>
        <ProgressBar percent={progress.percent} />
        <div className="mt-2 flex justify-between text-xs text-[var(--color-text-dim)]">
          <span>{progress.completed} completed</span>
          <span>{progress.remaining} remaining</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4 stagger">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-4 text-center">
              <Icon className="mx-auto mb-2 h-6 w-6" style={{ color: s.color }} />
              <div className="text-2xl font-bold text-[var(--color-text)]">{s.value}</div>
              <div className="text-xs text-[var(--color-text-muted)]">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Plan summary */}
      <div className="card mb-6 p-5">
        <h2 className="mb-4 text-sm font-semibold text-[var(--color-text)]">Plan Details</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Detail icon={Target} label="Topic" value={inputs?.topic} />
          <Detail icon={Gauge} label="Level" value={inputs?.level} />
          <Detail icon={Clock} label="Time / day" value={`${inputs?.hoursPerDay} hrs`} />
          <Detail icon={Calendar} label="Duration" value={`${inputs?.duration} ${inputs?.durationUnit}`} />
        </div>
      </div>

      {/* Continue learning */}
      {next ? (
        <div className="card card-hover p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
            <Compass className="h-4 w-4" />
            Up Next
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm text-[var(--color-text-muted)]">{next.day}</div>
              <div className="truncate text-lg font-semibold text-[var(--color-text)]">{next.topic}</div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <BookOpen className="h-3.5 w-3.5" />
                {next.tasks.filter((t) => !completed.includes(t.id)).length} tasks remaining
              </div>
            </div>
            <button
              onClick={onContinue}
              className="gradient-btn flex flex-shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
            >
              Continue Learning
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="card p-6 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-[var(--color-success)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Roadmap Complete!</h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            You've finished every task. Time to set a new goal!
          </p>
        </div>
      )}
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-[var(--color-surface-2)]/50 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-[var(--color-text-dim)]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="truncate text-sm font-medium text-[var(--color-text)]">{value || '—'}</div>
    </div>
  );
}

function firstIncomplete(roadmap, completed) {
  return roadmap.find((d) => (d.tasks || []).some((t) => !completed.includes(t.id)));
}
