import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div>
      <p>count:{count}</p>
      <button onClick={handleClick}>Counter</button>
    </div>
  );
};

export default Counter;
