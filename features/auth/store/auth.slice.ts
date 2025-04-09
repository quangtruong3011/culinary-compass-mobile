import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";
import { AuthState } from "../interfaces/auth.interface";
import { saveAuthTokens } from "../utils/auth.storage";

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  is_authenticated: false,
  remember_me: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: any;
        access_token: string | null;
        refresh_token: string | null;
        remember_me?: boolean;
      }>
    ) => {
      const { user, access_token, refresh_token } = action.payload;
      state.user = user;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.remember_me = action.payload.remember_me;
      state.is_authenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.remember_me = false;
      state.is_authenticated = false;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.access_token = payload.data.access_token;
        state.refresh_token = payload.data.refresh_token;

        saveAuthTokens(payload.data.access_token, payload.data.refresh_token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        state.isLoading = false;
        // state.error =
        //   typeof payload?.data === "string"
        //     ? payload.data
        //     : JSON.stringify(payload?.data) || "Login failed";
      }
    );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
