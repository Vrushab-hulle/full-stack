import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "name_change":
      return { ...state, age: state.age, userName: action.userName };

    case "incrementAge":
      return { ...state, userName: state.userName, age: state.age + 1 };
  }
}

const Reducer = () => {
  const intialValue = { userName: "", age: 27 };

  const [state, dispatch] = useReducer(reducer, intialValue);

  function handleIncrement() {
    dispatch({ type: "incrementAge" });
  }

  function handleChange(e) {
    dispatch({ type: "name_change", userName: e.target.value });
  }

  function handleSubmit() {
    console.log(state);
  }
  return (
    <div>
      <input type="text" value={state.userName} onChange={handleChange} />
      <button onClick={handleIncrement}>Increment Age</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Reducer;
