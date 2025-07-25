import React, { useReducer } from "react";
import { intialValue, reducer } from "./CounterReducer";

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, intialValue);
  return (
    <div>
      <h1>Count:{state.count}</h1>
      <h1>isUpdated:{state.isUpdated}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </div>
  );
};

export default Counter;
