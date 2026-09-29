# AI Roadmap Generator

A simple, beginner-friendly web application that creates a **personalized learning roadmap** based on a student's goal, skill level, available time, and deadline. Built as a BTech college-level project.

## Project Description

The AI Roadmap Generator helps students plan their studies in a structured way. A student enters what they want to learn (for example DSA, Python, Web Development, or Machine Learning), their current skill level, their learning goal, how many hours per day they can study, and the total duration of the plan. The app then generates a day-by-day (or week-by-week) roadmap with main topics, subtopics, learning tasks, and practice tasks.

Students can check off tasks as they complete them, and the app automatically tracks overall progress with a progress bar. All data is saved in the browser using LocalStorage, so it stays even after refreshing the page.

## Features

- **Personalized roadmap generation** based on topic, skill level, goal, study time, and duration.
- **Built-in AI fallback generator** — works fully offline without any API key.
- **Optional remote AI support** — if an OpenAI API key is stored in LocalStorage, the app can call the API for richer plans.
- **Progress tracking** — total tasks, completed tasks, remaining tasks, and an animated progress bar.
- **Task completion** — check off learning and practice tasks; progress updates automatically.
- **Continue Learning** — jump straight to the first incomplete task.
- **LocalStorage persistence** — inputs, roadmap, and completed tasks survive page refreshes.
- **Responsive design** — works on desktop, tablet, and mobile.
- **Modern dark theme** with blue and purple accents and subtle animations.

## Technology Stack

- **React** — component-based UI
- **Vite** — fast development and build tool
- **JavaScript (JSX)** — no TypeScript
- **CSS** — custom dark theme with CSS variables (Tailwind CSS v4 available)
- **lucide-react** — icons
- **LocalStorage** — client-side data persistence (no database, no authentication)

## How to Run the Project

1. Install dependencies (only needed once):

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the URL shown in the terminal (usually `http://localhost:5173`).

4. To create a production build:

   ```bash
   npm run build
   ```

5. To preview the production build:

   ```bash
   npm run preview
   ```

## Project Structure

```
src/
  components/      Reusable UI components (Navbar, ProgressBar, Loader)
  pages/           Page-level views (Home, CreateRoadmap, RoadmapResult, Progress)
  services/        AI generation logic and syllabus data
  utils/           LocalStorage helpers and progress calculations
  App.jsx          Main app with navigation and state
  main.jsx         React entry point
  index.css        Global styles and dark theme
```

## How the AI Generation Works

The generation logic lives in `src/services/aiService.js` and follows a simple two-step approach:

1. **Remote AI (optional):** If the user has stored an OpenAI-compatible API key in LocalStorage (key: `arg_ai_key`), the app sends the user's inputs (topic, level, goal, hours/day, duration) to the API with a prompt asking for a structured JSON roadmap. The response is parsed and normalized into the app's roadmap format.

2. **Local fallback (default):** If no API key is available — or the API call fails — the app uses a built-in generator. It looks up a predefined **syllabus** for the chosen topic (see `src/services/syllabus.js`), each containing an ordered list of units with subtopics, learning tasks, and practice tasks. The generator:
   - Skips beginner units for Intermediate/Advanced learners.
   - Fits the number of units to the requested duration (day or week).
   - Adds an extra challenge task for Advanced learners.
   - Falls back to a generic 5-phase syllabus for topics not in the built-in list, so the app always produces a plan.

Each generated roadmap entry contains:

- **Day / Week number**
- **Main topic**
- **Subtopics**
- **Learning tasks** (theory)
- **Practice tasks** (hands-on)
- **Estimated study time**

This keeps the AI integration simple and modular — no RAG, no vector databases, no multiple providers — while still producing a useful, personalized plan.
