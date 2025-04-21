import { BASE_URL } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import {
  Table,
  CreateTableDto,
  UpdateTableDto,
  PaginationOptions,
  PaginationResult,
} from "../interfaces/table.interface";
import baseQueryWithReauth from "@/shared/base.api";


export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Table"],
  endpoints: (builder) => ({
    createTable: builder.mutation<Table, CreateTableDto>({
      query: (body) => ({
        url: "/tables",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Table"],
    }),

    getAllTables: builder.query<PaginationResult<Table>, PaginationOptions>({
      query: (params) => ({
        url: "/tables",
        method: "GET",
        params,
      }),
      providesTags: ["Table"],
    }),

    getTablesByRestaurant: builder.query<
      PaginationResult<Table>,
      { restaurantId: number; options?: PaginationOptions }
    >({
      query: ({ restaurantId, options }) => ({
        url: `/tables/restaurant/${restaurantId}`,
        method: "GET",
        params: options,
      }),
      providesTags: ["Table"],
    }),

    getAvailableTables: builder.query<
      PaginationResult<Table>,
      { restaurantId: number; timeBooking: string; options?: PaginationOptions }
    >({
      query: ({ restaurantId, timeBooking, options }) => ({
        url: `/tables/available/${restaurantId}`,
        method: "GET",
        params: {
          timeBooking,
          ...options, // Thêm các tham số phân trang vào query params
        },
      }),
      providesTags: ["Table"],
    }),

    getTableDetail: builder.query<Table, number>({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Table", id }],
    }),

    updateTable: builder.mutation<Table, { id: number; data: UpdateTableDto }>({
      query: ({ id, data }) => ({
        url: `/tables/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Table", id }],
    }),

    deleteTable: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Table"],
    }),
  }),
});

export const {
  useCreateTableMutation,
  useGetAllTablesQuery,
  useGetTablesByRestaurantQuery,
  useGetAvailableTablesQuery,
  useGetTableDetailQuery,
  useUpdateTableMutation,
  useDeleteTableMutation,
} = tableApi;