# `what is react fiber`

React Fiber is the reconciliation engine (also known as the core algorithm) of React introduced in React 16. It’s a complete rewrite of the old stack-based architecture of React.
It enables React to break rendering work into chunks, prioritize updates, pause and resume work, and render asynchronously.
In a large app, if you're typing in an input while the app is rendering a heavy component (like a long list), Fiber allows React to prioritize the input render first, then continue the rest of the work after.

Key Goals of React Fiber:

1. **Incremental Rendering**
   React can split work into smaller units and spread it over multiple frames.
2. **Prioritization of Updates**
   More important updates (like typing or animations) get rendered **before** less important ones.
3. **Pause and Resume Work**
   Long tasks (like rendering a huge list) can be paused, so React doesn’t block the main thread.
4. **Better Error Handling**
   Using features like **Error Boundaries**.

# `What are Dumb vs Smart Components in React?`

1. Smart Components
   Smart components are responsible for logic, data fetching, state management, and passing data to child components. They know how things work.
2. Dumb Components
   Dumb components are purely for displaying UI. They receive data via props and don't manage any logic or state themselves

# `What is Hot Module Reloading (HMR) in Vite?`

Hot Module Reloading (HMR) is a feature that allows changes made to your code (like in components, CSS, or state) to be instantly reflected in the browser without doing a full page reload.
In the case of Vite, HMR is extremely fast because Vite serves source files over native ES modules and only updates the part of the module that changed

# `What are the features of react ?`

1. component based archtieutr
2. unidirectional data flow
3. jsx
4. hooks api
5. virtual dom
6. reach ecosytem

# `Passing Data from child to parent`

function Parent(){
const[datafromChild,setDataFromChild] = useState('')
    function handleChildData(data){
        setDataFromChild(data)
    }
    <>
    <p>Child Data:{dataFromChild}</p>
    <Child handleChildData={handleChildData}/>
    </>

}

function Child({handleChildData}){
const[data,setData] = useState('')
    function handleData(){
        handleChildData(data)
    }
}

# `How to optimize React js app`
1. useMemo and useCallback 
2. avoid prop drilling (context and redux store)
3. lazy loading code splliting
4. use virtulization for large list
5. minimize recolnlation with keys

# `What is a Pure Component in React?`
pure component are those which do automatically implements a shallow comparison of props and state to avoid unnecessary re-renders.

# `Higher order component?`
A Higher-Order Component (HOC) in React is simply a function that takes a component as input and returns a new component with enhanced functionality.
It’s a pattern (not a React feature), often used for:
Code reuse
Cross-cutting concerns (e.g., authentication, logging)
State or behavior injection

# `Possible Scenarios Where Redux Store is Used in ERP`

1.  Authentication & User Session

Store the logged-in user info (username, roles, permissions, selected company, financial year, etc.).

Used across:
Navbar (to display username/company).
Sidebar (to render only allowed menus).
Backend API requests (for passing tokens).

2. Company & Location Context

In ERP, users often switch between companies, branches, plants, or locations.

Store current company/location context in Redux so:
All modules (Inventory, Accounts, HR) fetch data for the right company/location.
Prevent reloading the entire app when switching.

3. Notifications & Alerts

Centralized store of real-time notifications:
Approval pending.
Production delay alerts.
Low stock alerts.

Shown in multiple places (header notification bell, dashboard widgets).

# `Explain Strict Mode in React,when do you use it?`

React.StrictMode is a wrapper component that helps highlight potential problems in an application during development.
Purpose:
Identifies unsafe lifecycle methods.
Warns about deprecated APIs.
Detects unexpected side effects.
Ensures components are following best practices.

Double Rendering in Dev Mode:
In React 18+, StrictMode deliberately invokes some lifecycle methods twice (like useEffect, useState initialization) to check if code is pure and resilient to unexpected re-renders.

In StrictMode, React mounts → unmounts → mounts again immediately in development.
This double render checks:
If your component sets up effects correctly in useEffect (instead of directly in render).
If your cleanup functions are properly written (to avoid memory leaks).

# `How do you prevent unnecessary re-renders in React?`

**_1. memoization_**
React.memo is a higher-order component (HOC).
If the component’s props don’t change, React reuses the previous rendered result instead of re-rendering.

const MyComponent = ({ user }) => {
console.log("Rendered:", user.name);
return <div>{user.name}</div>;
};

// Custom comparison: check user.id only
export default REact.memo(MyComponent,(prevProp,nextProp)=>{
return prevProp.user.id ===nextProp.user.id
})

**_it now check only change in user Id if only id changes then only it re-renders otherwise for any other change it just ignores_**

React.memo does a shallow comparison of props.
If props are the same (===), it skips re-render.
If props differ, the component renders again.

👉Custom comparator is useful when props are objects/arrays/functions, since shallow comparison may fail.

React.memo vs PureComponent
React.PureComponent is for class components.
React.memo is for functional components.
Both rely on shallow comparison of props.

**_2.useMemo_**
useMemo is a React Hook that memoizes the result of a function (a computed value).
It recomputes the value only when its dependencies change.
Prevents expensive recalculations on every render.

import React, { useState, useMemo } from "react";

function ExpensiveComponent({ num }) {
const expensiveCalculation = (n) => {
console.log("Calculating...");
let result = 0;
for (let i = 0; i < 1000000000; i++) {
result += n;
}
return result;
};

// ✅ useMemo caches the result until num changes
const calculation = useMemo(() => expensiveCalculation(num), [num]);

return <div>Result: {calculation}</div>;
}
👉 Without useMemo, this calculation runs on every render.
👉 With useMemo, it runs only when num changes.

