# React Interview Handbook (Pro Edition)

An elegant, high-fidelity interactive handbook and mock interview simulator built from scratch to help engineers master React, TypeScript, and modern system design patterns. 

This project is a showcase of clean frontend architecture, custom React hooks, Tailwind CSS v4 styling configurations, and advanced rendering optimization patterns.

🔗 **Live Deployment:** [View the Live Application](https://lavneetsh.github.io/Lavneet-s-Personalized-React-Practice/)

---

## 🚀 Key Engineering & Architecture Highlights

I designed and built this application with a focus on modularity, readability, and performance. Here are the core engineering details:

### 1. Fine-Grained Performance Optimization
By default, React re-renders component trees recursively when state changes. To maintain a constant 60 FPS, I implemented:
* **Render Guarding (`React.memo`)**: Visual rows and static panels (like standard layout cards) are wrapped in `memo` to skip re-rendering when parent states update.
* **Callback Stabilization (`useCallback`)**: Handlers passed to memoized children are stabilized to maintain identical references across renders, preventing shallow-compare failures.
* **Calculation Memoization (`useMemo`)**: The filtering and sorting calculations for the 100 questions are cached and only recalculate when search inputs or chapter selections change.

### 2. Modern Styling Engine (Tailwind CSS v4)
* **Custom Variant Override**: Confirmed class-based dark mode in Tailwind v4 by injecting `@custom-variant dark (&:where(.dark, .dark *))` to synchronize state variables with browser-level system preferences.
* **Editorial Design System**: Created a visual system pairing high-legibility sans-serif fonts (`Inter`) with a warm serif typography (`Lora`) for detailed code explanations. 

### 3. Clean TypeScript Core
* **Strict Interface Schema**: Enforced strict typings for all data models, defining exact contract shapes for Questions, Difficulties, DetailedExplanations, and Mistakes.
* **Generic Components**: Built modular UI selectors that dynamically adapt to multiple data shapes (e.g. chapters list, progress milestones) safely without losing compiler assertions.

### 4. Custom Hook Architecture
* **Live Practice Chronometer**: Extracted the stopwatch state machine into local custom logic, decoupling clock intervals from UI renders to prevent stuttering.
* **State Persistence**: Created a reactive hook to synchronize candidate bookmarks and preparation stages directly to `localStorage`.

---

## 🛠️ Application Features

* ⏱️ **Verbal Responder Trainer**: A time-boxed simulation widget with active start/pause/reset states to help candidates practice answers under time-boxed constraint triggers (target: 30-60 seconds).
* 📚 **100 Conceptual Q&As**: Deep educational breakdowns covering *What is it*, *Why does it exist*, *Problem solved*, *Benefits/Tradeoffs*, *When to use*, and *Common developer mistakes*.
* 💻 **100 Dedicated Code Sandboxes**: Every single question is paired with a unique, custom-written, fully typed code snippet demonstrating that exact concept in isolation.
* 🌓 **Sync Dark/Light Mode**: Smooth theme transitions that invert text contrast dynamically (charcoal HSL adjustments) to maintain accessibility standards.
* 📦 **CI/CD Pipeline**: Configured a complete **GitHub Actions workflow** (`deploy.yml`) to automatically compile typescript, run builds, and deploy static assets to GitHub Pages on every push.

---

## 📁 Project Structure

Organized using a modular feature-folder structure to separate global configurations from core domains:

```bash
src/
├── data/
│   ├── questionsData.ts    # Initial metadata for all 100 questions
│   ├── questionCodes.ts    # 100 unique code examples + walkthrough arrays
│   └── questionDetails.ts  # Tailored dynamic explanation system & custom overrides
├── types.ts                # App-wide strict TypeScript interfaces
├── main.tsx                # Client entry point
├── App.tsx                 # Core app state, layout, and simulator logic
└── index.css               # CSS variables, custom typography, & tailwind configuration
```

---

## 💻 Running Locally

### Prerequisites
* **Node.js** (v18 or higher)
* **npm**

### Installation Steps
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Run the local development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.
