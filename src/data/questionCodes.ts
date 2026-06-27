// Per-question unique code examples — every question gets its own relevant demo.
// Each snippet is concise and laser-focused on illustrating exactly that concept.

export const perQuestionCode: Record<number, { code: string; walkthrough: string[] }> = {

  // ─── Q1: What is React ───────────────────────────────────────────────────────
  1: {
    code: `import React from 'react';
import ReactDOM from 'react-dom/client';

// React is a LIBRARY, not a framework — it only handles the View layer.
// Every UI is broken into small, reusable components.
function WelcomeCard({ name }: { name: string }) {
  return (
    <div style={{ padding: 16, background: '#1e1e1c', color: '#f4efe6', borderRadius: 8 }}>
      <h2>Hello, {name}!</h2>
      <p>This is a React component — a self-contained, reusable piece of UI.</p>
    </div>
  );
}

// ReactDOM mounts the root component into the real browser DOM once.
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<WelcomeCard name="Lavneet" />);`,
    walkthrough: [
      "React is imported as the JSX transformer; ReactDOM targets the browser DOM.",
      "WelcomeCard is a functional component — a plain JS function returning JSX.",
      "Props ({name}) are typed with a TypeScript inline interface for safety.",
      "ReactDOM.createRoot mounts the component tree into a real #root div once.",
      "From here, React owns all DOM updates — you never touch the DOM directly again."
    ]
  },

  // ─── Q2: React vs Angular vs Vue ─────────────────────────────────────────────
  2: {
    code: `// ── REACT: Just a View library — you pick your own router, state manager, etc.
function ReactCounter() {
  const [n, setN] = React.useState(0);
  return <button onClick={() => setN(n + 1)}>React: {n}</button>;
}

// ── ANGULAR (conceptual): Full MVC framework, uses TypeScript decorators.
// @Component({ selector: 'app-counter', template: '<button (click)="n++">{{n}}</button>' })
// export class CounterComponent { n = 0; }

// ── VUE (conceptual): Progressive framework with Options/Composition API.
// <template><button @click="n++">{{ n }}</button></template>
// <script setup>import { ref } from 'vue'; const n = ref(0);</script>

// KEY DIFFERENCES TABLE:
// Feature         | React        | Angular      | Vue
// ─────────────────────────────────────────────────────
// Type            | Library      | Framework    | Framework
// Language        | JS/TS + JSX  | TypeScript   | JS/TS + templates
// State           | useState     | Services+RxJS| ref/reactive
// DOM             | Virtual DOM  | Change detect| Virtual DOM
// Learning curve  | Medium       | Steep        | Easy`,
    walkthrough: [
      "React is a UI library — it handles only the View; you choose everything else.",
      "Angular is a complete opinionated framework including DI, HTTP, forms, and router.",
      "Vue sits in-between: it has an optional full ecosystem but is incrementally adoptable.",
      "React uses JSX (JS + XML syntax); Angular uses HTML templates + decorators.",
      "For a MERN stack (like Damora AI), React pairs naturally with Express/Node backends."
    ]
  },

  // ─── Q3: What is a React component ───────────────────────────────────────────
  3: {
    code: `import React from 'react';

// 1. Functional Component (modern — use this always)
function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ background: color, color: '#fff', padding: '4px 10px', borderRadius: 20 }}>
      {label}
    </span>
  );
}

// 2. Components compose into trees — parent passes data down via props
export default function ProfileCard() {
  return (
    <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8, maxWidth: 240 }}>
      <p style={{ fontWeight: 700 }}>Lavneet Sharma</p>
      <Badge label="MERN Developer" color="#7c3aed" />
      <Badge label="1+ Yr Exp"      color="#0891b2" />
    </div>
  );
}
// Each <Badge> is an independent, reusable unit — that is a React component.`,
    walkthrough: [
      "A component is a function that accepts props and returns JSX (UI description).",
      "Capital letters distinguish component names from native HTML tags (Badge vs span).",
      "Props are the component's API — typed inputs it receives from its parent.",
      "ProfileCard composes two Badge components — this is React's core composition model.",
      "Components are reusable; Badge could appear in 100 places with different labels."
    ]
  },

  // ─── Q4: How do you create a component ───────────────────────────────────────
  4: {
    code: `import React from 'react';

// ── Pattern 1: Named function declaration (recommended for clarity)
function PrimaryButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6 }}>
      {label}
    </button>
  );
}

// ── Pattern 2: Arrow function (common in modern codebases)
const StatusChip = ({ status }: { status: 'active' | 'offline' }) => (
  <span style={{ color: status === 'active' ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
    ● {status.toUpperCase()}
  </span>
);

// ── Usage: render components like self-closing HTML tags
export default function App() {
  return (
    <div>
      <StatusChip status="active" />
      <PrimaryButton label="Save Changes" onClick={() => alert('Saved!')} />
    </div>
  );
}`,
    walkthrough: [
      "A component is simply a JS function whose name starts with a capital letter.",
      "Function declarations are preferred for top-level components (better stack traces).",
      "Arrow functions are great for simple presentational components.",
      "Both take a typed props parameter and return JSX.",
      "Components are used like HTML tags: <PrimaryButton /> or <StatusChip status='active' />."
    ]
  },

  // ─── Q5: What is JSX ─────────────────────────────────────────────────────────
  5: {
    code: `import React from 'react';

// ── JSX (what you write in modern React)
function GreetingJSX({ name }: { name: string }) {
  return (
    <div className="card">
      <h1>Hello, {name}!</h1>   {/* JS expressions go in curly braces */}
      <p>{name.length > 5 ? 'Long name' : 'Short name'}</p>
    </div>
  );
}

// ── What Babel COMPILES JSX into (what the browser actually runs):
function GreetingCompiled({ name }: { name: string }) {
  return React.createElement('div', { className: 'card' },
    React.createElement('h1', null, 'Hello, ', name, '!'),
    React.createElement('p', null, name.length > 5 ? 'Long name' : 'Short name')
  );
}
// JSX is purely SYNTACTIC SUGAR — both functions produce identical output.
// Rules: className not class, htmlFor not for, camelCase attributes, one root element.`,
    walkthrough: [
      "JSX is HTML-like syntax inside JS files — Babel compiles it to React.createElement calls.",
      "Curly braces {} allow embedding any valid JavaScript expression inside JSX.",
      "JSX attributes use camelCase: className, onClick, onChange — not HTML's class, onclick.",
      "Every JSX element must have exactly one root element (or use <> Fragment shorthand).",
      "JSX is not required — but it makes component trees dramatically more readable."
    ]
  },

  // ─── Q6: Virtual DOM — kept in customOverrides ────────────────────────────────
  6: {
    code: `import React, { useState } from 'react';

// Virtual DOM in action: React only updates what actually changed.
// Open DevTools → Elements and watch: ONLY the <span> flickers, not the whole page.
export default function VDomDemo() {
  const [count, setCount] = useState(0);
  const [unchanged] = useState('I never re-paint in the DOM');

  return (
    <div style={{ padding: 16 }}>
      <p>{unchanged}</p>
      {/* React diffs the old VDOM vs new VDOM; only this span node gets patched */}
      <span style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>{count}</span>
      <br /><br />
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
// If this were vanilla JS: document.getElementById('count').innerText = count
// That forces full layout/style recalc. React batches and minimises those ops.`,
    walkthrough: [
      "React keeps two VDOM trees: the current render and the previous render.",
      "On setState, React renders a NEW VDOM tree (cheap JS object graph).",
      "The diffing (reconciliation) algorithm compares old vs new tree in O(n).",
      "Only the changed nodes are flushed to the real DOM — minimising reflow/repaint.",
      "The static <p> paragraph is never touched even though the component re-renders."
    ]
  },

  // ─── Q7: Class vs Functional ─────────────────────────────────────────────────
  7: {
    code: `import React, { useState, Component } from 'react';

// ── LEGACY: Class Component
class ClassTimer extends Component<{}, { seconds: number }> {
  state = { seconds: 0 };
  interval: ReturnType<typeof setInterval> | null = null;
  componentDidMount()  { this.interval = setInterval(() => this.setState(s => ({ seconds: s.seconds + 1 })), 1000); }
  componentWillUnmount() { if (this.interval) clearInterval(this.interval); }
  render() { return <p>Class: {this.state.seconds}s</p>; }
}

// ── MODERN: Functional Component (same behaviour, ~half the code)
import { useEffect } from 'react';
function FnTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // cleanup = componentWillUnmount
  }, []);
  return <p>Function: {seconds}s</p>;
}

export default function App() { return <><ClassTimer /><FnTimer /></>; }`,
    walkthrough: [
      "Class components need 'extends Component', a render() method, and 'this' for everything.",
      "Functional components are plain functions — shorter, easier to read and test.",
      "Lifecycle logic (setup + teardown) is scattered across 3 methods in classes.",
      "useEffect co-locates setup AND cleanup inside one function block.",
      "Since React 16.8 (Hooks), functional components are the industry standard."
    ]
  },

  // ─── Q8: Event handling ───────────────────────────────────────────────────────
  8: {
    code: `import React, { useState } from 'react';

export default function EventDemo() {
  const [log, setLog] = useState<string[]>([]);
  const push = (msg: string) => setLog(prev => [msg, ...prev].slice(0, 5));

  // SyntheticEvent normalises browser differences (same API on all browsers)
  const handleClick  = (e: React.MouseEvent<HTMLButtonElement>) => push(\`Click at (\${e.clientX},\${e.clientY})\`);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => push(\`Input: \${e.target.value}\`);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); push('Form submitted!'); };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 16, fontFamily: 'monospace' }}>
      <input onChange={handleChange} placeholder="Type something..." style={{ display: 'block', marginBottom: 8 }} />
      <button type="button" onClick={handleClick}>Click Me</button>
      <button type="submit" style={{ marginLeft: 8 }}>Submit</button>
      <ul style={{ fontSize: 12, marginTop: 8 }}>
        {log.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
    </form>
  );
}`,
    walkthrough: [
      "React uses camelCase event names: onClick, onChange, onSubmit — not onclick etc.",
      "Handlers receive a SyntheticEvent wrapper that normalises cross-browser differences.",
      "e.preventDefault() stops native form submission so the SPA handles it instead.",
      "Handler functions are defined outside JSX to keep the return block clean.",
      "TypeScript generics (React.MouseEvent<HTMLButtonElement>) give full autocomplete."
    ]
  },

  // ─── Q9: State and props ──────────────────────────────────────────────────────
  9: {
    code: `import React, { useState } from 'react';

// PROPS: read-only inputs from the parent (like function arguments)
function TemperatureBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min(100, value);
  return (
    <div>
      <p style={{ margin: 0, fontSize: 12 }}>{label}: {value}°C</p>
      <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4 }}>
        <div style={{ width: \`\${pct}%\`, height: '100%', background: '#ef4444', borderRadius: 4 }} />
      </div>
    </div>
  );
}

// STATE: mutable data the component owns and can change over time
export default function PatientMonitor() {
  const [temp, setTemp] = useState(36.5); // STATE — triggers re-render when set

  return (
    <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
      <h4 style={{ margin: '0 0 8px' }}>Patient Vitals</h4>
      <TemperatureBar label="Core Temp" value={temp} />  {/* PROPS passed down */}
      <button style={{ marginTop: 8 }} onClick={() => setTemp(t => +(t + 0.1).toFixed(1))}>
        +0.1°C
      </button>
    </div>
  );
}`,
    walkthrough: [
      "Props flow DOWN from PatientMonitor → TemperatureBar; the child cannot change them.",
      "State (temp) lives inside PatientMonitor and triggers a re-render when updated.",
      "The temp setter call uses a functional updater to guarantee we read the latest value.",
      "When state changes, React re-renders PatientMonitor and re-passes new props to the child.",
      "Rule of thumb: props = configuration, state = data that changes over time."
    ]
  },

  // ─── Q10: Passing data between components ─────────────────────────────────────
  10: {
    code: `import React, { useState } from 'react';

// ── Parent → Child: via props (downward)
function ChildDisplay({ score }: { score: number }) {
  return <p>Current score from parent: <strong>{score}</strong></p>;
}

// ── Child → Parent: via callback prop (upward)
function ChildButton({ onScore }: { onScore: (pts: number) => void }) {
  return <button onClick={() => onScore(10)}>Score 10 pts</button>;
}

// ── Sibling → Sibling: lift state to their common ancestor
export default function ScoreBoard() {
  const [score, setScore] = useState(0);

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h4>Scoreboard</h4>
      {/* Pass data DOWN to display child */}
      <ChildDisplay score={score} />
      {/* Pass callback UP so child can modify parent state */}
      <ChildButton onScore={(pts) => setScore(s => s + pts)} />
      <button style={{ marginLeft: 8 }} onClick={() => setScore(0)}>Reset</button>
    </div>
  );
}`,
    walkthrough: [
      "Parent passes score to ChildDisplay via a prop — pure downward data flow.",
      "ChildButton receives onScore callback as a prop and calls it with the new value.",
      "The parent's setScore runs, updating state and re-rendering both children.",
      "This 'lift state up' pattern keeps siblings in sync through a common ancestor.",
      "For deeply nested trees, use Context API or a state manager instead of deep prop chains."
    ]
  },

  // ─── Q11: Stateful component ─────────────────────────────────────────────────
  11: {
    code: `import React, { useState } from 'react';

// A STATEFUL component owns reactive data that drives its UI.
export default function FlashcardQuiz() {
  const cards = ['useState stores reactive data', 'useEffect runs side effects', 'useRef persists without re-render'];
  const [idx, setIdx]       = useState(0);       // which card we're on
  const [flipped, setFlip]  = useState(false);   // card face state
  const [score, setScore]   = useState(0);

  const next = () => { setIdx(i => (i + 1) % cards.length); setFlip(false); };
  const mark = () => { setScore(s => s + 1); next(); };

  return (
    <div style={{ padding: 16, maxWidth: 300, fontFamily: 'sans-serif' }}>
      <p style={{ fontSize: 12, color: '#6b7280' }}>Score: {score}/{cards.length}</p>
      <div onClick={() => setFlip(f => !f)}
        style={{ padding: 24, background: flipped ? '#1e40af' : '#f3f4f6',
                 color: flipped ? '#fff' : '#111', borderRadius: 8, cursor: 'pointer', minHeight: 80 }}>
        {flipped ? cards[idx] : 'Click to reveal'}
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={mark}>✓ Got it</button>
        <button onClick={next}>→ Skip</button>
      </div>
    </div>
  );
}`,
    walkthrough: [
      "Three pieces of state (idx, flipped, score) make this component stateful.",
      "Each useState call returns [currentValue, setter] — calling setter triggers re-render.",
      "Toggling 'flipped' re-renders only this component, not the whole page.",
      "The next() helper coordinates two setters so both update in one batch.",
      "Without state, clicks would produce no visible change — the UI would be static."
    ]
  },

  // ─── Q12: useState ───
  12: {
    code: `import React, { useState } from 'react';

export default function CounterPatterns() {
  // 1. Primitive state
  const [count, setCount] = useState(0);

  // 2. Object state — always spread to create a new object!
  const [user, setUser] = useState({ name: 'Lavneet', role: 'dev' });

  // 3. Lazy initialiser — expensive calc runs only ONCE on mount
  const [heavy] = useState(() => Array.from({ length: 1000 }, (_, i) => i).reduce((a, b) => a + b, 0));

  return (
    <div style={{ padding: 16, fontFamily: 'monospace', fontSize: 13 }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1 (functional update)</button>

      <p style={{ marginTop: 12 }}>User: {user.name} [{user.role}]</p>
      <button onClick={() => setUser(u => ({ ...u, role: 'admin' }))}>Promote</button>

      <p style={{ marginTop: 12, color: '#6b7280' }}>Heavy sum: {heavy}</p>
    </div>
  );
}`,
    walkthrough: [
      "useState(0) initialises a primitive; use functional update (c => c+1) to avoid stale closures.",
      "For object state, always spread the previous object: {...u, role:'admin'} — never mutate directly.",
      "Lazy initialiser: pass a function to useState(() => expensiveWork()) — runs only on first render.",
      "State updates are batched in React; multiple setters in one handler = one re-render.",
      "Reading state immediately after calling a setter still gives the OLD value — updates are async."
    ]
  },

  // ─── Q13: Update parent state from child ─────────────────────────────────────
  13: {
    code: `import React, { useState } from 'react';

// Parent owns the state; child receives a setter callback as a prop
function ChildSelector({ onSelect }: { onSelect: (val: string) => void }) {
  const options = ['Fundamentals', 'Hooks', 'Performance'];
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {options.map(o => (
        <button key={o} onClick={() => onSelect(o)}
          style={{ padding: '4px 10px', fontSize: 12 }}>{o}</button>
      ))}
    </div>
  );
}

export default function Parent() {
  const [topic, setTopic] = useState('(none selected)');

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h4>Selected topic: <em>{topic}</em></h4>
      {/* Pass the state setter down as a callback prop */}
      <ChildSelector onSelect={setTopic} />
    </div>
  );
}
// The child calls onSelect(value) → React updates parent state → parent re-renders → new prop flows back down`,
    walkthrough: [
      "Parent holds 'topic' state and passes setTopic as onSelect prop.",
      "Child calls onSelect(o) when a button is clicked — it never directly touches parent state.",
      "React runs setTopic, schedules a re-render of Parent, and the new topic appears.",
      "This is the canonical 'inverse data flow' pattern — child signals upward via callback.",
      "Never share raw setters if logic is needed; wrap them: onSelect={(v) => { validate(v); setTopic(v); }}"
    ]
  },

  // ─── Q14: Lifting state up ────────────────────────────────────────────────────
  14: {
    code: `import React, { useState } from 'react';

// Two sibling inputs that must stay in sync → lift state to their parent
function TempInput({ unit, value, onChange }: { unit: string; value: number; onChange: (v: number) => void }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      {unit}:&nbsp;
      <input type="number" value={value} onChange={e => onChange(+e.target.value)}
        style={{ width: 80 }} />
    </label>
  );
}

export default function TempConverter() {
  // Lifted state: Celsius is the single source of truth
  const [celsius, setCelsius] = useState(0);
  const fahrenheit = celsius * 9 / 5 + 32;

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h4>Temperature Converter (Lifted State)</h4>
      <TempInput unit="°C" value={celsius}    onChange={v => setCelsius(v)} />
      <TempInput unit="°F" value={fahrenheit} onChange={v => setCelsius((v - 32) * 5 / 9)} />
      <p style={{ color: '#6b7280', fontSize: 12 }}>
        Both inputs derive from one Celsius state. Editing either updates both.
      </p>
    </div>
  );
}`,
    walkthrough: [
      "Before lifting: each TempInput owns its own state — they can never stay in sync.",
      "We lift 'celsius' to TempConverter (their lowest common ancestor).",
      "Fahrenheit is a derived value computed during render — no extra state needed.",
      "Each TempInput receives its value AND an onChange callback as props.",
      "Any change to either input calls setCelsius → parent re-renders → both inputs update."
    ]
  },

  // ─── Q15: Redux vs Context API ────────────────────────────────────────────────
  15: {
    code: `import React, { createContext, useContext, useReducer } from 'react';

// ── CONTEXT API: great for low-frequency globals (theme, auth session, locale)
const ThemeCtx = createContext<{ dark: boolean; toggle: () => void } | null>(null);
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = React.useState(false);
  return <ThemeCtx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => { const c = useContext(ThemeCtx); if (!c) throw Error('No provider'); return c; };

// ── REDUX-STYLE (useReducer): better for complex, high-frequency state with many actions
type Action = { type: 'ADD' | 'CLEAR'; payload?: string };
function notifReducer(state: string[], action: Action) {
  switch (action.type) {
    case 'ADD':   return [...state, action.payload!];
    case 'CLEAR': return [];
    default:      return state;
  }
}
export function NotifPanel() {
  const [notifs, dispatch] = useReducer(notifReducer, []);
  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD', payload: 'New message at ' + new Date().toLocaleTimeString() })}>Add</button>
      <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear</button>
      <ul>{notifs.map((n, i) => <li key={i} style={{ fontSize: 12 }}>{n}</li>)}</ul>
    </div>
  );
}`,
    walkthrough: [
      "Context API suits infrequently-changing globals (theme, user session, language).",
      "Every Context consumer re-renders on any value change — bad for high-frequency state.",
      "useReducer mirrors Redux's reducer pattern without any external library.",
      "Full Redux adds time-travel debugging, middleware, and selectors.",
      "Rule: use Context for 'who are you', use Redux/Zustand for 'what is happening'."
    ]
  },

  // ─── Q16: Class lifecycle ───
  16: {
    code: `import React, { Component } from 'react';

// Three lifecycle phases mapped clearly
export default class LifecycleDemo extends Component<{}, { ticks: number }> {
  private id: ReturnType<typeof setInterval> | null = null;
  state = { ticks: 0 };

  // ── MOUNT: component just appeared in the DOM
  componentDidMount() {
    console.log('MOUNT: set up subscriptions, fetch initial data');
    this.id = setInterval(() => this.setState(s => ({ ticks: s.ticks + 1 })), 1000);
  }

  // ── UPDATE: state or props changed
  componentDidUpdate(_pp: {}, prevState: { ticks: number }) {
    if (this.state.ticks !== prevState.ticks && this.state.ticks === 5) {
      console.log('UPDATE: ticks reached 5 — could fetch new data here');
    }
  }

  // ── UNMOUNT: component about to be removed — CRITICAL cleanup
  componentWillUnmount() {
    console.log('UNMOUNT: clear timers, cancel subscriptions to prevent memory leaks');
    if (this.id) clearInterval(this.id);
  }

  render() { return <p>Ticks: {this.state.ticks} (watch console)</p>; }
}`,
    walkthrough: [
      "componentDidMount fires once after first render — the safe place to fetch data or start timers.",
      "componentDidUpdate fires after every update; compare prev vs current to avoid infinite loops.",
      "componentWillUnmount is the CRITICAL cleanup phase — always clear intervals and subscriptions.",
      "Forgetting cleanup in componentWillUnmount causes memory leaks that persist even after unmount.",
      "In modern React these three methods map to a single useEffect with a dependency array."
    ]
  },

  // ─── Q17: How hooks work internally ──────────────────────────────────────────
  17: {
    code: `import React, { useState, useEffect, useRef } from 'react';

// React internally maintains a LINKED LIST of hook calls for each component fiber.
// The ORDER of hook calls must be identical on every render — hence the Rules of Hooks.

export default function HooksOrderDemo() {
  // Hook #1 (index 0 in fiber list)
  const [name, setName] = useState('React');
  // Hook #2 (index 1)
  const [count, setCount] = useState(0);
  // Hook #3 (index 2)
  const renderCount = useRef(0);
  // Hook #4 (index 3)
  useEffect(() => { renderCount.current += 1; });

  // ❌ ILLEGAL — never put hooks inside conditions or loops:
  // if (count > 0) { const [x, setX] = useState(0); }  // breaks fiber index ordering!

  return (
    <div style={{ padding: 16, fontFamily: 'monospace' }}>
      <p>Name: {name} | Count: {count} | Renders: {renderCount.current}</p>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
// React identifies each hook by its POSITION in the call list, not by name.
// Conditional hooks shift all subsequent indices → wrong state read → bugs.`,
    walkthrough: [
      "Each component fiber has a linked list; React tracks hooks by their call ORDER, not name.",
      "Hook #0 = useState('React'), Hook #1 = useState(0), Hook #2 = useRef — always this order.",
      "If count>5 conditionally skips useState, Hook #2 shifts to index 1 → reads wrong value.",
      "This is why the Rules of Hooks forbid conditional, looped, or nested hook calls.",
      "The linter rule 'react-hooks/rules-of-hooks' catches violations at compile time."
    ]
  },

  // ─── Q18: useEffect ───
  18: {
    code: `import React, { useState, useEffect } from 'react';

export default function EffectPatterns() {
  const [query, setQuery] = useState('react');
  const [result, setResult] = useState('');

  // ── Pattern 1: runs EVERY render (no dep array)
  useEffect(() => { document.title = \`Search: \${query}\`; });

  // ── Pattern 2: runs ONCE on mount (empty dep array)
  useEffect(() => { console.log('Component mounted'); return () => console.log('Unmounted'); }, []);

  // ── Pattern 3: runs when 'query' changes + cleanup cancels stale fetch
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(\`https://api.example.com/search?q=\${query}\`, { signal: ctrl.signal })
      .then(r => r.json()).then(d => setResult(JSON.stringify(d).slice(0, 60) + '...'))
      .catch(e => { if (e.name !== 'AbortError') setResult('Error'); });
    return () => ctrl.abort(); // cleanup: cancel inflight request if query changes
  }, [query]);

  return (
    <div style={{ padding: 16 }}>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <p style={{ fontSize: 12 }}>{result}</p>
    </div>
  );
}`,
    walkthrough: [
      "No dep array → effect runs after EVERY render (use for document.title, analytics).",
      "Empty [] → effect runs once after mount, cleanup runs on unmount.",
      "[query] → effect re-runs only when query changes; stale fetches are cancelled via AbortController.",
      "The cleanup function returned prevents memory leaks and race conditions.",
      "Never write async directly in useEffect; define an inner async function and call it."
    ]
  },

  // ─── Q19: Fetching data with hooks ───────────────────────────────────────────
  19: {
    code: `import React, { useState, useEffect } from 'react';

// Generic custom fetch hook — the right way to fetch in hooks
function useFetch<T>(url: string) {
  const [data,    setData]    = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(\`HTTP \${r.status}\`); return r.json(); })
      .then(d  => { if (active) { setData(d); setLoading(false); } })
      .catch(e => { if (active) { setError(e.message); setLoading(false); } });
    return () => { active = false; }; // prevent state update after unmount
  }, [url]);

  return { data, loading, error };
}

export default function UserCard() {
  const { data, loading, error } = useFetch<{ name: string; email: string }>('https://jsonplaceholder.typicode.com/users/1');
  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>;
  return <div><p><b>{data?.name}</b></p><p>{data?.email}</p></div>;
}`,
    walkthrough: [
      "Encapsulate fetch logic in a custom hook (useFetch) — reuse across any component.",
      "Three state variables (data, loading, error) cover all UI states of an async operation.",
      "The 'active' flag prevents state updates after the component has unmounted.",
      "useEffect re-runs whenever the url dependency changes — new URL = new fetch.",
      "Libraries like React Query / SWR automate caching, retries, and background refetching."
    ]
  },

  // ─── Q20: Rules of hooks ─────────────────────────────────────────────────────
  20: {
    code: `import React, { useState, useEffect } from 'react';

export default function RulesDemo({ showExtra }: { showExtra: boolean }) {
  // ✅ RULE 1: Call hooks at the TOP LEVEL of the component
  const [count, setCount] = useState(0);
  const [name,  setName]  = useState('');

  // ✅ RULE 2: Only call hooks from React function components or custom hooks
  useEffect(() => { document.title = \`Count: \${count}\`; }, [count]);

  // ❌ WRONG — NEVER inside an if block (shifts hook indices):
  // if (showExtra) { const [x, setX] = useState(0); }

  // ❌ WRONG — NEVER inside a loop:
  // for (let i = 0; i < 3; i++) { const [v, sv] = useState(i); }

  // ❌ WRONG — NEVER inside a nested function:
  // const helper = () => { const [v, sv] = useState(0); };

  // ✅ CORRECT — conditional RENDERING is fine; only hooks must be unconditional:
  return (
    <div style={{ padding: 16 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {showExtra && <p>Conditional UI — this is fine, hooks run unconditionally above.</p>}
    </div>
  );
}`,
    walkthrough: [
      "Rule 1: Call hooks at the top level — never inside if/else, loops, or nested functions.",
      "Rule 2: Call hooks only from React functional components or custom hooks (not plain JS).",
      "Conditional RENDERING inside JSX is completely fine; only the HOOKS must be unconditional.",
      "The ESLint plugin 'eslint-plugin-react-hooks' enforces both rules automatically.",
      "These rules exist because React identifies each hook by its position in the call order list."
    ]
  },

  // ─── Q21: How props work ──────────────────────────────────────────────────────
  21: {
    code: `import React from 'react';

// Props are IMMUTABLE inputs passed from parent to child — like function arguments.
interface AlertCardProps {
  title:   string;
  message: string;
  variant: 'info' | 'warning' | 'error';
  onDismiss?: () => void; // optional callback prop
}

const colors = { info: '#2563eb', warning: '#d97706', error: '#dc2626' };

function AlertCard({ title, message, variant, onDismiss }: AlertCardProps) {
  // ❌ props.message = 'changed'; // TypeError! Props are read-only.
  return (
    <div style={{ padding: 12, borderLeft: \`4px solid \${colors[variant]}\`, background: '#f9fafb', marginBottom: 8 }}>
      <strong style={{ color: colors[variant] }}>{title}</strong>
      <p style={{ margin: '4px 0', fontSize: 13 }}>{message}</p>
      {onDismiss && <button onClick={onDismiss} style={{ fontSize: 11 }}>✕ Dismiss</button>}
    </div>
  );
}

export default function App() {
  const [show, setShow] = React.useState(true);
  return (
    <div style={{ padding: 16 }}>
      <AlertCard title="Info"    message="React 19 released"    variant="info" />
      <AlertCard title="Warning" message="Bundle size increased" variant="warning" />
      {show && <AlertCard title="Error" message="API call failed" variant="error" onDismiss={() => setShow(false)} />}
    </div>
  );
}`,
    walkthrough: [
      "Props are the component's public API — defined via a TypeScript interface.",
      "Props flow in ONE direction only: parent → child. Children cannot mutate them.",
      "Optional props use ? and should be handled with defaults or conditional rendering.",
      "Callback props (onDismiss) let children communicate events upward to parents.",
      "TypeScript interfaces catch incorrect prop types at compile time before any runtime error."
    ]
  },

  // ─── Q22: Prop drilling ───────────────────────────────────────────────────────
  22: {
    code: `import React, { createContext, useContext, useState } from 'react';

// ── PROBLEM: drilling 'user' through intermediate components that don't need it
// Grandparent → Parent (doesn't use user) → Child (uses user) = PROP DRILLING ❌

// ── SOLUTION: Context API as a shared pipe bypassing intermediate nodes
const UserCtx = createContext<{ name: string; role: string } | null>(null);

function DeepChild() {
  // Reads context directly — no prop needed from any ancestor
  const user = useContext(UserCtx)!;
  return (
    <div style={{ padding: 8, background: '#f0fdf4', borderRadius: 4, fontSize: 13 }}>
      Hello, <strong>{user.name}</strong> [{user.role}]
    </div>
  );
}

function MiddleLayer() {
  // This component doesn't need 'user' at all — not even in its props signature
  return <div style={{ padding: 8, border: '1px dashed #ccc' }}><p style={{fontSize:12}}>Middle (no user prop needed!)</p><DeepChild /></div>;
}

export default function App() {
  const [user] = useState({ name: 'Lavneet', role: 'Admin' });
  return (
    <UserCtx.Provider value={user}>
      <MiddleLayer />
    </UserCtx.Provider>
  );
}`,
    walkthrough: [
      "Prop drilling: passing props through layers that only forward them — clutters APIs.",
      "createContext creates a channel; Provider wraps the tree with the shared value.",
      "DeepChild consumes the context directly — no prop from MiddleLayer required.",
      "MiddleLayer's function signature stays clean — it's completely unaware of 'user'.",
      "For high-frequency state, prefer Zustand; Context re-renders ALL consumers on change."
    ]
  },

  // ─── Q23: Context API ───
  23: {
    code: `import React, { createContext, useContext, useState } from 'react';

// Full Context pattern: create → provide → consume with a custom hook
interface Auth { userId: string; email: string; logout: () => void; }
const AuthCtx = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState('user-123');
  const logout = () => { setUserId(''); alert('Logged out'); };
  if (!userId) return <p>Please log in.</p>;
  return (
    <AuthCtx.Provider value={{ userId, email: 'dev@damora.ai', logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

// Custom hook provides null-safety and a clean consumption API
function useAuth(): Auth {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

function Header() {
  const { email, logout } = useAuth();
  return (
    <header style={{ padding: 12, background: '#1e1e1c', color: '#f4efe6', display:'flex', justifyContent:'space-between' }}>
      <span>{email}</span>
      <button onClick={logout} style={{ fontSize: 12 }}>Logout</button>
    </header>
  );
}

export default function App() {
  return <AuthProvider><Header /></AuthProvider>;
}`,
    walkthrough: [
      "createContext<Auth | null>(null) — the generic ensures TypeScript knows the shape.",
      "AuthProvider owns the state and exposes it through AuthCtx.Provider's value prop.",
      "The custom useAuth hook throws if used outside the provider — fast, clear error.",
      "Header reads email and logout directly — no prop drilling through intermediate layers.",
      "Changing userId in the provider re-renders all consumers of AuthCtx automatically."
    ]
  },

  // ─── Q24: Render props ────────────────────────────────────────────────────────
  24: {
    code: `import React, { useState } from 'react';

// The render-prop component manages state; the CALLER controls the visual output.
function MouseTracker({ render }: { render: (pos: { x: number; y: number }) => React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
      style={{ height: 150, background: '#f1f5f9', borderRadius: 8, position: 'relative', cursor: 'crosshair' }}>
      {render(pos)} {/* caller decides what to show */}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h4>Hover over the boxes:</h4>
      {/* Usage 1: coordinates text */}
      <MouseTracker render={({ x, y }) => (
        <p style={{ position: 'absolute', top: 8, left: 8, fontFamily: 'monospace', fontSize: 13 }}>
          x:{x} y:{y}
        </p>
      )} />
      {/* Usage 2: a dot that follows the mouse */}
      <MouseTracker render={({ x, y }) => (
        <div style={{ width: 12, height: 12, background: '#7c3aed', borderRadius: '50%',
                      position: 'fixed', left: x - 6, top: y - 6, pointerEvents: 'none' }} />
      )} />
    </div>
  );
}`,
    walkthrough: [
      "MouseTracker encapsulates mouse-position logic; the 'render' prop is a function returning JSX.",
      "The caller controls what is rendered — text, a dot, a tooltip — without forking the logic.",
      "This separates WHAT logic runs (tracking) from HOW output looks (rendering).",
      "Modern React often replaces render props with custom hooks (useMousePosition) for clarity.",
      "The pattern is still valuable in libraries (Downshift, React Table) for maximum flexibility."
    ]
  },

  // ─── Q25: Children prop ───────────────────────────────────────────────────────
  25: {
    code: `import React from 'react';

// 'children' is a special built-in prop — whatever you nest between tags.
function Card({ title, children, footer }: {
  title:    string;
  children: React.ReactNode; // any JSX, text, components — anything
  footer?:  React.ReactNode;
}) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', maxWidth: 280 }}>
      <div style={{ padding: '10px 14px', background: '#1e1e1c', color: '#f4efe6', fontWeight: 700 }}>{title}</div>
      <div style={{ padding: 14 }}>{children}</div>
      {footer && <div style={{ padding: '8px 14px', background: '#f9fafb', fontSize: 12, borderTop: '1px solid #e5e7eb' }}>{footer}</div>}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 16, display: 'flex', gap: 12 }}>
      <Card title="Interview Tip" footer={<span>React Chapter 1</span>}>
        <p style={{ fontSize: 13, margin: 0 }}>JSX compiles to React.createElement().</p>
        <p style={{ fontSize: 13 }}>Babel handles the transformation.</p>
      </Card>
      <Card title="Quick Note">
        <ul style={{ fontSize: 13, margin: 0 }}>
          <li>children can be any React node</li>
          <li>Even other components!</li>
        </ul>
      </Card>
    </div>
  );
}`,
    walkthrough: [
      "'children' is implicitly passed — everything between <Card> and </Card> tags.",
      "React.ReactNode is the correct TypeScript type for children — accepts JSX, strings, arrays.",
      "Typing children as 'React.ReactNode' keeps slot content type-safe.",
      "Optional slots (footer?) let callers compose flexible layouts without forking components.",
      "This is React's primary composition primitive — prefer it over HOCs for layout wrapping."
    ]
  },

  // ─── Q26: Performance optimization importance ─────────────────────────────────
  26: {
    code: `import React, { useState, Profiler } from 'react';

// React's built-in <Profiler> component measures render costs
function onRender(id: string, phase: string, actualDuration: number) {
  console.log(\`[\${id}] \${phase} took \${actualDuration.toFixed(2)}ms\`);
}

// An intentionally expensive list render
function SlowList({ count }: { count: number }) {
  // Simulate blocking work (never do this in real code!)
  const start = performance.now();
  while (performance.now() - start < 50) {} // artificial 50ms block
  return <ul>{Array.from({ length: count }, (_, i) => <li key={i}>Item {i}</li>)}</ul>;
}

export default function PerformanceImportance() {
  const [count, setCount] = useState(5);
  const [unrelated, setUnrelated] = useState(0);

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => setUnrelated(u => u + 1)}>Unrelated re-render: {unrelated}</button>
      {/* Every click above also re-renders SlowList — open console to see the cost */}
      <Profiler id="SlowList" onRender={onRender}>
        <SlowList count={count} />
      </Profiler>
      <p style={{ fontSize: 12, color: '#6b7280' }}>Wrap SlowList in React.memo to prevent unrelated re-renders.</p>
    </div>
  );
}`,
    walkthrough: [
      "<Profiler> is React's built-in tool for measuring component render duration.",
      "Clicking 'Unrelated re-render' also re-renders SlowList — showing the cascade problem.",
      "The 50ms block simulates expensive work (large list transformations, heavy computations).",
      "React DevTools Profiler (browser extension) gives a visual flame graph of render costs.",
      "Solutions: React.memo, useMemo, code-splitting, virtualization for very long lists."
    ]
  },

  // ─── Q27: React.memo ──────────────────────────────────────────────────────────
  27: {
    code: `import React, { useState, memo, useCallback } from 'react';

// Without memo: re-renders every time the parent re-renders (even with same props)
const ExpensiveChart = memo(function ExpensiveChart({ data }: { data: number[] }) {
  console.log('Chart rendered — should be rare!');
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 60 }}>
      {data.map((v, i) => (
        <div key={i} style={{ width: 12, height: (v / max) * 60, background: '#7c3aed' }} />
      ))}
    </div>
  );
});

export default function Dashboard() {
  const [ticker, setTicker] = useState(0);
  const [data] = useState([40, 80, 60, 90, 30, 70]);

  // useCallback ensures the reference stays stable → memo comparison passes
  const handleClick = useCallback(() => { /* chart interaction */ }, []);

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => setTicker(t => t + 1)}>Tick: {ticker}</button>
      <p style={{ fontSize: 12, color: '#6b7280' }}>
        Chart below only re-renders if 'data' or 'handleClick' change — not on every tick.
      </p>
      <ExpensiveChart data={data} />
    </div>
  );
}`,
    walkthrough: [
      "React.memo wraps a component and shallow-compares its props before re-rendering.",
      "If props references are identical, the previous render result is reused — skipping work.",
      "Without memo, every parent re-render (tick++) triggers ExpensiveChart to re-run.",
      "useCallback stabilises function references so memo's shallow comparison passes.",
      "Don't over-memoize: memo has overhead itself — only use it when profiling confirms a win."
    ]
  },

  // ─── Q28: PureComponent ───────────────────────────────────────────────────────
  28: {
    code: `import React, { Component, PureComponent } from 'react';

// React.Component re-renders whenever parent renders (even if props are identical)
class NormalRow extends Component<{ label: string }> {
  render() {
    console.log('NormalRow rendered:', this.props.label);
    return <p style={{ margin: 4, fontSize: 13 }}>{this.props.label}</p>;
  }
}

// React.PureComponent does a SHALLOW prop/state comparison before rendering
class PureRow extends PureComponent<{ label: string }> {
  render() {
    console.log('PureRow rendered:', this.props.label);
    return <p style={{ margin: 4, fontSize: 13, color: '#16a34a' }}>{this.props.label}</p>;
  }
}

export default class App extends Component<{}, { counter: number }> {
  state = { counter: 0 };
  render() {
    return (
      <div style={{ padding: 16 }}>
        <button onClick={() => this.setState(s => ({ counter: s.counter + 1 }))}>
          Counter: {this.state.counter} (watch console)
        </button>
        <p style={{ fontSize: 12, color: '#6b7280' }}>Same prop 'Hooks' passed on every render:</p>
        <NormalRow label="Hooks" />  {/* re-renders on every click */}
        <PureRow   label="Hooks" />  {/* skips re-render — prop didn't change */}
      </div>
    );
  }
}`,
    walkthrough: [
      "React.Component renders unconditionally when parent state/props change.",
      "PureComponent implements shouldComponentUpdate with a shallow prop+state comparison.",
      "If no props or state values changed, PureComponent skips render — saving work.",
      "Shallow comparison: primitives by value, objects/arrays by REFERENCE (not deep equality).",
      "PureComponent is the class equivalent of memo(); both have the same shallow-compare caveat."
    ]
  },

  // ─── Q29: Reconciliation ──────────────────────────────────────────────────────
  29: {
    code: `import React, { useState } from 'react';

// React's reconciliation algorithm uses KEYS to identify list items across renders.
// Without stable keys, React may destroy and recreate DOM nodes unnecessarily.

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

export default function ReconciliationDemo() {
  const [list, setList] = useState(fruits);

  const shuffle = () => setList(prev => [...prev].sort(() => Math.random() - 0.5));
  const remove  = () => setList(prev => prev.slice(1));

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={shuffle}>Shuffle</button>
        <button onClick={remove}>Remove First</button>
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: '#dc2626' }}>❌ Index as key (problematic — focus/state gets misassigned on reorder):</p>
      {list.map((f, i) => <input key={i} defaultValue={f} style={{ display: 'block', marginBottom: 4, fontSize: 13 }} />)}

      <p style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', marginTop: 12 }}>✅ Stable string key (correct — React correctly maps nodes):</p>
      {list.map(f => <input key={f} defaultValue={f} style={{ display: 'block', marginBottom: 4, fontSize: 13 }} />)}
    </div>
  );
}`,
    walkthrough: [
      "Reconciliation is React's O(n) algorithm for comparing old vs new VDOM trees.",
      "Keys help React identify which items moved, were added, or were removed.",
      "Using index as key: after shuffle, React thinks items shifted positions → mismatches state.",
      "Stable string key (fruit name): React correctly tracks each element across reorders.",
      "Different element types (div → span) cause React to unmount + remount the full subtree."
    ]
  },

  // ─── Q30: Prevent re-renders ──────────────────────────────────────────────────
  30: {
    code: `import React, { useState, useMemo, useCallback, memo } from 'react';

// Three tools working together: memo + useMemo + useCallback
const SortedList = memo(function SortedList({ items, onPick }: { items: string[]; onPick: (s: string) => void }) {
  console.log('SortedList rendered'); // should only appear when items/onPick actually change
  return (
    <ul style={{ fontSize: 13 }}>
      {items.map(i => <li key={i} onClick={() => onPick(i)} style={{ cursor: 'pointer' }}>{i}</li>)}
    </ul>
  );
});

export default function SearchPanel() {
  const [query,    setQuery]    = useState('');
  const [selected, setSelected] = useState('');
  const [counter,  setCounter]  = useState(0); // unrelated state

  const rawData = ['React', 'Redux', 'Router', 'Refs', 'Reconciliation', 'Render props'];

  // useMemo: recompute sorted+filtered array only when query changes
  const filtered = useMemo(() =>
    rawData.filter(d => d.toLowerCase().includes(query.toLowerCase())).sort(),
  [query]);

  // useCallback: stable function reference so memo's comparison passes
  const handlePick = useCallback((s: string) => setSelected(s), []);

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => setCounter(c => c + 1)}>Unrelated counter: {counter}</button>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter..." style={{ display:'block', margin:'8px 0' }} />
      {selected && <p style={{ fontSize: 12 }}>Selected: <b>{selected}</b></p>}
      <SortedList items={filtered} onPick={handlePick} />
    </div>
  );
}`,
    walkthrough: [
      "memo: SortedList only re-renders if items or onPick references actually change.",
      "useMemo: filtered array is recomputed only when query changes — not on every counter tick.",
      "useCallback: handlePick reference is stable across renders so memo's check passes.",
      "Without useCallback, a new function is created every render → memo's comparison fails.",
      "Profile first! These optimisations add complexity — apply them where profiling shows gains."
    ]
  },

  // ─── Q31: Styles in React ─────────────────────────────────────────────────────
  31: {
    code: `import React, { useState } from 'react';
// import styles from './Button.module.css'; // CSS Modules — locally scoped class names

export default function StyleMethodsDemo() {
  const [active, setActive] = useState(false);

  // 1. Inline style object — camelCase properties, no external file
  const inlineStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: active ? '#7c3aed' : '#e5e7eb',
    color: active ? '#fff' : '#111',
    transition: 'all 0.2s',
  };

  // 2. className string — maps to a CSS/SCSS/Tailwind class
  const tailwindClass = \`px-4 py-2 rounded font-bold \${active ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}\`;

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      {/* Method 1: Inline styles (dynamic, no build tooling needed) */}
      <button style={inlineStyle} onClick={() => setActive(a => !a)}>
        Inline Style Toggle
      </button>

      {/* Method 2: Tailwind (if configured — utility classes) */}
      {/* <button className={tailwindClass} onClick={() => setActive(a => !a)}>Tailwind</button> */}

      {/* Method 3: CSS Module (import styles from './Button.module.css') */}
      {/* <button className={styles.btn}>CSS Module</button> */}
    </div>
  );
}`,
    walkthrough: [
      "Inline styles use a JS object with camelCase properties — good for dynamic values.",
      "Global CSS/SCSS classes work exactly like web CSS but risk class name conflicts.",
      "CSS Modules (Button.module.css) scope class names locally to the component automatically.",
      "Tailwind CSS uses utility classes — no custom CSS, very fast to write, popular in 2024.",
      "CSS-in-JS (styled-components, Emotion) co-locates styles with component logic in JS."
    ]
  },

  // ─── Q32: CSS-in-JS ───────────────────────────────────────────────────────────
  32: {
    code: `// CSS-in-JS: styles are JS objects/template literals scoped to a component.
// Example using the 'emotion' CSS-in-JS approach (conceptual — library not installed here)
import React, { useState } from 'react';

// Simulating CSS-in-JS: using style objects (same principle, no extra library)
const createStyles = (variant: 'primary' | 'danger') => ({
  button: {
    padding: '8px 18px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 13,
    background: variant === 'primary' ? '#2563eb' : '#dc2626',
    color: '#fff',
    transition: 'opacity 0.2s',
  } as React.CSSProperties
});

export default function CssInJsDemo() {
  const [variant, setVariant] = useState<'primary' | 'danger'>('primary');
  const styles = createStyles(variant);

  return (
    <div style={{ padding: 16 }}>
      <p style={{ fontSize: 12, color: '#6b7280' }}>
        In CSS-in-JS (styled-components / emotion), styles are scoped to the component,
        computed at runtime, and can use props/state to generate dynamic CSS class names.
      </p>
      <button style={styles.button}>I am a {variant} button</button>
      <button onClick={() => setVariant(v => v === 'primary' ? 'danger' : 'primary')}
        style={{ marginLeft: 8, fontSize: 12, padding: '4px 8px' }}>
        Toggle Variant
      </button>
    </div>
  );
}
// Real styled-components: const Btn = styled.button\`background: \${p => p.primary ? 'blue' : 'red'}\`;`,
    walkthrough: [
      "CSS-in-JS writes CSS inside JavaScript, co-locating styles with component logic.",
      "Styles are dynamically generated based on props or state — no global CSS overrides.",
      "Libraries like styled-components generate unique hashed class names at runtime.",
      "Benefits: zero class name conflicts, dead code elimination, dynamic theming.",
      "Drawbacks: runtime overhead, larger bundle, and server-side rendering complexity."
    ]
  },

  // ─── Q33: Styled-Components ───────────────────────────────────────────────────
  33: {
    code: `// styled-components example (illustrative — requires: npm i styled-components)
// import styled, { ThemeProvider } from 'styled-components';

// const theme = { primary: '#7c3aed', bg: '#0f172a', text: '#f1f5f9' };

// const Card = styled.div\`
//   padding: 20px;
//   background: \${p => p.theme.bg};
//   border-radius: 10px;
//   border: 1px solid rgba(255,255,255,0.1);
// \`;

// const Title = styled.h2\`
//   color: \${p => p.theme.primary};
//   font-size: 1.2rem;
//   margin: 0 0 8px;
// \`;

// const Chip = styled.span<{ active?: boolean }>\`
//   padding: 3px 10px;
//   border-radius: 20px;
//   font-size: 12px;
//   background: \${p => p.active ? p.theme.primary : 'rgba(255,255,255,0.1)'};
//   color: \${p => p.theme.text};
// \`;

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Card>
//         <Title>Damora AI Dashboard</Title>
//         <Chip active>Active tenant</Chip>
//         <Chip>Offline tenant</Chip>
//       </Card>
//     </ThemeProvider>
//   );
// }

// WHAT HAPPENS UNDER THE HOOD:
// 1. styled-components parses the template literal CSS.
// 2. Generates a unique class name e.g. 'sc-aXB31f'.
// 3. Injects a <style> tag with that class into <head>.
// 4. Returns a React component rendering a div with className='sc-aXB31f'.

export {};`,
    walkthrough: [
      "styled.div, styled.button etc. — tagged template literal creates a styled React component.",
      "Props accessed inside template literals allow dynamic style rules without inline style objects.",
      "ThemeProvider injects a 'theme' object into all styled-components via React Context.",
      "Each component gets a unique hashed className injected into a <style> block in <head>.",
      "The Chip generic preserves TypeScript prop types for your styled component."
    ]
  },

  // ─── Q34: Sass/LESS ───────────────────────────────────────────────────────────
  34: {
    code: `// Sass (.scss) in a React/Vite project
// Install: npm install sass
// Vite supports .scss imports out of the box after installing the sass package.

// ── src/styles/variables.scss
// $primary: #7c3aed;
// $radius: 8px;
// $spacing: 16px;

// ── src/components/Button.module.scss (CSS Module for scoping)
// .btn {
//   padding: 8px 18px;
//   border-radius: $radius;
//   background: $primary;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   font-weight: 700;
//   transition: filter 0.2s;
//
//   &:hover { filter: brightness(1.1); }       // nesting
//   &--danger { background: #dc2626; }         // BEM modifier
//
//   @media (max-width: 640px) {
//     padding: 6px 12px;
//     font-size: 13px;
//   }
// }

// ── Component usage:
// import styles from './Button.module.scss';
// <button className={styles.btn}>Primary</button>
// <button className={\`\${styles.btn} \${styles['btn--danger']}\`}>Danger</button>

// WHY SASS?
// Variables, nesting, mixins, @extend, @use — all missing from plain CSS.
// CSS Modules scope class names locally — no more global conflicts.

export {};`,
    walkthrough: [
      "Sass adds variables ($primary), nesting (&:hover), mixins, and @use module imports.",
      "The & parent selector enables BEM modifier classes like .btn--danger without repetition.",
      "CSS Modules scope class names locally — no global stylesheet conflicts.",
      "Vite compiles .scss at build time — zero runtime cost; just standard CSS in production.",
      "CSS Custom Properties are now powerful; Sass is most useful for mixins and nesting."
    ]
  },

  // ─── Q35: Inline styles ───────────────────────────────────────────────────────
  35: {
    code: `import React, { useState } from 'react';

// Inline style properties are camelCased
export default function InlineStyleDemo() {
  const [hue, setHue] = useState(260); // dynamic — great fit for inline styles

  const dynamicCard: React.CSSProperties = {
    padding: 20,
    background: \`hsl(\${hue}, 70%, 20%)\`,
    color: \`hsl(\${hue}, 90%, 90%)\`,
    borderRadius: 10,
    border: \`2px solid hsl(\${hue}, 60%, 40%)\`,
    transition: 'all 0.3s',
    maxWidth: 300,
  };

  return (
    <div style={{ padding: 16 }}>
      <label style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>
        Hue: {hue}°
        <input type="range" min={0} max={360} value={hue}
          onChange={e => setHue(+e.target.value)} style={{ width: '100%' }} />
      </label>
      <div style={dynamicCard}>
        Hue-driven dynamic card.
        <p style={{ fontSize: 12, marginTop: 8 }}>
          Use inline styles for values that change at runtime (user input, animations).
          Use CSS classes for static, reusable styles.
        </p>
      </div>
    </div>
  );
}`,
    walkthrough: [
      "React inline styles take a JS object — properties are camelCase (borderRadius, not border-radius).",
      "Numbers without units are automatically treated as 'px' for supported properties.",
      "Dynamic values (hue from slider) are the perfect use case for inline styles.",
      "React.CSSProperties TypeScript type gives autocomplete and validates property names.",
      "Avoid inline styles for static values — use CSS classes to avoid repeated object allocation."
    ]
  },

  // ─── Q36: React Router ────────────────────────────────────────────────────────
  36: {
    code: `// React Router v6 — declarative client-side routing
// npm install react-router-dom

import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

function Home()    { return <h2>🏠 Home</h2>; }
function About()   { return <h2>ℹ️ About</h2>; }
function NotFound(){ return <h2>404 — Page not found</h2>; }

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 12, padding: '8px 16px', background: '#1e1e1c' }}>
      {/* NavLink adds 'active' class/style automatically */}
      {[['/', 'Home'], ['/about', 'About']].map(([to, label]) => (
        <NavLink key={to} to={to}
          style={({ isActive }) => ({ color: isActive ? '#d97706' : '#f4efe6', fontWeight: isActive ? 700 : 400 })}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/"       element={<Home />}     />
          <Route path="/about"  element={<About />}    />
          <Route path="*"       element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}`,
    walkthrough: [
      "BrowserRouter uses the HTML5 History API — no page refreshes, just URL updates.",
      "Routes wraps all Route elements; only the first matching path renders.",
      "NavLink differs from Link by applying an 'active' style/class to the current route.",
      "path='*' is a wildcard catch-all for 404 pages — must be listed last.",
      "React Router v6 removed Switch — Routes is smarter and picks the best match."
    ]
  },

  // ─── Q37: Dynamic routes ──────────────────────────────────────────────────────
  37: {
    code: `import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// Dynamic segment ':questionId' matches any value in that URL position
function QuestionDetail() {
  const { questionId } = useParams<{ questionId: string }>();
  const questions: Record<string, string> = {
    '1': 'What is React?',
    '2': 'Explain useState.',
    '3': 'What is the Virtual DOM?',
  };
  const text = questions[questionId!] ?? 'Question not found';
  return (
    <div style={{ padding: 16 }}>
      <h3>Q{questionId}: {text}</h3>
      <Link to="/">← Back to list</Link>
    </div>
  );
}

function QuestionList() {
  return (
    <ul style={{ padding: 16 }}>
      {[1, 2, 3].map(id => (
        <li key={id}><Link to={\`/questions/\${id}\`}>Question {id}</Link></li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<QuestionList />} />
        <Route path="/questions/:questionId" element={<QuestionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    walkthrough: [
      "':questionId' is a URL parameter — any value at that path position is captured.",
      "useParams() returns an object with the named parameter values as strings.",
      "TypeScript generic <{ questionId: string }> types the useParams return value.",
      "When the URL is /questions/2, questionId === '2' — use parseInt for numeric IDs.",
      "Pair with useEffect to fetch data from an API based on the captured ID."
    ]
  },

  // ─── Q38: Pass data to routes ─────────────────────────────────────────────────
  38: {
    code: `import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useSearchParams, useLocation } from 'react-router-dom';

function QuestionPage() {
  // 1. URL Params: /questions/42
  const { id } = useParams<{ id: string }>();

  // 2. Query string: /questions/42?tab=hints&difficulty=advanced
  const [searchParams] = useSearchParams();
  const tab        = searchParams.get('tab')        ?? 'answer';
  const difficulty = searchParams.get('difficulty') ?? 'beginner';

  // 3. Location state: passed via <Link state={{ fromDashboard: true }}>
  const location = useLocation();
  const fromDash = (location.state as any)?.fromDashboard ?? false;

  return (
    <div style={{ padding: 16, fontFamily: 'monospace', fontSize: 13 }}>
      <p>Question ID (param): <b>{id}</b></p>
      <p>Active tab (query):  <b>{tab}</b></p>
      <p>Difficulty (query):  <b>{difficulty}</b></p>
      <p>From dashboard:      <b>{String(fromDash)}</b></p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Link to="/questions/42?tab=hints&difficulty=advanced" state={{ fromDashboard: true }}>
        Open Q42 with query params + state
      </Link>
      <Routes>
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/" element={<div style={{padding:16}}>Click the link above</div>} />
      </Routes>
    </BrowserRouter>
  );
}`,
    walkthrough: [
      "URL params (:id) are part of the path — bookmarkable, shareable links.",
      "Query strings (?tab=hints) are read via the useSearchParams hook — also bookmarkable.",
      "Location state is passed via Link's 'state' prop — NOT in the URL, lost on page refresh.",
      "useLocation().state reads the state object; always cast it since it's typed as 'unknown'.",
      "Choose params for IDs, query strings for filters/pagination, state for ephemeral UI context."
    ]
  },

  // ─── Q39: Programmatic navigation ────────────────────────────────────────────
  39: {
    code: `import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // returns an imperative navigation function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { alert('Invalid email'); return; }

    // Simulate API login call
    await new Promise(r => setTimeout(r, 500));

    // Navigate programmatically after successful login
    navigate('/dashboard', {
      replace: true,              // replaces history entry (back button won't return here)
      state: { user: email },     // pass data to the destination route
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 16 }}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
      <button type="submit" style={{ marginLeft: 8 }}>Login</button>
    </form>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <h3>Dashboard</h3>
      <button onClick={() => navigate(-1)}>← Back</button>        {/* go back in history */}
      <button onClick={() => navigate('/')} style={{ marginLeft: 8 }}>Home</button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    walkthrough: [
      "useNavigate() returns a function for imperative navigation — use after async operations.",
      "navigate('/dashboard') pushes a new entry onto the history stack.",
      "replace: true swaps the current history entry — back button skips the login page.",
      "navigate(-1) goes back one step; navigate(1) goes forward — like browser arrow buttons.",
      "In v5 this was useHistory(); v6 replaced it with the cleaner useNavigate()."
    ]
  },

  // ─── Q40: Route guards ────────────────────────────────────────────────────────
  40: {
    code: `import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';

// Simulated auth hook
function useAuth() {
  // In real apps: read from Context / localStorage / cookie
  return { isAuthenticated: false, role: 'viewer' };
}

// Guard 1: Authentication check
function RequireAuth() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }
  return <Outlet />; // renders the protected child route
}

// Guard 2: Role-based access
function RequireRole({ role }: { role: string }) {
  const auth = useAuth();
  if (!auth.isAuthenticated || auth.role !== role) {
    return <Navigate to="/forbidden" replace />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"     element={<p style={{padding:16}}>Login page</p>} />
        <Route path="/forbidden" element={<p style={{padding:16}}>403 Forbidden</p>} />

        {/* All routes inside RequireAuth are protected */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<p style={{padding:16}}>Dashboard (auth required)</p>} />

          {/* Nested: requires both auth AND admin role */}
          <Route element={<RequireRole role="admin" />}>
            <Route path="/admin" element={<p style={{padding:16}}>Admin panel</p>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`,
    walkthrough: [
      "RequireAuth wraps protected routes — unauthenticated users are redirected to /login.",
      "Navigate with replace:true prevents users from using the back button to bypass login.",
      "Outlet renders the matched child route — the guard is a layout-level wrapper.",
      "RequireRole adds a second layer of protection based on user permissions.",
      "Route nesting composes guards cleanly — no conditional rendering scattered in every component."
    ]
  },

  // ─── Q41: Higher-Order Components ────────────────────────────────────────────
  41: {
    code: `import React, { ComponentType, useEffect, useState } from 'react';

// HOC: a function that takes a component and returns an ENHANCED component
function withLoadingGuard<P extends object>(WrappedComponent: ComponentType<P>) {
  return function GuardedComponent(props: P & { isLoading?: boolean; error?: string }) {
    const { isLoading, error, ...rest } = props;

    if (isLoading) return (
      <div style={{ padding: 16, color: '#6b7280', fontFamily: 'monospace', fontSize: 13 }}>
        ⏳ Loading data…
      </div>
    );
    if (error) return (
      <div style={{ padding: 16, color: '#dc2626', fontFamily: 'monospace', fontSize: 13 }}>
        ❌ Error: {error}
      </div>
    );

    return <WrappedComponent {...(rest as P)} />;
  };
}

// A simple display component — knows nothing about loading state
function UserProfile({ name, role }: { name: string; role: string }) {
  return (
    <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <p><b>{name}</b> — {role}</p>
    </div>
  );
}

// Enhance it with the HOC
const GuardedUserProfile = withLoadingGuard(UserProfile);

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);

  return (
    <GuardedUserProfile
      isLoading={loading}
      name="Lavneet Sharma"
      role="MERN Developer"
    />
  );
}`,
    walkthrough: [
      "HOC is a function: takes a component, returns a new enhanced component.",
      "withLoadingGuard intercepts isLoading/error props before delegating to the wrapped component.",
      "The spread {...rest as P} passes all remaining props through to the original component.",
      "HOCs are great for cross-cutting concerns: logging, auth, analytics, loading guards.",
      "Modern React often uses custom hooks instead — they're simpler and avoid 'wrapper hell'."
    ]
  },

  // ─── Q42: Container/Presenter ─────────────────────────────────────────────────
  42: {
    code: `import React, { useState, useEffect } from 'react';

// ── PRESENTER (dumb/pure): only receives props, zero data-fetching, easily testable
interface User { id: number; name: string; email: string; }

function UserListPresenter({ users, loading, error }: {
  users: User[]; loading: boolean; error: string | null;
}) {
  if (loading) return <p>Loading users…</p>;
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>;
  return (
    <ul style={{ padding: 0, listStyle: 'none' }}>
      {users.map(u => (
        <li key={u.id} style={{ padding: '6px 0', borderBottom: '1px solid #e5e7eb', fontSize: 13 }}>
          <b>{u.name}</b> — {u.email}
        </li>
      ))}
    </ul>
  );
}

// ── CONTAINER (smart): handles data fetching, state, business logic — no JSX layout
function UserListContainer() {
  const [users,   setUsers]   = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=4')
      .then(r => r.json()).then(setUsers)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Container delegates rendering to the Presenter
  return <UserListPresenter users={users} loading={loading} error={error} />;
}

export default UserListContainer;`,
    walkthrough: [
      "Presenter component is a pure function of its props — trivial to unit-test in isolation.",
      "Container handles all side effects (fetch, timers) and owns the stateful logic.",
      "The Container renders the Presenter, injecting the fetched data as props.",
      "You can swap Presenters (different layouts) without changing the Container logic.",
      "Modern React often uses custom hooks to extract Container logic, making this cleaner."
    ]
  },

  // ─── Q43: Compound components ─────────────────────────────────────────────────
  43: {
    code: `import React, { createContext, useContext, useState } from 'react';

// Compound components share internal state via Context — no prop drilling
const TabsCtx = createContext<{ active: string; setActive: (s: string) => void } | null>(null);

function Tabs({ defaultTab, children }: { defaultTab: string; children: React.ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsCtx.Provider value={{ active, setActive }}><div>{children}</div></TabsCtx.Provider>;
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb' }}>{children}</div>;
}

function Tab({ id, label }: { id: string; label: string }) {
  const { active, setActive } = useContext(TabsCtx)!;
  return (
    <button onClick={() => setActive(id)}
      style={{ padding: '6px 14px', fontSize: 13, border: 'none', background: 'none', cursor: 'pointer',
               borderBottom: active === id ? '2px solid #7c3aed' : '2px solid transparent',
               color: active === id ? '#7c3aed' : '#374151', fontWeight: active === id ? 700 : 400 }}>
      {label}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const { active } = useContext(TabsCtx)!;
  if (active !== id) return null;
  return <div style={{ padding: 16, fontSize: 13 }}>{children}</div>;
}

// Attach sub-components as static properties (optional, clean API)
Tabs.List  = TabList;
Tabs.Tab   = Tab;
Tabs.Panel = TabPanel;

export default function App() {
  return (
    <Tabs defaultTab="hooks">
      <Tabs.List>
        <Tabs.Tab id="hooks"  label="Hooks" />
        <Tabs.Tab id="state"  label="State" />
        <Tabs.Tab id="router" label="Router" />
      </Tabs.List>
      <Tabs.Panel id="hooks">useState, useEffect, useRef, useMemo…</Tabs.Panel>
      <Tabs.Panel id="state">Local state, Context API, Redux Toolkit…</Tabs.Panel>
      <Tabs.Panel id="router">React Router v6, useNavigate, useParams…</Tabs.Panel>
    </Tabs>
  );
}`,
    walkthrough: [
      "The Tabs parent component owns 'active' state and provides it via Context.",
      "Tab and TabPanel sub-components read from Context — no prop drilling needed.",
      "Users compose the UI declaratively — Tabs.List, Tabs.Tab, Tabs.Panel.",
      "Attaching sub-components as Tabs.List etc. makes the API discoverable via IDE autocomplete.",
      "This pattern powers component libraries like Radix UI, Headless UI, and Reach UI."
    ]
  },

  // ─── Q44: Custom hooks ────────────────────────────────────────────────────────
  44: {
    code: `import React, { useState, useEffect, useCallback } from 'react';

// Custom hook 1: debounced value — great for search inputs
function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

// Custom hook 2: fetch with loading/error states
function useFetch<T>(url: string) {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: string | null }>({
    data: null, loading: false, error: null
  });

  const execute = useCallback(async (fetchUrl: string) => {
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetch(fetchUrl);
      const data: T = await res.json();
      setState({ data, loading: false, error: null });
    } catch (e: any) {
      setState({ data: null, loading: false, error: e.message });
    }
  }, []);

  useEffect(() => { execute(url); }, [url, execute]);
  return state;
}

// Usage: hooks compose cleanly
export default function SearchUsers() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 400); // 400ms debounce
  const apiUrl = \`https://jsonplaceholder.typicode.com/users?q=\${debounced}\`;
  const { data, loading } = useFetch<{ id: number; name: string }[]>(apiUrl);

  return (
    <div style={{ padding: 16 }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search users…" />
      {loading && <p style={{ fontSize: 12 }}>Loading…</p>}
      <ul style={{ fontSize: 13 }}>{data?.slice(0, 3).map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}`,
    walkthrough: [
      "Custom hooks start with 'use' — this lets ESLint apply the rules-of-hooks lint checks.",
      "useDebounce encapsulates a setTimeout pattern, reusable across any input component.",
      "useFetch packages loading/error/data state — replacing boilerplate in every component.",
      "Both hooks compose inside SearchUsers — demonstrating hook composition.",
      "Custom hooks are the modern alternative to HOCs and render props for sharing logic."
    ]
  },

  // ─── Q45: Render prop pattern ─────────────────────────────────────────────────
  45: {
    code: `import React, { useState } from 'react';

// A Toggle component that manages boolean state and delegates UI via render prop
function Toggle({ children }: {
  children: (state: { on: boolean; toggle: () => void }) => React.ReactNode
}) {
  const [on, setOn] = useState(false);
  return <>{children({ on, toggle: () => setOn(o => !o })}</>;
}

export default function App() {
  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      {/* Usage 1: simple text toggle */}
      <Toggle>
        {({ on, toggle }) => (
          <button onClick={toggle} style={{ marginBottom: 8 }}>
            {on ? '🌙 Dark mode ON' : '☀️ Light mode'}
          </button>
        )}
      </Toggle>

      {/* Usage 2: accordion panel — same Toggle, different UI */}
      <Toggle>
        {({ on, toggle }) => (
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 6 }}>
            <button onClick={toggle} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
              React Fundamentals {on ? '▲' : '▼'}
            </button>
            {on && <p style={{ padding: '0 12px 12px', fontSize: 12, margin: 0 }}>JSX, components, props, state, virtual DOM.</p>}
          </div>
        )}
      </Toggle>
    </div>
  );
}`,
    walkthrough: [
      "Toggle encapsulates boolean toggle logic; the 'children' prop is a render function.",
      "The render function receives { on, toggle } — full control over what to show.",
      "Two completely different UIs (button vs accordion) share the same Toggle logic.",
      "This demonstrates logic reuse without copy-pasting useState + toggle everywhere.",
      "Today, custom hooks (useToggle) achieve the same reuse with even cleaner syntax."
    ]
  },

  // ─── Q46: Forms in React ─────────────────────────────────────────────────────
  46: {
    code: `import React, { useState } from 'react';

export default function PatientForm() {
  const [form, setForm] = useState({ name: '', dob: '', condition: '' });
  const [submitted, setSubmitted] = useState(false);

  // Single handler for all fields using computed property name
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting patient intake:', form);
    setSubmitted(true);
  };

  if (submitted) return <p style={{ padding: 16, color: '#16a34a' }}>✓ Patient intake submitted!</p>;

  return (
    <form onSubmit={handleSubmit} style={{ padding: 16, maxWidth: 320, fontFamily: 'sans-serif' }}>
      <h4 style={{ margin: '0 0 12px' }}>CareMagnus Patient Intake</h4>
      {[
        { label: 'Full Name', name: 'name',      type: 'text'   },
        { label: 'Date of Birth', name: 'dob',   type: 'date'   },
      ].map(({ label, name, type }) => (
        <label key={name} style={{ display: 'block', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
          <input name={name} type={type} value={(form as any)[name]}
            onChange={handleChange} required
            style={{ display: 'block', width: '100%', padding: '6px 8px', marginTop: 4, fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4 }} />
        </label>
      ))}
      <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
}`,
    walkthrough: [
      "A single handleChange uses computed property name [e.target.name] to update any field.",
      "form state is an object — always spread the previous value before updating one key.",
      "e.preventDefault() stops the browser's native form submission (which would reload the page).",
      "The required attribute handles basic HTML validation before the submit handler runs.",
      "This controlled form approach: React state IS the form data — always consistent."
    ]
  },

  // ─── Q47: Controlled vs Uncontrolled ─────────────────────────────────────────
  47: {
    code: `import React, { useState, useRef } from 'react';

export default function ControlledVsUncontrolled() {
  // ── CONTROLLED: React state drives the input value
  const [controlled, setControlled] = useState('');

  // ── UNCONTROLLED: DOM manages its own value; we read it on submit
  const uncontrolledRef = useRef<HTMLInputElement>(null);
  const [uncontrolledResult, setUncontrolledResult] = useState('');

  const handleUncontrolledSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUncontrolledResult(uncontrolledRef.current?.value ?? '');
  };

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h5 style={{ margin: '0 0 8px' }}>✅ Controlled Input</h5>
      <input value={controlled} onChange={e => setControlled(e.target.value)}
        placeholder="React controls this"
        style={{ display: 'block', marginBottom: 4, padding: '6px 8px', fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4 }} />
      <p style={{ fontSize: 12, color: '#6b7280' }}>Live value: "{controlled}"</p>

      <h5 style={{ margin: '12px 0 8px' }}>⚠️ Uncontrolled Input</h5>
      <form onSubmit={handleUncontrolledSubmit}>
        <input ref={uncontrolledRef} defaultValue="initial"
          placeholder="DOM controls this"
          style={{ display: 'block', marginBottom: 4, padding: '6px 8px', fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4 }} />
        <button type="submit" style={{ fontSize: 12, padding: '4px 10px' }}>Read Value</button>
      </form>
      {uncontrolledResult && <p style={{ fontSize: 12, color: '#6b7280' }}>On submit: "{uncontrolledResult}"</p>}
    </div>
  );
}`,
    walkthrough: [
      "Controlled: 'value' prop + onChange handler — React state IS the truth, updates live.",
      "Uncontrolled: 'defaultValue' sets initial value; DOM manages it thereafter.",
      "For uncontrolled inputs, useRef points to the DOM node; read .current.value on submit.",
      "Controlled inputs enable instant validation, conditional disabling, and derived UI.",
      "Prefer controlled inputs; use uncontrolled only for file inputs or legacy integrations."
    ]
  },

  // ─── Q48: Form validation ──────────────────────────────────────────────────────
  48: {
    code: `import React, { useState } from 'react';

type Errors = Partial<Record<'email' | 'password', string>>;

function validate(form: { email: string; password: string }): Errors {
  const errors: Errors = {};
  if (!form.email)                         errors.email    = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Must be a valid email.';
  if (form.password.length < 8)            errors.password = 'Min 8 characters.';
  return errors;
}

export default function SignInForm() {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [errors,  setErrors]  = useState<Errors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleBlur  = (name: string) => setTouched(prev => new Set(prev).add(name));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    setErrors(validate(next)); // validate on every keystroke
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched(new Set(['email', 'password']));
    if (Object.keys(errs).length === 0) alert('Login successful!');
  };

  const field = (name: 'email' | 'password') => ({
    name, value: (form as any)[name],
    onChange: handleChange,
    onBlur: () => handleBlur(name),
    type: name === 'password' ? 'password' : 'text',
    style: { display:'block', width:'100%', padding:'6px 8px', marginTop:4, fontSize:13,
             border: \`1px solid \${touched.has(name) && errors[name] ? '#dc2626' : '#d1d5db'}\`, borderRadius:4 }
  });

  return (
    <form onSubmit={handleSubmit} style={{ padding: 16, maxWidth: 300, fontFamily: 'sans-serif' }}>
      <h4 style={{ margin: '0 0 12px' }}>Sign In</h4>
      <label>Email<input {...field('email')} /></label>
      {touched.has('email') && errors.email && <p style={{ color:'#dc2626', fontSize:11, margin:'2px 0 8px' }}>{errors.email}</p>}
      <label style={{ marginTop:8, display:'block' }}>Password<input {...field('password')} /></label>
      {touched.has('password') && errors.password && <p style={{ color:'#dc2626', fontSize:11, margin:'2px 0 8px' }}>{errors.password}</p>}
      <button type="submit" style={{ marginTop:12, padding:'8px 16px', background:'#2563eb', color:'#fff', border:'none', borderRadius:4 }}>Login</button>
    </form>
  );
}`,
    walkthrough: [
      "validate() is a pure function — easy to unit-test with any input/output pair.",
      "Touched set tracks which fields the user has interacted with — errors only show after blur.",
      "Errors are recomputed on every keystroke so feedback is immediate once touched.",
      "On submit, all fields are marked touched so remaining errors become visible.",
      "For complex schemas, Zod + React Hook Form replaces this manual approach at scale."
    ]
  },

  // ─── Q49: Formik ─────────────────────────────────────────────────────────────
  49: {
    code: `// Formik + Yup example (install: npm i formik yup)
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const schema = Yup.object({
//   name:  Yup.string().required('Name is required').min(2),
//   email: Yup.string().email('Invalid email').required(),
//   role:  Yup.string().oneOf(['doctor', 'nurse', 'admin']).required(),
// });

// export default function StaffForm() {
//   return (
//     <Formik
//       initialValues={{ name: '', email: '', role: 'doctor' }}
//       validationSchema={schema}
//       onSubmit={async (values, { setSubmitting, resetForm }) => {
//         await fetch('/api/staff', { method: 'POST', body: JSON.stringify(values) });
//         resetForm();
//         setSubmitting(false);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form style={{ padding: 16, maxWidth: 300 }}>
//           <label>Name<Field name="name" style={{ display:'block', width:'100%' }} /></label>
//           <ErrorMessage name="name" component="p" style={{ color:'red', fontSize:11 }} />
//
//           <label>Email<Field name="email" type="email" style={{ display:'block', width:'100%' }} /></label>
//           <ErrorMessage name="email" component="p" style={{ color:'red', fontSize:11 }} />
//
//           <label>Role
//             <Field as="select" name="role" style={{ display:'block', width:'100%' }}>
//               <option value="doctor">Doctor</option>
//               <option value="nurse">Nurse</option>
//               <option value="admin">Admin</option>
//             </Field>
//           </label>
//
//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Saving…' : 'Add Staff Member'}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// }
export {};`,
    walkthrough: [
      "Formik manages values, errors, touched, and submission state automatically.",
      "Yup schema defines validation rules declaratively — min(), email(), oneOf() etc.",
      "Field component auto-wires name, value, onChange, onBlur to the Formik state.",
      "ErrorMessage renders the error string only when the field is touched and invalid.",
      "onSubmit receives { values, setSubmitting, resetForm } — clean async submission handling."
    ]
  },

  // ─── Q50: File uploads ────────────────────────────────────────────────────────
  50: {
    code: `import React, { useRef, useState } from 'react';

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    // Preview image before upload
    if (file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
    }
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);           // key 'file' must match server expectation
    formData.append('patientId', 'P-001');   // additional metadata

    setStatus('uploading');
    // Using XMLHttpRequest for upload progress tracking
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = e => setProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload  = () => { setStatus('done');  setProgress(100); };
    xhr.onerror = () => { setStatus('error'); };
    xhr.open('POST', '/api/documents/upload');
    xhr.send(formData);
  };

  return (
    <div style={{ padding: 16, maxWidth: 300, fontFamily: 'sans-serif' }}>
      <input ref={inputRef} type="file" accept="image/*,application/pdf"
        style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
      <button onClick={() => inputRef.current?.click()} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4 }}>
        Upload Document
      </button>
      {preview && <img src={preview} alt="preview" style={{ marginTop: 8, width: '100%', borderRadius: 4 }} />}
      {status === 'uploading' && (
        <div style={{ marginTop: 8, background: '#e5e7eb', borderRadius: 4, height: 6 }}>
          <div style={{ width: \`\${progress}%\`, height: '100%', background: '#2563eb', borderRadius: 4 }} />
        </div>
      )}
      {status === 'done'  && <p style={{ color: '#16a34a', fontSize: 12 }}>✓ Upload complete!</p>}
      {status === 'error' && <p style={{ color: '#dc2626', fontSize: 12 }}>✗ Upload failed.</p>}
    </div>
  );
}`,
    walkthrough: [
      "File inputs are uncontrolled — we read e.target.files[0] from the change event.",
      "URL.createObjectURL creates a temporary browser URL for image preview before upload.",
      "FormData is the correct way to send files — multipart/form-data is set automatically.",
      "XMLHttpRequest gives upload progress via xhr.upload.onprogress — fetch() doesn't support this.",
      "The hidden input + custom button technique gives full styling control over the file input."
    ]
  },

  // ─── Q51: TypeScript with React ───────────────────────────────────────────────
  51: {
    code: `import React, { useState } from 'react';

// TypeScript gives compile-time safety for props, state, and event handlers

interface Question {
  id:         number;
  title:      string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; // union = only valid values
  tags:       string[];
  answered?:  boolean; // optional field
}

interface QuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question:   Question;
  onMark:     (id: number) => void; // typed callback
}

const diffColors: Record<Question['difficulty'], string> = {
  Beginner:     '#16a34a',
  Intermediate: '#d97706',
  Advanced:     '#dc2626',
};

function QuestionCard({ question: q, onMark, ...divProps }: QuestionCardProps) {
  return (
    <div {...divProps} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContext: 'space-between' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: diffColors[q.difficulty] }}>{q.difficulty}</span>
        <input type="checkbox" checked={q.answered ?? false} onChange={() => onMark(q.id)} />
      </div>
      <p style={{ margin: '4px 0', fontSize: 13, fontWeight: 600 }}>{q.title}</p>
      <div style={{ display: 'flex', gap: 4 }}>
        {q.tags.map(t => <span key={t} style={{ fontSize: 10, background: '#f3f4f6', padding: '2px 6px', borderRadius: 20 }}>{t}</span>)}
      </div>
    </div>
  );
}

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: 'What is JSX?',          difficulty: 'Beginner',     tags: ['jsx', 'basics'] },
    { id: 2, title: 'Explain useEffect.',     difficulty: 'Intermediate', tags: ['hooks']         },
    { id: 3, title: 'What is Fiber?',         difficulty: 'Advanced',     tags: ['internals']     },
  ]);

  const markAnswered = (id: number) =>
    setQuestions(qs => qs.map(q => q.id === id ? { ...q, answered: !q.answered } : q));

  return <div style={{ padding: 16, maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
    {questions.map(q => <QuestionCard key={q.id} question={q} onMark={markAnswered} />)}
  </div>;
}`,
    walkthrough: [
      "The Question interface defines the exact shape — TypeScript catches wrong field types instantly.",
      "Union type ('Beginner' | 'Intermediate' | 'Advanced') prevents arbitrary string mistakes.",
      "QuestionCardProps extends React.HTMLAttributes to accept all standard div props too.",
      "Record<Question['difficulty'], string> uses a type as a key — highly precise mapping.",
      "TypeScript generics in useState<Question[]>([]) ensure the array only contains Questions."
    ]
  },

  // ─── Q52: Types for props and state ───────────────────────────────────────────
  52: {
    code: `import React, { useState } from 'react';

// ── Props typing approaches ──────────────────────────────────
// Option A: inline type annotation (good for simple components)
function Tag({ label, count }: { label: string; count: number }) {
  return <span style={{ fontSize: 12 }}>{label} ({count})</span>;
}

// Option B: interface (preferred — allows JSDoc, merging, extending)
interface ButtonProps {
  /** Button label text */
  label:    string;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
  onClick:  (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ label, variant = 'primary', disabled = false, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ padding: '7px 16px', fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
               background: variant === 'primary' ? '#2563eb' : 'transparent',
               color: variant === 'primary' ? '#fff' : '#2563eb',
               border: '1px solid #2563eb', borderRadius: 5, opacity: disabled ? 0.5 : 1 }}>
      {label}
    </button>
  );
}

// ── State typing ──────────────────────────────────────────────
interface User { id: string; name: string; email: string; }

export default function App() {
  const [user,  setUser]  = useState<User | null>(null);    // nullable
  const [count, setCount] = useState(0);                    // inferred as number
  const [ids,   setIds]   = useState<string[]>([]);         // explicit generic

  return (
    <div style={{ padding: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag label="useState" count={3} />
      <Button label="Load User" onClick={() => setUser({ id:'1', name:'Lavneet', email:'dev@damora.ai' })} />
      <Button label="Clear" variant="ghost" onClick={() => setUser(null)} />
      {user && <p style={{ fontSize: 13 }}>{user.name} — {user.email}</p>}
    </div>
  );
}`,
    walkthrough: [
      "Inline types are fast; interfaces are preferred for reusability and documentation.",
      "JSDoc comments (/** */) on interface fields appear as tooltips in IDE on hover.",
      "Default props via destructuring defaults: variant = 'primary' — TypeScript-safe.",
      "useState<User | null>(null) — the null makes explicit that the user may not be loaded.",
      "Type inference works for primitives; use explicit generics for arrays and complex types."
    ]
  },

  // ─── Q53: Interfaces ─────────────────────────────────────────────────────────
  53: {
    code: `import React from 'react';

// Interfaces can EXTEND native HTML element attributes — powerful pattern
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon:    string;  // emoji or custom icon
  label:   string;
  badge?:  number; // optional notification count
}

function IconButton({ icon, label, badge, className = '', style, ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}  // spreads type, disabled, aria-label, onClick, etc.
      style={{ position: 'relative', padding: '8px 14px', border: '1px solid #e5e7eb',
               borderRadius: 8, cursor: 'pointer', background: '#fff', display: 'inline-flex',
               alignItems: 'center', gap: 6, fontSize: 13, ...style }}>
      <span>{icon}</span>
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span style={{ position:'absolute', top:-6, right:-6, background:'#dc2626',
                       color:'#fff', borderRadius:'50%', width:18, height:18,
                       fontSize:10, display:'flex', alignItems:'center', justifyContext:'center', fontWeight:700 }}>
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
}

export default function App() {
  return (
    <div style={{ padding: 16, display: 'flex', gap: 10 }}>
      <IconButton icon="📚" label="Handbook" badge={3} onClick={() => alert('open')} />
      <IconButton icon="⚡" label="Practice" disabled />   {/* disabled from ButtonHTMLAttributes */}
      <IconButton icon="🏆" label="Dashboard" style={{ background: '#1e1e1c', color: '#f4efe6' }} />
    </div>
  );
}`,
    walkthrough: [
      "extends React.ButtonHTMLAttributes<HTMLButtonElement> inherits ALL standard button props.",
      "This means disabled, type, aria-label, onClick, form, etc. all work without re-declaring.",
      "The {...rest} spread passes inherited HTML attributes to the native button element.",
      "interface can extend multiple types: interface X extends A, B, C {}",
      "type aliases cannot extend natively — use interface when composing HTML-element prop types."
    ]
  },

  // ─── Q54: TypeScript generics ─────────────────────────────────────────────────
  54: {
    code: `import React, { useState } from 'react';

// Generic component: works with ANY data type while staying fully type-safe
interface SelectProps<T> {
  options:    T[];
  value:      T | null;
  getLabel:   (item: T) => string;
  getValue:   (item: T) => string | number;
  onChange:   (item: T) => void;
  placeholder?: string;
}

function Select<T>({ options, value, getLabel, getValue, onChange, placeholder = 'Select…' }: SelectProps<T>) {
  return (
    <select
      value={value ? String(getValue(value)) : ''}
      onChange={e => {
        const found = options.find(o => String(getValue(o)) === e.target.value);
        if (found) onChange(found);
      }}
      style={{ padding: '6px 10px', fontSize: 13, borderRadius: 4, border: '1px solid #d1d5db' }}>
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={String(getValue(o))} value={String(getValue(o))}>{getLabel(o)}</option>
      ))}
    </select>
  );
}

interface Chapter { id: number; title: string; }
interface Difficulty { code: string; label: string; }

export default function App() {
  const [chapter,    setChapter]    = useState<Chapter | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const chapters:    Chapter[]    = [{ id:1, title:'React Fundamentals' }, { id:2, title:'React Hooks' }];
  const difficulties: Difficulty[] = [{ code:'easy', label:'Beginner' }, { code:'hard', label:'Advanced' }];

  return (
    <div style={{ padding: 16, display: 'flex', gap: 10 }}>
      {/* Same Select component works for completely different data shapes */}
      <Select<Chapter>    options={chapters}    value={chapter}    getLabel={c => c.title}  getValue={c => c.id}   onChange={setChapter}    />
      <Select<Difficulty> options={difficulties} value={difficulty} getLabel={d => d.label} getValue={d => d.code} onChange={setDifficulty} />
      <p style={{ fontSize: 12 }}>{chapter?.title} / {difficulty?.label}</p>
    </div>
  );
}`,
    walkthrough: [
      "Select<T> accepts any type T — reusable for Chapter, Difficulty, User, Product, etc.",
      "getLabel and getValue are accessor functions the caller provides for their specific type.",
      "TypeScript infers T from the options array at call site — no manual type annotation needed.",
      "The same Select component with 0 code duplication works for two entirely different shapes.",
      "Generics are the key to building truly reusable component libraries in TypeScript."
    ]
  },

  // ─── Q55: Testing importance ──────────────────────────────────────────────────
  55: {
    code: `// Example unit tests with Vitest + React Testing Library
// These tests DOCUMENT component behaviour and prevent regressions.

// import { render, screen, fireEvent } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import Counter from './Counter';

// describe('Counter component', () => {
//
//   it('renders initial count of 0', () => {
//     render(<Counter />);
//     // Query by accessible text — matches what a screen reader sees
//     expect(screen.getByText('Count: 0')).toBeInTheDocument();
//   });
//
//   it('increments count when button is clicked', () => {
//     render(<Counter />);
//     fireEvent.click(screen.getByRole('button', { name: /increment/i }));
//     expect(screen.getByText('Count: 1')).toBeInTheDocument();
//   });
//
//   it('calls onComplete callback when count reaches 5', () => {
//     const onComplete = vi.fn();  // mock function
//     render(<Counter onComplete={onComplete} />);
//     for (let i = 0; i < 5; i++) {
//       fireEvent.click(screen.getByRole('button', { name: /increment/i }));
//     }
//     expect(onComplete).toHaveBeenCalledTimes(1);
//   });
//
//   it('button is disabled after completion', () => {
//     // ... arrange, act, assert
//   });
// });

export {};
// WHY TESTS MATTER: each test above is a living specification.
// When you refactor Counter, tests catch any broken behaviour immediately.`,
    walkthrough: [
      "Tests are living documentation — they describe WHAT the component should do.",
      "render() mounts the component into a virtual DOM for testing.",
      "screen.getByRole queries by semantics (button, heading) — matches what screen readers see.",
      "vi.fn() creates a mock function to verify callbacks were called with correct arguments.",
      "Tests prevent regressions: change code confidently knowing the test suite will catch breaks."
    ]
  },

  // ─── Q56: Testing libraries ───────────────────────────────────────────────────
  56: {
    code: `// Modern React testing stack overview

// 1. VITEST (or Jest) — test runner + assertion library
// vitest.config.ts:
// export default defineConfig({ test: { environment: 'jsdom', globals: true } });

// 2. REACT TESTING LIBRARY — renders components and queries them
// Philosophy: "Test the way users interact" — not implementation details
// import { render, screen, userEvent } from '@testing-library/react';

// 3. PLAYWRIGHT — end-to-end browser tests
// test('user can log in', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//   await page.getByLabel('Email').fill('dev@damora.ai');
//   await page.getByLabel('Password').fill('secret123');
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await expect(page.getByText('Dashboard')).toBeVisible();
// });

// 4. MSW (Mock Service Worker) — mock API requests in tests
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// const server = setupServer(
//   rest.get('/api/questions', (req, res, ctx) =>
//     res(ctx.json([{ id: 1, title: 'What is React?' }]))
//   )
// );

// TESTING PYRAMID:
// ┌──────────────────────────────────────────┐
// │         E2E (Playwright)   ← fewest      │
// │      Integration (RTL)                   │
// │   Unit (Vitest + RTL)     ← most         │
// └──────────────────────────────────────────┘

export {};`,
    walkthrough: [
      "Vitest is the modern, Vite-native alternative to Jest — fast and config-free.",
      "React Testing Library renders components and queries by accessibility roles/text.",
      "Playwright runs real browser tests — catches integration issues Jest cannot.",
      "MSW intercepts fetch/XHR in tests — test API-dependent components without a real server.",
      "Follow the testing pyramid: many fast unit tests, fewer integration, fewest E2E."
    ]
  },

  // ─── Q57: Testing with Jest/Vitest ────────────────────────────────────────────
  57: {
    code: `// Full example: testing a search input component
// File: SearchInput.test.tsx

// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { vi, describe, it, expect, beforeEach } from 'vitest';
// import SearchInput from './SearchInput';

// describe('SearchInput', () => {
//   const mockOnSearch = vi.fn();

//   beforeEach(() => { mockOnSearch.mockClear(); });

//   it('renders placeholder text', () => {
//     render(<SearchInput onSearch={mockOnSearch} />);
//     expect(screen.getByPlaceholderText('Search questions…')).toBeInTheDocument();
//   });

//   it('calls onSearch with input value when form is submitted', async () => {
//     const user = userEvent.setup();
//     render(<SearchInput onSearch={mockOnSearch} />);
//     await user.type(screen.getByRole('textbox'), 'useState');
//     await user.click(screen.getByRole('button', { name: /search/i }));
//     expect(mockOnSearch).toHaveBeenCalledWith('useState');
//   });

//   it('shows clear button only when input has value', async () => {
//     const user = userEvent.setup();
//     render(<SearchInput onSearch={mockOnSearch} />);
//     expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
//     await user.type(screen.getByRole('textbox'), 'hooks');
//     expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
//   });

//   it('clears input and calls onSearch with empty string on clear', async () => { ... });
// });

export {};`,
    walkthrough: [
      "describe() groups related tests; it() defines a single test case.",
      "userEvent is preferred over fireEvent — simulates real user interactions more accurately.",
      "screen.queryByRole returns null (not throws) for missing elements — use for absence checks.",
      "vi.fn() creates a spy; mockOnSearch.mockClear() resets call history before each test.",
      "Test user behaviour (submit → onSearch called), not implementation (component state)."
    ]
  },

  // ─── Q58: Shallow vs mount (Enzyme) ──────────────────────────────────────────
  58: {
    code: `// Enzyme shallow vs mount (Enzyme is legacy — prefer React Testing Library)
// import { shallow, mount } from 'enzyme';

// ── SHALLOW RENDERING: renders ONLY the component, stubs all children
// const wrapper = shallow(<UserCard user={{ name: 'Lavneet' }} />);
// wrapper.find('Avatar')   // finds by component name (not DOM)
// wrapper.find('Avatar').dive() // must explicitly dive into child

// Pros: fast, isolated, no side effects from children
// Cons: doesn't test real integration with child components

// ── MOUNT (FULL) RENDERING: renders the full DOM including all children
// const wrapper = mount(<UserCard user={{ name: 'Lavneet' }} />);
// wrapper.find('img')     // finds real DOM img tag inside Avatar
// wrapper.find('button').simulate('click')

// Pros: tests real component integration, tests lifecycle, real DOM
// Cons: slower, requires jsdom, more test setup, side effects run

// ── MODERN EQUIVALENT (React Testing Library):
// import { render, screen } from '@testing-library/react';
// render(<UserCard user={{ name: 'Lavneet' }} />);
// screen.getByAltText('Lavneet avatar');  // tests the real rendered DOM
// RTL always does "full" rendering — it deliberately avoids testing internals.

// RTL's philosophy: test WHAT the user sees, not HOW the component is structured.

export {};`,
    walkthrough: [
      "Enzyme shallow renders only the target component — children are stubs.",
      "Enzyme mount renders the full tree including all children in jsdom.",
      "Shallow is faster and isolated but may miss integration bugs between parent and children.",
      "React Testing Library always renders the full tree — it tests the real user experience.",
      "React Testing Library is now the industry standard; Enzyme is largely deprecated."
    ]
  },

  // ─── Q59: RTL vs Enzyme ───────────────────────────────────────────────────────
  59: {
    code: `// Core philosophy difference between React Testing Library and Enzyme

// ── ENZYME (implementation-focused):
// const wrapper = shallow(<Counter />);
// expect(wrapper.state('count')).toBe(1);     // tests INTERNAL state ❌
// wrapper.instance().handleClick();           // calls private method ❌
// If you rename 'count' to 'value', the test breaks even if the UI still works.

// ── REACT TESTING LIBRARY (user-focused):
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// it('shows incremented count after click', async () => {
//   const user = userEvent.setup();
//   render(<Counter />);
//
//   // Query by what the USER SEES (text on screen)
//   expect(screen.getByText('Count: 0')).toBeInTheDocument();
//
//   // Interact how the USER INTERACTS (click a visible button)
//   await user.click(screen.getByRole('button', { name: /increment/i }));
//
//   // Assert what the USER SEES after interaction
//   expect(screen.getByText('Count: 1')).toBeInTheDocument();
// });
// Renaming internal state from 'count' to 'value' doesn't break this test.

// PRIORITY QUERY ORDER (RTL best practice):
// getByRole > getByLabelText > getByPlaceholderText > getByText > getByTestId

export {};`,
    walkthrough: [
      "Enzyme tests implementation details (state, methods) — tests break on refactors.",
      "RTL tests what users see and do — tests survive internal refactoring.",
      "RTL query priority: by role (accessible), by label, by text, by testId (last resort).",
      "getByRole('button', {name:/increment/i}) matches what screen readers announce.",
      "userEvent simulates real browser events including focus, typing, and pointer events."
    ]
  },

  // ─── Q60: React Fragments ─────────────────────────────────────────────────────
  60: {
    code: `import React from 'react';

// Problem: JSX requires a single root — but extra <div> breaks layouts
// Bad: extra div breaks table structure
// function TableRow() {
//   return (
//     <div>       {/* ❌ div inside table = invalid HTML */}
//       <td>Name</td>
//       <td>Age</td>
//     </div>
//   );
// }

// Solution: Fragment wraps without adding a DOM node
function TableRow({ name, age }: { name: string; age: number }) {
  return (
    <React.Fragment>   {/* or shorthand <> */}
      <td style={{ padding: '6px 12px', borderBottom: '1px solid #e5e7eb' }}>{name}</td>
      <td style={{ padding: '6px 12px', borderBottom: '1px solid #e5e7eb' }}>{age}</td>
    </React.Fragment>
  );
}

// Fragments with keys (only React.Fragment supports key= prop, not <>)
function MultiList({ items }: { items: { id: number; title: string; desc: string }[] }) {
  return (
    <dl style={{ fontSize: 13 }}>
      {items.map(item => (
        <React.Fragment key={item.id}>   {/* key required for list — can't use <> here */}
          <dt style={{ fontWeight: 700 }}>{item.title}</dt>
          <dd style={{ color: '#6b7280', marginBottom: 8 }}>{item.desc}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <TableRow name="Lavneet" age={22} />
          <TableRow name="React 19" age={1} />
        </tbody>
      </table>
      <MultiList items={[{ id:1, title:'Hooks', desc:'useState, useEffect…' }, { id:2, title:'Fiber', desc:'Concurrent renderer' }]} />
    </div>
  );
}`,
    walkthrough: [
      "React requires a single root element — Fragments satisfy this without adding DOM nodes.",
      "Shorthand <> is cleaner for most cases but doesn't support the 'key' prop.",
      "React.Fragment with key= is required when mapping lists of multi-element blocks.",
      "Tables/grids often require Fragment: <td> inside a <div> is invalid HTML.",
      "Fragments prevent CSS flexbox/grid layout bugs caused by unintended wrapper divs."
    ]
  },

  // ─── Q61: React Portal ────────────────────────────────────────────────────────
  61: {
    code: `import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Portal renders children into a DIFFERENT DOM node — outside the component tree
function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  // Ensure we have a mount target in the real DOM
  useEffect(() => {
    const el = document.getElementById('modal-root');
    if (!el) { const div = document.createElement('div'); div.id = 'modal-root'; document.body.appendChild(div); }
  }, []);

  const mountNode = document.getElementById('modal-root') ?? document.body;

  return ReactDOM.createPortal(
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 }}>
      <div style={{ background:'#fff', borderRadius:10, padding:24, maxWidth:360, width:'90%', position:'relative' }}>
        <button onClick={onClose}
          style={{ position:'absolute', top:10, right:12, background:'none', border:'none', fontSize:18, cursor:'pointer' }}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    mountNode  // rendered OUTSIDE this component's DOM ancestor
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding:16, overflow:'hidden' }}> {/* overflow:hidden would clip a normal child modal */}
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <p style={{ fontSize:12, color:'#6b7280' }}>Parent has overflow:hidden — Portal bypasses it.</p>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3 style={{ margin:'0 0 8px' }}>Portal Modal</h3>
          <p style={{ fontSize:13 }}>Rendered in #modal-root, outside this div's overflow context.</p>
        </Modal>
      )}
    </div>
  );
}`,
    walkthrough: [
      "createPortal(children, domNode) mounts children into a completely different DOM location.",
      "The Modal appears as a child in React's component tree but renders in #modal-root in the DOM.",
      "This bypasses CSS overflow:hidden, z-index stacking contexts, and clipping from ancestors.",
      "Event bubbling still works via React's synthetic event system — portal events bubble normally.",
      "Use portals for: modals, dropdown menus, tooltips, and notification toasts."
    ]
  },

  // ─── Q62: Error Boundary ──────────────────────────────────────────────────────
  62: {
    code: `import React, { Component, ErrorInfo } from 'react';

// Error Boundaries MUST be class components — no hook equivalent
class ErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null };

  // Called when a child component throws — used to update state
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // Called after the error — used for logging (e.g. Sentry)
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Boundary caught:', error, info.componentStack);
    // logErrorToSentry(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{ padding:16, background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:8 }}>
          <h4 style={{ color:'#dc2626', margin:'0 0 4px' }}>Something went wrong</h4>
          <p style={{ fontSize:12, color:'#7f1d1d' }}>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError:false, error:null })} style={{ fontSize:12 }}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// A buggy component to demonstrate
function BuggyWidget({ crash }: { crash: boolean }) {
  if (crash) throw new Error('BuggyWidget encountered a fatal condition!');
  return <p style={{ padding:12, background:'#f0fdf4', borderRadius:6 }}>✓ Widget is healthy</p>;
}

export default function App() {
  const [crash, setCrash] = React.useState(false);
  return (
    <div style={{ padding:16 }}>
      <button onClick={() => setCrash(c => !c)} style={{ marginBottom:12 }}>Toggle Crash</button>
      <ErrorBoundary>
        <BuggyWidget crash={crash} />
      </ErrorBoundary>
    </div>
  );
}`,
    walkthrough: [
      "getDerivedStateFromError sets hasError:true so the boundary shows its fallback UI.",
      "componentDidCatch receives the full error and stack trace — perfect for Sentry/Datadog.",
      "Without a boundary, a single thrown error crashes the ENTIRE React application.",
      "Boundaries are class components only — hooks cannot implement getDerivedStateFromError.",
      "Place boundaries strategically: one at app root + granular ones around risky widgets."
    ]
  },

  // ─── Q63: SSR ───
  63: {
    code: `// Next.js Server-Side Rendering (SSR) — Pages Router
// getServerSideProps runs on Node, never in the browser.

// pages/dashboard.tsx
export default function Dashboard({ user, stats }: { user: string; stats: { questions: number } }) {
  // This HTML arrives fully rendered — no JS needed for first paint.
  return (
    <main style={{ padding:16 }}>
      <h1>Welcome, {user}</h1>
      <p>Questions answered: <strong>{stats.questions}</strong></p>
      {/* After this HTML lands, Next.js "hydrates" it — attaches React event handlers */}
    </main>
  );
}

// Runs on the SERVER for every request — secret keys are safe here
export async function getServerSideProps() {
  // Fetch from a protected internal API using a secret token
  const res = await fetch('https://api.internal/user/stats', {
    headers: { Authorization: \`Bearer \${process.env.API_SECRET}\` }
  });
  const stats = await res.json();

  return {
    props: {
      user:  'Lavneet Sharma',
      stats: stats ?? { questions: 0 }
    }
  };
}

// FLOW:
// 1. Browser requests /dashboard
// 2. Next.js server calls getServerSideProps (Node.js — secrets safe)
// 3. Props injected into component → rendered to HTML string on server
// 4. Full HTML sent to browser → user sees content immediately
// 5. Client JS bundle loads → React hydrates the static HTML → fully interactive`,
    walkthrough: [
      "getServerSideProps runs only on Node.js — never in the browser bundle.",
      "Secret environment variables (process.env.API_SECRET) are safe here — not exposed.",
      "The component receives pre-fetched data as props — no client-side useEffect fetch needed.",
      "Browser receives complete HTML → First Contentful Paint is instant.",
      "Hydration: React attaches event listeners to the server-rendered HTML — making it interactive."
    ]
  },

  // ─── Q64: Suspense + Lazy loading ────────────────────────────────────────────
  64: {
    code: `import React, { Suspense, lazy, useState } from 'react';

// React.lazy dynamically imports the component — creates a code-split chunk
const HeavyChart   = lazy(() => import('./HeavyChart').catch(() => ({ default: () => <p>Chart unavailable</p> })));
const DataTable    = lazy(() => import('./DataTable').catch(() => ({ default: () => <p>Table unavailable</p> })));

// Skeleton fallback shown while the lazy chunk downloads
function ChartSkeleton() {
  return (
    <div style={{ height:150, background:'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)',
                  backgroundSize:'200% 100%', borderRadius:8, animation:'shimmer 1.5s infinite' }}>
      <style>{'\`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}\`'}</style>
    </div>
  );
}

export default function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <div style={{ padding:16 }}>
      <button onClick={() => setShowChart(true)}>Load Chart</button>
      <button onClick={() => setShowTable(true)} style={{ marginLeft:8 }}>Load Table</button>

      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />  {/* HeavyChart bundle downloads on first render */}
        </Suspense>
      )}

      {showTable && (
        <Suspense fallback={<p style={{ color:'#6b7280', fontSize:12 }}>Loading table…</p>}>
          <DataTable />
        </Suspense>
      )}
    </div>
  );
}
// Result: initial bundle is smaller — HeavyChart/DataTable only download when needed.`,
    walkthrough: [
      "React.lazy(() => import('./HeavyChart')) creates a dynamic import — separate JS chunk.",
      "The chunk only downloads when the component is first rendered — not on page load.",
      "Suspense wraps lazy components and shows 'fallback' while the chunk is downloading.",
      "Multiple Suspense boundaries can show different fallbacks for independent sections.",
      "Use React.lazy for routes, heavy visualizations, and above-the-fold critical path separation."
    ]
  },

  // ─── Q65: React and SEO ───────────────────────────────────────────────────────
  65: {
    code: `// SEO challenge: standard React CSR delivers an empty <div id="root"></div> initially.
// Search engine crawlers may not execute JavaScript — they see blank content.

// ── PROBLEM: What Google may scrape from a vanilla React SPA
// <html><body><div id="root"></div></body></html>  ← nothing indexable!

// ── SOLUTION 1: react-helmet-async — dynamic meta tags for CSR apps
// npm install react-helmet-async
// import { Helmet } from 'react-helmet-async';

// function QuestionPage({ question }: { question: { title: string; chapter: string } }) {
//   return (
//     <>
//       <Helmet>
//         <title>{question.title} | React Interview Handbook</title>
//         <meta name="description" content={\`Learn about \${question.title} in React — Chapter: \${question.chapter}\`} />
//         <meta property="og:title"       content={question.title} />
//         <meta property="og:description" content={\`Master React concepts: \${question.title}\`} />
//         <link rel="canonical" href={\`https://handbook.dev/questions/\${question.id}\`} />
//       </Helmet>
//       <article>…</article>
//     </>
//   );
// }

// ── SOLUTION 2: Next.js Metadata API (App Router) — server-rendered, no JS needed
// export const metadata = {
//   title: 'React Interview Handbook',
//   description: 'Master React with 100 premium Q&As',
//   openGraph: { title: 'React Interview Handbook', images: ['/og-image.png'] }
// };

// ── BEST PRACTICE CHECKLIST:
// ✅ Unique <title> per page
// ✅ Meta description 120-160 chars
// ✅ Canonical URL
// ✅ Open Graph tags for social sharing
// ✅ Structured data (JSON-LD) for rich snippets
// ✅ Semantic HTML (h1, article, nav, main)

export {};`,
    walkthrough: [
      "CSR React: browser receives empty HTML; JavaScript builds the DOM — crawlers may miss content.",
      "react-helmet-async lets you inject <title> and meta tags dynamically from any component.",
      "Next.js Metadata API generates meta tags on the server — crawlers always see them.",
      "Open Graph tags control how links appear when shared on Twitter, Slack, LinkedIn.",
      "The most effective SEO fix is moving to SSR/SSG — HTML arrives fully formed."
    ]
  },

  // ─── Q66: SEO strategies ──────────────────────────────────────────────────────
  66: {
    code: `// React SEO strategy comparison

// ── STRATEGY 1: SSR (Next.js getServerSideProps / App Router)
// Best for: dynamic, frequently-updated content (prices, stock, user-specific)
// SEO: ✅ Full HTML on first byte | Crawlability: ✅ Excellent
// Tradeoff: higher server cost, slower TTFB vs static

// ── STRATEGY 2: SSG (Next.js getStaticProps / generateStaticParams)
// Best for: blogs, docs, marketing pages — content changes infrequently
// SEO: ✅ Pre-built HTML on CDN | Crawlability: ✅ Best possible
// Tradeoff: stale data until rebuild; use ISR for hybrid

// ── STRATEGY 3: ISR (Incremental Static Regeneration)
// export async function getStaticProps() {
//   return { props: { data }, revalidate: 60 }; // rebuild every 60s
// }
// SEO: ✅ Near-static with fresh data | Best of SSG + SSR

// ── STRATEGY 4: Dynamic rendering / Prerender.io
// Serve static HTML snapshots to bots, full React SPA to users.
// Good for: migrating existing CSR apps without full rewrite.

// ── Next.js App Router metadata (most modern):
// app/questions/[id]/page.tsx
// export async function generateMetadata({ params }) {
//   const q = await fetchQuestion(params.id);
//   return {
//     title: q.title,
//     description: q.summary.slice(0, 160),
//     robots: { index: true, follow: true }
//   };
// }

export {};`,
    walkthrough: [
      "SSR generates HTML per-request — best for real-time data that must be indexed.",
      "SSG pre-builds HTML at deploy time — fastest possible page load, excellent SEO.",
      "ISR (revalidate) bridges SSG and SSR — rebuild only when content expires.",
      "Dynamic rendering serves different responses to bots vs users — Googlebot gets pre-rendered HTML.",
      "In Next.js App Router, generateMetadata is async and co-located with the page component."
    ]
  },

  // ─── Q67: SSR improve SEO ─────────────────────────────────────────────────────
  67: {
    code: `// SSR SEO improvement — before vs after

// ── BEFORE (React CSR): Googlebot visits /handbook
// HTTP Response body:
// <!DOCTYPE html><html><head><title>App</title></head>
// <body><div id="root"></div><script src="/bundle.js"></script></body></html>
// Googlebot sees: no meaningful content → low ranking

// ── AFTER (Next.js SSR): Googlebot visits /handbook
// HTTP Response body (server-rendered):
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <title>React Interview Handbook — 100 Premium Q&As</title>
//   <meta name="description" content="Master React fundamentals, hooks, and advanced patterns" />
// </head>
// <body>
//   <main>
//     <h1>React Interview Handbook</h1>
//     <nav aria-label="Chapters">
//       <a href="/chapters/1">React Fundamentals</a>
//       <a href="/chapters/2">State Management</a>
//     </nav>
//     <article>
//       <h2>Q1: What is React?</h2>
//       <p>React is a JavaScript library for building UIs…</p>
//     </article>
//   </main>
// </body></html>
// Googlebot sees: complete semantic content → indexes everything → high ranking ✅

// KEY SEO METRICS IMPROVED BY SSR:
// • FCP (First Contentful Paint): faster — HTML arrives pre-built
// • LCP (Largest Contentful Paint): faster — above-fold content in HTML
// • CLS (Cumulative Layout Shift): lower — no content appearing after JS loads
// • Crawl budget: efficient — bot indexes page in one request

export {};`,
    walkthrough: [
      "CSR delivers an empty root div — crawlers dependent on JS may index blank content.",
      "SSR delivers complete HTML including all text, links, and semantic structure.",
      "Google's crawler CAN execute JavaScript, but delays mean CSR pages may rank lower.",
      "SSR improves Core Web Vitals (FCP, LCP) — performance is now a direct ranking factor.",
      "SSR also improves social media link previews — scrapers read the first HTTP response."
    ]
  },

  // ─── Q68: React Native ────────────────────────────────────────────────────────
  68: {
    code: `// React vs React Native — same mental model, different render target

// ── REACT (web): renders to browser DOM elements
// import React, { useState } from 'react';
// function Counter() {
//   const [n, setN] = useState(0);
//   return (
//     <div style={{ padding: 20 }}>       {/* div → browser DOM HTMLDivElement */}
//       <p>Count: {n}</p>                  {/* p → HTMLParagraphElement */}
//       <button onClick={() => setN(n+1)}>+1</button>
//     </div>
//   );
// }

// ── REACT NATIVE (mobile iOS + Android): renders to NATIVE platform widgets
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// function Counter() {
//   const [n, setN] = useState(0);
//   return (
//     <View style={styles.container}>    {/* View → UIView (iOS) / android.View */}
//       <Text style={styles.text}>Count: {n}</Text>   {/* Text → UILabel / TextView */}
//       <TouchableOpacity onPress={() => setN(n+1)}>
//         <Text>+1</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({ container: { padding: 20 }, text: { fontSize: 18 } });

// KEY DIFFERENCES:
// Feature         | React (Web)           | React Native
// ─────────────────────────────────────────────────────────
// Renders to      | HTML DOM              | Native widgets
// Styling         | CSS / Tailwind        | StyleSheet API (Flexbox, no grid, no px)
// Navigation      | React Router          | React Navigation
// Animations      | CSS / Framer Motion   | Animated API / Reanimated
// HTTP            | fetch / axios         | fetch / axios (same!)
// State / Hooks   | Same ✅               | Same ✅

export {};`,
    walkthrough: [
      "React and React Native share the same component model, hooks, and state management.",
      "React renders to HTML DOM elements (div, span, button); RN renders to native iOS/Android widgets.",
      "View = div, Text = p/span, TouchableOpacity = button — the primitives differ but the pattern is identical.",
      "CSS doesn't exist in RN; StyleSheet.create() defines Flexbox-based layout (column-default).",
      "Business logic (API calls, state, custom hooks) is fully shareable between web and mobile."
    ]
  },

  // ─── Q69: Bridging native modules ────────────────────────────────────────────
  69: {
    code: `// React Native Native Module Bridge (simplified explanation)
// Allows JavaScript to call platform-specific Swift/Kotlin code

// ── 1. NATIVE SIDE (iOS — Swift)
// @objc(BiometricModule)
// class BiometricModule: NSObject {
//   @objc
//   func authenticate(_ resolve: @escaping RCTPromiseResolveBlock,
//                     reject: @escaping RCTPromiseRejectBlock) {
//     let context = LAContext()
//     context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics,
//                            localizedReason: "Login to CareMagnus") { success, error in
//       if success { resolve(true) }
//       else { reject("AUTH_FAILED", error?.localizedDescription, nil) }
//     }
//   }
//   @objc static func requiresMainQueueSetup() -> Bool { return false }
// }

// ── 2. BRIDGE REGISTRATION (iOS — Objective-C header)
// RCT_EXTERN_MODULE(BiometricModule, NSObject)
// RCT_EXTERN_METHOD(authenticate: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

// ── 3. JAVASCRIPT SIDE — call native code from React Native
// import { NativeModules } from 'react-native';
// const { BiometricModule } = NativeModules;
//
// async function loginWithBiometric() {
//   try {
//     const success = await BiometricModule.authenticate();
//     if (success) navigation.replace('Dashboard');
//   } catch (e) {
//     Alert.alert('Authentication Failed', e.message);
//   }
// }

// Modern approach: Turbo Modules (React Native 0.71+)
// JSI (JavaScript Interface) replaces the async bridge — synchronous calls possible

export {};`,
    walkthrough: [
      "The bridge allows JS to call Swift/Kotlin code via an async JSON-serialized message channel.",
      "@objc decorators expose Swift methods to the Objective-C runtime which bridges to JS.",
      "NativeModules.BiometricModule on the JS side gets a proxy to the native class.",
      "Promises bridge async native operations — resolve/reject map to JS promise fulfillment.",
      "Turbo Modules (new arch) use JSI for direct synchronous JS↔native calls — much faster."
    ]
  },

  // ─── Q70: React Native layout ─────────────────────────────────────────────────
  70: {
    code: `// React Native uses Yoga (Facebook's C++ Flexbox engine)
// Key differences from CSS Flexbox:

// import { View, Text, StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,                    // fill all available space
//     flexDirection: 'column',    // DEFAULT is COLUMN (opposite of web!)
//     padding: 16,
//     backgroundColor: '#0f172a',
//   },
//   row: {
//     flexDirection: 'row',       // must explicitly opt into row
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   card: {
//     flex: 1,                    // equal width in a row
//     margin: 4,
//     padding: 12,
//     borderRadius: 8,            // numbers only, NO 'px' unit!
//     backgroundColor: '#1e293b',
//   },
//   title: {
//     fontSize: 14,               // numbers only
//     fontWeight: '700',
//     color: '#f1f5f9',
//   }
// });

// Differences from CSS:
// Feature            | CSS (web)       | React Native
// ──────────────────────────────────────────────────────
// Default flex dir   | row             | COLUMN ⚠️
// Units              | px / em / rem   | unitless numbers only
// Grid               | CSS Grid ✅      | NOT SUPPORTED ❌
// Floats             | float ✅         | NOT SUPPORTED ❌
// Position           | static default  | relative default

export {};`,
    walkthrough: [
      "React Native uses Yoga, Facebook's cross-platform Flexbox implementation written in C++.",
      "CRITICAL difference: flexDirection defaults to 'column' in RN, not 'row' like web CSS.",
      "All dimension values are unitless numbers — React Native scales them by pixel density.",
      "CSS Grid is not supported — all layout must use Flexbox.",
      "position:'absolute' works but coordinates are relative to the parent View, not the page."
    ]
  },

  // ─── Q71: Apollo Client ───────────────────────────────────────────────────────
  71: {
    code: `// Apollo Client + React — GraphQL data fetching
// npm install @apollo/client graphql

// import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

// ── 1. Configure the client
// const client = new ApolloClient({
//   uri: 'https://api.damora.ai/graphql',
//   cache: new InMemoryCache(),     // automatic normalised cache
//   headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
// });

// ── 2. Define a GraphQL query
// const GET_QUESTIONS = gql\`
//   query GetQuestions($chapter: Int!) {
//     questions(chapter: $chapter) {
//       id
//       title
//       difficulty
//       answered
//     }
//   }
// \`;

// ── 3. Use in a component with useQuery
// function QuestionList({ chapter }: { chapter: number }) {
//   const { loading, error, data, refetch } = useQuery(GET_QUESTIONS, {
//     variables: { chapter },
//     fetchPolicy: 'cache-and-network', // serve cached, then update from network
//   });
//
//   if (loading) return <p>Loading…</p>;
//   if (error)   return <p>Error: {error.message}</p>;
//
//   return (
//     <ul>
//       {data.questions.map(q => <li key={q.id}>{q.title} — {q.difficulty}</li>)}
//     </ul>
//   );
// }

// ── 4. Wrap app in ApolloProvider
// root.render(<ApolloProvider client={client}><App /></ApolloProvider>);

export {};`,
    walkthrough: [
      "ApolloClient is configured once with the GraphQL endpoint and an InMemoryCache.",
      "ApolloProvider makes the client available to all components via React Context.",
      "useQuery(QUERY, { variables }) fetches data and returns { loading, error, data }.",
      "InMemoryCache normalizes results by type+id — queries sharing data share cache entries.",
      "fetchPolicy controls cache behavior: cache-first (default), network-only, cache-and-network."
    ]
  },

  // ─── Q72: Apollo local state ──────────────────────────────────────────────────
  72: {
    code: `// Apollo Client local state with Reactive Variables (no server, no schema needed)
// import { makeVar, useReactiveVar } from '@apollo/client';

// ── Reactive Variables — client-side only state
// const sidebarOpenVar = makeVar<boolean>(false);
// const activeWorkspaceVar = makeVar<{ id: string; name: string } | null>(null);

// // Reading: anywhere in your app
// function Sidebar() {
//   const isOpen = useReactiveVar(sidebarOpenVar);
//   return <nav style={{ width: isOpen ? 240 : 0 }}>…</nav>;
// }

// // Writing: anywhere in your app (no dispatch needed!)
// function ToggleButton() {
//   return <button onClick={() => sidebarOpenVar(!sidebarOpenVar())}>Toggle</button>;
// }

// ── Combining local + remote state in one query via @client directive
// const GET_DASHBOARD = gql\`
//   query Dashboard {
//     currentUser { id name email }   # fetched from server
//     sidebarOpen @client              # read from reactive var
//   }
// \`;
//
// // Wire it up in cache policies:
// const client = new ApolloClient({
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           sidebarOpen: { read: () => sidebarOpenVar() }
//         }
//       }
//     }
//   })
// });

// SUMMARY: Reactive Variables = Apollo's answer to useState for global state.

export {};`,
    walkthrough: [
      "makeVar(initialValue) creates a reactive variable — accessible anywhere without Provider.",
      "useReactiveVar(myVar) subscribes the component — re-renders when the var changes.",
      "Reactive vars don't need a GraphQL schema — pure client-side state management.",
      "The @client directive in queries merges local reactive vars with remote server data.",
      "This gives a unified query interface for both cached remote data and local UI state."
    ]
  },

  // ─── Q73: Redux vs Context ────────────────────────────────────────────────────
  73: {
    code: `// Redux vs Context API — decision matrix

// ── CONTEXT API ────────────────────────────────────────────────
// import { createContext, useContext, useState } from 'react';
// const UserCtx = createContext(null);
//
// GOOD FOR:
// ✅ Auth session (changes once on login/logout)
// ✅ Theme / locale / i18n (changes rarely)
// ✅ Small apps or features with <5 shared state values
//
// LIMITATIONS:
// ❌ Every context consumer re-renders when ANY value in the context changes
// ❌ No built-in devtools for state time-travel or action logging
// ❌ No middleware for async side effects (must roll your own)

// ── REDUX TOOLKIT ─────────────────────────────────────────────
// import { configureStore, createSlice } from '@reduxjs/toolkit';
//
// GOOD FOR:
// ✅ Complex state with many interdependent slices
// ✅ High-frequency updates (shopping cart, real-time feeds)
// ✅ Apps requiring time-travel debugging or undo/redo
// ✅ Large teams needing strict conventions (actions, reducers)
//
// ADVANTAGES:
// ✅ Selectors via useSelector prevent unnecessary re-renders
// ✅ Redux DevTools — inspect every action and state diff
// ✅ createAsyncThunk — clean async action patterns
// ✅ RTK Query — full data fetching + caching layer

// VERDICT:
// 1–5 global values, low-frequency → Context API
// Complex business logic, high-frequency, large team → Redux Toolkit
// Alternative: Zustand (simpler API, same power as Redux for most apps)

export {};`,
    walkthrough: [
      "Context causes ALL consumers to re-render when the context value object changes reference.",
      "Redux useSelector only re-renders if the selected slice changes — fine-grained control.",
      "Redux Toolkit eliminates Redux boilerplate with createSlice, createAsyncThunk, RTK Query.",
      "Context is built into React — no install; Redux Toolkit is ~40KB extra bundle.",
      "Zustand is a lightweight Redux alternative: 1KB, no boilerplate, no Provider needed."
    ]
  },

  // ─── Q74: Redux workflow ──────────────────────────────────────────────────────
  74: {
    code: `// Redux Toolkit — complete working example
// npm install @reduxjs/toolkit react-redux

// ── 1. Create a slice (reducer + actions in one place)
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
//
// export const fetchQuestions = createAsyncThunk('questions/fetch', async (chapter: number) => {
//   const res = await fetch(\`/api/questions?chapter=\${chapter}\`);
//   return res.json();
// });
//
// const questionsSlice = createSlice({
//   name: 'questions',
//   initialState: { items: [], loading: false, selectedId: null as number|null },
//   reducers: {
//     selectQuestion: (state, action: PayloadAction<number>) => {
//       state.selectedId = action.payload; // Immer allows 'mutation' syntax!
//     },
//     clearSelection: state => { state.selectedId = null; }
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchQuestions.pending,   state => { state.loading = true; })
//       .addCase(fetchQuestions.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
//       .addCase(fetchQuestions.rejected,  state => { state.loading = false; });
//   }
// });
// export const { selectQuestion, clearSelection } = questionsSlice.actions;
// export default questionsSlice.reducer;

// ── 2. Configure store
// const store = configureStore({ reducer: { questions: questionsSlice.reducer } });

// ── 3. Use in components
// function QuestionsList() {
//   const dispatch = useAppDispatch();
//   const { items, loading } = useAppSelector(s => s.questions);
//   useEffect(() => { dispatch(fetchQuestions(1)); }, []);
//   return loading ? <p>Loading…</p> : <ul>{items.map(q => <li key={q.id}>{q.title}</li>)}</ul>;
// }

export {};`,
    walkthrough: [
      "createSlice generates action creators AND reducer logic in one place — eliminates boilerplate.",
      "RTK uses Immer internally — you can 'mutate' state in reducers; Immer makes it immutable.",
      "createAsyncThunk handles pending/fulfilled/rejected lifecycle actions automatically.",
      "configureStore wires reducers together and includes Redux DevTools out of the box.",
      "useSelector subscribes to specific state slices; re-renders only when that slice changes."
    ]
  },

  // ─── Q75: Side effects in Redux ───────────────────────────────────────────────
  75: {
    code: `// Redux side effects: Thunk vs Saga

// ── REDUX THUNK (built into Redux Toolkit) — async functions as actions
// A thunk is an action creator that returns a function instead of a plain object.

// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials: { email: string; password: string }, { dispatch, getState, rejectWithValue }) => {
//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         body: JSON.stringify(credentials),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       if (!res.ok) return rejectWithValue(await res.json());
//       const { token, user } = await res.json();
//       localStorage.setItem('token', token);
//       return user;
//     } catch (e: any) {
//       return rejectWithValue(e.message);
//     }
//   }
// );

// ── REDUX SAGA (separate library) — generator functions for complex async flows
// import { takeLatest, call, put, all } from 'redux-saga/effects';
//
// function* fetchUserSaga(action) {
//   try {
//     const user = yield call(api.fetchUser, action.payload.id);  // yield = await
//     yield put({ type: 'user/loaded', payload: user });           // dispatch action
//   } catch (e) {
//     yield put({ type: 'user/error', payload: e.message });
//   }
// }
// function* rootSaga() {
//   yield all([
//     takeLatest('user/fetch', fetchUserSaga),  // cancel inflight if same action fires again
//   ]);
// }

// WHEN TO USE WHICH:
// Thunk: simple async (fetch → store data) — works for 95% of cases
// Saga:  complex flows (polling, request cancellation, websocket channels, saga patterns)

export {};`,
    walkthrough: [
      "Reducers must be pure — no async operations allowed inside them.",
      "Thunk middleware intercepts functions dispatched as actions and calls them with dispatch/getState.",
      "createAsyncThunk generates pending/fulfilled/rejected action types automatically.",
      "Redux Saga uses generator functions — each yield is a testable declarative effect.",
      "Saga excels at complex concurrency: takeLatest cancels previous, takeEvery runs all."
    ]
  },

  // ─── Q76: Setup React project ─────────────────────────────────────────────────
  76: {
    code: `// Creating a new React + TypeScript + Vite project from scratch

// STEP 1: Scaffold with Vite (fastest modern option)
// npm create vite@latest my-app -- --template react-ts
// cd my-app
// npm install

// STEP 2: Project structure created by Vite
// my-app/
// ├── public/              ← static assets (favicon, images)
// ├── src/
// │   ├── main.tsx         ← ReactDOM.createRoot entry point
// │   ├── App.tsx          ← root component
// │   ├── App.css
// │   └── vite-env.d.ts   ← Vite type declarations
// ├── index.html           ← HTML template (Vite injects bundle here)
// ├── vite.config.ts       ← bundler config (plugins, aliases, proxy)
// ├── tsconfig.json        ← TypeScript settings
// └── package.json

// STEP 3: vite.config.ts — typical configuration
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';
// export default defineConfig({
//   plugins: [react()],
//   resolve: { alias: { '@': path.resolve(__dirname, 'src') } }, // import '@/components/Button'
//   server: {
//     port: 3000,
//     proxy: { '/api': 'http://localhost:4000' } // forward API calls to Express
//   }
// });

// STEP 4: Run development server
// npm run dev   → http://localhost:3000
// npm run build → dist/ folder (production bundle)
// npm run preview → preview the production build locally

export {};`,
    walkthrough: [
      "Vite scaffolding is the fastest way to start — it configures everything in seconds.",
      "Vite uses native ESM during dev — no bundling = instant HMR and startup.",
      "The '@' alias lets you import '@/components/Button' instead of '../../components/Button'.",
      "The server.proxy setting avoids CORS in development by forwarding /api to your backend.",
      "npm run build produces an optimized dist/ folder — ready for Vercel, Netlify, or S3 deploy."
    ]
  },

  // ─── Q77: Babel ───────────────────────────────────────────────────────────────
  77: {
    code: `// Babel transpiles modern JS + JSX into backward-compatible JavaScript

// ── WHAT BABEL DOES:

// INPUT (what you write):
// const Arrow = ({ name }) => <h1>Hello {name}!</h1>;
// const nums = [1, 2, 3].map(n => n * 2);

// OUTPUT (what Babel produces for older browsers):
// "use strict";
// var Arrow = function Arrow(_ref) {
//   var name = _ref.name;
//   return React.createElement("h1", null, "Hello ", name, "!");
// };
// var nums = [1, 2, 3].map(function(n) { return n * 2; });

// ── BABEL CONFIG (.babelrc or babel.config.js):
// {
//   "presets": [
//     ["@babel/preset-env", {
//       "targets": "> 0.25%, not dead",  // browser targets
//       "useBuiltIns": "usage",           // only polyfill what's used
//       "corejs": 3
//     }],
//     ["@babel/preset-react", {
//       "runtime": "automatic"            // no need to import React in every file!
//     }],
//     "@babel/preset-typescript"          // strip TS types
//   ],
//   "plugins": [
//     "@babel/plugin-transform-class-properties",
//     "@babel/plugin-proposal-optional-chaining"
//   ]
// }

// NOTE: Vite uses esbuild (not Babel) for transpilation during development —
// it's 10-100x faster. Babel is still used in CRA and custom Webpack setups.

export {};`,
    walkthrough: [
      "Babel transforms JSX into React.createElement calls — browsers cannot read JSX natively.",
      "@babel/preset-env transpiles modern JS (arrow functions, optional chaining) for older browsers.",
      "@babel/preset-react with runtime:'automatic' means no 'import React' needed in every file.",
      "@babel/preset-typescript strips TypeScript types — it does NOT type-check (use tsc for that).",
      "Vite replaces Babel with esbuild for speed; Babel is still standard in Jest/CRA setups."
    ]
  },

  // ─── Q78: Webpack ─────────────────────────────────────────────────────────────
  78: {
    code: `// Webpack is a module bundler — takes your module graph and outputs optimised bundles

// webpack.config.js (simplified — Vite handles this automatically)
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: './src/main.tsx',                         // start of the dependency graph
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].[contenthash].js',           // content-hash for cache busting
//     clean: true,                                   // clear dist/ before each build
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//     alias: { '@': path.resolve(__dirname, 'src') }
//   },
//   module: {
//     rules: [
//       { test: /\.(ts|tsx)$/, use: 'babel-loader', exclude: /node_modules/ },
//       { test: /\.css$/,      use: ['style-loader', 'css-loader'] },
//       { test: /\.(png|svg)$/, type: 'asset/resource' }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({ template: './index.html' })
//   ],
//   optimization: {
//     splitChunks: { chunks: 'all' }, // vendor splitting — react in separate chunk
//     runtimeChunk: 'single',
//   },
//   devServer: {
//     port: 3000,
//     hot: true,           // Hot Module Replacement
//     historyApiFallback: true, // SPA routing — always serve index.html
//   }
// };

// MODERN ALTERNATIVE: Vite (esbuild + Rollup) — 10-100x faster than Webpack dev builds.

export {};`,
    walkthrough: [
      "entry is the root file — Webpack traces the entire import graph from there.",
      "Loaders (babel-loader, css-loader) transform non-JS files into JavaScript modules.",
      "Plugins (HtmlWebpackPlugin) perform higher-level transformations and bundle optimizations.",
      "contenthash in output filename changes when file content changes — enables browser caching.",
      "splitChunks separates vendor code (React, lodash) — users cache it across deploys."
    ]
  },

  // ─── Q79: Hot Module Replacement ──────────────────────────────────────────────
  79: {
    code: `// Hot Module Replacement (HMR) — updates code in the browser without full page refresh.
// This preserves component state, which dramatically speeds up development.

// HOW IT WORKS (Vite's implementation):
// 1. File saved → Vite's watcher detects the change
// 2. Vite re-transforms ONLY the changed module (esbuild — milliseconds)
// 3. The changed module is pushed to the browser via WebSocket
// 4. The browser's HMR runtime replaces the old module in-place
// 5. React Fast Refresh re-renders the affected components, preserving state

// The counter keeps its state even after you edit the styling!
import React, { useState } from 'react';

export default function HMRDemo() {
  const [count, setCount] = useState(100); // ← try editing this initial value and saving
  // With HMR: count stays at whatever you clicked up to — state preserved!
  // Without HMR (full refresh): count would reset to the initial value on every save.

  return (
    <div style={{ padding: 16, fontFamily: 'monospace' }}>
      <p style={{ fontSize: 14, fontWeight: 700 }}>Count: {count}</p>
      {/* Try editing this color and saving — it updates instantly! */}
      <button
        onClick={() => setCount(c => c + 1)}
        style={{ padding: '6px 14px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 6 }}>
        Increment
      </button>
      <p style={{ fontSize: 11, color: '#6b7280', marginTop: 8 }}>
        Edit this file and save — React state is preserved.
      </p>
    </div>
  );
}`,
    walkthrough: [
      "HMR replaces only the modified module at runtime — no full browser reload.",
      "React Fast Refresh preserves component state across edits.",
      "Without HMR, every code change loses all state — forms reset, navigation returns to root.",
      "HMR works via a WebSocket between the Vite dev server and the browser.",
      "Production builds don't include HMR runtime — it's purely a development feature."
    ]
  },

  // ─── Q80: create-react-app ────────────────────────────────────────────────────
  80: {
    code: `// Create React App (CRA) vs Vite — choosing your starter

// ── CREATE REACT APP (legacy, largely deprecated in 2024)
// npx create-react-app my-app --template typescript

// What it provides out of the box:
// ✅ Webpack + Babel pre-configured (zero-config)
// ✅ Jest + React Testing Library
// ✅ ESLint pre-configured
// ✅ HTTPS dev server, proxy support
// ✅ PWA template available
// ❌ Dev server startup: 15-30 seconds
// ❌ HMR is slow (full re-bundle on change)
// ❌ No config access without 'ejecting'

// ── EJECTING from CRA (one-way, irreversible!)
// npm run eject
// This copies webpack.config.js, babel config, and all scripts into your project.
// You get full control but must maintain all configs yourself.
// WARNING: cannot un-eject. Use CRACO or react-app-rewired to extend without ejecting.

// ── VITE (modern recommendation, 2024)
// npm create vite@latest my-app -- --template react-ts
// ✅ Dev server startup: <1 second
// ✅ HMR: instant (esbuild transforms)
// ✅ Fully configurable vite.config.ts
// ✅ Native ESM — no bundling in dev
// ✅ Rollup for production (excellent tree-shaking)

// RECOMMENDATION: Use Vite for new projects. CRA is in maintenance mode.

export {};`,
    walkthrough: [
      "CRA was the zero-config standard from 2016-2022; now largely superseded by Vite.",
      "CRA uses Webpack under the hood — powerful but slow in development.",
      "Ejecting gives full config access but locks you into maintaining all tooling manually.",
      "CRACO or react-app-rewired are intermediate options that extend CRA without ejecting.",
      "Vite's native ESM approach makes dev startup near-instant — a huge DX improvement."
    ]
  },

  // ─── Q81: API calls in React ──────────────────────────────────────────────────
  81: {
    code: `import React, { useState, useEffect } from 'react';

// Pattern: API call inside useEffect with proper cleanup and loading state
interface Post { id: number; title: string; body: string; }

export default function PostFeed() {
  const [posts,   setPosts]   = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [page,    setPage]    = useState(1);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetch(\`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=3\`, { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(\`HTTP \${r.status}\`); return r.json() as Promise<Post[]>; })
      .then(data => { setPosts(data); setLoading(false); })
      .catch(e => { if (e.name !== 'AbortError') { setError(e.message); setLoading(false); } });

    return () => ctrl.abort(); // cancel on re-render (page change)
  }, [page]);

  return (
    <div style={{ padding: 16, maxWidth: 400, fontFamily: 'sans-serif' }}>
      {loading && <p style={{ color: '#6b7280', fontSize: 12 }}>Loading…</p>}
      {error   && <p style={{ color: '#dc2626', fontSize: 12 }}>Error: {error}</p>}
      {posts.map(p => (
        <div key={p.id} style={{ marginBottom: 12, padding: 10, border: '1px solid #e5e7eb', borderRadius: 6 }}>
          <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 4px' }}>{p.title}</p>
          <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{p.body.slice(0, 80)}…</p>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
        <span style={{ fontSize: 12, alignSelf: 'center' }}>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next →</button>
      </div>
    </div>
  );
}`,
    walkthrough: [
      "All fetch logic lives inside useEffect — it runs after render and is re-triggered by [page].",
      "AbortController cancels the in-flight request when the page changes or component unmounts.",
      "Three state variables (posts, loading, error) cover all possible UI states cleanly.",
      "The 'AbortError' check prevents state updates for intentional cancellations.",
      "For production, use React Query or SWR — they add caching, retries, and background refetching."
    ]
  },

  // ─── Q82: Axios vs fetch ──────────────────────────────────────────────────────
  82: {
    code: `// Axios vs fetch — side-by-side comparison
// npm install axios

// import axios from 'axios';

// ── 1. AUTOMATIC JSON PARSING
// fetch:  const res = await fetch(url); const data = await res.json(); // two steps
// axios:  const { data } = await axios.get(url);                       // one step ✅

// ── 2. HTTP ERROR HANDLING
// fetch: does NOT throw on 4xx/5xx — must check res.ok manually
//   const res = await fetch('/api/user');
//   if (!res.ok) throw new Error('Failed'); // ← easy to forget!

// axios: automatically throws on 4xx/5xx — caught in catch block ✅
//   try { await axios.get('/api/user'); }
//   catch (e) { if (axios.isAxiosError(e)) console.log(e.response?.status); }

// ── 3. INTERCEPTORS — add auth headers to every request
// const api = axios.create({ baseURL: 'https://api.damora.ai' });
// api.interceptors.request.use(config => {
//   config.headers.Authorization = \`Bearer \${localStorage.getItem('token')}\`;
//   return config;
// });
// api.interceptors.response.use(
//   res => res,
//   err => { if (err.response?.status === 401) { /* logout */ } return Promise.reject(err); }
// );

// ── 4. UPLOAD PROGRESS (fetch cannot do this!)
// await axios.post('/api/upload', formData, {
//   onUploadProgress: e => setProgress(Math.round(e.loaded / e.total * 100))
// });

// ── 5. REQUEST CANCELLATION
// const ctrl = new AbortController();
// await axios.get('/api/data', { signal: ctrl.signal });

export {};`,
    walkthrough: [
      "fetch requires two awaits (fetch + .json()); Axios auto-parses JSON into data directly.",
      "fetch doesn't throw on 4xx/5xx — you MUST check res.ok; Axios throws automatically.",
      "Interceptors allow global request/response transforms — perfect for auth token injection.",
      "Axios's onUploadProgress is crucial for file upload progress bars — fetch has no equivalent.",
      "Both support AbortController for cancellation; Axios also has its own CancelToken (legacy)."
    ]
  },

  // ─── Q83: WebSocket in React ──────────────────────────────────────────────────
  83: {
    code: `import React, { useState, useEffect, useRef } from 'react';

// WebSocket connection managed correctly with useEffect + useRef
export default function LiveNotifications() {
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null); // persist without re-render

  useEffect(() => {
    // Open WebSocket connection on mount
    const ws = new WebSocket('wss://echo.websocket.org'); // demo echo server
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ type: 'subscribe', channel: 'notifications' }));
    };

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data].slice(-10)); // keep last 10
    };

    ws.onerror = (e) => { console.error('WebSocket error:', e); };

    ws.onclose = () => { setConnected(false); };

    // CLEANUP: close WebSocket when component unmounts or re-renders
    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []); // empty deps = open once on mount

  const send = () => {
    wsRef.current?.send(JSON.stringify({ type: 'ping', ts: Date.now() }));
  };

  return (
    <div style={{ padding: 16, fontFamily: 'monospace', maxWidth: 340 }}>
      <p style={{ fontSize: 12 }}>Status: <b style={{ color: connected ? '#16a34a' : '#dc2626' }}>{connected ? 'Connected' : 'Disconnected'}</b></p>
      <button onClick={send} disabled={!connected} style={{ marginBottom: 8 }}>Send Ping</button>
      <div style={{ fontSize: 11, maxHeight: 120, overflow: 'auto', background: '#f9fafb', padding: 8, borderRadius: 4 }}>
        {messages.map((m, i) => <p key={i} style={{ margin: '2px 0' }}>{m}</p>)}
      </div>
    </div>
  );
}`,
    walkthrough: [
      "WebSocket is opened inside useEffect with an empty dep array — connects once on mount.",
      "wsRef stores the WebSocket instance — accessible in callbacks without causing re-renders.",
      "onopen, onmessage, onerror, onclose handlers update React state accordingly.",
      "The cleanup function calls ws.close() — critical to prevent connection leaks on unmount.",
      "In production, use socket.io-client for automatic reconnection, namespaces, and rooms."
    ]
  },

  // ─── Q84: Connect React to backend ───────────────────────────────────────────
  84: {
    code: `// Connecting React front-end to a Node/Express backend
// Common patterns and CORS solutions

// ── OPTION 1: Vite dev proxy (avoids CORS in development)
// vite.config.ts:
// server: {
//   proxy: {
//     '/api': {
//       target: 'http://localhost:4000',
//       changeOrigin: true,           // rewrite the Origin header
//       rewrite: path => path         // keep /api prefix on backend
//     }
//   }
// }
// Now: fetch('/api/questions') → proxied to http://localhost:4000/api/questions

// ── OPTION 2: Express CORS middleware (for production or when no proxy)
// import cors from 'cors';
// app.use(cors({
//   origin: ['https://handbook.damora.ai', 'http://localhost:3000'],
//   credentials: true,    // allow cookies / auth headers
// }));

// ── OPTION 3: Axios base URL configuration
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000',
//   withCredentials: true,
// });

// ── OPTION 4: Next.js API Routes (co-located backend — no CORS issue)
// pages/api/questions.ts (or app/api/questions/route.ts in App Router)
// export default async function handler(req, res) {
//   const data = await db.query('SELECT * FROM questions LIMIT 10');
//   res.json(data);
// }
// Client: fetch('/api/questions') — same origin, no CORS!

// ── ENVIRONMENT VARIABLES in Vite:
// .env.development: VITE_API_URL=http://localhost:4000
// .env.production:  VITE_API_URL=https://api.damora.ai
// Usage: import.meta.env.VITE_API_URL  (must be prefixed VITE_)

export {};`,
    walkthrough: [
      "Vite's dev proxy forwards requests to your backend — eliminates CORS in development.",
      "Express CORS middleware must explicitly list allowed origins for security.",
      "Axios base URL from import.meta.env.VITE_API_URL switches between dev and prod automatically.",
      "Next.js API routes eliminate CORS entirely — front and back on the same origin.",
      "Never hardcode API URLs — always use environment variables for deployment flexibility."
    ]
  },

  // ─── Q85: Deploy React app ────────────────────────────────────────────────────
  85: {
    code: `// Deploying a React (Vite) app — step by step

// ── STEP 1: Production build
// npm run build
// Creates: dist/
// ├── index.html
// ├── assets/
// │   ├── index-[hash].js    ← JS bundle (minified, tree-shaken)
// │   └── index-[hash].css   ← CSS bundle

// ── STEP 2A: Vercel (easiest — zero config)
// Push to GitHub → connect repo on vercel.com → deploy!
// Vercel auto-detects Vite, runs npm run build, serves from CDN.
// Environment variables: set in Vercel dashboard → injected at build time.

// ── STEP 2B: Netlify (similar to Vercel)
// netlify.toml:
// [build]
//   command = "npm run build"
//   publish = "dist"
// [[redirects]]
//   from = "/*"
//   to   = "/index.html"   ← CRITICAL for React Router SPA routing!
//   status = 200

// ── STEP 2C: AWS S3 + CloudFront
// aws s3 sync dist/ s3://my-bucket --delete
// Configure: S3 static website + CloudFront CDN + SSL certificate (ACM)

// ── STEP 2D: Docker (for custom server requirements)
// FROM node:20-alpine AS builder
// WORKDIR /app
// COPY . .
// RUN npm ci && npm run build
//
// FROM nginx:alpine
// COPY --from=builder /app/dist /usr/share/nginx/html
// COPY nginx.conf /etc/nginx/conf.d/default.conf
// EXPOSE 80

// ── SPA ROUTING: ALL hosts must redirect 404 → index.html
// Without this, refreshing /questions/42 returns a 404!

export {};`,
    walkthrough: [
      "npm run build creates an optimized dist/ folder — all assets hashed for cache busting.",
      "Vercel and Netlify auto-deploy on git push — zero-config for Vite projects.",
      "The Netlify redirects rule is CRITICAL: /* → /index.html handles client-side routes.",
      "Docker multi-stage build: Node builds the app, Nginx serves the static files.",
      "Never commit environment secrets to git — use the host's env variable settings panel."
    ]
  },

  // ─── Q86: Production optimization ────────────────────────────────────────────
  86: {
    code: `import React, { lazy, Suspense, memo } from 'react';

// ── 1. Code splitting with React.lazy — don't load routes you haven't visited
const Dashboard  = lazy(() => import('./pages/Dashboard'));
const Handbook   = lazy(() => import('./pages/Handbook'));
const MockSim    = lazy(() => import('./pages/MockSimulator'));

// ── 2. Route-level Suspense — show skeleton while chunk downloads
function AppRouter({ page }: { page: string }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {page === 'dashboard' && <Dashboard />}
      {page === 'handbook'  && <Handbook />}
      {page === 'mock'      && <MockSim />}
    </Suspense>
  );
}

// ── 3. Memoize expensive pure components
const ChapterCard = memo(function ChapterCard({ title, count }: { title: string; count: number }) {
  return (
    <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 6 }}>
      <p style={{ fontWeight: 700, fontSize: 13 }}>{title}</p>
      <p style={{ fontSize: 11, color: '#6b7280' }}>{count} questions</p>
    </div>
  );
});

function PageSkeleton() {
  return <div style={{ height: 300, background: '#f3f4f6', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />;
}

// ── 4. Vite bundle analysis
// npm install rollup-plugin-visualizer
// vite.config.ts: plugins: [visualizer({ open: true })]
// Shows which packages dominate your bundle

// ── 5. Image optimization
// Use WebP format, lazy loading: <img loading="lazy" decoding="async" />
// Or: import { Image } from 'next/image'; // Next.js auto-optimizes

export {};`,
    walkthrough: [
      "Code splitting: each page is a separate JS chunk — users only download what they visit.",
      "Suspense fallback shows a skeleton UI while the chunk downloads — no blank flash.",
      "React.memo prevents ChapterCard from re-rendering when parent state changes but props don't.",
      "Bundle visualizer shows what's inflating your bundle size.",
      "Images: use loading='lazy', WebP format, and explicit width/height to prevent CLS shifts."
    ]
  },

  // ─── Q87: Service workers ─────────────────────────────────────────────────────
  87: {
    code: `// Service Worker in a React app — enabling PWA capabilities

// public/sw.js — the service worker file
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open('handbook-v1').then(cache =>
//       cache.addAll([
//         '/',
//         '/index.html',
//         '/assets/index.js',
//         '/assets/index.css',
//         '/offline.html',
//       ])
//     )
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(cached => {
//       if (cached) return cached;              // cache hit — instant!
//       return fetch(event.request)             // network fallback
//         .catch(() => caches.match('/offline.html')); // offline fallback
//     })
//   );
// });

// ── Registering in main.tsx:
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(reg => console.log('SW registered:', reg.scope))
//       .catch(err => console.error('SW failed:', err));
//   });
// }

// ── Modern approach: Vite PWA plugin (handles everything automatically)
// npm install vite-plugin-pwa
// vite.config.ts: plugins: [VitePWA({ registerType: 'autoUpdate', workbox: { ... } })]

// WHAT SERVICE WORKERS ENABLE:
// ✅ Offline mode (serve cached assets when network fails)
// ✅ Background sync (queue form submissions when offline)
// ✅ Push notifications (even when app is closed)
// ✅ Cache-first strategy (instant load — serve cache, update in background)

export {};`,
    walkthrough: [
      "Service workers are separate JavaScript files running in the browser background thread.",
      "The 'install' event pre-caches critical assets — app loads instantly on repeat visits.",
      "The 'fetch' event intercepts network requests — can serve cached responses instantly.",
      "If the network fails, the service worker can serve an offline.html fallback page.",
      "vite-plugin-pwa automates sw.js generation using Workbox — the production-grade approach."
    ]
  },

  // ─── Q88: HTTPS in React ──────────────────────────────────────────────────────
  88: {
    code: `// HTTPS configuration — development vs production

// ── DEVELOPMENT: enable HTTPS in Vite dev server
// Option A: @vitejs/plugin-basic-ssl (self-signed certificate — quickest)
// npm install @vitejs/plugin-basic-ssl
// vite.config.ts:
// import basicSsl from '@vitejs/plugin-basic-ssl';
// export default defineConfig({ plugins: [react(), basicSsl()], server: { https: true, port: 3000 } });
// → https://localhost:3000 (browser will warn about self-signed cert — click 'Advanced' → 'Proceed')

// Option B: mkcert (trusted local certificate)
// brew install mkcert && mkcert -install
// mkcert localhost 127.0.0.1 ::1
// Creates: localhost.pem + localhost-key.pem
// vite.config.ts:
// import fs from 'fs';
// server: { https: { key: fs.readFileSync('localhost-key.pem'), cert: fs.readFileSync('localhost.pem') } }

// ── PRODUCTION: HTTPS is NOT configured in React/Vite code.
// It's handled at the infrastructure level:

// Vercel/Netlify: automatic SSL via Let's Encrypt — zero config ✅

// Nginx (custom server):
// server {
//   listen 443 ssl;
//   server_name handbook.damora.ai;
//   ssl_certificate     /etc/letsencrypt/live/handbook.damora.ai/fullchain.pem;
//   ssl_certificate_key /etc/letsencrypt/live/handbook.damora.ai/privkey.pem;
//   location / { root /var/www/dist; try_files $uri /index.html; }
// }

// HTTPS is required for: Service Workers, PWA install, camera/mic access, secure cookies.

export {};`,
    walkthrough: [
      "@vitejs/plugin-basic-ssl gives instant HTTPS in dev with a self-signed certificate.",
      "mkcert creates locally-trusted certificates — no browser warning, best for dev.",
      "In production, HTTPS is handled by Nginx, the cloud host, or a CDN — never by React.",
      "Let's Encrypt provides free SSL certificates — renewed automatically every 90 days.",
      "HTTPS is required for Service Workers, Geolocation API, clipboard access, and secure cookies."
    ]
  },

  // ─── Q89: Accessibility importance ───────────────────────────────────────────
  89: {
    code: `import React, { useState } from 'react';

// Accessibility (a11y) — building for EVERYONE, including assistive technology users
export default function AccessibleCounter() {
  const [count, setCount] = useState(0);

  return (
    <section aria-label="Counter widget" style={{ padding: 16 }}>
      {/* Semantic HTML: <section>, <h2>, not just <div>s */}
      <h2 id="counter-label" style={{ fontSize: 14, margin: '0 0 8px', fontWeight: 600 }}>
        Interaction Counter
      </h2>

      {/* aria-live: screen readers announce this value when it changes */}
      <p aria-live="polite" aria-atomic="true" style={{ fontSize: 24, fontWeight: 700 }}>
        {count}
      </p>

      {/* aria-label gives screen readers a meaningful button description */}
      <div role="group" aria-labelledby="counter-label" style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setCount(c => c - 1)}
          aria-label="Decrease count"
          disabled={count === 0}
          style={{ padding: '6px 14px', fontSize: 16 }}>
          −
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          aria-label="Increase count"
          style={{ padding: '6px 14px', fontSize: 16 }}>
          +
        </button>
        <button
          onClick={() => setCount(0)}
          aria-label="Reset count to zero"
          style={{ padding: '6px 14px', fontSize: 12 }}>
          Reset
        </button>
      </div>

      {count >= 10 && (
        <p role="alert" style={{ color: '#dc2626', fontSize: 12, marginTop: 8 }}>
          High count! Consider resetting.
        </p>
      )}
    </section>
  );
}`,
    walkthrough: [
      "Semantic elements (<section>, <h2>) communicate structure to screen readers.",
      "aria-live='polite' announces count changes to screen readers after idle.",
      "aria-label on buttons provides a clear description when the button text is just a symbol.",
      "role='alert' for important dynamic messages — screen readers announce immediately.",
      "disabled={count===0} prevents invalid actions and is conveyed to assistive technology."
    ]
  },

  // ─── Q90: Make React accessible ───────────────────────────────────────────────
  90: {
    code: `import React, { useState, useRef, useEffect } from 'react';

// Focus management — critical for modals, drawers, and dynamic content
function AccessibleModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Move focus INTO the modal when it opens
  useEffect(() => { closeRef.current?.focus(); }, []);

  // Trap focus inside modal with keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    // role=dialog + aria-modal tells screen readers this is a modal
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title"
      onKeyDown={handleKeyDown}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'#fff', padding:24, borderRadius:8, maxWidth:320, width:'90%' }}>
        <h2 id="modal-title" style={{ margin:'0 0 12px', fontSize:16 }}>Confirm Action</h2>
        <p style={{ fontSize:13 }}>Are you sure you want to proceed?</p>
        <div style={{ display:'flex', gap:8, marginTop:16 }}>
          <button ref={closeRef} onClick={onClose}
            style={{ padding:'6px 14px', background:'#e5e7eb', border:'none', borderRadius:4, cursor:'pointer' }}>
            Cancel
          </button>
          <button onClick={() => { alert('Confirmed!'); onClose(); }}
            style={{ padding:'6px 14px', background:'#2563eb', color:'#fff', border:'none', borderRadius:4, cursor:'pointer' }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding:16 }}>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {open && <AccessibleModal onClose={() => setOpen(false)} />}
    </div>
  );
}`,
    walkthrough: [
      "useEffect moves focus to the modal's first interactive element when it opens.",
      "role='dialog' + aria-modal='true' tells screen readers to confine navigation inside.",
      "aria-labelledby points to the modal title — screen readers announce it as the dialog name.",
      "Escape key handling is expected UX for all modal dialogs — critical for keyboard users.",
      "When the modal closes, React should return focus to the trigger button — add a ref for that."
    ]
  },

  // ─── Q91: ARIA in React ───────────────────────────────────────────────────────
  91: {
    code: `import React, { useState } from 'react';

// ARIA attributes in React — same names as HTML but camelCase where needed
export default function AccordionSection() {
  const items = [
    { id: 'hooks',  title: 'React Hooks',         body: 'useState, useEffect, useRef, useMemo, useCallback.' },
    { id: 'state',  title: 'State Management',    body: 'Local state, Context API, Redux Toolkit, Zustand.' },
    { id: 'router', title: 'Routing',              body: 'React Router v6, useNavigate, useParams, outlets.' },
  ];
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 360, fontFamily: 'sans-serif' }}>
      {items.map(item => {
        const isOpen = openId === item.id;
        const contentId = \`content-\${item.id}\`;
        return (
          <div key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
            <button
              // aria-expanded tells screen readers whether the section is open
              aria-expanded={isOpen}
              // aria-controls links this button to the content panel it controls
              aria-controls={contentId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              style={{ width:'100%', textAlign:'left', padding:'10px 12px', background:'none',
                       border:'none', cursor:'pointer', fontSize:13, fontWeight:600,
                       display:'flex', justifyContent:'space-between' }}>
              {item.title}
              <span aria-hidden="true">{isOpen ? '▲' : '▼'}</span> {/* decorative — hide from SR */}
            </button>
            <div
              id={contentId}
              role="region"
              aria-labelledby={item.id}
              hidden={!isOpen}   // hidden attribute removes from accessibility tree when closed
              style={{ padding:'8px 12px', fontSize:12, color:'#374151' }}>
              {item.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
    walkthrough: [
      "aria-expanded tells screen readers whether a disclosure button's content is visible.",
      "aria-controls links the button to its controlled panel by ID — screen readers use this.",
      "aria-hidden='true' hides decorative elements (the arrow) from screen readers.",
      "hidden attribute removes the content from the accessibility tree when not expanded.",
      "role='region' + aria-labelledby makes the content panel a navigable landmark."
    ]
  },

  // ─── Q92: Internationalization ────────────────────────────────────────────────
  92: {
    code: `// i18n in React with react-i18next
// npm install i18next react-i18next

// ── i18n.ts — initialise once
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import en from './locales/en.json';
// import hi from './locales/hi.json';
//
// i18n.use(initReactI18next).init({
//   resources: { en: { translation: en }, hi: { translation: hi } },
//   lng: 'en',
//   fallbackLng: 'en',
//   interpolation: { escapeValue: false }, // React already escapes
// });
// export default i18n;

// ── locales/en.json
// { "welcome": "Welcome, {{name}}!", "questions": "{{count}} question", "questions_other": "{{count}} questions" }

// ── locales/hi.json
// { "welcome": "नमस्ते, {{name}}!", "questions": "{{count}} प्रश्न" }

// ── Component usage
// import { useTranslation } from 'react-i18next';
// import i18n from './i18n';
//
// function Header({ user }: { user: string }) {
//   const { t } = useTranslation();
//   return (
//     <header>
//       <h1>{t('welcome', { name: user })}</h1>
//       <p>{t('questions', { count: 42 })}</p>   {/* auto-selects plural form */}
//       <select onChange={e => i18n.changeLanguage(e.target.value)}>
//         <option value="en">English</option>
//         <option value="hi">हिंदी</option>
//       </select>
//     </header>
//   );
// }

// BEST PRACTICES:
// ✅ Extract ALL user-visible strings to translation files — none hardcoded in JSX
// ✅ Use ICU message format for plurals, genders, and date formatting
// ✅ Right-to-left (RTL) support: add dir="rtl" to <html> for Arabic/Hebrew

export {};`,
    walkthrough: [
      "i18next is initialised once in i18n.ts — loads translation JSON files for each locale.",
      "useTranslation() provides the t() function — t('key', {vars}) replaces template placeholders.",
      "Plural forms are handled automatically: questions vs questions_other based on count value.",
      "i18n.changeLanguage('hi') switches the active locale — all t() calls re-render instantly.",
      "Never hardcode user-facing strings in JSX — always use translation keys from day one."
    ]
  },

  // ─── Q93: Localization ────────────────────────────────────────────────────────
  93: {
    code: `import React, { useState } from 'react';

// Localization includes dates, numbers, currencies — not just translated strings
export default function LocalizationDemo() {
  const [locale, setLocale] = useState<'en-IN' | 'en-US' | 'de-DE'>('en-IN');

  const amount    = 149999.99;
  const date      = new Date('2024-06-27T14:30:00');
  const itemCount = 42;

  // Intl API — built into JavaScript — no library needed!
  const formatCurrency = (n: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: locale === 'de-DE' ? 'EUR' : 'INR' }).format(n);

  const formatDate = (d: Date) =>
    new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short' }).format(d);

  const formatNumber = (n: number) =>
    new Intl.NumberFormat(locale).format(n);

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif', maxWidth: 320 }}>
      <label style={{ display: 'block', marginBottom: 12, fontSize: 12 }}>
        Locale:&nbsp;
        <select value={locale} onChange={e => setLocale(e.target.value as any)}
          style={{ fontSize: 12 }}>
          <option value="en-IN">en-IN (India)</option>
          <option value="en-US">en-US (USA)</option>
          <option value="de-DE">de-DE (Germany)</option>
        </select>
      </label>
      <dl style={{ fontSize: 13, margin: 0 }}>
        <dt style={{ fontWeight: 600, color: '#6b7280', fontSize: 11 }}>Currency</dt>
        <dd style={{ margin: '0 0 8px' }}>{formatCurrency(amount)}</dd>
        <dt style={{ fontWeight: 600, color: '#6b7280', fontSize: 11 }}>Date</dt>
        <dd style={{ margin: '0 0 8px' }}>{formatDate(date)}</dd>
        <dt style={{ fontWeight: 600, color: '#6b7280', fontSize: 11 }}>Number</dt>
        <dd style={{ margin: '0 0 8px' }}>{formatNumber(itemCount)}</dd>
      </dl>
    </div>
  );
}`,
    walkthrough: [
      "Intl.NumberFormat handles number, currency, and percentage formatting per locale.",
      "Intl.DateTimeFormat formats dates/times according to locale conventions.",
      "en-IN uses Indian numbering (1,49,999) vs en-US (149,999) — same number, different separators.",
      "Currency symbols and positions differ: ₹1,49,999.99 vs €149,999.99 — never hardcode them.",
      "The Intl API is built into all modern browsers — no library needed for formatting."
    ]
  },

  // ─── Q94: Structure large React apps ─────────────────────────────────────────
  94: {
    code: `// Feature-folder architecture for large React applications