Without useMemo, objects/arrays get new references on every render → causes unnecessary re-renders.
// ❌ new object created every render
const options = { filter };

// ✅ stabilized object reference
const memoizedOptions = useMemo(() => ({ filter }), [filter]);

Difference: useMemo vs useCallback
useMemo → Memoizes a value (result of a function).
useCallback → Memoizes a function itself.

⚠️ Overuse: Using useMemo everywhere can hurt performance because React still needs to compare dependencies and manage cache.
⚠️ Objects/Arrays: Developers often forget to memoize objects/arrays, leading to unnecessary renders.
⚠️ Shallow Comparison: Dependencies are compared shallowly. Passing unstable references (like inline objects) will break memoization.

**_3. useCallback_**
useCallback is a React Hook that memoizes a function reference.
Returns the same function instance across re-renders unless dependencies change.

In React, functions are recreated on every render.
If you pass a function as a prop to a child, the child re-renders every time (since function reference changes).
useCallback solves this by reusing the same function instance until dependencies change.

function Parent() {
const [count, setCount] = React.useState(0);

// ✅ Function depends on count
const logCount = React.useCallback(() => {
console.log("Count is:", count);
}, [count]);

return (

<div>
<button onClick={() => setCount(count + 1)}>Increment</button>
<Child onLog={logCount} />
</div>
);
}
👉 Every time count changes, a new function is created.
👉 But when other state/props change, function reference is stable.

⚠️ Misunderstanding: useCallback doesn’t prevent re-renders alone → must be combined with React.memo or dependency-sensitive logic.

# `Error Boundaries in React: How and Why to Use Them`

Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree.
They catch errors during:
Rendering
Lifecycle methods

Instead of crashing the whole app, they let you:
Display a fallback UI
Log the error

Must be a class component (Hooks don’t support error boundaries directly).
Implement at least one of these lifecycle methods:
static getDerivedStateFromError(error) → Update state to show fallback UI.
componentDidCatch(error, info) → Log error details.

import React from "react";
class ErrorBoundary extends React.Component {
constructor(props) {
super(props);
this.state = { hasError: false };
}

// Update state when error occurs
static getDerivedStateFromError(error) {
return { hasError: true };
}

// Log error (can send to monitoring service)
componentDidCatch(error, errorInfo) {
console.error("Error caught by boundary:", error, errorInfo);
}

render() {
if (this.state.hasError) {
return <h2>Something went wrong.</h2>;
}
return this.props.children;
}
}

export default ErrorBoundary;

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

# `Code splitting in React,how do you implement it?`

Definition
Code splitting means breaking your React app’s bundle into smaller chunks.
Instead of shipping one big JS file, you load only what’s needed on demand.
Improves initial load performance.

**_React.lazy + Suspense_**
const LazyCompo = React.lazy(()=>import(./MyComponent))

return(
<>
<Suspense falback={Loading...}>
<LazyComp/>
</Suspense>
</>
)

**_Route-based Code Splitting (React Router v6)_**

<Suspense fallback={<div>Loading Page...</div>}>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
</Routes>
</Suspense>

# `What’s the purpose of keys in lists? Why are they needed?`

Definition
Keys are unique identifiers given to list elements in React.
They help React identify which items changed, added, or removed.

Why Needed?
React uses a diffing algorithm (reconciliation) to update the DOM efficiently.
Without keys → React compares items by position in the list.
With keys → React compares items by identity, avoiding unnecessary re-renders.

👉 Keys make React’s virtual DOM diffing faster & more predictable.

Why Not Use Index as Key?
Using index as key is okay only for static lists (never change order).
⚠️ Bad when list changes (add/remove/reorder) → causes:
Wrong component re-use.
Unexpected UI bugs.
State loss inside list items.

# `Fragment vs div,how and when to use each?`

1. What is a Fragment?
   Fragment is a wrapper component provided by React.
   Lets you return multiple elements from a component without adding extra nodes to the DOM.

# `useLayoutEffect() vs useEffect().`

useEffect → Runs asynchronously after paint (after the browser updates the screen).
useLayoutEffect → Runs synchronously after DOM mutations but before paint (the user sees updated UI after it finishes).

# `Debouncing and throttling in React`

✅ Debouncing
Ensures a function runs only after a certain time has passed since the last event.
If the event keeps firing, the timer resets.
Useful for reducing unnecessary calls when events happen too frequently.
👉 Example: Search box

import React, { useState, useEffect } from "react";

function Search() {
const [query, setQuery] = useState("");

// Debounce logic
useEffect(() => {
const handler = setTimeout(() => {
if (query) {
console.log("API Call with query:", query);
}
}, 500); // wait 500ms after user stops typing

    return () => clearTimeout(handler);

}, [query]);

return (
<input
type="text"
placeholder="Search..."
value={query}
onChange={(e) => setQuery(e.target.value)}
/>
);
}

export default Search;

✅ Throttling
Ensures a function runs at most once in a given interval, no matter how many times the event fires.
Ignores extra calls until the interval is over.
Useful for controlling execution frequency in high-frequency events.

# `What is Lifting state up in react?`

Lifting state up means moving shared state to the nearest common ancestor of two or more components.
Instead of duplicating state in multiple child components, you keep it in the parent and pass it down as props.
Ensures data consistency between components.

