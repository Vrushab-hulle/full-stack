import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counterSlice.jsx";
import userReducer from "../features/userSlice.jsx";
import todoReducer from "../features/todoSlice.jsx";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    todos: todoReducer,
  },
});
