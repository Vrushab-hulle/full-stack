//Q7. Write a component that toggles between two states using a button.

import { useState } from "react";

const Q7 = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <p>{toggle ? "dark theme" : "light theme"}</p>
      <button
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        style={{ border: "1px solid black" }}
      >
        Change Theme
      </button>
    </div>
  );
};

export default Q7;
