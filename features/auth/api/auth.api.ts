import {
  GetMeResponse,
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from "../interfaces/auth.interface";
import { LoginFormData, RegisterFormData } from "@/lib/validation/authSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateUserRoleRequest } from "../interfaces/update-user-role.interface";
import baseQueryWithReauth from "@/shared/base.api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
      transformResponse: (response: GetMeResponse) => {
        return response;
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
    updateUserRoles: builder.mutation({
      query: (data: UpdateUserRoleRequest) => ({
        url: "/users/update-roles",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
  useUpdateUserRolesMutation,
} = authApi;
