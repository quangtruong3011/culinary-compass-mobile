import { LoginResponse, RegisterResponse } from "../interfaces/auth.interface";
import { LoginFormData, RegisterFormData } from "@/lib/validation/authSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateUserRoleRequest } from "../interfaces/update-user-role.interface";
import baseQueryWithReauth from "@/shared/base.api";
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "../interfaces/refresh-token.interface";
import { GetUserDto } from "@/features/users/interfaces/get-user.interface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.mutation<GetUserDto, void>({
      query: () => ({
        url: "/auth/me",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (body: RefreshTokenRequest) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body,
      }),
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
  useGetMeMutation,
  useRefreshTokenMutation,
  useUpdateUserRolesMutation,
} = authApi;
