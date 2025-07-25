import React, { useRef } from "react";

const Test = () => {
  const inputElement = useRef(null);
  return (
    <div>
      <input type="text" ref={inputElement} />
      <button
        onClick={() => {
          inputElement.current.focus();
          inputElement.current.value = 'Vrushbah hulle';
        }}
      >
        Focus the input
      </button>
    </div>
  );
};

export default Test;
