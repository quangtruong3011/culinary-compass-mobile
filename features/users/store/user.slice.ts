import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../interfaces/user-state.interface";

const inittialSate: UserState = {
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
  extraReducers: (builder) => {
    // Update user
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export const userReducer = userSlice.reducer;
