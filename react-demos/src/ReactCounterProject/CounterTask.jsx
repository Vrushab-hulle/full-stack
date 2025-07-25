import React, { useEffect, useRef, useState } from "react";

const CounterTask = () => {
    const [count, setCount] = useState(0);

  console.log("Component render");

  return (
    <div>
      <h1>Counter Task</h1>
      <p>Count:{count}</p>

      <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>decrement</button>

    </div>
  );
};

export default CounterTask;