// Organise by BUSINESS DOMAIN, not file type

// ── Project structure:
// src/
// ├── features/
// │   ├── auth/
// │   │   ├── components/     LoginForm.tsx, OAuthButton.tsx
// │   │   ├── hooks/          useAuth.ts, useSession.ts
// │   │   ├── api/            authApi.ts (RTK Query or fetch wrapper)
// │   │   ├── store/          authSlice.ts (Redux Toolkit slice)
// │   │   └── index.ts        ← public API: export { useAuth, LoginForm }
// │   │
// │   ├── handbook/
// │   │   ├── components/     QuestionCard.tsx, ChapterList.tsx
// │   │   ├── hooks/          useQuestions.ts, useProgress.ts
// │   │   ├── api/            handbookApi.ts
// │   │   └── index.ts
// │   │
// │   └── dashboard/
// │       ├── components/     ProgressChart.tsx, MilestoneCard.tsx
// │       ├── hooks/          useDashboard.ts
// │       └── index.ts
// │
// ├── shared/
// │   ├── components/         Button.tsx, Card.tsx, Modal.tsx
// │   ├── hooks/              useDebounce.ts, useLocalStorage.ts
// │   ├── utils/              formatDate.ts, validators.ts
// │   └── types/              global.d.ts, api.types.ts
// │
// ├── pages/           (or app/ for Next.js App Router)
// │   ├── Dashboard.tsx
// │   ├── Handbook.tsx
// │   └── Auth.tsx
// │
// ├── App.tsx
// └── main.tsx

