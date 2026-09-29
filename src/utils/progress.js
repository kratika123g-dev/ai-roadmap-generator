// Utility helpers shared across the app.

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// Calculate overall progress from a roadmap + completed task id list.
export function computeProgress(roadmap, completed) {
  if (!roadmap || roadmap.length === 0) {
    return { total: 0, completed: 0, remaining: 0, percent: 0 };
  }
  const allTasks = roadmap.flatMap((d) => d.tasks || []);
  const total = allTasks.length;
  const done = allTasks.filter((t) => completed.includes(t.id)).length;
  const remaining = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, completed: done, remaining, percent };
}

// Find the first roadmap day that still has an incomplete task.
export function firstIncompleteDay(roadmap, completed) {
  if (!roadmap) return null;
  return roadmap.find((d) => (d.tasks || []).some((t) => !completed.includes(t.id)));
}
