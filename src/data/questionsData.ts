import { Question, Difficulty } from '../types';

// Let's first define all 100 questions with their metadata
export const rawQuestions: {
  id: number;
  title: string;
  chapterId: number;
  chapterTitle: string;
  difficulty: Difficulty;
  answer30s: string;
}[] = [
  // Chapter 1: React Fundamentals & Virtual DOM
  {
    id: 1,
    title: "What is React and why is it used?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Beginner",
    answer30s: "React is a component-based, open-source JavaScript library developed by Meta for building declarative user interfaces, primarily for single-page applications. It is used because it allows developers to build large, high-performance web applications that can change data over time without reloading the page, leveraging a Virtual DOM for fast rendering and a component architecture for reusability."
  },
  {
    id: 2,
    title: "How is React different from Angular or Vue?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Intermediate",
    answer30s: "React is a library focused purely on the 'View' layer, using JSX and a Virtual DOM, giving developers the freedom to choose their own router, state management, and build tools. Angular is a full-blown TypeScript framework with built-in routing, HTTP, and form handling, using a real DOM with change detection. Vue is a progressive framework that sits in between, offering a highly structured template system with built-in reactivity and an optional full framework ecosystem."
  },
  {
    id: 3,
    title: "What is a React component?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Beginner",
    answer30s: "A React component is an independent, reusable piece of UI that acts like a JavaScript function. It accepts inputs called 'props' and returns React elements (usually written in JSX) describing what should appear on the screen. Components can be either functional (modern approach using hooks) or class-based (legacy)."
  },
  {
    id: 4,
    title: "How do you create a component in React?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Beginner",
    answer30s: "In modern React, you create a component by writing a standard JavaScript function that starts with a capital letter and returns JSX. For example: `function Greet() { return <h1>Hello!</h1>; }`. You then render it like an HTML tag: `<Greet />`."
  },
  {
    id: 5,
    title: "What is JSX and why do we use it in React?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Beginner",
    answer30s: "JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows you to write HTML-like structures directly inside your JavaScript code. We use it in React because it makes code highly readable, visual, and expressive, and compiles down to standard React.createElement() function calls behind the scenes."
  },
  {
    id: 6,
    title: "Can you explain the virtual DOM in React?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Advanced",
    answer30s: "The Virtual DOM is a lightweight, in-memory representation of the real DOM. When state changes, React updates this Virtual DOM tree first. It then compares this new tree with the previous one (a process called 'diffing') and calculates the minimum set of changes required, applying only those changes to the real browser DOM in a single batch (reconciliation)."
  },
  {
    id: 7,
    title: "What are the differences between a class component and a functional component?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Beginner",
    answer30s: "Class components are legacy ES6 classes extending `React.Component`, requiring a `render()` method and managing state/lifecycle via `this.state` and methods like `componentDidMount`. Functional components are simple JS functions that accept props and return JSX. With the introduction of React Hooks, functional components can now manage state, lifecycle, and side effects, making class components largely obsolete."
  },
  {
    id: 8,
    title: "How do you handle events in React?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Beginner",
    answer30s: "Events in React are handled using camelCase naming (e.g., `onClick` instead of `onclick`) and by passing a function as the event handler rather than a string. React uses a SyntheticEvent wrapper to normalize events across different browsers, ensuring high-performance event delegation at the document level."
  },
  {
    id: 9,
    title: "What are state and props in React?",
    chapterId: 2,
    chapterTitle: "State Management",
    difficulty: "Beginner",
    answer30s: "Props (short for properties) are read-only configuration inputs passed down from a parent component to a child component, making components dynamic. State is a private, mutable data structure managed internally within a component that triggers a re-render of that component and its children whenever its value is updated."
  },
  {
    id: 10,
    title: "How do you pass data between components in React?",
    chapterId: 2,
    chapterTitle: "State Management",
    difficulty: "Beginner",
    answer30s: "Data is passed from parent to child components via read-only 'props'. To pass data from a child back to its parent, you pass a callback function as a prop from the parent to the child; the child then calls this function with the data as an argument. For deeply nested components, you can use the Context API or a global state manager."
  },
  {
    id: 11,
    title: "What is a stateful component?",
    chapterId: 2,
    chapterTitle: "State Management",
    difficulty: "Beginner",
    answer30s: "A stateful component is any component that maintains, tracks, or updates its own internal state (typically using the `useState` hook in functional components or `this.state` in class components). It is responsible for managing data that changes over time based on user interactions or API calls."
  },
  {
    id: 12,
    title: "Can you explain how useState works?",
    chapterId: 4,
    chapterTitle: "React Hooks",
    difficulty: "Intermediate",
    answer30s: "The `useState` hook allows functional components to declare and update state. It accepts an initial state value and returns an array with two elements: the current state value, and a dispatcher function to update that state. When the dispatcher is called, React schedules a re-render of the component with the new state value."
  },
  {
    id: 13,
    title: "How do you update the state of a parent component from a child component?",
    chapterId: 2,
    chapterTitle: "State Management",
    difficulty: "Beginner",
    answer30s: "You update a parent component's state from a child by passing an event-handler function (a dispatcher or setter callback) from the parent to the child as a prop. The child component then calls this callback function, optionally passing the new state data upward to trigger the parent's update."
  },
  {
    id: 14,
    title: "What is lifting state up in React?",
    chapterId: 2,
    chapterTitle: "State Management",
    difficulty: "Intermediate",
    answer30s: "Lifting state up is the practice of moving shared state to the closest common ancestor of the components that need to access or modify it. This ensures a 'single source of truth' and allows components to stay synchronized by sharing the state via props and callbacks."
  },
  {
    id: 15,
    title: "When do you use Redux or Context API for state management?",
    chapterId: 9,
    chapterTitle: "State Management Libraries",
    difficulty: "Intermediate",
    answer30s: "Context API is ideal for low-frequency updates like UI themes, user authentication sessions, or language preferences, as frequent updates can trigger re-renders across all consumers. Redux (or Redux Toolkit) is preferred for high-frequency, complex state updates with extensive business logic, undo/redo capabilities, or when developer tooling like time-travel debugging is needed."
  },
  {
    id: 16,
    title: "Explain the lifecycle methods of a React class component.",
    chapterId: 3,
    chapterTitle: "React Lifecycle",
    difficulty: "Intermediate",
    answer30s: "Class component lifecycles are divided into three phases: 1) Mounting: `constructor`, `render`, and `componentDidMount` (used for API calls). 2) Updating: `shouldComponentUpdate`, `render`, and `componentDidUpdate` (runs after state/prop changes). 3) Unmounting: `componentWillUnmount` (used for cleanup like clearing timers or event listeners)."
  },
  {
    id: 17,
    title: "How do hooks work in React?",
    chapterId: 4,
    chapterTitle: "React Hooks",
    difficulty: "Advanced",
    answer30s: "Hooks are special JavaScript functions that let you 'hook into' React's internal state and lifecycle engines. Internally, React maintains a linked list of hook records for each component fiber, tracking them in the exact order they are declared. This is why hooks must only be called at the top level and never inside loops, conditions, or nested functions."
  },
  {
    id: 18,
    title: "Can you describe the useEffect hook and its purpose?",
    chapterId: 4,
    chapterTitle: "React Hooks",
    difficulty: "Intermediate",
    answer30s: "The `useEffect` hook lets you perform side effects in functional components, such as data fetching, subscription setup, or manual DOM manipulations. It runs after rendering. It accepts a setup function and an optional dependency array. If dependencies change, the effect re-runs. If a cleanup function is returned, React executes it before the effect runs again and when the component unmounts."
  },
  {
    id: 19,
    title: "How do you fetch data with hooks in React?",
    chapterId: 4,
    chapterTitle: "React Hooks",
    difficulty: "Intermediate",
    answer30s: "Data is typically fetched inside a `useEffect` hook by invoking an asynchronous API call. To manage state, you declare loading, error, and data variables using `useState`. To prevent memory leaks, you should also include an abort controller or cleanup flag to ignore the API response if the component unmounts before the fetch completes."
  },
  {
    id: 20,
    title: "What rules do you have to follow when using hooks?",
    chapterId: 4,
    chapterTitle: "React Hooks",
    difficulty: "Intermediate",
    answer30s: "There are two main rules: 1) Only call hooks at the top level of your component—never inside loops, conditions, or nested functions, ensuring React can preserve state across multiple renders. 2) Only call hooks from React functional components or custom hooks—never from regular JavaScript functions."
  },
  {
    id: 21,
    title: "How do props work in React?",
    chapterId: 2,
    chapterTitle: "State Management",
    difficulty: "Beginner",
    answer30s: "Props (short for properties) are custom attributes passed from parent components down to child components. They are immutable (read-only) in the child component, promoting a predictable, unidirectional (one-way) data flow through the application tree."
  },
  {
    id: 22,
    title: "What is prop drilling and how can you avoid it?",
    chapterId: 2,
    chapterTitle: "State Management",
    difficulty: "Intermediate",
    answer30s: "Prop drilling is the process of passing props through multiple levels of intermediate components that don't actually need the data, just to deliver it to a deeply nested child component. It can be avoided by restructuring components (e.g. using component composition), using the Context API, or integrating a global state management library like Zustand."
  },
  {
    id: 23,
    title: "Explain the Context API and its use cases.",
    chapterId: 6,
    chapterTitle: "Component Communication",
    difficulty: "Intermediate",
    answer30s: "The Context API provides a way to share values (like global state or configurations) between components without explicitly passing props down through every level of the tree. Excellent use cases include tracking authenticated user sessions, UI themes (light/dark mode), localized language settings, and multi-tenant portal configurations."
  },
  {
    id: 24,
    title: "How do you use render props?",
    chapterId: 6,
    chapterTitle: "Component Communication",
    difficulty: "Intermediate",
    answer30s: "The render props pattern is a technique for sharing code between components using a prop whose value is a function. The component receives this function and calls it inside its render method, passing its internal state or behavior as arguments, which gives the parent complete control over what JSX is drawn."
  },
  {
    id: 25,
    title: "What is the children prop?",
    chapterId: 2,
    chapterTitle: "State Management",
    difficulty: "Beginner",
    answer30s: "The `children` prop is a special built-in prop available on all components that allows you to pass elements, components, or raw text directly between the opening and closing tags of a component (e.g., `<Card><p>Hello</p></Card>`). It is the primary way React implements layout layout boxes and visual encapsulation."
  },
  {
    id: 26,
    title: "Why is performance optimization important in React?",
    chapterId: 5,
    chapterTitle: "React Performance",
    difficulty: "Intermediate",
    answer30s: "Performance optimization is crucial to ensure a responsive user experience, particularly in complex single-page apps with high interactivity. Since React re-renders components and their entire child trees by default when state changes, unoptimized apps can suffer from frame drops, input lag, and slow page loads on lower-end devices."
  },
  {
    id: 27,
    title: "What is React.memo and when would you use it?",
    chapterId: 5,
    chapterTitle: "React Performance",
    difficulty: "Intermediate",
    answer30s: "`React.memo` is a higher-order component that performance-optimizes functional components. It shallowly compares incoming props; if the props haven't changed, React skips rendering the component and reuse the last rendered result. You use it for pure presentation components that render frequently with identical props."
  },
  {
    id: 28,
    title: "How does PureComponent differ from Component in React?",
    chapterId: 3,
    chapterTitle: "React Lifecycle",
    difficulty: "Intermediate",
    answer30s: "`React.Component` does not implement `shouldComponentUpdate` by default, so it re-renders whenever its parent does. `React.PureComponent` implements a shallow comparison of both state and props in `shouldComponentUpdate` under the hood. If no changes are detected, it skips re-rendering, preventing useless DOM calculations in class components."
  },
  {
    id: 29,
    title: "Can you explain the concept of reconciliation in React?",
    chapterId: 10,
    chapterTitle: "Advanced React",
    difficulty: "Advanced",
    answer30s: "Reconciliation is React's algorithm for diffing the Virtual DOM trees and applying updates to the real DOM. It uses a highly optimized O(n) heuristic algorithm based on two assumptions: 1) Two elements of different types will produce different trees, so React will tear down the old one. 2) Keys are used to uniquely identify children across renders, enabling stable reordering without full re-mounts."
  },
  {
    id: 30,
    title: "How can you prevent unnecessary re-renders in React?",
    chapterId: 5,
    chapterTitle: "React Performance",
    difficulty: "Intermediate",
    answer30s: "You can prevent unnecessary re-renders by: 1) memoizing expensive components with `React.memo`. 2) Memoizing object/array references with `useMemo` and functions with `useCallback` to preserve prop references. 3) Correctly structuring state (colocating state to where it's used). 4) Leveraging component composition (passing children)."
  },
  {
    id: 31,
    title: "How do you apply styles in a React application?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Beginner",
    answer30s: "Styles can be applied in React using several methodologies: 1) Global or module-based CSS. 2) Inline style objects using the `style={{ color: 'red' }}` syntax. 3) Tailwind CSS utility classes (modern industry favorite). 4) CSS-in-JS libraries like Styled-Components or Emotion."
  },
  {
    id: 32,
    title: "What is CSS-in-JS and how do you implement it in React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "CSS-in-JS is a styling technique where CSS is written directly inside JavaScript files. It is implemented using libraries like styled-components, which parse template literals into unique, hashed CSS classes dynamically bound to React components, preventing class name collisions."
  },
  {
    id: 33,
    title: "Can you describe how Styled-Components work?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "Styled-components utilizes tagged template literals to write actual CSS code to style your components. Behind the scenes, it generates a unique class name based on the styles, injects a `<style>` block into the HTML document head, and outputs a React component styled with that hashed class name."
  },
  {
    id: 34,
    title: "What are the advantages of using Sass or LESS in a React project?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Beginner",
    answer30s: "Sass and LESS are CSS preprocessors that extend standard CSS with powerful features like variables, nested selectors, mixins, imports, and math operations. They make styling sheets modular, DRY (Don't Repeat Yourself), and easier to organize in large React codebases prior to being compiled into standard CSS."
  },
  {
    id: 35,
    title: "How do you use inline styles in React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Beginner",
    answer30s: "Inline styles in React are written by passing a JavaScript object containing camelCased CSS properties (e.g., `backgroundColor` instead of `background-color`) to the `style` attribute. For example: `<div style={{ padding: '10px', fontSize: '14px' }}>`."
  },
  {
    id: 36,
    title: "What is React Router?",
    chapterId: 8,
    chapterTitle: "Routing",
    difficulty: "Beginner",
    answer30s: "React Router is the standard declarative routing library for React. It enables client-side navigation in Single Page Applications, allowing you to define multiple routes and map URL paths to specific React components while keeping the UI synchronized with the browser address bar without page refreshes."
  },
  {
    id: 37,
    title: "How do you create dynamic routes in React?",
    chapterId: 8,
    chapterTitle: "Routing",
    difficulty: "Intermediate",
    answer30s: "Dynamic routes are created by adding a colon parameter to the path string in React Router, such as `path='/users/:id'`. Inside the target component, you then use the `useParams` hook (e.g., `const { id } = useParams()`) to extract and fetch data for that specific dynamic identifier."
  },
  {
    id: 38,
    title: "How would you pass data to routes in React Router v5+?",
    chapterId: 8,
    chapterTitle: "Routing",
    difficulty: "Intermediate",
    answer30s: "In React Router, you can pass data to routes using three main techniques: 1) URL path parameters (e.g., `/user/:id`). 2) Query parameters (e.g., `/search?query=react`). 3) State properties passed inside the Link state prop: `<Link to={{ pathname: '/profile', state: { fromDashboard: true } }}>` which can be retrieved using `useLocation().state`."
  },
  {
    id: 39,
    title: "How do you programmatically navigate using React Router?",
    chapterId: 8,
    chapterTitle: "Routing",
    difficulty: "Beginner",
    answer30s: "In modern React Router (v6), you navigate programmatically using the `useNavigate` hook, which returns a navigation function: `const navigate = useNavigate(); navigate('/home');`. In older v5 versions, you used `useHistory` and invoked `history.push('/home')`."
  },
  {
    id: 40,
    title: "What are route guards and how can you implement them in React?",
    chapterId: 8,
    chapterTitle: "Routing",
    difficulty: "Intermediate",
    answer30s: "Route guards are security checks that prevent unauthorized users from visiting private pages. In React, they are implemented by creating a higher-order wrapper component (e.g., `<ProtectedRoute>`) that checks user authentication or role context; if authorized, it renders the child route elements, otherwise it redirects to the login screen."
  },
  {
    id: 41,
    title: "What are higher-order components (HOCs)?",
    chapterId: 10,
    chapterTitle: "Advanced React",
    difficulty: "Advanced",
    answer30s: "A Higher-Order Component is a design pattern in React where a function takes an existing component as an argument and returns a newly enhanced component with injected props or layout behaviors. For example: `const AuthenticatedComponent = withAuth(MyComponent);`. HOCs promote clean cross-cutting concern reuse."
  },
  {
    id: 42,
    title: "Explain the container/presenter (smart/dumb) component pattern.",
    chapterId: 10,
    chapterTitle: "Advanced React",
    difficulty: "Intermediate",
    answer30s: "This pattern splits a feature into two components: 1) Container (Smart) component: handles the state management, API calls, side effects, and has no styling. 2) Presentational (Dumb) component: purely visual, accepts data and callbacks via props, and draws the UI. This promotes modularity and high reusability."
  },
  {
    id: 43,
    title: "How would you implement a compound component pattern in React?",
    chapterId: 10,
    chapterTitle: "Advanced React",
    difficulty: "Advanced",
    answer30s: "The compound component pattern is implemented by creating a parent container component that shares its internal state and handlers with its children using React Context. The parent exposes child sub-components as properties (e.g., `Tabs.List` and `Tabs.Trigger`), allowing users to assemble components in a highly customizable, declarative way."
  },
  {
    id: 44,
    title: "Explain the use of custom hooks in React.",
    chapterId: 4,
    chapterTitle: "React Hooks",
    difficulty: "Intermediate",
    answer30s: "Custom hooks are reusable JavaScript functions that extract component logic, allowing you to share stateful behaviors (like data fetching, form handling, or event listeners) across multiple components. They start with the prefix `use` and can call other built-in React hooks under the hood."
  },
  {
    id: 45,
    title: "What is a render prop pattern?",
    chapterId: 6,
    chapterTitle: "Component Communication",
    difficulty: "Intermediate",
    answer30s: "The render prop pattern is a design pattern where a component takes a function that returns a React element as a prop, and calls this function instead of hardcoding its own rendering. This delegates UI layout control to the parent while sharing state and logic internally."
  },
  {
    id: 46,
    title: "How do you handle forms in React?",
    chapterId: 7,
    chapterTitle: "Forms",
    difficulty: "Beginner",
    answer30s: "Forms in React can be handled using two main approaches: 1) Controlled Components, where the form inputs are driven by React component state using `useState` and updated via `onChange` handlers. 2) Uncontrolled Components, where you use `useRef` to pull input values directly from the browser DOM when the form is submitted."
  },
  {
    id: 47,
    title: "What is controlled and uncontrolled components?",
    chapterId: 7,
    chapterTitle: "Forms",
    difficulty: "Intermediate",
    answer30s: "Controlled components have their value managed entirely by React state; the state acts as the single source of truth for the inputs. Uncontrolled components store their value directly inside the browser DOM; you query the DOM using a React `ref` to fetch the input state when a user actions a submission."
  },
  {
    id: 48,
    title: "How do you validate forms in React?",
    chapterId: 7,
    chapterTitle: "Forms",
    difficulty: "Intermediate",
    answer30s: "Form validation can be done manually by checking input state inside `onChange` or `onSubmit` events and saving error strings into `useState` buckets. Alternatively, it is standard practice to use robust schema libraries like Zod or Yup paired with helper libraries like React Hook Form or Formik for automated validation states."
  },
  {
    id: 49,
    title: "What is Formik and how is it used in React forms?",
    chapterId: 7,
    chapterTitle: "Forms",
    difficulty: "Intermediate",
    answer30s: "Formik is an open-source form management library that streamlines form creation in React. It manages form states (values, validation errors, touched fields, and submission status), handles validation schemas (usually with Yup), and automates standard boilerplates like change and submit events."
  },
  {
    id: 50,
    title: "How do you handle file uploads in React?",
    chapterId: 7,
    chapterTitle: "Forms",
    difficulty: "Intermediate",
    answer30s: "File uploads are handled using uncontrolled inputs (`<input type='file'>`) with a `useRef` or a React state handler that saves the file reference from `event.target.files[0]`. When submitting, you append this file reference to a `FormData` object and post it to a server using Axios or Fetch with a multi-part content-type header."
  },
  {
    id: 51,
    title: "What are the benefits of using TypeScript with React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "TypeScript adds static typing to React, providing immediate compile-time error detection, robust autocomplete, and self-documenting prop requirements. It prevents common bugs like passing incorrect data structures to components, eases refactoring large systems, and improves developer collaboration."
  },
  {
    id: 52,
    title: "How do you define types for props and state in TypeScript with React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Beginner",
    answer30s: "Props are typed using standard TypeScript `interface` or `type` declarations, which are then passed as a generic parameter to functional components: `function Button({ label }: ButtonProps)`. State is typed by passing a generic type directly to the `useState` hook: `const [user, setUser] = useState<User | null>(null)`."
  },
  {
    id: 53,
    title: "Explain how to use interfaces with React components and TypeScript.",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "Interfaces are used in TypeScript to model the shape of objects, such as component props. They support merging and extensions (via `extends`), making them highly suitable for scaling designs. For example, you can extend standard HTML button attributes to create a custom styled Button component."
  },
  {
    id: 54,
    title: "How do TypeScript generics enhance react components?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Advanced",
    answer30s: "Generics allow React components to accept dynamic data structures while preserving compile-time type safety. They are highly beneficial for building reusable components like dropdown lists, data tables, or select boxes, where the type of each row or option is controlled dynamically by the parent caller."
  },
  {
    id: 55,
    title: "Why is testing important in React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Beginner",
    answer30s: "Testing is important in React because it guarantees your application components work exactly as intended under different conditions, prevents regression bugs when writing new code, and serves as reliable living documentation of features, which boosts team confidence during deployments."
  },
  {
    id: 56,
    title: "What are some common testing libraries for React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "The standard modern testing stack for React includes Jest or Vitest (as test runners and assertions), React Testing Library (for rendering and simulating real user interactions on components), and Playwright or Cypress (for comprehensive end-to-end testing)."
  },
  {
    id: 57,
    title: "How do you test a React component with Jest?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "You test a React component by rendering it into a virtual DOM environment using React Testing Library, querying elements using accessible text (e.g., `screen.getByRole`), simulating event triggers with `fireEvent` or `userEvent`, and asserting outcomes with Jest expect statements: `expect(myButton).toBeInTheDocument()`."
  },
  {
    id: 58,
    title: "Can you explain the difference between shallow rendering and mount rendering in Enzyme?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Advanced",
    answer30s: "In Enzyme, shallow rendering renders only the target parent component, ignoring any children and testing the component in absolute isolation. Mount rendering performs a full DOM rendering, mounting the component and all nested children in its tree, allowing you to test lifecycle operations and child-parent interactions."
  },
  {
    id: 59,
    title: "What is react-testing-library and how is it different from Enzyme?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Advanced",
    answer30s: "Enzyme focuses on testing component internals (its state, props, and helper methods). React Testing Library enforces black-box testing based on real user experience, querying elements by roles, labels, and text rather than internal component states, making tests resilient to future code refactorings."
  },
  {
    id: 60,
    title: "What are React fragments and why are they useful?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Beginner",
    answer30s: "React fragments (`<React.Fragment>` or empty tags `<>...</>`) allow you to group list of child elements without adding an extra node container to the real HTML DOM. They prevent cluttering the browser's markup hierarchy, which can disrupt flexbox or grid layouts."
  },
  {
    id: 61,
    title: "What is React portal and when would you use it?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Intermediate",
    answer30s: "React Portal is a tool that lets you render children components into a physical DOM node located completely outside the current component's parent DOM hierarchy. It is used for overlays like modals, dropdown menus, and tooltips where parent overflow CSS clipping or z-index stacking would break the layout."
  },
  {
    id: 62,
    title: "How does error boundary work in React?",
    chapterId: 10,
    chapterTitle: "Advanced React",
    difficulty: "Advanced",
    answer30s: "An Error Boundary is a special class component that catches JavaScript runtime errors anywhere in its child component tree, logs them, and displays a graceful fallback UI instead of letting the entire page crash. It utilizes lifecycle methods `getDerivedStateFromError` and `componentDidCatch`."
  },
  {
    id: 63,
    title: "What is server-side rendering and how is it done with React?",
    chapterId: 10,
    chapterTitle: "Advanced React",
    difficulty: "Advanced",
    answer30s: "Server-side rendering (SSR) is the process where a web server converts a React component tree into a static HTML string on every request, sends it to the browser for instant visual draw, and then hydrates it with client-side JavaScript to make it interactive. It is commonly implemented using Next.js."
  },
  {
    id: 64,
    title: "Can you explain the concept of suspense and lazy loading in React?",
    chapterId: 10,
    chapterTitle: "Advanced React",
    difficulty: "Advanced",
    answer30s: "Lazy loading is a technique to defer rendering a component until it is actually needed (implemented via `React.lazy`). `Suspense` is a wrapper component that lets you declaratively specify a loading placeholder UI (via its `fallback` prop) that shows while the lazy component is downloading its bundle."
  },
  {
    id: 65,
    title: "How does React affect SEO?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Intermediate",
    answer30s: "Standard React client-side applications (SPA) initially deliver an empty index.html with a massive JavaScript file. If search engine web crawlers scrape the page before the JavaScript fully executes and renders components, they see empty content, which severely degrades SEO page ranking."
  },
  {
    id: 66,
    title: "What strategies would you use to make a React application SEO-friendly?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Intermediate",
    answer30s: "To make a React app SEO-friendly, you can: 1) Transition to Server-Side Rendering (SSR) or Static Site Generation (SSG) with frameworks like Next.js. 2) Integrate React Helmet to dynamically manage meta tags, titles, and structured JSON-LD. 3) Configure prerendering services like Prerender.io."
  },
  {
    id: 67,
    title: "How can server-side rendering improve SEO with React applications?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Intermediate",
    answer30s: "SSR improves SEO by generating full, semantic HTML text on the server prior to sending it to the client. Search engine web crawlers can immediately parse the titles, headers, meta tags, and body content on the very first HTTP response, without needing to execute any JavaScript."
  },
  {
    id: 68,
    title: "What is React Native and how is it different from React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "React is a web library that renders visual components targeting the browser HTML DOM. React Native is a mobile framework that uses React's component logic but bridges to native iOS and Android UI elements (like `View` and `Text` instead of `div` and `span`), producing real, compilation-free mobile apps."
  },
  {
    id: 69,
    title: "How do you bridge native modules in React Native?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Advanced",
    answer30s: "You bridge native modules in React Native by writing custom native code in Swift/Objective-C for iOS, or Java/Kotlin for Android, and register it via React Native's NativeModules API. This creates a asynchronous bridge channel where JavaScript can invoke native mobile platform capabilities."
  },
  {
    id: 70,
    title: "Can you describe the layout system in React Native?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "React Native uses Yoga—a cross-platform C-based layout engine—to implement Flexbox layout rules. Unlike CSS on the web, flex direction defaults to column, all layout sizes are unitless (scaling dynamically based on screen pixel density), and grid selectors or floats are completely unsupported."
  },
  {
    id: 71,
    title: "What is Apollo Client and how does it integrate with React?",
    chapterId: 9,
    chapterTitle: "State Management Libraries",
    difficulty: "Intermediate",
    answer30s: "Apollo Client is a robust state management library designed for GraphQL. It integrates with React by wrapping the application in an `<ApolloProvider>` component, letting you fetch, cache, and synchronize remote GraphQL data declaratively using React hooks like `useQuery` and `useMutation`."
  },
  {
    id: 72,
    title: "How do you manage local state in Apollo Client?",
    chapterId: 9,
    chapterTitle: "State Management Libraries",
    difficulty: "Advanced",
    answer30s: "Local state in Apollo Client is managed using Reactive Variables (`makeVar`), which let you write and read state anywhere without writing GraphQL schemas, or via local resolver policies with client directives (`@client`), enabling a unified query approach for local and remote data."
  },
  {
    id: 73,
    title: "What is Redux and how does it contrast with the Context API?",
    chapterId: 9,
    chapterTitle: "State Management Libraries",
    difficulty: "Intermediate",
    answer30s: "Redux is an architectural state manager built on a single global store, strict unidirectional actions, and pure reducers. Context API is an injection tool that passes data down the tree. Redux offers advanced performance selectors to prevent consumer re-renders, middleware hooks, and powerful development tools."
  },
  {
    id: 74,
    title: "Can you detail the Redux workflow?",
    chapterId: 9,
    chapterTitle: "State Management Libraries",
    difficulty: "Intermediate",
    answer30s: "The Redux workflow operates in a strict unidirectional loop: 1) The View triggers an Action. 2) The Action (an object describing 'what happened' with a payload) is dispatched. 3) The Store sends the action and current state to a Reducer. 4) The Reducer (a pure function) returns a new state. 5) The Store updates and notifies subscribers to re-render."
  },
  {
    id: 75,
    title: "How do you handle side effects in Redux applications?",
    chapterId: 9,
    chapterTitle: "State Management Libraries",
    difficulty: "Advanced",
    answer30s: "Side effects in Redux are handled using middleware. Redux Thunk allows you to write action creators that return an asynchronous function (thunk) instead of a plain action object. Redux Saga uses generator functions (`function*`) to yield asynchronous calls in a highly testable, concurrent manner."
  },
  {
    id: 76,
    title: "How do you set up a React project from scratch?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Intermediate",
    answer30s: "To set up a React project from scratch, you run `npm init -y` to create a package.json, install React and React-DOM, configure a compiler like Babel or SWC to parse JSX/TS, install a modern bundler like Vite or Webpack to bundle assets, and write an index.html pointing to a main.tsx script entry point."
  },
  {
    id: 77,
    title: "What is Babel and why do we use it with React?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Beginner",
    answer30s: "Babel is a JavaScript transcompiler. We use it with React because browser engines cannot natively read JSX syntax or advanced ES6+ features. Babel parses these scripts and compiles them into standard, backward-compatible vanilla JavaScript that runs smoothly on all browser versions."
  },
  {
    id: 78,
    title: "What is Webpack and what role does it play in React development?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Intermediate",
    answer30s: "Webpack is a module bundler. It treats all files in your React app (JavaScript, JSX, CSS, images) as module assets, compiles their dependency tree, and packs them into a highly optimized, single-file bundle (or chunks) that can be loaded quickly by the browser."
  },
  {
    id: 79,
    title: "How does hot module replacement work in React?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Advanced",
    answer30s: "Hot Module Replacement (HMR) is a bundler feature that injects updated code modules into a running React application at runtime without triggering a full page refresh. This preserves the current React component state, which dramatically speeds up development iteration times."
  },
  {
    id: 80,
    title: "What are the features of create-react-app and how do you eject from it?",
    chapterId: 1,
    chapterTitle: "React Fundamentals",
    difficulty: "Intermediate",
    answer30s: "Create-React-App is a zero-configuration CLI that pre-packages Webpack, Babel, and Jest. 'Ejecting' is a one-way operation that copies all configuration files (webpack.config.js, etc.) directly into your project root. This grants full custom control, but makes configuring future updates your manual responsibility."
  },
  {
    id: 81,
    title: "How do you handle API calls in React?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Beginner",
    answer30s: "API calls are handled inside functional components using the `useEffect` hook or specialized data fetching libraries like React Query or SWR, fetching data from an endpoint using the native `fetch()` API or the Axios client, and saving the results into local state variables."
  },
  {
    id: 82,
    title: "What is Axios and how is it used over fetch in React applications?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Intermediate",
    answer30s: "Axios is a popular promise-based HTTP client. It is preferred over native `fetch` because it provides: 1) Automatic JSON parsing. 2) Interceptor hooks for adding auth headers or handling errors globally. 3) Wide-ranging browser support. 4) Easy upload progress monitoring and request cancellation out of the box."
  },
  {
    id: 83,
    title: "How would you handle WebSocket connections in a React application?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Advanced",
    answer30s: "WebSockets are initialized inside a `useEffect` hook to create a persistent connection. To ensure stability, the websocket client ref is stored inside a `useRef` to prevent re-creation on render. When the component unmounts, you must trigger the close event inside the effect's cleanup block to prevent leakages."
  },
  {
    id: 84,
    title: "What are some strategies used to connect a React front end to a backend server?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Intermediate",
    answer30s: "Strategies include: 1) Configuring a reverse-proxy (e.g., using Vite's server proxy settings) during development to avoid CORS issues. 2) Communicating via standardized REST APIs with Axios. 3) Using GraphQL client wrappers. 4) Establishing real-time Socket.io channels for live streaming data."
  },
  {
    id: 85,
    title: "How would you deploy a React application?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Beginner",
    answer30s: "You deploy a standard React application by running `npm run build` to compile assets into a static `dist/` folder. This static folder can be deployed directly to CDNs like Vercel, Netlify, AWS S3, or Firebase Hosting. For full-stack Next.js apps, they are deployed on platforms like Vercel or containerized with Docker."
  },
  {
    id: 86,
    title: "How do you optimize the performance of a React application for production?",
    chapterId: 5,
    chapterTitle: "React Performance",
    difficulty: "Advanced",
    answer30s: "Optimization strategies include: 1) Implementing Code Splitting and Lazy Loading using `React.lazy` and `Suspense`. 2) Optimizing image sizes and formatting. 3) Memoizing with `React.memo` and standard hook memoizers. 4) Tree-shaking unused libraries. 5) Caching assets and leveraging production builds."
  },
  {
    id: 87,
    title: "What are service workers and how can they benefit a React application?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Advanced",
    answer30s: "A service worker is a script that the browser runs in the background, separate from the web page. It benefits React apps by acting as a network proxy—enabling asset caching for offline support, instant caching, background data synchronization, and push notifications to deliver full Progressive Web App (PWA) behaviors."
  },
  {
    id: 88,
    title: "How do you configure HTTPS in a React app?",
    chapterId: 11,
    chapterTitle: "Next.js & Server Side Rendering (SEO)",
    difficulty: "Intermediate",
    answer30s: "During local development in Vite, you can configure HTTPS by enabling the `@vitejs/plugin-basic-ssl` plugin. In production, HTTPS is not configured inside React; it is handled by the cloud host provider or Nginx load balancers by binding SSL certificates (e.g., Let's Encrypt) to the web server ingress."
  },
  {
    id: 89,
    title: "Why is accessibility important in web development?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Beginner",
    answer30s: "Accessibility (a11y) is important because it ensures that web applications are usable by everyone, including people with visual, auditory, motor, or cognitive impairments. It is also critical for SEO, code semantics, legal compliance, and establishing an inclusive digital product."
  },
  {
    id: 90,
    title: "How can you make a React application accessible?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "You can make a React app accessible by: 1) Using valid semantic HTML elements. 2) Utilizing the `aria-*` attributes for non-standard UI controls. 3) Ensuring complete keyboard navigability (managing active focus). 4) Adding alt text for images. 5) Running automated audit tools like axe-core in your test suite."
  },
  {
    id: 91,
    title: "What is ARIA and how is it used in React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "ARIA (Accessible Rich Internet Applications) is a set of attributes that define ways to make web content and web applications more accessible. In React, they are written as standard camelCased attributes (e.g., `aria-label` or `aria-expanded`), which help assistive technologies like screen readers parse custom UI widgets."
  },
  {
    id: 92,
    title: "What is Internationalization (i18n) in React?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "Internationalization (i18n) is the process of designing and preparing your application to support multiple languages and locales without structural codebase changes. It involves separating user-facing copy strings into translation files and establishing date, number, and currency formatting strategies."
  },
  {
    id: 93,
    title: "How do you implement localization (l10n) in React app?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "Localization is implemented in React using libraries like `react-i18next`. You wrap your app in an i18next provider, save dictionary translation JSON files (e.g., en.json, es.json), and translate screen copy dynamically using the `useTranslation` hook: `const { t } = useTranslation(); return <h1>{t('welcome')}</h1>`."
  },
  {
    id: 94,
    title: "How do you structure large React applications?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Advanced",
    answer30s: "Large apps are structured using modular design, such as domain-driven or feature-folder design. Instead of separating files by technology (components/, hooks/), files are grouped by business domains (features/auth/, features/dashboard/). This localizes context, avoids folder bloat, and simplifies codebase maintenance."
  },
  {
    id: 95,
    title: "What are some best practices when writing React code?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "Best practices include: 1) Keeping components small and single-focused. 2) Correctly typing elements with TypeScript. 3) Extracting logic into custom hooks. 4) Keeping state localized rather than global. 5) Avoiding index-based keys in lists. 6) Enforcing strict linting and code styling with ESLint and Prettier."
  },
  {
    id: 96,
    title: "How do you ensure code quality and maintainability in a React project?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "Ensure code quality by: 1) Enforcing strict CI/CD linting checks. 2) Writing unit, integration, and E2E tests. 3) Establishing comprehensive PR reviews. 4) Encouraging component design reviews. 5) Leveraging automated bundle analysis tools to prevent regressionbloat."
  },
  {
    id: 97,
    title: "How do you manage feature branches in React development with Git?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Beginner",
    answer30s: "Feature branches are managed using standard Git workflows (like GitHub Flow). Developers pull a branch from `main` or `develop` (e.g., `feature/login`), commit clean isolated changes, push to a remote server, open a Pull Request (PR) for team review, run automated tests, and merge into the main branch."
  },
  {
    id: 98,
    title: "What are your strategies for resolving merge conflicts in React projects?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "Strategies include: 1) Regularly pulling updates from the target branch to minimize differences. 2) Resolving merge conflicts systematically inside visual code editors (like VS Code). 3) Discussing ambiguous code edits with authors. 4) Running testing suites immediately after resolving conflicts to ensure no breakage."
  },
  {
    id: 99,
    title: "How would you handle a feature request or bug report in an ongoing React project?",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Intermediate",
    answer30s: "I handle bug reports and feature requests by: 1) Triaging issues to reproduce them in local environments. 2) Isolating the affected code. 3) Writing targeted fixes with regression tests. 4) Building features incrementally, keeping pull requests small, and updating documentation."
  },
  {
    id: 100,
    title: "Describe your process for optimizing a component that has complex state logic and several child components.",
    chapterId: 12,
    chapterTitle: "React System Design",
    difficulty: "Advanced",
    answer30s: "My optimization process involves: 1) Profiling with React DevTools to pinpoint exactly what renders and why. 2) Splitting or collocating state to isolate updates. 3) Extracting heavy child sub-trees into memoized components using `React.memo`. 4) Memoizing callbacks (`useCallback`) and calculations (`useMemo`) to preserve reference integrity."
  }
];

