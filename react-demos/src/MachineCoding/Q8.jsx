//Q9. Write a component that displays a
// list of items and highlights the selected item.

import { useState } from "react";

function Q8() {
  let menu = ["biryani", "roti", "paneer tikka"];
  const [selected, setSelected] = useState(null);

  return (
    <>
      {menu.map((item, index) =>( 
        <li
          key={index}
          onClick={() => setSelected(index)}
          style={{ backgroundColor: selected === index ? "green" : "white" }}
        >
          {item}
        </li>
      ))}
    </>
  );
}

export default Q8;