# `what is single page application exactly`

A Single Page Application (SPA) is a web app that loads a single HTML page and dynamically updates content without requiring a full page reload.
Navigation and data updates happen client-side (in the browser) using JavaScript

2. How It Works
   First request → server sends a minimal index.html + JS bundle.
   JavaScript framework (React) takes over routing & rendering.
   When the user navigates, only the changed parts of the page update.

# `What is React`

1. React is an open-source JavaScript library for building user interfaces, mainly for single-page applications (SPAs).
2. Key Features:
   Component-Based → Build UIs using reusable pieces (components).
   Declarative → Describe what UI should look like, React updates it efficiently.
   Virtual DOM → Improves performance by minimizing real DOM updates.
   Unidirectional Data Flow → Data flows from parent → child via props.
   JSX → Allows writing HTML-like syntax inside JavaScript.
   Hooks → Functions like useState, useEffect for state & lifecycle (no classes needed).

# `What is difference between virtual dom and dom in React js`

**_How Virtual DOM Works in React_**
Initial Render → React builds a Virtual DOM in memory.
State/Props Change → React creates a new Virtual DOM.
Diffing → React compares old VDOM vs new VDOM to detect changes (reconciliation).
Batch Update → Only the changed parts are updated in the real DOM.

**_Actual Dom process:_**
“When the browser renders a page, it parses HTML to build the DOM tree, parses CSS to build the CSSOM, combines them into a render tree, calculates layout (position and size of elements), paints pixels to the screen. JavaScript can manipulate DOM and CSS, triggering reflow or repaint, which affects performance.”

Important Notes:
Reflow / Layout is expensive → avoid frequent DOM changes.
Repaint happens when visual properties change but layout doesn’t (e.g., color).
JavaScript blocking can delay rendering.
Modern browsers optimize with incremental layout & paint.

**_critical rendering path:_**

- css blocks the rendering unless an until all the css loads it won't render anything on screen because there might be chance of overiding css
- in contarst script is parser blocking(but in modern browsser they download all js files in parallel along with css)
- in render tree only the nodes which we want to show on screen is added (skips display none property)
- layout just calculates the all the sizes of elements and decide where to display what
- if there is change in window size for new dom node is added it triggers reflow and all procrss happens again

# `What is controlled and uncontrolled component in React js.`

Controlled Component:
Form input is controlled by React state. Value is set via state and changes via onChange.
Dyanamic validation is easy

Uncontrolled Component
Form input manages its own internal state. You read the value using refs.
Dyanamic validation is Hard

# `What is hooks in React js.`

Hooks are functions that let you “hook into” React features (state, lifecycle, context, refs, etc.) from functional components.
Introduced to replace most use cases for class components and to enable easier code reuse via custom hooks.

🔹 Rules of Hooks (must-know)
Call hooks at the top level of your component or custom hook — never inside loops, conditions or nested functions.
Call hooks only from React functions — either functional components or custom hooks (not regular JS functions).

**_useState_**
useState is a Hook that lets you add state to functional components.
State here means data that changes over time and affects rendering.

Component re-renders only when state changes.
React compares new vs old value (shallow check for primitives; reference check for objects/arrays).

const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Increment</button>

const [user, setUser] = useState({ name: "", age: "" });
const handleChange = (e) => {
setUser({ ...user, name: e.target.value }); // spread old state
};

function CounterWrong() {
const [count, setCount] = React.useState(0);

const handleClick = () => {
setCount(count + 1);
setCount(count + 1);
};

return (

<div>
<p>Count: {count}</p>
<button onClick={handleClick}>Increment Twice</button>
</div>
);
}
👉 What happens?
Suppose count = 0.
First setCount(count + 1) → tries to set 1.
Second setCount(count + 1) → also tries to set 1 (because count was 0 during this render).
Final result after click = 1 ✅ not 2!

React batches state updates for performance → fewer re-renders.
If you use setCount(count + 1), multiple updates in the same render use the same stale value, so only one increment happens.
setCount(prev => prev + 1) ensures updates run sequentially with the latest state.
Since React 18, automatic batching also applies in async code (like timeouts, fetches).

**_useEffect _**
useEffect(() => {
// side effect logic here
return () => {
// cleanup logic (optional)
};
}, [dependencies]);

Effect function runs after the render is committed to the screen.
Dependency array decides when to run it again.
Cleanup function (if provided) runs before the component unmounts or before re-running the effect.

Runs after render → does not block painting.
Cleanup prevents memory leaks (e.g., timers, subscriptions).
Dependency array is crucial → forgetting it may cause infinite loops.
For layout-related updates (like measuring DOM before paint), use useLayoutEffect.
Multiple useEffects can be used in one component → React runs them in order.

**_useContext_**

const MyContext = createContext();

function ContextProvider({children}){
const[name,setName] = useState({name:'vrushbah',age:27})

return (
<MyContext.Provider value={name}>
{children}
</MyContext.Provider>
)
}

function ToolBar(){
const user = useContext(MyContext);
return (
<>
{user.name}-{user.age}
</>
)

}

const App = ()=>{
<>
<ContextProvider>
<ToolBar />
</ContextProvider>
</>
}

useContext is a hook that allows components to access values from React Context without prop drilling. We wrap components with a Context Provider, and any child can consume the value directly with useContext. It’s often used for themes, authentication, or global settings."

