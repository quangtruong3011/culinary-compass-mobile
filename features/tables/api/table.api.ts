import baseQueryWithReauth from "@/shared/base.api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateOrEditTableDto } from "../interfaces/create-or-edit-table.interface";
import { GetAllTableResponse } from "../interfaces/get-all-table.interface";
import { TablePaginationParams } from "../interfaces/table-pagination-params";
import { GetTableDto } from "../interfaces/get-table.interface";

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
    }),

    createTable: builder.mutation<any, CreateOrEditTableDto>({
      query: (body) => ({
        url: "/tables",
        method: "POST",
        body,
      }),
    }),

    findOneTable: builder.query<GetTableDto, number>({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "GET",
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
