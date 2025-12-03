import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/auth`;

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const res = await axios.post(`${API}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const res = await axios.post(`${API}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