**_useRef_**

🔹 What is useRef?
useRef is a hook that returns a mutable object with a .current property.
Unlike useState, updating a ref does not cause a re-render.
It’s commonly used for:
Accessing DOM elements directly.
Storing mutable values across renders

const myRef = useRef(initialValue);
myRef.current will hold the value.
This value persists between re-renders.

🔹 Key Interview Points
Unlike useState → updating .current doesn’t trigger a re-render.

Like instance variables in class components → used to store values across renders.
Can be used to store:
DOM references
Timeout/interval IDs

Pitfall: If you want UI updates → use useState, not useRef.

React.useEffect(() => {
intervalRef.current = setInterval(() => {
setCount(c => c + 1);
}, 1000);

    return () => clearInterval(intervalRef.current);

}, []);

🔹 Key Difference
Normal variable → gets re-declared/reset on every render. ❌ Loses its previous value.
useRef → value is persistent across renders. ✅ Stays the same object.

**_useReducer _**

A hook that lets you manage complex state logic.
Alternative to useState.
Follows the Redux-like pattern → state + action + reducer function.

const [state, dispatch] = useReducer(reducer, initialState);

reducer: A pure function (state, action) => newState.
state: Current state.
dispatch: Function to send an action to reducer.

🔹 When to use useReducer vs useState?
✅ Use useState → Simple, independent values (like toggles, counters).
✅ Use useReducer →
When state logic is complex.
When multiple states are updated together.
When updates depend on previous state.
When state transitions follow clear actions (like Redux).

let intialValue = {
name:"",
email:""
}
const Form(){
const[form,dispatch] = useReducer(formReducer,intialValue)

const handleChange = (e)=>{
const{name,value} = e.target
dispatch({name,value})
}

return(
<>
<input name="name" value={form.name} onChange={handleChange}  />
<input name="email" value={form.email} onChange={handleChange}  />
</>
)
}

const formReducer = (state,action)=>{
return {
...state,
[action.name]:action.value
}
}

# `What is jsx, babel, webpack?`

1. JSX (JavaScript XML)
   A syntax extension for JavaScript.
   Looks like HTML but is transformed into React’s createElement() calls.
   Makes UI code more readable and declarative.
   JSX is not understood by browsers → must be converted (via Babel) into plain JS.

🔹 2. Babel
A JavaScript compiler (transpiler).
Converts modern JS (ES6+, JSX, TypeScript) → older JS that browsers can understand.

🔹 3. Webpack
A module bundler.
Takes all files (JS, CSS, images, etc.) → bundles into optimized files for the browser.
Features:
Code splitting (load only required chunks).

✅ Example Flow:
Webpack finds index.js.
Follows import/require statements → builds dependency graph.
Bundles everything into a single/multiple JS files (bundle.js).
Interview point: Webpack makes React apps production-ready with optimizations like minification, tree-shaking, and lazy loading.

Vite used Rollup bundler for production

# `What is Redux?`

Redux is a state management library for JavaScript apps (commonly used with React, but not limited to it).
It provides a centralized store to manage application state in a predictable way.

🔹 Why Redux?
In large apps, prop drilling (passing props down many levels) and managing shared state becomes messy.
Redux solves this by keeping one global state (store) that any component can access.
Ensures predictability → State changes only through pure functions (reducers).

🔹 Core Principles of Redux
Single Source of Truth
State is Read-Only
Changes via Pure Reducers --> They take current state + action and return a new state (without mutating).

🔹 Redux Data Flow (Unidirectional)
UI dispatches an action → { type: 'INCREMENT' }
Action goes to reducer(s)
Reducer returns a new state
Store updates → UI re-renders

➡️ Always a one-way flow, making it predictable.

🔹 Redux Toolkit (RTK) 🚀
Modern official Redux library to simplify boilerplate.
Provides:
createSlice() → auto generates reducers + actions
configureStore() → simpler store setup
Built-in support for async via createAsyncThunk.

const userSlice = createSlice({
name:'users',
intialValue:[],
reducer:{
addUser(state,action){
state.push(action.payload)
}
}
});
export const{addUser} = userSlice.action;
export default userSlice.reducer

const store= configureStore({
reducer:{
users:userReducer
}
})

//MyComponet
const user = useSelector(store=>store.users)
const dispatch = useDispatch()

dispatch(addUser())

if we want to manage async task we can use creatAsyncThunk function to handle all async operation in store from
redux/@toolkit library

- for example fetching the todo's of user and storing it in store
- while creating the slice we have extraReducer inside it has builder
- builder is an object passed automatically by RTK when you use the function form of extraReducers.
- It exposes methods (like addCase, addMatcher, addDefaultCase) that let you define how your slice should respond to actions.

# `Explain lifecycle method in React js`

Mounting

- ctor
- static getDerivedStateFromProps(props,state)
- render()
- componentDidMount()
  Updating
- static getDerivedStateFromProps(props,state)
- shouldComponentUpdate
- render
- getSnapShotBeforeUpdate(prevProp,prevState)
- componentDidMount()
  Unmounting
- componentWillUnmount

# `What is portal`

A Portal in React allows you to render children into a different part of the DOM tree (outside the parent component’s hierarchy).

function Modal({children}){
return (
<>
ReactDemo.createPortal(<div>{children}</div>,document.getElementById('modal-root'))
</>
)
}
export default Modal

