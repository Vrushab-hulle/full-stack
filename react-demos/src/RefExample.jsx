import React, { useEffect, useRef } from "react";

const RefExample = () => {
  const timerRef = useRef(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     timerRef.current += 1;
  //     console.log(timerRef.current); // updates internally
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  function handleClick() {
    timerRef.current += 1;
    console.log(timerRef.current); // updates internally
  }

  return (
    <>
      <p>Timer in seconds:{timerRef.current}</p>
      <button onClick={handleClick}>increment</button>
    </>
  );
};

export default RefExample;
