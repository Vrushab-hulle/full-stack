import React, { useEffect, useState } from "react";

export default function TimerWithState() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1); // causes re-render every second
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  console.log("Component rendered");

  return <h2>Timer (with useState): {seconds}</h2>;
}
