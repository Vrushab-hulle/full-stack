//How do you implement conditional rendering in React?

import React, { useState } from "react";

const Q19 = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <h2>{visible && <p>Now i am visible</p>}</h2>
      <button onClick={() => setVisible(!visible)}>Show Hidden Data</button>
    </div>
  );
};

export default Q19;
