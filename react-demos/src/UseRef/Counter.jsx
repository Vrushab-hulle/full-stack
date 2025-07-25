import { useEffect, useRef, useState } from "react";

export default function Counter() {
  const intervalRef = useRef(null); // Initialize as null
  const [count, setCount] = useState(0);
  const colorRef = useRef();

  const handleStart = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1); // Functional update
    }, 1000);

    intervalRef.current = intervalId;
  };

  const handleStop = () => {
    console.log("intervalRef.current", intervalRef.current);

    colorRef.current.style.backgroundColor = "green";
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset the ref
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleStart} ref={colorRef}>
        Start Timer
      </button>
      <button onClick={handleStop}>Stop Timer</button>
    </div>
  );
}
