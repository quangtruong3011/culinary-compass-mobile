import { createApi } from "@reduxjs/toolkit/query/react";
import {} from "../interfaces/restaurant.interface";
import { PaginationOptions } from "@/shared/pagination.interface";
import baseQueryWithReauth from "@/shared/base.api";
import { CreateOrEditRestaurantDto } from "../interfaces/create-or-edit-restaurant.interface";
import { GetAllRestaurants } from "../interfaces/get-all-restaurant.interface";
import { GetRestaurant } from "../interfaces/get-restaurant.interface";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createRestaurant: builder.mutation<any, CreateOrEditRestaurantDto>({
      query: (body) => ({
        url: "/restaurants",
        method: "POST",
        body,
      }),
    }),

    findAllRestaurantsForAdmin: builder.query<
      GetAllRestaurants,
      PaginationOptions
    >({
      query: (options) => ({
        url: "/restaurants/find-all-for-admin",
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
        },
      }),
    }),

    findOneRestaurantForAdmin: builder.query<GetRestaurant, number>({
      query: (id) => ({
        url: `/restaurants/${id}`,
        method: "GET",
      }),
    }),

    updateRestaurant: builder.mutation<
      any,
      {
        id: number;
        body: CreateOrEditRestaurantDto;
      }
    >({
      query: ({ id, body }) => ({
        url: `/restaurants/${id}`,
        method: "PUT",
        body,
      }),
    }),

    removeRestaurant: builder.mutation<any, number>({
      query: (id) => ({
        url: `/restaurants/${id}`,
        method: "DELETE",
      }),
    }),

    findAllRestaurantsForUser: builder.query<
      GetAllRestaurants,
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
    }),

    findOneRestaurantForUser: builder.query<GetRestaurant, string>({
      query: (id) => ({
        url: `/restaurants/find-one-for-user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useFindAllRestaurantsForAdminQuery,
  useFindOneRestaurantForAdminQuery,
  useUpdateRestaurantMutation,
  useRemoveRestaurantMutation,
  useFindAllRestaurantsForUserQuery,
  useFindOneRestaurantForUserQuery,
} = restaurantApi;
