import { useState, useCallback, useMemo } from "react";
import { memo } from "react";
export const Child = memo(({ btnClick }) => {
  const [count, setCount] = useState(0);
  console.log("Child rendered");
  return (
    <div>
      <button onClick={btnClick}>Child button(Click Me)</button>;
      <button onClick={() => setCount(count + 1)}>child Count: {count}</button>
    </div >
  );
});
export function Parent() {
  console.log("Parent rendered");
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  // const handleClick = () => {
  //   console.log("Button clicked");
  // };
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);
  return (
    <div>
      <Child btnClick={handleClick} />
      <br />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <br />
      <button onClick={() => setToggle(!toggle)}>
        Toggle: {toggle.toString()}
      </button>
    </div>
  );
}

// export { Parent, Child };