// RULES:
// ✅ Features import from shared/ — never from other features directly
// ✅ Each feature's index.ts defines its public API — internal files are private
// ✅ Shared components have zero business logic (purely presentational)
// ✅ Co-locate tests next to source files: Button.tsx + Button.test.tsx

export {};`,
    walkthrough: [
      "Feature folders group all related code (components, hooks, API, store) by domain.",
      "Each feature's index.ts is the public API — other features import only from it.",
      "This prevents spaghetti imports and makes deleting a feature as simple as deleting one folder.",
      "shared/ contains only truly reusable, domain-agnostic utilities and components.",
      "This structure scales to 50+ developers — each team owns a feature folder independently."
    ]
  },

  // ─── Q95: Best practices ──────────────────────────────────────────────────────
  95: {
    code: `// React best practices — a curated checklist with code examples

import React, { useState, useCallback, memo } from 'react';

// ✅ 1. Keep components small and single-purpose
function TagBadge({ label }: { label: string }) {  // does ONE thing
  return <span style={{ fontSize:11, padding:'2px 8px', background:'#e0e7ff', borderRadius:20 }}>{label}</span>;
}

// ✅ 2. Colocate state — don't lift unless necessary
function SearchBar() {
  const [query, setQuery] = useState(''); // state here, not at App level
  return <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…" />;
}

