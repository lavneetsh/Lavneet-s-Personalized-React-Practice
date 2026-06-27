export interface CheatSheetSection {
  title: string;
  description: string;
  content: string;
}

export const cheatsheets: Record<string, { title: string; subtitle: string; content: string }> = {
  interview: {
    title: "React Interview Cheat Sheet",
    subtitle: "High-yield core definitions and rapid recall points for interviewers",
    content: `
### Key Concepts & Answers

1. **Declarative vs Imperative**: React is *declarative* (you describe *what* you want the UI to look like based on state; React handles the updates). Vanilla JS is *imperative* (you write step-by-step instructions like \`document.createElement\` to manually change the DOM).
2. **One-Way Data Flow**: Data flows unidirectionally from parent to child via props. It is predictable and easy to debug. To update parents, pass down callback handlers.
3. **Pure Components**: A component is "pure" if it renders the same output for the same props and state. They do not alter global state, read external parameters, or perform side-effects in the render path.
4. **Keys in Lists**: Keys must be stable, unique, and predictable. Do not use random numbers or array indices (if the list order changes). Keys let React trace which elements were added, removed, or shifted to optimize rendering.
5. **Reconciliation vs Rendering**: Rendering is executing your component function to construct a virtual DOM tree. Reconciliation is comparing the previous tree with the new one, and calculating the minimal edits to apply to the real browser DOM.
`
  },
  hooks: {
    title: "React Hooks Cheat Sheet",
    subtitle: "Quick syntax, purpose, execution order, and strict constraints",
    content: `
### Top Hooks Reference

| Hook Name | Main Purpose | Core Return Signature | Primary Caveat |
| :--- | :--- | :--- | :--- |
| **useState** | Local mutable state | \`[state, setState]\` | Setter is asynchronous; use functional updates for sequential modifications. |
| **useEffect** | Side-effects (Fetch, Sub) | \`void\` or \`cleanupFn\` | Beware of infinite loops; list all reactive values read inside the hook in the dependency array. |
| **useRef** | Persistent non-render ref | \`{ current: value }\` | Mutating \`.current\` does *not* trigger component re-renders. |
| **useMemo** | Cache heavy calculations | \`memoizedValue\` | Only use for expensive CPU math; shallow reference checks on dependencies. |
| **useCallback**| Cache callback functions | \`memoizedCallback\` | Keeps function references stable to prevent unnecessary rendering of child elements. |
| **useContext** | Consume shared Context | \`contextValue\` | Every value change triggers a full re-render of all consuming component leaves. |

### The Two Strict Rules of Hooks
1. **Call Hooks Only at the Top Level**: Do not call hooks inside conditionals (\`if\`), loops (\`for\`), or nested functions. Hooks must execute in the exact same index order on every single render.
2. **Call Hooks Only from React Functions**: Call hooks from React functional components or your own custom hooks, never from standard vanilla JavaScript helpers.
`
  },
  lifecycle: {
    title: "React Lifecycle Cheat Sheet",
    subtitle: "Comparing class component milestones with modern functional hooks",
    content: `
### Class Methods vs. Functional Equivalents

| Class Lifecycle Method | Functional Hook Equivalent | Description / Best Practices |
| :--- | :--- | :--- |
| **constructor()** | Initial function body / lazy useState | Setup initial state and bind class handlers. In hooks, define local variables or pass a callback to \`useState\`. |
| **componentDidMount()** | \`useEffect(() => { ... }, [])\` | Runs once after initial draw. Ideal for database fetches, WebSockets, or timer creations. |
| **componentDidUpdate()** | \`useEffect(() => { ... }, [dep])\` | Runs after state/prop updates. Compare previous vs. current values inside the effect before modifying states. |
| **componentWillUnmount()**| \`useEffect(() => { return () => { ... } }, [])\` | Teardown cleanup. Stop timers, close websocket sockets, and clear event bindings to prevent memory leaks. |
| **shouldComponentUpdate()**| \`React.memo(Component, compareFn)\` | Performance control. Return \`false\` to skip rendering if props are evaluated as unchanged. |
`
  },
  performance: {
    title: "React Performance Optimization Cheat Sheet",
    subtitle: "Step-by-step checklist for diagnosing and fixing application lag",
    content: `
### Performance Auditing Pipeline

1. **Profile First**: Use the React DevTools "Profiler" tab to record rendering behavior. Locate which components render most frequently and take the longest time.
2. **Colocate State**: Move state as close to where it is used as possible. If a state variable is only used inside a toggle menu, do not keep it in the root app context.
3. **Component Composition**: Pass heavy visual blocks as \`children\`. React preserves children nodes if their immediate parent state did not change, avoiding renders.
4. **Preserve References**:
   - Wrap inline callbacks in \`useCallback\` if passed to memoized children.
   - Wrap complex arrays/objects in \`useMemo\` or define them as constants outside the component body.
5. **Code Splitting**: Use \`React.lazy\` and \`Suspense\` to split your bundle into separate files, loading pages only when users navigate to them.
`
  },
  angular: {
    title: "React vs Angular Comparison",
    subtitle: "High-level architectural differences for interview comparison queries",
    content: `
### Framework Comparison Table

| Attribute | React.js | Angular |
| :--- | :--- | :--- |
| **Core Architecture** | View Library (Component UI focus) | Comprehensive Full-scale Framework |
| **Data Binding** | Unidirectional (One-way) data flow | Bidirectional (Two-way) data binding |
| **DOM Usage** | Virtual DOM (optimized diffing) | Real DOM with Change Detection loops |
| **Language** | JSX / JavaScript or TypeScript | Strict TypeScript-enforced out of the box |
| **State & Route** | Choice of Redux, Zustand, React Router | Built-in Router, RxJS observables, and form engines |
| **Learning Curve** | Gentle initial curve, complex system architecture | Steep initial curve due to extensive CLI and structure |
`
  },
  nextjs: {
    title: "React vs Next.js Comparison",
    subtitle: "Understanding client-side SPAs vs server-side meta-frameworks",
    content: `
### Architectural Comparison

| Rendering Strategy | Server-Side compilation? | Good for... | SEO Rank |
| :--- | :--- | :--- | :--- |
| **Client-Side Rendering (CSR)** | No (Browser executes bundles) | Internal dashboards, settings panels | ⚠️ Poor |
| **Server-Side Rendering (SSR)** | Yes (Generated on every request) | Dynamic stores, social feeds | ⭐ Excellent |
| **Static Site Generation (SSG)**| Yes (Pre-compiled at build time) | Public blogs, document centers | ⭐ Excellent |
| **Incremental Static (ISR)** | Yes (Recompiled in background) | Scale catalogs, live publications | ⭐ Excellent |

### Main Distinctions
- **React.js** is a client-side SPA library. It builds static JS scripts that must be downloaded and run inside the client browser.
- **Next.js** is a full-stack meta-framework built *on top* of React. It handles routing automatically via folder structures (App Router), serves server-side rendering, hosts serverless API routes, and supports server-side components.
`
  },
  revision: {
    title: "React Revision Guide (1-Day Countdown)",
    subtitle: "The ultimate 1-day checklist to secure your Frontend/MERN interview",
    content: `
### High-Yield Flashpoints

1. **Be prepared to code a Custom Hook**: Understand how to write \`useFetch\` or \`useLocalStorage\` with state and cleanup.
2. **Review useEffect cleanups**: Remember that when React is in Strict Mode (development), effects run twice (Mount -> Unmount -> Mount) to catch missing unmount cleanups.
3. **Differentiate ref vs state**: State triggers a render; refs preserve values silently without updating the view.
4. **Explain reconciliation simple terms**: "React compiles the changes on a digital drawing board (Virtual DOM) first, finds what changed, and applies only those modifications to the real wall (Browser DOM)."
5. **Be honest about projects**: Explain how you implemented real-world architectures like **CareMagnus** (telehealth, WebSockets, multi-role auth) and **Damora AI** (document indexing, RAG pipelines, stateful chat feeds). Focus on your contributions: building modular views, integrating REST endpoints, and optimizing rendering speeds.
`
  }
};
