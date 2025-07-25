import React, { useState } from "react";

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    setTodos((todos) => [
      ...todos,
      {
        text: input,
        id: Math.floor(Math.random() * 1000),
      },
    ]);
    setInput("");
  };

  const handleRemove = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <h1>Today todo list</h1>
      <ul>
        {todos.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.text}</span>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDo;
