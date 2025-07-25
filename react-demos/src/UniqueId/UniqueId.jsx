import React, { useId } from "react";

const UniqueId = () => {
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}-email`}>
        <input type="text" id={`${id}-email`} />
      </label>
      <label htmlFor={`${id}-password`}>
        <input type="text" id={`${id}-password`} />
      </label>
    </div>
  );
};

export default UniqueId;
