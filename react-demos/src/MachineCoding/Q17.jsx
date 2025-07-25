import React, { useState } from "react";

const Q17 = () => {
  const [userName, setUserName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("name", userName);
    alert("Name saved to local storage!");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default Q17;
