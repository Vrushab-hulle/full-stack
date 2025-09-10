import React, { useCallback, useState } from "react";
import { List, AutoSizer } from "react-virtualized";

function generateList(size) {
  return new Array(size).fill(true).map((_, index) => `Row ${index + 1}`);
}

export default function VirtualizedList() {
  const [rows, setRows] = useState([]);
  const [triggerRender, setTriggerRender] = useState(false);

  const handleList = () => {
    setRows(generateList(100000));
    setTimeout(() => {
      setTriggerRender((prev) => !prev);
    }, 100);
  };

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      return (
        <div key={key} style={style}>
          {rows[index]}
        </div>
      );
    },
    [rows]
  );

  return (
    <>
      <button onClick={handleList}>Generate List</button>
      {triggerRender && (
        <div style={{ width: "100%", height: "400px" }}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowCount={rows.length}
                rowHeight={20}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </>
  );
}
