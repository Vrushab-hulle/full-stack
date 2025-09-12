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
