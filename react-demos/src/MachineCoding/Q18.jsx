import React, { useState } from "react";

//Write a component that uses the React. memo for optimization.

const ChildComp = React.memo(({ name }) => {
  console.log("Child rendered");

  return <p>{`My Name is ${name}`}</p>;
});

const Q18 = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count:{count}</p>
      <ChildComp name={"vrushbah"} />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Incremnet
      </button>
    </div>
  );
};

export default Q18;
