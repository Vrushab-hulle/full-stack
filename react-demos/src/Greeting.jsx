import React from "react";

const Greeting = () => {
  const name = "John";
  const date = new Date();
  return (
    <div>
      <h1>{name}</h1>
      <p>{date.getDate()}</p>
    </div>
  );
};

export default Greeting;
