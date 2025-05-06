import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";
import { AuthState } from "../interfaces/auth.interface";
import { removeAuthTokens, saveAuthTokens } from "../utils/auth.storage";
import { userApi } from "@/features/users/api/user.api";

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
    // Login
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.access_token = payload.data.access_token;
        state.refresh_token = payload.data.refresh_token;
        state.is_authenticated = true;
      }
    );

    // Get Me
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.is_authenticated = true;
        state.user = payload.data;
      }
    );

    // Refresh Token
    builder.addMatcher(authApi.endpoints.refreshToken.matchPending, (state) => {
      state.is_loading = true;
      state.error = null;
    });
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.access_token = payload.data.access_token;
        state.refresh_token = payload.data.refresh_token;
        state.user = payload.data.user;
        state.is_authenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchRejected,
      (state, { payload }) => {
        state.is_loading = false;
        state.is_authenticated = false;
        state.error =
          (payload as any)?.data?.message || "Failed to refresh token";

        removeAuthTokens();
      }
    );

    // Registration
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.access_token = payload.data.access_token;
        state.refresh_token = payload.data.refresh_token;
        state.is_authenticated = true;

        saveAuthTokens(payload.data.access_token, payload.data.refresh_token);
      }
    );

    // Update User Roles
    builder.addMatcher(
      authApi.endpoints.updateUserRoles.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.user = payload.data.user;
      }
    );

    // Update Profile
    builder.addMatcher(
      userApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.user = payload.data;
      }
    );
  },
});

export const { setCredentials, clearCredentials, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
