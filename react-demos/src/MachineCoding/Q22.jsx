import React, { useState } from "react";
//to do list
const Q22 = () => {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [nextId, setNextId] = useState(1); // ID tracker

  function handleAdd() {
    if (text) {
      setTodo((prev) => [
        ...prev,
        { id: nextId, text: text, completed: false },
      ]);
      setNextId((prev) => prev + 1); // Increment ID for next item
      setText("");
    }
  }

  function handleRemove(id) {
    setTodo(todo.filter((item) => item.id !== id));
  }

  function handleCompleted(id) {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todo.map((item) => (
          <li
            key={item.id} // Using the stable ID as key
            style={{ backgroundColor: item.completed ? "green" : "white" }}
          >
            {item.text}
            <button onClick={() => handleCompleted(item.id)}>
              {item.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Q22;
