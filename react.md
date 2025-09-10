# `React Performance – Scenario Based Questions`

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
    return count * 1000;
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

3. Infinite Scroll with API Calls

Scenario: Your product listing page loads data as the user scrolls. Sometimes the API call is triggered multiple times.

Question: How would you ensure efficient infinite scrolling without duplicate API calls?

Follow-up: How would you handle caching of previously fetched data?

4. Search Performance (Debouncing/Throttling)

Scenario: A search input filters thousands of records. Typing causes the UI to lag.

Question: How would you implement debouncing or throttling to optimize performance?

5. Expensive Calculations in Components

Scenario: A component runs a heavy calculation every time it renders, even though inputs rarely change.

Question: How would you optimize this calculation?

Follow-up: How would you use useMemo for this case?

6. Slow Forms

Scenario: A form with 20+ controlled fields lags when typing.

Question: How would you optimize controlled form performance?

Follow-up: Would you switch to uncontrolled components or use libraries like Formik / React Hook Form?

7. Image Heavy Pages

Scenario: Your app loads a dashboard with 200+ images, slowing down page load.

Question: How would you optimize images in React?

Follow-up: How would you implement lazy loading for images?

8. Large Bundle Size

Scenario: The initial load of your React app is very slow due to a large bundle.

Question: How would you reduce bundle size?

Follow-up: How would you implement code splitting using React.lazy and Suspense?

9. Real-Time Data Updates

Scenario: A stock market dashboard updates thousands of rows in real-time. Full re-renders cause UI lag.

Question: How would you optimize rendering so only updated rows re-render?

Follow-up: Would you use immutable state updates and React.memo here?

10. Scroll Position & State Preservation

Scenario: In infinite scroll, when a user opens a detail page and comes back, the list resets to the top.

Question: How would you preserve scroll position and already fetched data?

11. Error Boundaries with Performance

Scenario: A widget in a dashboard crashes due to bad API data and breaks the entire page.

Question: How would you use Error Boundaries so only that widget fails gracefully?

12. React Profiler Debugging

Scenario: Your app becomes slow after a new feature release.

Question: How would you use React Profiler or Chrome DevTools Performance Tab to identify bottlenecks?

13. Memoization Pitfalls

Scenario: You added useMemo and useCallback everywhere, but the app became harder to maintain without noticeable performance gains.

Question: When should you not use memoization?

14. Third-Party Libraries Impact

Scenario: You added a charting library and performance dropped drastically.

Question: How would you handle performance when using heavy third-party libraries?

15. Network Performance

Scenario: Multiple API calls slow down page load.

Question: How would you optimize network performance in React apps?

Follow-up: Would you use batching requests, caching (React Query/SWR), or service workers?



1. State Management & Data Flow

Scenario: Prop drilling across multiple components makes code unmanageable.
→ How would you refactor (Context API vs Redux vs Zustand)?

Scenario: Two components need to update the same state but live in different parts of the tree.
→ How would you sync state between them?

Scenario: You need to keep data consistent across multiple tabs of the same app.
→ How would you implement cross-tab state syncing?

🔹 2. Hooks & Lifecycle

Scenario: Your useEffect causes an infinite API call loop.
→ How would you debug and fix it?

Scenario: You need to fetch data only once on mount but it re-fetches on every render.
→ How would you structure useEffect dependencies?

Scenario: You need a reusable timer or debounce logic.
→ How would you write a custom hook for it?

🔹 3. Routing & Navigation

Scenario: After login, users should be redirected to /dashboard, but unauthenticated users should go to /login.
→ How would you implement protected routes?

Scenario: In nested routes, you need breadcrumbs (Home > Products > Electronics).
→ How would you generate dynamic breadcrumbs?

Scenario: A user refreshes the page on a detail view (/product/123) and sees a blank screen.
→ How would you handle route-based data fetching?

🔹 4. Forms & Validation

Scenario: A big form (20+ fields) lags while typing.
→ How would you optimize it?

Scenario: A password field should validate strength dynamically as the user types.
→ How would you implement it?

Scenario: You need to validate an email asynchronously from the backend before form submission.
→ How would you do async validation?

🔹 5. Testing

Scenario: A button click fetches data and updates the UI.
→ How would you write a test case for it (unit + integration)?

Scenario: A component relies on context values.
→ How would you mock context for testing?

Scenario: API calls slow down tests.
→ How would you mock API calls (Jest, React Testing Library, MSW)?

🔹 6. Error Handling & Resilience

Scenario: An API call fails and crashes the component.
→ How would you handle errors gracefully?

Scenario: One widget in a dashboard fails but others should work.
→ How would you use Error Boundaries?

Scenario: You need retry logic for failed API requests.
→ How would you implement exponential backoff retries?

🔹 7. Security

Scenario: A React app stores JWT in localStorage.
→ What are the risks and how would you secure it?

Scenario: You need to prevent XSS attacks in React.
→ How would you sanitize user input?

Scenario: You need role-based access control.
→ How would you restrict certain routes/components based on user role?

🔹 8. Integration with Backend

Scenario: You need to fetch a list of items from an API and update in real-time.
→ Would you use WebSockets, polling, or SSE?

Scenario: A POST request succeeds, but the UI doesn’t update until refresh.
→ How would you implement optimistic UI updates?

Scenario: Multiple components call the same API.
→ How would you centralize and cache data fetching?

🔹 9. Architecture & Scalability

Scenario: Your project has grown big, and imports are hard to manage.
→ How would you structure a scalable folder structure?

Scenario: Different teams are working on independent modules.
→ How would you implement micro-frontend architecture?

Scenario: You need feature flags to roll out features gradually.
→ How would you implement them in React?

🔹 10. UI/UX & Accessibility

Scenario: A button is not accessible for screen readers.
→ How would you fix accessibility issues (ARIA roles, semantic HTML)?

Scenario: You need a dark mode toggle across the app.
→ How would you implement it with React Context or CSS variables?

Scenario: A modal should close on Esc key press and clicking outside.
→ How would you implement this behavior?








