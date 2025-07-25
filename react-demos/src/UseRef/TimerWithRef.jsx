import React, { useEffect, useRef } from 'react';

export default function TimerWithRef() {
  const secondsRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      secondsRef.current += 1;
      console.log('Timer (with useRef):', secondsRef.current); // updated but no re-render
    }, 1000);
    console.log(interval);
    

    return () => clearInterval(interval); // cleanup
  }, []);

  console.log('Component rendered');

  return <h2>Timer (with useRef): Check console</h2>;
}
