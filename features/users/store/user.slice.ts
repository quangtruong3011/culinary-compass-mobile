import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/user.api";

const inittialSate = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: inittialSate,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser, setLoading, setError } = userSlice.actions;
export const userReducer = userSlice.reducer;
