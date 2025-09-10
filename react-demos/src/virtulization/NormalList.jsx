import React, { useState } from "react";

function generateList(size) {
  return new Array(size).fill(true).map((_, index) => `Row ${index + 1}`);
}

export default function NormalList() {
  const [rows, setRows] = useState([]);
  const [triggerRender, setTriggerRender] = useState(false);

  const handleList = () => {
    setRows(generateList(10000));
    setTimeout(() => {
      setTriggerRender((prev) => !prev);
    }, 100);
  };

  return (
    <>
      <button onClick={handleList}>Generate List</button>
      {triggerRender && (
        <div
          style={{
            height: "400px",
            overflowY: "scroll",
            border: "1px solid black",
          }}
        >
          {rows.map((row, index) => (
            <div
              key={index}
              style={{
                height: "35px",
                borderBottom: "1px solid #ddd",
                padding: "5px",
              }}
            >
              {row}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
