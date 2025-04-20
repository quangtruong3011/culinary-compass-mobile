import { BASE_URL } from "@/constants/constants";
import { RefreshTokenResponse } from "@/features/auth/interfaces/auth.interface";
import { saveAuthTokens } from "@/features/auth/utils/auth.storage";
import { RootState } from "@/store/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.1.190:3000",
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

  if (result.error && result.error.status === 401) {
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
        const responseData = (refreshResult.data as any).data;
        if (responseData) {
          const { access_token, refresh_token } = responseData;

          if (access_token && refresh_token) {
            await saveAuthTokens(access_token, refresh_token);

            result = await baseQuery(args, api, extraOptions);
          } else {
            console.error("Tokens are missing in response");
          }
        } else {
          console.error("No data in refresh response");
        }
      }
    }
  }

  return result;
};

export default baseQueryWithReauth;
