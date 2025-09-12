import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todoSlice";

const Task = () => {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos);
  console.log(todos);

  if (todos.isLoading) return <>Loading....</>;
  if (todos.isError) return <h1>{todos.isError}</h1>;

  return (
    <div>
      <h1>Fetch To-do Data</h1>
      <button onClick={(e) => dispatch(fetchTodos())}>Get todo's</button>
      {todos.data?.map((todo, index) => (
        <p key={index}>{todo.title}</p>
      ))}
    </div>
  );
};

export default Task;
