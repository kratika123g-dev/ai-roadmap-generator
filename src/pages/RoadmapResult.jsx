import { useRef } from 'react';
import {
  ArrowLeft, RefreshCw, Trash2, Clock, BookOpen, Code2,
  CheckCircle2, Circle, ChevronRight, Target,
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar.jsx';

export default function RoadmapResult({
  roadmap,
  inputs,
  completed,
  progress,
  onToggleTask,
  onRegenerate,
  onReset,
  onBack,
  onContinue,
}) {
  const listRef = useRef(null);

  const handleContinue = () => {
    onContinue();
    setTimeout(() => {
      const el = document.getElementById('first-incomplete');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center animate-fade">
        <p className="text-lg text-[var(--color-text-muted)]">No roadmap yet.</p>
        <button
          onClick={onBack}
          className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Create one
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 animate-fade" ref={listRef}>
      {/* Header summary */}
      <div className="card mb-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">{inputs?.topic || 'Your Roadmap'}</h1>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {roadmap.length} {inputs?.durationUnit || 'days'} · {inputs?.level || 'Beginner'} · {inputs?.hoursPerDay || 2} hrs/day
            </p>
            {inputs?.goal && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--color-secondary)]">
                <Target className="h-3.5 w-3.5" />
                {inputs.goal}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold gradient-text">{progress.percent}%</div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {progress.completed}/{progress.total} tasks
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar percent={progress.percent} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="mb-6 flex flex-wrap gap-2.5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10 px-4 py-2.5 text-sm font-medium text-[var(--color-primary)] transition hover:bg-[var(--color-primary)]/20"
        >
          <RefreshCw className="h-4 w-4" />
          Regenerate
        </button>
        <button
          onClick={onContinue}
          className="gradient-btn flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
        >
          Continue Learning
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={onReset}
          className="ml-auto flex items-center gap-2 rounded-lg border border-[var(--color-error)]/40 px-4 py-2.5 text-sm font-medium text-[var(--color-error)] transition hover:bg-[var(--color-error)]/10"
        >
          <Trash2 className="h-4 w-4" />
          Reset
        </button>
      </div>

      {/* Roadmap cards */}
      <div className="space-y-4 stagger">
        {roadmap.map((day, di) => {
          const dayTasks = day.tasks || [];
          const dayDone = dayTasks.filter((t) => completed.includes(t.id)).length;
          const dayComplete = dayTasks.length > 0 && dayDone === dayTasks.length;
          return (
            <div
              key={di}
              id={di === firstIncompleteIndex(roadmap, completed) ? 'first-incomplete' : undefined}
              className={`card card-hover overflow-hidden ${dayComplete ? 'border-[var(--color-success)]/40' : ''}`}
            >
              {/* Day header */}
              <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface-2)]/50 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                    dayComplete ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' : 'gradient-btn text-white'
                  }`}>
                    {di + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-text)]">{day.day}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{day.topic}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  <span className="hidden items-center gap-1 sm:flex">
                    <Clock className="h-3.5 w-3.5" />
                    {day.estimatedTime}
                  </span>
                  {dayComplete && <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />}
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                {/* Subtopics */}
                {day.subtopics?.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {day.subtopics.map((s, si) => (
                      <span key={si} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tasks */}
                <ul className="space-y-2">
                  {dayTasks.map((task) => {
                    const done = completed.includes(task.id);
                    return (
                      <li key={task.id}>
                        <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-[var(--color-surface-2)]/60">
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => onToggleTask(task.id)}
                            className="task-check mt-0.5"
                          />
                          <span className="flex flex-1 items-center gap-2 text-sm">
                            {task.type === 'learning' ? (
                              <BookOpen className={`h-4 w-4 flex-shrink-0 ${done ? 'text-[var(--color-text-dim)]' : 'text-[var(--color-primary)]'}`} />
                            ) : (
                              <Code2 className={`h-4 w-4 flex-shrink-0 ${done ? 'text-[var(--color-text-dim)]' : 'text-[var(--color-secondary)]'}`} />
                            )}
                            <span className={done ? 'text-[var(--color-text-dim)] line-through' : 'text-[var(--color-text)]'}>
                              {task.label}
                            </span>
                          </span>
                          {done ? (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-success)]" />
                          ) : (
                            <Circle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-text-dim)]" />
                          )}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function firstIncompleteIndex(roadmap, completed) {
  return roadmap.findIndex((d) => (d.tasks || []).some((t) => !completed.includes(t.id)));
}
