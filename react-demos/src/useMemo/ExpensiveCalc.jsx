import React, { memo, useCallback, useMemo, useState } from "react";

const ChildComp = memo(({ onAdd }) => {
  console.log("Child rendered");

  return <button onClick={onAdd}>Add Number </button>;
});

const WelcomeMessage = () => {
  const [number, setnumber] = useState([1, 2, 3, 4]);
  const [showEven, setShowEven] = useState(false);

  const filteredNumber = useMemo(() => {
    return showEven ? number.filter((num) => num % 2 === 0) : number;
  }, [number, showEven]);

  const addNumber = useCallback(() => {
    setnumber((prev) => [...prev, prev.length + 1]);
  }, [number]);
  return (
    <div>
      <h2>{showEven ? "Even Number" : "All Number"}</h2>
      <ul>
        {filteredNumber.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      <ChildComp onAdd={addNumber} />
      <button onClick={() => setShowEven((prev) => !prev)}>Toggle</button>
    </div>
  );
};

export default WelcomeMessage;
