import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//when ever this action is dipsatch the below function will run
export const fetchTodos = createAsyncThunk("fetchtodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  //our fetch call can be either in pending,fulfilled,or rejected state to handle all this state we need to use extraReducer
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default todoSlice.reducer;