// In this file, we can provide a dynamic details generator.
// If a question doesn't have custom overrides, we can automatically compile
// a highly structured explanation containing every section required by the prompt!
// To make the hand-crafted overrides outstanding, we define a list of major questions below.

export const chapters: { id: number; title: string; description: string }[] = [
  { id: 1, title: "React Fundamentals & Virtual DOM", description: "Core engine, JSX, components, event architecture, and DOM rendering." },
  { id: 2, title: "State Management & Props", description: "Lifting state up, prop drilling, children manipulation, and unidirectional flow." },
  { id: 3, title: "React Lifecycle & Rendering", description: "Class lifecycles, mounting, updates, unmounting, and PureComponent vs Component." },
  { id: 4, title: "React Hooks (Deep Dive)", description: "useState, useEffect, useRef, custom hooks, and rules of hooks." },
  { id: 5, title: "React Performance & Optimization", description: "Memoization, React.memo, re-render avoidance, and bundle optimization." },
  { id: 6, title: "Component Communication & Context API", description: "Context API provider-consumer architectures, compound components, and render props." },
  { id: 7, title: "Forms & Validation", description: "Controlled vs uncontrolled fields, validation, and file handling." },
  { id: 8, title: "Routing", description: "React Router, dynamic endpoints, navigation, and protected router guards." },
  { id: 9, title: "State Management Libraries", description: "Redux workflows, Saga, Thunk, Apollo Client, and Zustand." },
  { id: 10, title: "Advanced React & Fiber", description: "Reconciliation, Fiber engine, Portals, Suspense, and Error Boundaries." },
  { id: 11, title: "Next.js & Server Side Rendering (SEO)", description: "SSR, SSG, ISR, client vs server components, and API integration." },
  { id: 12, title: "React System Design & TypeScript", description: "Large scale project architectures, testing, Native, design systems, and Git workflows." }
];
