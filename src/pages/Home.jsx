import { Compass, Target, Sparkles, Map, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    icon: Target,
    title: 'Enter your goal',
    desc: 'Tell us what you want to learn, your current level, and how much time you have.',
  },
  {
    icon: Sparkles,
    title: 'Generate your roadmap',
    desc: 'A personalized day-by-day or week-by-week study plan is created instantly.',
  },
  {
    icon: Map,
    title: 'Follow your learning plan',
    desc: 'Track your progress, check off tasks, and keep moving toward your goal.',
  },
];

export default function Home({ onNavigate, hasRoadmap }) {
  return (
    <div className="animate-fade">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center sm:pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-muted)] animate-fade-up">
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
          AI-powered personalized study plans
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl animate-fade-up" style={{ animationDelay: '0.05s' }}>
          AI Roadmap <span className="gradient-text">Generator</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Create a personalized learning roadmap based on your goals, skill level,
          available time, and deadline.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <button
            onClick={() => onNavigate('create')}
            className="gradient-btn flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
          >
            <Compass className="h-5 w-5" />
            Create Roadmap
          </button>
          {hasRoadmap && (
            <button
              onClick={() => onNavigate('roadmap')}
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:text-white"
            >
              View My Roadmap
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
          How It Works
        </h2>
        <div className="grid gap-6 sm:grid-cols-3 stagger">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="card card-hover p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-2)]">
                  <Icon className="h-7 w-7 text-[var(--color-primary)]" />
                </div>
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                  Step {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)]">{s.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature highlights */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger">
          {[
            { icon: BookOpen, title: 'Adaptive topics', desc: 'Content adjusts to your skill level.' },
            { icon: CheckCircle2, title: 'Progress tracking', desc: 'Check off tasks and watch progress grow.' },
            { icon: Target, title: 'Goal-oriented', desc: 'Plans are built around your personal goal.' },
            { icon: Map, title: 'Day or week plans', desc: 'Choose the pace that fits your schedule.' },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card p-5">
                <Icon className="mb-3 h-6 w-6 text-[var(--color-primary)]" />
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-text)]">{f.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
