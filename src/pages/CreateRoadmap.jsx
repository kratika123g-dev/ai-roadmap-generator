import { useState } from 'react';
import { Compass, AlertCircle, Clock, Calendar, Target, Gauge } from 'lucide-react';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const EMPTY = {
  topic: '',
  level: 'Beginner',
  goal: '',
  hoursPerDay: 2,
  duration: 30,
  durationUnit: 'days',
};

export default function CreateRoadmap({ initial, onGenerate, onBack }) {
  const [form, setForm] = useState({ ...EMPTY, ...(initial || {}) });
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.topic.trim()) next.topic = 'Please enter a learning topic.';
    if (!form.goal.trim()) next.goal = 'Please enter your learning goal.';
    const dur = Number(form.duration);
    if (!dur || dur < 1) next.duration = 'Duration must be at least 1.';
    if (dur > 365) next.duration = 'Duration cannot exceed 365.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onGenerate({ ...form, hoursPerDay: Number(form.hoursPerDay), duration: Number(form.duration) });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 animate-fade-up">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-btn">
          <Compass className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Create Your Roadmap</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Fill in the details below and we'll generate a personalized study plan for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-6 sm:p-8">
        {/* Learning Topic */}
        <Field
          label="Learning Topic"
          icon={Target}
          error={errors.topic}
          hint="e.g. DSA, Python, Web Development, Machine Learning"
        >
          <input
            type="text"
            value={form.topic}
            onChange={(e) => update('topic', e.target.value)}
            placeholder="Enter what you want to learn"
            className="input-base"
          />
        </Field>

        {/* Skill Level */}
        <Field label="Current Skill Level" icon={Gauge}>
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => update('level', lvl)}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                  form.level === lvl
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-white'
                    : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/50 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </Field>

        {/* Learning Goal */}
        <Field
          label="Learning Goal"
          icon={Target}
          error={errors.goal}
          hint="e.g. Prepare for placements, Build a project, Crack an interview"
        >
          <input
            type="text"
            value={form.goal}
            onChange={(e) => update('goal', e.target.value)}
            placeholder="What do you want to achieve?"
            className="input-base"
          />
        </Field>

        {/* Study time */}
        <Field label={`Available Study Time — ${form.hoursPerDay} hours/day`} icon={Clock}>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={form.hoursPerDay}
            onChange={(e) => update('hoursPerDay', Number(e.target.value))}
          />
          <div className="mt-1 flex justify-between text-[11px] text-[var(--color-text-dim)]">
            <span>1 hr</span>
            <span>4 hrs</span>
            <span>8 hrs</span>
          </div>
        </Field>

        {/* Duration */}
        <Field label="Duration" icon={Calendar} error={errors.duration}>
          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              max="365"
              value={form.duration}
              onChange={(e) => update('duration', e.target.value)}
              placeholder="30"
              className="input-base w-28"
            />
            <div className="flex gap-2">
              {['days', 'weeks'].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => update('durationUnit', u)}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium capitalize transition ${
                    form.durationUnit === u
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-white'
                      : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </Field>

        {Object.keys(errors).length > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 px-4 py-3 text-sm text-[var(--color-error)]">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            Please fix the highlighted fields above.
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-5 py-3 text-sm font-semibold text-[var(--color-text-muted)] transition hover:text-white"
          >
            Back
          </button>
          <button type="submit" className="gradient-btn flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white">
            <Sparkles />
            Generate Roadmap
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, icon: Icon, error, hint, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
        {Icon && <Icon className="h-4 w-4 text-[var(--color-primary)]" />}
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-[var(--color-text-dim)]">{hint}</p>}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-[var(--color-error)]">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

function Sparkles() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.8L19.7 11l-5.8 1.9L12 18.7l-1.9-5.8L4.3 11l5.8-1.9z" />
    </svg>
  );
}