// ✅ 3. Stable keys in lists — NEVER use array index for reorderable lists
function ChapterList({ chapters }: { chapters: { id: string; title: string }[] }) {
  return <ul>{chapters.map(ch => <li key={ch.id}>{ch.title}</li>)}</ul>; // ✅ id not index
}

// ✅ 4. Early returns for guards — avoid deeply nested ternaries
function UserCard({ user }: { user: { name: string } | null }) {
  if (!user) return <p>Not logged in</p>;
  return <p>Welcome, {user.name}!</p>;
}

// ✅ 5. Extract complex JSX into sub-components

// ✅ 6. Type everything with TypeScript — avoid 'any'

// ✅ 7. Use ESLint + Prettier — enforce automatically

export {};`,
    walkthrough: [
      "Single-purpose components are easier to test, understand, and reuse.",
      "Colocate state: if only one component uses it, don't lift it unnecessarily.",
      "Stable keys prevent DOM corruption in reorderable lists — use unique IDs.",
      "Early returns (guard clauses) are cleaner than nested ternary operators.",
      "ESLint rules for hooks catch rules-of-hooks violations and missing dependencies."
    ]
  },

  // ─── Q96: Code quality ────────────────────────────────────────────────────────
  96: {
    code: `// Code quality tools for React projects

