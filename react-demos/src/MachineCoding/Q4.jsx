//Q4. How do you create a controlled component for an input field?

import { useState } from "react";

function Q4() {
  const [username, setUserName] = useState("");

  function handleChange(e) {
    setUserName(e.target.value);
  }
  function handleSubmit() {
    console.log(username);
  }
  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={handleChange}
        style={{ border: "1px solid black" }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Q4;
