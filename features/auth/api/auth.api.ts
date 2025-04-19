import { BASE_URL } from "@/constants/constants";
import {
  GetMeResponse,
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from "../interfaces/auth.interface";
import { LoginFormData, RegisterFormData } from "@/lib/validation/authSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import { saveAuthTokens } from "../utils/auth.storage";

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
        const { access_token, refresh_token } =
          refreshResult.data as RefreshTokenResponse;
        await saveAuthTokens(access_token, refresh_token);
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: LoginResponse) => {
        return response;
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: RegisterResponse) => {
        return response;
      },
    }),
    getMe: builder.query<GetMeResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "POST",
      }),
      transformResponse: (response: { data: GetMeResponse }) => {
        return response.data;
      },
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, string>({
      query: (refreshToken: string) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { refresh_token: refreshToken },
      }),
      transformResponse: (response: RefreshTokenResponse) => {
        return response;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
} = authApi;
