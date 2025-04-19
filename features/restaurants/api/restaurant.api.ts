import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateOrEditRestaurantDto,
  FindAllRestaurantsForAdminResponse,
} from "../interfaces/restaurant.interface";
import { BASE_URL } from "@/constants/constants";
import { RootState } from "@/store/store";
import { PaginationOptions } from "@/shared/pagination.interface";
import baseQueryWithReauth from "@/shared/base.api";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.access_token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshToken = (api.getState() as RootState).auth.refresh_token;
//     if (refreshToken) {
//       const refreshResult = await baseQuery(
//         {
//           url: "/auth/refresh-token",
//           method: "POST",
//           body: { refresh_token: refreshToken },
//         },
//         api,
//         extraOptions
//       );

//       if (refreshResult.data) {
//         result = await baseQuery(args, api, extraOptions);
//       }
//     }
//   }

//   return result;
// };

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["Restaurant"],
  endpoints: (builder) => ({
    findAllRestaurantsForAdmin: builder.query<
      FindAllRestaurantsForAdminResponse,
      PaginationOptions
    >({
      query: () => ({
        url: "/restaurants",
        method: "GET",
        params: {
          page: 1,
          limit: 20,
        },
      }),
      transformResponse: (response: FindAllRestaurantsForAdminResponse) => {
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
      // providesTags: ["Restaurant"],
    }),
    createRestaurant: builder.mutation<any, CreateOrEditRestaurantDto>({
      query: (body) => ({
        url: "/restaurants",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useFindAllRestaurantsForAdminQuery,
  useCreateRestaurantMutation,
} = restaurantApi;
