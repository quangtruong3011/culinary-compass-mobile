import baseQueryWithReauth from "@/shared/base.api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateOrEditTableDto } from "../interfaces/create-or-edit-table.interface";
import { GetAllTableResponse } from "../interfaces/get-all-table.interface";
import { GetTableResponse } from "../interfaces/get-table.interface";
import { TablePaginationParams } from "../interfaces/table-pagination-params";

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Table"],
  endpoints: (builder) => ({
    findAllTablesForAdmin: builder.query<
      GetAllTableResponse,
      TablePaginationParams
    >({
      query: (options) => ({
        url: "/tables",
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filter: options.filterText,
          restaurantId: options.restaurantId,
        },
      }),
      transformResponse: (response: GetAllTableResponse) => {
        return {
          data: {
            results: response.data.results,
            total: response.data.total,
            page: response.data.page,
            limit: response.data.limit,
            totalPages: response.data.totalPages,
          },
        };
      },
    }),

    createTable: builder.mutation<any, CreateOrEditTableDto>({
      query: (body) => ({
        url: "/tables",
        method: "POST",
        body,
      }),
    }),

    findOneTable: builder.query<GetTableResponse, number>({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetTableResponse) => ({
        data: {
          id: response.data.id,
          name: response.data.name,
          restaurantId: response.data.restaurantId,
          numberOfSeats: response.data.numberOfSeats,
          isAvailable: response.data.isAvailable,
        },
      }),
    }),

    updateTable: builder.mutation<
      any,
      { id: number; body: CreateOrEditTableDto }
    >({
      query: ({ id, body }) => ({
        url: `/tables/${id}`,
        method: "PATCH",
        body,
      }),
    }),

    deleteTable: builder.mutation<any, number>({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFindAllTablesForAdminQuery,
  useCreateTableMutation,
  useFindOneTableQuery,
  useUpdateTableMutation,
  useDeleteTableMutation,
} = tableApi;
