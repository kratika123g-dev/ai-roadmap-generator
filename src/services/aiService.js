// ---------------------------------------------------------------------------
// AI Roadmap Generator service
// ---------------------------------------------------------------------------
// This module turns user inputs into a structured roadmap.
//
// It first tries to call an external AI API (OpenAI-compatible) when a key is
// present in localStorage (key: arg_ai_key). If no key is available OR the
// request fails, it falls back to a fully local generator that builds a
// sensible roadmap from the built-in syllabus data. This keeps the app
// working offline and without any setup — perfect for a college project.
//
// The roadmap shape:
//   [{ day, topic, subtopics:[], tasks:[{id,label,type,done}], estimatedTime }]
// ---------------------------------------------------------------------------

import { SYLLABI, resolveTopic } from './syllabus.js';
import { uid } from '../utils/progress.js';

// Build a single task list from a unit's learn + practice tasks.
function buildTasks(unit, level) {
  const tasks = [];
  unit.learn.forEach((label) => {
    tasks.push({ id: uid(), label, type: 'learning' });
  });
  unit.practice.forEach((label) => {
    tasks.push({ id: uid(), label, type: 'practice' });
  });
  // For advanced users we add a stretch practice task per day.
  if (level === 'Advanced') {
    tasks.push({ id: uid(), label: 'Solve 1 extra challenge problem', type: 'practice' });
  }
  return tasks;
}

// Adapt the unit label (Day vs Week) to the chosen duration unit.
function unitLabel(index, durationUnit) {
  return durationUnit === 'weeks' ? `Week ${index + 1}` : `Day ${index + 1}`;
}

// Estimate per-day study time string from the hours/day input.
function estimateTime(hoursPerDay) {
  const h = Number(hoursPerDay) || 2;
  return `${h} hr${h === 1 ? '' : 's'}`;
}

// Pick the starting index depending on skill level.
function startIndexForLevel(level, totalUnits) {
  if (level === 'Intermediate') return Math.min(2, Math.floor(totalUnits / 3));
  if (level === 'Advanced') return Math.min(4, Math.floor(totalUnits / 2));
  return 0; // Beginner
}

// ---------------------------------------------------------------------------
// Local fallback generator (no API needed)
// ---------------------------------------------------------------------------
export function generateLocalRoadmap(inputs) {
  const {
    topic: rawTopic,
    level = 'Beginner',
    goal = '',
    hoursPerDay = 2,
    duration = 30,
    durationUnit = 'days',
  } = inputs;

  const topicKey = resolveTopic(rawTopic);
  const known = topicKey ? SYLLABI[topicKey] : null;

  // Build a generic syllabus for an unknown topic so the app always works.
  const units = known
    ? known.units
    : buildGenericSyllabus(rawTopic, Number(duration));

  const totalUnits = units.length;
  const requestedCount = Math.max(1, Number(duration) || 1);
  const startIdx = startIndexForLevel(level, totalUnits);

  // Slide a window across the syllabus to fit the requested duration.
  const roadmap = [];
  for (let i = 0; i < requestedCount; i++) {
    const unit = units[(startIdx + i) % totalUnits];
    roadmap.push({
      day: unitLabel(i, durationUnit),
      topic: unit.topic,
      subtopics: unit.subtopics,
      tasks: buildTasks(unit, level),
      estimatedTime: estimateTime(hoursPerDay),
      goalNote: goal ? `Goal: ${goal}` : '',
    });
  }
  return roadmap;
}

// Create a lightweight generic syllabus for topics we don't have predefined.
function buildGenericSyllabus(rawTopic, count) {
  const t = rawTopic || 'the topic';
  const phases = [
    {
      topic: `Introduction to ${t}`,
      subtopics: ['Overview', 'Key terminology', 'Why it matters'],
      learn: [`Understand what ${t} is`, 'Learn the key terms', 'Study real-world uses'],
      practice: ['Take introductory notes', 'Find 2 good resources', 'Write a short summary'],
    },
    {
      topic: `Fundamentals of ${t}`,
      subtopics: ['Core concepts', 'Basic principles', 'Common patterns'],
      learn: ['Learn the core concepts', 'Understand basic principles', 'Study common patterns'],
      practice: ['Complete a beginner exercise', 'Explain the concept aloud', 'Solve 2 basic problems'],
    },
    {
      topic: `Intermediate ${t}`,
      subtopics: ['Deeper techniques', 'Working examples', 'Edge cases'],
      learn: ['Study intermediate techniques', 'Work through examples', 'Learn edge cases'],
      practice: ['Build a small example', 'Solve 3 intermediate problems', 'Review your mistakes'],
    },
    {
      topic: `Advanced ${t}`,
      subtopics: ['Advanced topics', 'Best practices', 'Optimization'],
      learn: ['Explore advanced topics', 'Learn best practices', 'Study optimization'],
      practice: ['Tackle a challenging problem', 'Compare two approaches', 'Write a short article'],
    },
    {
      topic: `Project & Revision — ${t}`,
      subtopics: ['Hands-on project', 'Revision', 'Next steps'],
      learn: ['Plan a small project', 'Revise all key concepts', 'Identify next learning steps'],
      practice: ['Complete a mini project', 'Take a self-test', 'Document what you learned'],
    },
  ];
  // Repeat the phases to fill the requested duration.
  const out = [];
  for (let i = 0; i < Math.max(count, 5); i++) out.push(phases[i % phases.length]);
  return out;
}

// ---------------------------------------------------------------------------
// Optional remote AI call (OpenAI-compatible). Only used if a key is stored.
// ---------------------------------------------------------------------------
async function generateRemoteRoadmap(inputs) {
  const key = localStorage.getItem('arg_ai_key');
  if (!key) throw new Error('No AI key configured — using local generator.');

  const prompt = buildPrompt(inputs);
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful study planner. Reply ONLY with valid JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`AI request failed: ${res.status}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(text);
  return normalizeRemote(parsed, inputs);
}

function buildPrompt(inputs) {
  const { topic, level, goal, hoursPerDay, duration, durationUnit } = inputs;
  return `Create a ${duration}-${durationUnit} learning roadmap for the topic "${topic}".
User skill level: ${level}. Learning goal: ${goal}. Available study time: ${hoursPerDay} hours/day.
Return JSON as an array of objects, each with fields:
day (string like "Day 1"), topic (string), subtopics (array of strings),
tasks (array of {label, type} where type is "learning" or "practice"), estimatedTime (string).
Provide exactly ${duration} entries.`;
}

function normalizeRemote(parsed, inputs) {
  const arr = Array.isArray(parsed) ? parsed : parsed.roadmap || [];
  return arr.map((d, i) => ({
    day: d.day || unitLabel(i, inputs.durationUnit),
    topic: d.topic || 'Study',
    subtopics: Array.isArray(d.subtopics) ? d.subtopics : [],
    tasks: (d.tasks || []).map((t) => ({
      id: uid(),
      label: t.label || t,
      type: t.type === 'learning' ? 'learning' : 'practice',
    })),
    estimatedTime: d.estimatedTime || estimateTime(inputs.hoursPerDay),
    goalNote: inputs.goal ? `Goal: ${inputs.goal}` : '',
  }));
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------
export async function generateRoadmap(inputs) {
  try {
    return await generateRemoteRoadmap(inputs);
  } catch {
    return generateLocalRoadmap(inputs);
  }
}
