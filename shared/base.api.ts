import { BASE_URL } from "@/constants/constants";
import { RefreshTokenResponse } from "@/features/auth/interfaces/refresh-token.interface";
import {
  clearCredentials,
  setCredentials,
} from "@/features/auth/store/auth.slice";

import { RootState } from "@/store/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.131.3.103:3000",
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
        const responseData = refreshResult.data as RefreshTokenResponse;

        if (responseData.data) {
          const { access_token, refresh_token, user } = responseData.data;

          api.dispatch(
            setCredentials({
              user: user || (api.getState() as RootState).auth.user,
              access_token,
              refresh_token,
              is_authenticated: true,
            })
          );

          return await baseQuery(args, api, extraOptions);
        }
      }
    }

    api.dispatch(clearCredentials());
  }

  // console.log("baseQueryWithReauth", result.error);
  return result;
};

export default baseQueryWithReauth;
