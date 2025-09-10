import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../service/apiClient";
import { BASE_URL } from "../service/AppConfig";


export const signupUser = createAsyncThunk("auth/signup", async (userData) => {
  try {
    const response = await client.post(`${BASE_URL}/auth/signup`, userData);
    return response.data; 
  } catch (error) {
    throw error.response?.data || "Something went wrong"; 
  }
});

const signupSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      });
  },
});

export const { clearError } = signupSlice.actions;
export default signupSlice.reducer;