function App(){
const[open,setOpen] = useState(false)
return(
<>
<button onClick={()=>setOpen(prev=>!prev)}>show modal</button>
{open && <Modal>

<p>Hey This is Modal using Portal</p>
<button onClick={()=>setOpen(prev=>!prev)}>show modal</button>
</Modal>}
</>
)
}

# `What is Reconciliation?`

Reconciliation in React is the process of updating the DOM when a component’s state or props change.
React uses a Virtual DOM (VDOM) to determine the minimal set of changes needed in the real DOM.

🔹 Steps in Reconciliation

Render Phase
Component returns a new Virtual DOM tree when state/props change.

Diffing
React compares the new Virtual DOM with the old one.
Uses efficient algorithms to detect what actually changed.

Commit Phase
Updates only the necessary parts of the real DOM (not the whole page).

Different element type → Replace entire subtree.

<div /> → <p />  // React removes <div> and creates <p>

Same element type → Update only changed attributes/props.
<button className="red" /> → <button className="blue" /> // React only changes className, not the whole <button>

Lists (keys are crucial!)
React uses key to match children in lists.
Without stable keys, React may unnecessarily re-render or misplace elements.

{items.map(item => <li key={item.id}>{item.text}</li>)}

# `What is server side render in React js`.

React.js offers server-side rendering and client-side rendering options.

- Server-side rendering renders web pages on the server and sends fully-rendered HTML to the client.
- Server-side rendering offers faster initial load times and improved SEO optimization.

When a user makes a request for a webpage, the server generates the HTML, including any dynamic data, and sends it to the user’s machine. The client then displays the page without any further processing.
This is especially beneficial for users with slower internet connections or less powerful devices. Second, SSR improves SEO optimization by sending fully-rendered HTML to search engine crawlers, making it easier for them to index and rank your website. Lastly, SSR enhances user experience by ensuring that the content is immediately visible, reducing the time users have to wait for the page to load.

# `What is node module in React js`

node_modules is a folder automatically created when you run

- npm install
  It contains all the packages (dependencies and sub-dependencies) listed in your package.json.
  It is managed by npm (Node Package Manager) or yarn.

# `React Performance – Scenario Based Questions`

# React-redux

You should mutate the state directly (Redux Toolkit uses Immer under the hood, so mutations are allowed):
Immer is the library that powers the "magic" inside Redux Toolkit.
Normally in Redux, you must always return a new state object and never mutate the old one. For example:

// traditional redux reducer
function addTodoReducer(state, action) {
return {
...state,
todos: [...state.todos, action.payload],
};
}

What Immer Does
Immer lets you write code that looks like it mutates the state, but under the hood, it creates a new immutable state for you.

Example with Immer (which is built into Redux Toolkit):

addTodo(state, action) {
state.todos.push(action.payload); // looks like mutation
}

# Redux thunk

Redux thunk is an middleware that allows you to write action creator that return a function instead of an action this function can perform async logic (like api request) and dispacth action after the operation is complete (e.g fetching user data and dispatching to state)

Think of Redux Thunk as a middleware that allows you to:
Write async logic (like API calls) inside Redux.
Dispatch actions before, during, and after the async call.

Thunk is already included in Redux Toolkit, so no extra install needed.

# ------------------------------------------------------------------------------------------------------------------------------

# React Query/Tanstack query

it's a library that helps you manage the state of data you fetch from server like apis in your react application
one of the most powerful tol for managing server side state in react

Advantages:

1. Data fetching made easy
2. building loading and error state
3. automatic caching
4. background refetching
5. pagination and infinte scrollig

Query Client -> it is core part of react-query library. it manages the caching, background fetching, data sync and other query related logic
QueryCLientProvider -> it is used to provide the QueryClient instance to entire React application

In React Query (also known as TanStack Query), a queryKey is a crucial identifier used to manage and interact with the query cache. It acts as a unique reference for each piece of data fetched and stored by React Query.

Each queryKey must be unique to the data it represents. React Query uses this key to store the fetched data in its cache, allowing for efficient retrieval and preventing redundant fetches. If the queryKey changes, React Query treats it as a new query and will refetch the data.

`gcTime (Garbage Collection Time)`
Meaning: How long unused (inactive) cache data stays in memory before React Query garbage collects (removes) it.
Default: 5 minutes
👉 Example with your todos:
You fetch todos in TodosComponent. Data is cached.
You navigate away (no components are using todos).
React Query marks it as inactive.
Now, the gcTime timer (say 5 minutes) starts.
If you don’t revisit TodosComponent within 5 minutes, the cache is cleared.
If you revisit before 5 minutes, the old cache is reused (no immediate fetch just because of gcTime).

⚠️ Correction to your understanding:
Revisiting before 5 minutes does not automatically trigger a new fetch. It will reuse the cached data. Whether a fetch happens depends on staleTime, not gcTime.

🔹 Does gcTime reset every time you leave a component?
✅ Yes, it resets.
Each time a query becomes inactive (no components are using it), React Query starts a new gcTime countdown.
The countdown is not cumulative — it doesn’t “carry over” the previous unused duration.

`🔹 staleTime`
Meaning: How long cached data is considered fresh before being marked stale.
Default: 0 ms (data is immediately stale after fetching).

👉 Example with staleTime = 1 minute:
You fetch todos. Data is cached and fresh for 1 min.
Within 1 min, if you revisit TodosComponent:
React Query sees data is still fresh → no refetch.
After 1 min, data becomes stale. If you revisit after that:
React Query will show stale data immediately (fast UI),
but also triggers a background refetch to update.

