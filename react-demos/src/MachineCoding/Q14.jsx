//How do you implement debouncing for an input field?

//This component demonstrates how to implement debouncing for an input field, 
// allowing the input value to be updated only 
// after the user stops typing for a specified duration.
import React, { useEffect, useState } from "react";

const Q14 = () => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        style={{ border: "1px solid black" }}
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default Q14;
