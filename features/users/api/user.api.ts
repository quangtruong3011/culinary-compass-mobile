import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "@/shared/base.api";
import { GetUserDto } from "../interfaces/get-user.interface";
import { CreateOrEditUserDto } from "../interfaces/create-or-edit-user.interface";
import { RootState } from "@/store/store";
import { BASE_URL } from "@/constants/constants";

export const userApi = createApi({
  reducerPath: "userApi",
  // baseQuery: baseQueryWithReauth,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    findOneUser: builder.query<GetUserDto, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<
      GetUserDto,
      { id: number; body: CreateOrEditUserDto }
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
  }),
});

export const { useFindOneUserQuery, useUpdateUserMutation } = userApi;