⚖️ In short:
gcTime → How long unused data stays in cache before being deleted. (memory life)
staleTime → How long data is considered fresh before React Query thinks it should refetch. (freshness life)

`📌 Definition of Polling`
Polling is a process where a client repeatedly makes requests to the server at regular time intervals to check if new data or updates are available.

🔹 In simple terms:
Instead of the server pushing updates to the client,
The client keeps asking: “Do you have new data? Do you have new data?” at fixed intervals.

const {
data: post,
isLoading,
error,
} = useQuery({
queryKey: ["posts"],
queryFn: getPostDetails,
gcTime: 5 _ 60 _ 1000, //the data is cached for 5mins it wont garbage collected for 5min when you dont visit this component
// staleTime: 20 \* 1000, //the data is consider as fresh for 20sec so even if you visit the component within 20sec it wont refetch it uses caches data
refetchInterval: 1000, //after every 1 sec the fetch call is made
refetchIntervalInBackground: true, //by default false if made it true even if we switch to another tabs the fetch continues in background
});

`useMutation`
What is useMutation?
useQuery → for fetching (GET) data.
useMutation → for modifying (POST, PUT, PATCH, DELETE) data.

Think of it like this:
useQuery = “read-only”
useMutation = “write

const queryClient = useQueryClient()
const deleteMutation = useMutation({
mutationFn: (id) => deletePost(id),
onSuccess: (data, id) => {
queryClient.setQueryData(["posts", pageNumber], (post) => {
// your logic
});
},
});

queryClient.setQueryData() is used to update cached data for specific query in this case it's the query with key['post',pageNumber],which
is likely represents the list of posts on the current page

mutation.mutate() --> when you call mutate it tells react query to run the mutation function defined inside the useMutation hook. this is needed because mutation is an action that changes data

# ------------------------------------------------------------------------------------------------------------------------------

# 1. Unnecessary Re-renders

We can use:
React.memo → Prevents child from re-rendering if props don’t change.
useCallback → Memoizes functions so they aren’t recreated on every render.
useMemo → Memoizes expensive calculations to avoid recomputation.

import React, { useState, useCallback, useMemo } from "react";

// Child component wrapped with React.memo
const Child = React.memo(({ name, onClick }) => {
console.log(`Child ${name} rendered`);
return (

<div>
<p>{name}</p>
<button onClick={onClick}>Click {name}</button>
</div>
);
});

export default function Parent() {
const [count, setCount] = useState(0);
const [value, setValue] = useState("");

// ❌ Without useCallback → new function created every render
// ✅ With useCallback → function reference is stable until dependencies change
const handleClick = useCallback(() => {
console.log("Child button clicked!");
}, []);

// ❌ Expensive calculation re-runs every render
// ✅ With useMemo → only recalculates when `count` changes
const expensiveComputation = useMemo(() => {
console.log("Running expensive computation...");
return count \* 1000;
}, [count]);

return (

<div>
<h2>Parent Component</h2>
<p>Count: {count}</p>
<p>Expensive Computation: {expensiveComputation}</p>

      {/* This input updates value but shouldn’t re-render Child unnecessarily */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />

      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      {/* Child wrapped in React.memo */}
      <Child name="Child A" onClick={handleClick} />
      <Child name="Child B" onClick={handleClick} />
    </div>

);
}

# ------------------------------------------------------------------------------------------------------------------------------

# 2. Large List Rendering

🔹 Scenario
You need to render 1 lakh rows in a table. If you try to render all rows at once, the browser freezes and becomes unresponsive.

✅ Solution: Optimize Rendering

1. Pagination
   What it is: Break data into smaller chunks (say 50–100 rows per page).

Pros:
Easy to implement.
Good for server-side fetching (request only one page at a time).
Better for SEO (URL-based navigation).

Cons:
User experience can be slower (needs clicks to navigate).
Not great for continuous browsing.

2. Infinite Scroll
   What it is: Load more rows automatically as the user scrolls down.

Pros:
Smooth, app-like experience.
Works well for feeds (Facebook, Instagram, e-commerce).

Cons:
Harder to jump to a specific item/page.
Scroll position handling is tricky (going back after navigating away).

3. Virtualization (react-window / react-virtualized) ✅ Best for this case
   What it is: Render only the visible rows in the viewport, plus a small buffer.

Pros:
Extremely efficient — only ~20–50 rows exist in DOM at once.
Smooth scrolling, even for 1 lakh+ records.
Works with infinite scroll & pagination.

Cons:
Slightly more complex to set up.
Doesn’t play well with dynamic row heights (but can be managed).

# ------------------------------------------------------------------------------------------------------------------------------

# 3. Infinite Scroll with API Calls

we can use react tanstack query

# ------------------------------------------------------------------------------------------------------------------------------

# 4. Search Performance (Debouncing/Throttling)

🔹 Solution Approach

1. Debouncing

Wait until the user stops typing for X ms before triggering search.

Good for: search queries (e.g., wait 300ms after last keystroke).

2. Throttling

Throttling is the action of reducing the number of times a function can be called over time to exactly one.

For example, if we throttle a function by 500ms, it means that it cannot be called more than once per 500ms time frame. Any additional function calls within the specified time interval are simply ignored.

Allow the search function to run at most once every X ms, even if the user keeps typing.

Good for: scroll events, window resize, where events fire continuously.

# ------------------------------------------------------------------------------------------------------------------------------

# 5. Slow Forms

How This Demo Helps in Interview

LaggyForm → fully controlled with shared state. Updating one field causes all 20 re-renders → lag when typing fast.

OptimizedForm → uses react-hook-form, which stores values with refs internally. Only the active field updates → typing is smooth.

Traditional appraoch

1. Reduce Re-renders

Use React.memo on individual field components.
Ensure onChange handlers are memoized with useCallback so they don’t trigger unnecessary re-renders.

Example:

const TextInput = React.memo(({ label, value, onChange }) => (

  <div>
    <label>{label}</label>
    <input value={value} onChange={onChange} className="border p-2" />
  </div>
));

const Form = () => {
const [formData, setFormData] = useState({ name: "", email: "", age: "" });

const handleChange = useCallback((e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
}, []);

return (
<>
<TextInput label="Name" value={formData.name} onChange={handleChange} name="name" />
<TextInput label="Email" value={formData.email} onChange={handleChange} name="email" />
<TextInput label="Age" value={formData.age} onChange={handleChange} name="age" />
</>
);
};

✅ Only the field being edited re-renders.

# ------------------------------------------------------------------------------------------------------------------------------

# 10. Scroll Position & State Preservation

Scenario: In infinite scroll, when a user opens a detail page and comes back, the list resets to the top.
Question: How would you preserve scroll position and already fetched data?

🔹 Problem
User scrolls down an infinite list (fetches multiple pages).
They click an item → go to detail page.
When they go back, the list resets:
Scroll position = lost (back at top).
Fetched data = lost (refetched again).
This leads to poor UX and wasted API calls.

1. Preserve Data in State Management

Store fetched list data in a global store (React Context, Redux, Zustand, or React Query cache).
When navigating back, the component reuses cached data instead of refetching.
Example with React Query (@tanstack/react-query):
Infinite query results are cached automatically.
When returning, the list rehydrates from cache.

const { data, fetchNextPage } = useInfiniteQuery(
["products"],
fetchProducts,
{ staleTime: 5 _ 60 _ 1000 } // cache 5 minutes
);
✅ Ensures already fetched pages are not lost.

🔹 Example Timeline
t=0s → Query runs, fetches user, caches result.
t=0–5min → Data is fresh. No auto-refetch when revisiting.
t=5min+ → Data is stale.
If user revisits component or window refocuses → background refetch happens.
Old data shows instantly until new data arrives.

2. Preserve Scroll Position

Two approaches:
a) Save in State / Context
Before navigating away, store window.scrollY (or container scrollTop) in a ref or global store.
On return, restore scroll:

