import { BASE_URL } from "@/constants/constants";
import { RefreshTokenResponse } from "@/features/auth/interfaces/refresh-token.interface";
import {
  clearCredentials,
  setCredentials,
} from "@/features/auth/store/auth.slice";
import { RootState } from "@/store/store";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // Nếu lỗi 401 xảy ra (token hết hạn)
  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refresh_token;

    if (refreshToken) {
      // Gửi yêu cầu refresh token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );

      // Nếu refresh token thành công, lấy access token mới và thực hiện lại request ban đầu
      if (refreshResult.data) {
        const responseData = refreshResult.data as RefreshTokenResponse;

        if (responseData.data) {
          const { access_token, refresh_token, user } = responseData.data;

          // Lưu thông tin mới vào Redux store
          api.dispatch(
            setCredentials({
              user: user || (api.getState() as RootState).auth.user,
              access_token,
              refresh_token,
              is_authenticated: true,
            })
          );

          // Gọi lại request ban đầu sau khi refresh token thành công
          return await baseQuery(args, api, extraOptions);
        }
      }
    }

    // Nếu không refresh token được, clear credentials
    api.dispatch(clearCredentials());
  }

  console.log(result);
  return result;
};

export default baseQueryWithReauth;