// ── 1. ESLINT — static analysis (catches bugs before they run)
// .eslintrc.cjs:
// module.exports = {
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react-hooks/recommended',
//     'plugin:@typescript-eslint/strict',
//     'plugin:jsx-a11y/recommended',  // accessibility rules
//   ],
//   rules: {
//     'no-console': 'warn',
//     '@typescript-eslint/no-explicit-any': 'error',
//   }
// };

// ── 2. PRETTIER — automatic formatting (no style debates)
// .prettierrc:
// { "singleQuote": true, "semi": false, "tabWidth": 2, "printWidth": 100 }
// Run: prettier --write "src/**/*.{ts,tsx}"

// ── 3. HUSKY + lint-staged — enforce quality on every commit
// package.json:
// "lint-staged": { "*.{ts,tsx}": ["eslint --fix", "prettier --write"] }
// npx husky add .husky/pre-commit "npx lint-staged"

// ── 4. TYPESCRIPT strict mode — maximum type safety
// tsconfig.json: { "compilerOptions": { "strict": true, "noImplicitAny": true } }

// ── 5. VITEST COVERAGE — measure test coverage
// vitest.config.ts: test: { coverage: { reporter: ['text','html'], thresholds: { lines: 80 } } }
// npm run test -- --coverage

// ── 6. BUNDLE ANALYSIS — catch bloated dependencies