// Save scroll
useEffect(() => {
return () => {
sessionStorage.setItem("scrollY", window.scrollY);
};
}, []);

// Restore scroll
useEffect(() => {
const saved = sessionStorage.getItem("scrollY");
if (saved) {
window.scrollTo(0, parseInt(saved, 10));
}
}, []);

b) Use React Router’s useLocation State

Pass scroll position when navigating:
navigate("/details", { state: { scrollY: window.scrollY } });
Restore it when user comes back.

3. Keep Component Mounted (Optional)

Instead of unmounting list on navigation, keep it mounted in the background (e.g., use React Router v6 Outlet with layout).
The component state (list data + scroll) is preserved automatically.
But ⚠️ this may waste memory if many heavy pages are kept alive.

# ------------------------------------------------------------------------------------------------------------------------------

12. React Profiler Debugging

Scenario: Your app becomes slow after a new feature release.

Question: How would you use React Profiler or Chrome DevTools Performance Tab to identify bottlenecks?

# ------------------------------------------------------------------------------------------------------------------------------

# 13. Memoization Pitfalls

Scenario: You added useMemo and useCallback everywhere, but the app became harder to maintain without noticeable performance gains.
Question: When should you not use memoization?

🔹 Scenario Recap
Developer adds useMemo and useCallback everywhere.
Codebase gets cluttered & harder to read.
Performance barely improves (sometimes even gets worse).

🔹 Key Idea
Memoization itself has a cost (extra memory + comparisons).
If props/state change frequently, or the computation is cheap, memoization does more harm than good.

"I wouldn’t use memoization everywhere, because it has its own overhead. I’d avoid it for cheap calculations, components that are already fast, or values/functions that change on every render. Instead, I profile with React DevTools or Chrome Performance tab, identify bottlenecks, and only add useMemo, useCallback, or React.memo where they provide real gains. In other words, memoization should be a surgical tool, not a blanket solution."

# ------------------------------------------------------------------------------------------------------------------------------

# 15. Network Performance

Scenario: Multiple API calls slow down page load.
Question: How would you optimize network performance in React apps?
Follow-up: Would you use batching requests, caching (React Query/SWR), or service workers?

🔹 Solution Approaches

1. Parallelize API Calls
   Don’t wait for one request to finish before starting another.
   Use Promise.all (or useQueries in React Query) to fetch data in parallel.

Promise.all([fetchUsers(), fetchOrders(), fetchProducts()])
.then(([users, orders, products]) => { ... });

2. Batch Requests (where possible)
   If backend supports batching → combine multiple small API calls into one.
   Example: Instead of calling /user/1, /user/2, /user/3 → call /users?ids=1,2,3.
   ✅ Cuts down on round trips.

