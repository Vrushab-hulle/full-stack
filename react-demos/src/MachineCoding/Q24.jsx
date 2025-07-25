import React, { useState } from "react";

const Q24 = () => {
  const tabs = [
    { label: "Tab 1", content: <div>Content of Tab 1</div> },
    { label: "Tab 2", content: <div>Content of Tab 2</div> },
    { label: "Tab 3", content: <div>Content of Tab 3</div> },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div>
        {tabs.map((item, index) => (
          <button key={index} onClick={() => setActiveIndex(index)}>
            {item.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeIndex].content}</div>
    </>
  );
};

export default Q24;
