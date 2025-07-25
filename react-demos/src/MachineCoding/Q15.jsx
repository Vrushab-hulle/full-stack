//Write a component that uses the useReducer hook.

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };

    default:
      break;
  }
}

import { useReducer } from "react";

const Q15 = () => {
  const [state, dipatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <h1>Counter Reducer</h1>
      <p>Count:{state.count}</p>
      <button onClick={() => dipatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dipatch({ type: "decrement" })}>Decrement</button>
    </>
  );
};

export default Q15;
