import { BASE_URL } from "@/constants/constants";
import { RefreshTokenResponse } from "@/features/auth/interfaces/auth.interface";
import { saveAuthTokens } from "@/features/auth/utils/auth.storage";
import { RootState } from "@/store/store";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

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

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Table"],
  endpoints: (builder) => ({
    getTables: builder.query({
      query: ({ restaurantId }: { restaurantId: number}) => ({
        url: `/tables/${restaurantId}`,
        params: {
          page: 1,
          limit: 10,
        },
      }),
      transformResponse: (response: any) => {
        return {
          results: response.data.results,
        };
      },

      providesTags: ["Table"],
    }),
    // getTableAvailable: builder.query({
    //   query: () => ({
    //     url: "/tables/available/${restaurantId}",

    //   })
    createTable: builder.mutation({
      query: (newTable) => ({
        url: "/tables",
        method: "POST",
        body: newTable,

      }),
      invalidatesTags: ["Table"],
    }),
    updateTable: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tables/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Table"],
    }),
    deleteTable: builder.mutation({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Table"],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
} = tableApi;