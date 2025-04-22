import { BASE_URL } from "@/constants/constants";
import {
  clearCredentials,
  setCredentials,
} from "@/features/auth/store/auth.slice";
import {
  removeAuthTokens,
  saveAuthTokens,
} from "@/features/auth/utils/auth.storage";
import { RootState } from "@/store/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.229.1:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refresh_token;

    if (refreshToken) {
      // Attempt to refresh token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const responseData = refreshResult.data as {
          data?: {
            access_token: string;
            refresh_token: string;
            user?: any;
          };
        };

        if (responseData.data) {
          const { access_token, refresh_token, user } = responseData.data;

          // Save new tokens and update state
          await saveAuthTokens(access_token, refresh_token);
          api.dispatch(
            setCredentials({
              user: user || (api.getState() as RootState).auth.user, // Keep existing user if not provided
              access_token,
              refresh_token,
              is_authenticated: true,
            })
          );

          // Retry the original request with new token
          return await baseQuery(args, api, extraOptions);
        }
      }
    }

    // If refresh failed, clear credentials
    await removeAuthTokens();
    api.dispatch(clearCredentials());
  }

  // console.log("baseQueryWithReauth", result);
  return result;
};

export default baseQueryWithReauth;
