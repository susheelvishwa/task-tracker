import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/tasks";

// Fetch all tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await axios.get(API);
  return res.data;
});

// Add a task
export const addTask = createAsyncThunk("tasks/add", async (task) => {
  const res = await axios.post(API, task);
  return res.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export default taskSlice.reducer;
