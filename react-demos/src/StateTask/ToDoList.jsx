import React, { useState } from "react";

const ToDoList = () => {
  const [toDo, setToDo] = useState([]);
  const [task, setTask] = useState("");

  function handleChange(e) {
    setTask(e.target.value);
  }

  function handleAdd() {
    setToDo((prev) => [...prev, task]);
    setTask("")
  }
  return (
    <div>
      <input
        placeholder="Enter todo"
        value={task}
        onInput={(e) => {
          handleChange(e);
        }}
      ></input>
      <button onClick={handleAdd}>Add To List</button>
      <h1>Today's To Do List</h1>
      {toDo.map((td) => (
        <li key={Math.random()}>{td}</li>
      ))}
    </div>
  );
};

export default ToDoList;
