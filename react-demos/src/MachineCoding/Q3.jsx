//Q3. Write a React component that maintains a count state and has buttons
// to increment and decrement the count.

import { useState } from "react";

function Q3() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count:{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Q3;
