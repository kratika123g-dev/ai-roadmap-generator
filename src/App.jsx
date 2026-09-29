import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import CreateRoadmap from './pages/CreateRoadmap.jsx';
import RoadmapResult from './pages/RoadmapResult.jsx';
import Progress from './pages/Progress.jsx';
import Loader from './components/Loader.jsx';
import { generateRoadmap } from './services/aiService.js';
import {
  loadInputs, saveInputs,
  loadRoadmap, saveRoadmap,
  loadCompleted, saveCompleted,
  clearAll,
} from './utils/storage.js';
import { computeProgress } from './utils/progress.js';

export default function App() {
  const [page, setPage] = useState('home');
  const [inputs, setInputs] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load saved state on first render.
  useEffect(() => {
    setInputs(loadInputs());
    setRoadmap(loadRoadmap());
    setCompleted(loadCompleted());
  }, []);

  const hasRoadmap = !!(roadmap && roadmap.length > 0);
  const progress = computeProgress(roadmap, completed);

  const navigate = (id) => {
    // Guard: can't view roadmap/progress without one.
    if ((id === 'roadmap' || id === 'progress') && !hasRoadmap) {
      setPage('create');
      return;
    }
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerate = async (formInputs) => {
    setLoading(true);
    saveInputs(formInputs);
    setInputs(formInputs);
    try {
      const generated = await generateRoadmap(formInputs);
      saveRoadmap(generated);
      setRoadmap(generated);
      // Reset completion state for the new roadmap.
      setCompleted([]);
      saveCompleted([]);
      setPage('roadmap');
    } catch {
      // aiService already falls back to local, so this is very unlikely.
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!inputs) return;
    setLoading(true);
    try {
      const generated = await generateRoadmap(inputs);
      saveRoadmap(generated);
      setRoadmap(generated);
      setCompleted([]);
      saveCompleted([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    clearAll();
    setInputs(null);
    setRoadmap(null);
    setCompleted([]);
    setPage('home');
  };

  const handleToggleTask = (taskId) => {
    setCompleted((prev) => {
      const next = prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId];
      saveCompleted(next);
      return next;
    });
  };

  const handleContinue = () => {
    setPage('roadmap');
  };

  if (loading) {
    return (
      <div className="app-bg flex min-h-screen flex-col">
        <Navbar current={page} onNavigate={navigate} hasRoadmap={hasRoadmap} />
        <main className="flex-1">
          <Loader />
        </main>
      </div>
    );
  }

  return (
    <div className="app-bg flex min-h-screen flex-col">
      <Navbar current={page} onNavigate={navigate} hasRoadmap={hasRoadmap} />
      <main className="flex-1">
        {page === 'home' && <Home onNavigate={navigate} hasRoadmap={hasRoadmap} />}
        {page === 'create' && (
          <CreateRoadmap
            initial={inputs}
            onGenerate={handleGenerate}
            onBack={() => navigate('home')}
          />
        )}
        {page === 'roadmap' && (
          <RoadmapResult
            roadmap={roadmap}
            inputs={inputs}
            completed={completed}
            progress={progress}
            onToggleTask={handleToggleTask}
            onRegenerate={handleRegenerate}
            onReset={handleReset}
            onBack={() => navigate('create')}
            onContinue={handleContinue}
          />
        )}
        {page === 'progress' && (
          <Progress
            roadmap={roadmap}
            inputs={inputs}
            completed={completed}
            progress={progress}
            onContinue={() => navigate('roadmap')}
            onNavigate={navigate}
          />
        )}
      </main>

      <footer className="border-t border-[var(--color-border)] py-5 text-center text-xs text-[var(--color-text-dim)]">
        AI Roadmap Generator · A BTech college project
      </footer>
    </div>
  );
}