// CI PIPELINE (GitHub Actions):
// eslint, tsc --noEmit, vitest run --coverage, npm run build

export {};`,
    walkthrough: [
      "ESLint catches bugs, enforces hooks rules, and flags accessibility issues before runtime.",
      "Prettier removes all formatting debates — consistent code style enforced automatically.",
      "Husky pre-commit hooks run lint-staged — broken code can never be committed.",
      "TypeScript strict mode enables strictNullChecks, noImplicitAny — catches entire classes of bugs.",
      "Coverage thresholds in CI ensure new code is always tested before merging."
    ]
  },

  // ─── Q97: Feature branches ───────────────────────────────────────────────────
  97: {
    code: `// Git feature branch workflow for React projects

// ── BRANCHING STRATEGY (GitHub Flow — simple and effective)
// main            ← always deployable production code
// feature/Q97-git-flow    ← feature branch (short-lived)
// fix/modal-focus-bug     ← bug fix branch

// ── TYPICAL WORKFLOW:
// 1. Pull latest main
// git checkout main && git pull origin main

// 2. Create feature branch
// git checkout -b feature/handbook-search-filter

// 3. Make small, focused commits
// git add src/features/handbook/components/SearchFilter.tsx
// git commit -m "feat(handbook): add chapter filter to search bar"
// git commit -m "test(handbook): add SearchFilter unit tests"

