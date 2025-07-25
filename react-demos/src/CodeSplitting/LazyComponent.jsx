import React, { lazy } from "react";

const LazyComponent = () => {
  return (
    <div>
      <p>i have been lazily loaded</p>
      <button
        onClick={() =>
          import("./sum").then((module) => {
            alert(module.sum(2, 2));
          })
        }
      >
        Do addition
      </button>
    </div>
  );
};

export default LazyComponent;
