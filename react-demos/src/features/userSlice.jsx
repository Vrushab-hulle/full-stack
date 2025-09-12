import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    deleteUser(state, action) {
      return state.filter((user) => user.id !== action.payload);
    },
    clearAllusers(state, action) {
      return [];
    },
  },
});

export const { addUser, deleteUser, clearAllusers } = userSlice.actions;

export default userSlice.reducer;