// 4. Keep branch up to date (rebase preferred over merge for clean history)
// git fetch origin
// git rebase origin/main    ← replay your commits on top of latest main

// 5. Push and open Pull Request
// git push origin feature/handbook-search-filter
// → Open PR on GitHub → request review → CI runs (lint + tests + build)

// 6. After approval: Squash-merge into main
// git merge --squash feature/handbook-search-filter

// ── COMMIT MESSAGE CONVENTION (Conventional Commits):
// feat(auth):    add JWT refresh token rotation
// fix(router):   prevent navigation loop on 401 redirect
// refactor(ui):  extract ChapterCard from Dashboard
// test(hooks):   add useDebounce test coverage

export {};`,
    walkthrough: [
      "Feature branches isolate work in progress — main always stays deployable.",
      "Small, focused commits make code review easier and git bisect faster for debugging.",
      "git rebase (not merge) keeps your branch history linear and clean.",
      "Conventional Commits (feat/fix/refactor/test) enable automated changelog generation.",
      "Protected branch rules in GitHub enforce code review and passing CI before any merge."
    ]
  },

  // ─── Q98: Merge conflicts ─────────────────────────────────────────────────────
  98: {
    code: `// Resolving merge conflicts in React projects

// ── WHEN CONFLICTS HAPPEN:
// Two developers edit the same file concurrently → Git can't auto-merge.

