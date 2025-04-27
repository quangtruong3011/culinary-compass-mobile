import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "@/shared/base.api";
import { GetUserDto } from "../interfaces/get-user.interface";
import { CreateOrEditUserDto } from "../interfaces/create-or-edit-user.interface";
import { SingleResponse } from "@/shared/api-response";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    findOneUser: builder.query({
      query: (id) => `/users/${id}`,
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
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
