import { useState, useCallback, useMemo } from "react";
import { memo } from "react";
const Child = memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child button(Click Me)</button>;
});
export function Parent() {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);
  return (
    <div>
      <Child onClick={handleClick} />
      <br />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <br />
      <button onClick={() => setToggle(!toggle)}>
        Toggle: {toggle.toString()}
      </button>
    </div>
  );
}
