import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateOrEditRestaurantDto,
  GetAllRestaurantsForAdmin,
  GetAllRestaurantsForUser,
  GetRestaurantForUser,
} from "../interfaces/restaurant.interface";
import { PaginationOptions } from "@/shared/pagination.interface";
import baseQueryWithReauth from "@/shared/base.api";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["Restaurant"],
  endpoints: (builder) => ({
    findAllRestaurantsForAdmin: builder.query<
      GetAllRestaurantsForAdmin,
      PaginationOptions
    >({
      query: () => ({
        url: "/restaurants/find-all-for-admin",
        method: "GET",
        params: {
          page: 1,
          limit: 20,
        },
      }),
      transformResponse: (response: GetAllRestaurantsForAdmin) => {
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

    findAllRestaurantsForUser: builder.query<
      GetAllRestaurantsForUser,
      PaginationOptions
    >({
      query: (options) => ({
        url: "/restaurants/find-all-for-user",
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
        },
      }),
      transformResponse: (response: GetAllRestaurantsForUser) => {
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

    findRestaurantForUser: builder.query<GetRestaurantForUser, string>({
      query: (id) => ({
        url: `/restaurants/find-one-for-user/${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetRestaurantForUser) => ({
        data: {
          id: response.data.id,
          name: response.data.name,
          address: response.data.address,
          description: response.data.description,
          openingTime: response.data.openingTime,
          closingTime: response.data.closingTime,
          imageUrl: response.data.imageUrl,
        },
      }),
    }),
  }),
});

export const {
  useFindAllRestaurantsForAdminQuery,
  useCreateRestaurantMutation,
  useFindAllRestaurantsForUserQuery,
  useFindRestaurantForUserQuery,
} = restaurantApi;