// ── CONFLICT MARKERS in a file:
// <<<<<<< HEAD  (your local changes)
// const TAB_LIST = ['Dashboard', 'Handbook', 'Mock', 'Flashcards'];
// =======
// const TAB_LIST = ['Dashboard', 'Handbook', 'Mock', 'Settings'];
// >>>>>>> feature/add-settings-tab  (incoming branch changes)

// ── RESOLUTION STEPS:
// 1. Open the conflicted file in VS Code
//    → VS Code shows "Accept Current", "Accept Incoming", "Accept Both" buttons

// 2. Manually merge if both changes should survive:
// const TAB_LIST = ['Dashboard', 'Handbook', 'Mock', 'Flashcards', 'Settings']; // ✅ both kept

// 3. Mark as resolved and continue
// git add src/App.tsx
// git rebase --continue    (if rebasing) OR  git commit  (if merging)

// ── PREVENTION STRATEGIES:
// ✅ Short-lived feature branches (< 2 days) — less divergence from main
// ✅ Sync with main daily: git fetch origin && git rebase origin/main
// ✅ Communicate with team before editing shared files
// ✅ Extract commonly-edited code into separate files to reduce collision surface

// ── AFTER RESOLVING:
// Always run: npm install + npm run build + npm test

export {};`,
    walkthrough: [
      "Conflict markers (<<<<<<< / ======= / >>>>>>>) show the two competing versions.",
      "VS Code's merge editor provides Accept Current/Incoming/Both buttons for visual resolution.",
      "After resolution, 'git add' marks the file resolved; 'git rebase --continue' proceeds.",
      "Short-lived branches and daily rebasing minimise the chance of conflicts forming.",
      "Always run the full test suite after resolving — conflicts in logic are subtle bugs."
    ]
  },

  // ─── Q99: Handle feature requests / bugs ─────────────────────────────────────
  99: {
    code: `// Feature request and bug handling process in a React project

// ── BUG REPORT HANDLING:
// Step 1: Reproduce the bug locally
// Step 2: Write a FAILING TEST first (TDD approach)
// it('should not throw when user array is empty', () => {
//   render(<UserList users={[]} />);
//   expect(screen.queryByRole('alert')).not.toBeInTheDocument(); // ← fails before fix
// });
// Step 3: Fix the bug (minimal change)
// Step 4: Verify the failing test now passes; run the full suite

// ── FEATURE REQUEST HANDLING:
// Step 1: Break down the feature into tasks
// Step 2: Design-first for UI changes
// Step 3: Implement incrementally — one PR per logical chunk
// Step 4: Feature flags for risky features
// const showNewSearch = import.meta.env.VITE_FEATURE_SEARCH === 'true';
// {showNewSearch ? <NewSearch /> : <OldSearch />}

export {};`,
    walkthrough: [
      "Write a failing test FIRST — it proves you understand the bug and prevents regression.",
      "Fix only the minimal code needed — large diff = large review = higher risk.",
      "Feature flags let you merge incomplete features to main without showing them to users.",
      "Break features into small PR-sized chunks — easier to review, easier to rollback.",
      "Update documentation as part of the feature PR — docs drift is the leading cause of confusion."
    ]
  },

  // ─── Q100: Optimize complex component ────────────────────────────────────────
  100: {
    code: `import React, { useState, useMemo, useCallback, memo, useTransition } from 'react';

// A complex, heavy component optimised step by step
interface Question { id: number; title: string; chapter: number; difficulty: string; done: boolean; }

// ── Step 1: Memo — prevent re-render if props unchanged
const QuestionRow = memo(function QuestionRow({ q, onToggle }: { q: Question; onToggle: (id:number) => void }) {
  return (
    <li style={{ padding:'6px 0', display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
      <input type="checkbox" checked={q.done} onChange={() => onToggle(q.id)} />
      <span style={{ textDecoration: q.done ? 'line-through' : 'none', color: q.done ? '#9ca3af' : '#111' }}>
        {q.title}
      </span>
      <span style={{ fontSize:10, color:'#6b7280' }}>{q.difficulty}</span>
    </li>
  );
});

export default function OptimisedList({ questions }: { questions: Question[] }) {
  const [filter,    setFilter]    = useState('');
  const [chapter,   setChapter]   = useState<number | 'all'>('all');
  const [done,      setDone]      = useState<Set<number>>(new Set());
  const [isPending, startTransition] = useTransition(); // React 18: defer expensive updates

  // ── Step 2: useMemo — only recompute filtered list when inputs change
  const filtered = useMemo(() =>
    questions
      .filter(q => chapter === 'all' || q.chapter === chapter)
      .filter(q => q.title.toLowerCase().includes(filter.toLowerCase()))
      .map(q => ({ ...q, done: done.has(q.id) })),
  [questions, chapter, filter, done]);

  // ── Step 3: useCallback — stable reference so QuestionRow's memo check passes
  const handleToggle = useCallback((id: number) => {
    setDone(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ── Step 4: useTransition — mark filter update as non-urgent; UI stays responsive
    startTransition(() => setFilter(e.target.value));
  };

  return (
    <div style={{ padding:16, maxWidth:420 }}>
      <input onChange={handleFilter} placeholder="Filter questions…"
        style={{ width:'100%', padding:'6px 8px', marginBottom:8, fontSize:13, border:'1px solid #d1d5db', borderRadius:4 }} />
      {isPending && <p style={{ fontSize:11, color:'#6b7280' }}>Filtering…</p>}
      <ul style={{ listStyle:'none', padding:0, margin:0 }}>
        {filtered.slice(0, 20).map(q => <QuestionRow key={q.id} q={q} onToggle={handleToggle} />)}
      </ul>
      <p style={{ fontSize:11, color:'#6b7280', marginTop:8 }}>{filtered.length} results</p>
    </div>
  );
}`,
    walkthrough: [
      "React.memo: QuestionRow only re-renders if its specific props (q, onToggle) change.",
      "useMemo: filtered list is recomputed only when questions/chapter/filter/done change.",
      "useCallback: handleToggle reference is stable — memo's shallow comparison on onToggle passes.",
      "useTransition: marks setFilter as a low-priority update — typing stays snappy even on large lists.",
      "Slice to 20: virtual scrolling (react-virtual) should be used for very long lists."
    ]
  }
};