3. Cache & Deduplicate Requests
   Use React Query or SWR → automatic caching, deduplication, background refresh.
   const { data } = useQuery(["user", id], () => fetchUser(id), {
   staleTime: 5 _ 60 _ 1000, // cache 5 min
   });
   ✅ Prevents duplicate network calls.

4. Lazy Loading & Code Splitting
   Don’t fetch all data up front.
   Load only what’s needed for initial render (above-the-fold content).
   Fetch other data in the background.

5. Pagination / Infinite Scroll
   Avoid fetching massive payloads.
   Load incrementally (page-by-page).

# ------------------------------------------------------------------------------------------------------------------------------

# Hooks & Lifecycle

Scenario: Your useEffect causes an infinite API call loop.
→ How would you debug and fix it?

Why it happens
Usually because:
You’re setting state inside useEffect without proper dependencies.
The dependency array includes something that changes on every render (e.g., function/object/array literal).

useEffect(() => {
fetchData().then(res => setData(res));
}, [data]); // ❌ causes loop because setData updates data → triggers useEffect again

✅ Fix
Ensure stable dependencies.
Wrap functions in useCallback if they’re dependencies.
Or, remove changing state from the dependency array if not needed.

useEffect(() => {
fetchData().then(res => setData(res));
}, []); // ✅ runs only once

Debug tip: Add console.log inside useEffect to see how often it fires, and check dependency values.

# ------------------------------------------------------------------------------------------------------------------------------

🔹 3. Routing & Navigation

Scenario: After login, users should be redirected to /dashboard, but unauthenticated users should go to /login.
→ How would you implement protected routes?

# ------------------------------------------------------------------------------------------------------------------------------

🔹 4. Forms & Validation

Scenario: A password field should validate strength dynamically as the user types.
→ How would you implement it?

import { useState } from "react";

function PasswordField() {
const [password, setPassword] = useState("");
const [strength, setStrength] = useState("");

const checkStrength = (value) => {
let score = 0;
if (value.length >= 8) score++;
if (/[A-Z]/.test(value)) score++;
if (/[0-9]/.test(value)) score++;
if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) return "Weak";
    if (score === 2) return "Medium";
    return "Strong";

};

const handleChange = (e) => {
const value = e.target.value;
setPassword(value);
setStrength(checkStrength(value));
};

return (

<div>
<input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter password"
      />
{password && <p>Password strength: {strength}</p>}
</div>
);
}

# ------------------------------------------------------------------------------------------------------------------------------

🔹 5. Testing

# ------------------------------------------------------------------------------------------------------------------------------

# 8. Integration with Backend

Scenario: A POST request succeeds, but the UI doesn’t update until refresh.
→ How would you implement optimistic UI updates?

Scenario: Multiple components call the same API.
→ How would you centralize and cache data fetching?

Optimistic updates → update UI immediately, rollback on error, finalize with refetch. Improves perceived performance.

const queryClient = useQueryClient();

const { mutate } = useMutation(addLike, {
// Optimistic update
onMutate: async (newLike) => {
await queryClient.cancelQueries(["likes"]);
const prevData = queryClient.getQueryData(["likes"]);

    queryClient.setQueryData(["likes"], (old) => [...old, newLike]);

    return { prevData };

},
// Rollback if error
onError: (err, newLike, context) => {
queryClient.setQueryData(["likes"], context.prevData);
},
// Refetch for consistency
onSettled: () => {
queryClient.invalidateQueries(["likes"]);
},
});

Centralized fetching & caching → React Query or SWR deduplicate requests, share cached results, and keep UI consistent.

function useUserData() {
return useQuery(["user"], () =>
fetch("/api/user").then((res) => res.json())
);
}

function Profile() {
const { data: user } = useUserData();
return <h2>{user.name}</h2>;
}

function Sidebar() {
const { data: user } = useUserData();
return <p>{user.email}</p>;
}

# ------------------------------------------------------------------------------------------------------------------------------

🔹 10. UI/UX & Accessibility

Scenario: A button is not accessible for screen readers.
→ How would you fix accessibility issues (ARIA roles, semantic HTML)?

Scenario: You need a dark mode toggle across the app.
→ How would you implement it with React Context or CSS variables?

Scenario: A modal should close on Esc key press and clicking outside.
→ How would you implement this behavior?

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function Modal({ onClose, children }) {
const modalRef = useRef();

// Handle Esc key
useEffect(() => {
const handleEsc = (e) => {
if (e.key === "Escape") {
onClose();
}
};
document.addEventListener("keydown", handleEsc);
return () => document.removeEventListener("keydown", handleEsc);
}, [onClose]);

// Handle outside click
const handleClickOutside = (e) => {
if (modalRef.current && !modalRef.current.contains(e.target)) {
onClose();
}
};

return ReactDOM.createPortal(

<div className="overlay" onClick={handleClickOutside}>
<div className="modal" ref={modalRef}>
<button className="close-btn" onClick={onClose}>
✖
</button>
{children}
</div>
</div>,
document.getElementById("modal-root") // 🔑 make sure you have a <div id="modal-root"></div> in index.html
);
}

function App() {
const [isOpen, setIsOpen] = useState(false);

return (

<div className="App">
<h1>Modal Example</h1>
<button onClick={() => setIsOpen(true)}>Open Modal</button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h2>Hello 👋</h2>
          <p>This modal closes on Esc key or outside click.</p>
        </Modal>
      )}
    </div>

);
}

export default App;

# ------------------------------------------------------------------------------------------------------------------------------
