import React, { useState } from "react";

const Input = (props) => {
  const [text, setText] = useState("");
  function handleChange(e) {
    setText(e.target.value);
  }
  return (
    <div>
      <input value={text} onChange={handleChange} />
      <br />
      {props.renderTextBelow(value)}
    </div>
  );
};

export default Input;
