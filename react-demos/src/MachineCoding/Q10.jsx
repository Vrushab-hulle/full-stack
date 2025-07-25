//Create a component that demonstrates the use of refs.

import { useRef } from "react";

const Q10 = () => {
  const inputRef = useRef(null);
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        focus filed
      </button>
    </div>
  );
};

export default Q10;
