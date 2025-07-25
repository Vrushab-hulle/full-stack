import React, { useMemo, useState } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  };


  const handleRemove = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ border: "1px solid black" }}
      />
      <button onClick={handleAdd}>Add</button>
      {todos.map((todo) => (
        <div className="flex gap-1" key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ border: "1px solid black" }}
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => handleComplete(todo.id)}
              />
              <li
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  listStyle: "none",
                }}
              >
                {todo.text}
              </li>

              <button onClick={() => startEdit(todo.id, todo.text)}>
                Edit
              </button>
              <button onClick={() => handleRemove(todo.id)}>Remove</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
