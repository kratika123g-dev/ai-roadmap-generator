// Simple LocalStorage helper for the AI Roadmap Generator.
// Keys are namespaced so they never collide with other apps.

const KEYS = {
  INPUTS: 'arg_inputs',
  ROADMAP: 'arg_roadmap',
  COMPLETED: 'arg_completed',
};

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be full or disabled — fail silently */
  }
}

export function saveInputs(inputs) {
  write(KEYS.INPUTS, inputs);
}

export function loadInputs() {
  return read(KEYS.INPUTS);
}

export function saveRoadmap(roadmap) {
  write(KEYS.ROADMAP, roadmap);
}

export function loadRoadmap() {
  return read(KEYS.ROADMAP);
}

export function saveCompleted(completed) {
  write(KEYS.COMPLETED, completed);
}

export function loadCompleted() {
  const data = read(KEYS.COMPLETED);
  return Array.isArray(data) ? data : [];
}

export function clearAll() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
