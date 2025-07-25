//Create a Search Bar

import { useState } from "react";

const Q23 = () => {
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  const [text, setText] = useState("");

  const filteredItem = items.filter((item) =>
    item.toLowerCase().includes(text.toLowerCase())
  );
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ul>
        {filteredItem.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Q23;
