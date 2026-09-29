export default function ProgressBar({ percent }) {
  const p = Math.max(0, Math.min(100, percent || 0));
  return (
    <div className="progress-track h-3 w-full">
      <div className="progress-fill" style={{ width: `${p}%` }} />
    </div>
  );
}
