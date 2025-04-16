import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";
import { AuthState } from "../interfaces/auth.interface";
import { saveAuthTokens } from "../utils/auth.storage";

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  is_authenticated: false,
  is_loading: false,
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
        is_authenticated: boolean;
      }>
    ) => {
      const { user, access_token, refresh_token } = action.payload;
      state.user = user;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.is_authenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.is_authenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.is_loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.is_loading = true;
      state.error = null;
    });
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.access_token = payload.data.access_token;
        state.refresh_token = payload.data.refresh_token;
        state.is_authenticated = true;

        authApi.endpoints.getMe.initiate();

        saveAuthTokens(payload.data.access_token, payload.data.refresh_token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        state.is_loading = false;
        state.error = (payload as any)?.data?.message || "Login failed";
      }
    );
    builder.addMatcher(authApi.endpoints.getMe.matchPending, (state) => {
      state.is_loading = true;
      state.error = null;
    });
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.is_authenticated = true;
        state.user = payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getMe.matchRejected,
      (state, { payload }) => {
        state.is_loading = false;
        state.is_authenticated = false;
        state.error = (payload as any)?.data?.message || "Failed to fetch user";
      }
    );
    builder.addMatcher(authApi.endpoints.refreshToken.matchPending, (state) => {
      state.is_loading = true;
      state.error = null;
    });
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.access_token = payload.access_token;
        state.refresh_token = payload.refresh_token;
        state.user = payload.user;
        state.is_authenticated = true;

        authApi.endpoints.getMe.initiate();
        // authApi.util.invalidateTags(["Auth"]);

        saveAuthTokens(payload.access_token, payload.refresh_token);
      }
    );
  },
});

export const { setCredentials, clearCredentials, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
