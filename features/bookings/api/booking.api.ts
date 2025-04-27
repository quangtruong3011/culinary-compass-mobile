import { BASE_URL } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import { Booking } from "../interfaces/booking.interface";
import baseQueryWithReauth from "@/shared/base.api";
import { CreateOrEditBookingDto } from "../interfaces/create-or-edit-booking.interface";
import { GetAllBookingForUser } from "../interfaces/get-all-booking-for-user";
import { GetBookingDto } from "../interfaces/get-booking.interface";
import { GetAllBooking } from "../interfaces/get-all-booking.interface";
import { PaginationOptions } from "@/shared/pagination.interface";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createBooking: builder.mutation<any, CreateOrEditBookingDto>({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
    }),

    findAllBookingForAdmin: builder.query<GetAllBooking, PaginationOptions>({
      query: (options: PaginationOptions) => ({
        url: "/bookings/find-all-for-admin",
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
        },
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),

    findAllBookingForUser: builder.query<
      GetAllBookingForUser,
      PaginationOptions
    >({
      query: (options: PaginationOptions) => ({
        url: `/bookings/find-all-for-user`,
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
        },
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),

    findOneBookingForUser: builder.query<GetBookingDto, number>({
      query: (id) => ({
        url: `/bookings/find-one-for-user/${id}`,
        method: "GET",
      }),

      transformResponse: (response: any) => {
        return response;
      },
    }),

    updateBooking: builder.mutation<
      GetBookingDto,
      { id: number; body: CreateOrEditBookingDto }
    >({
      query: ({ id, body }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body,
      }),
    }),

    confirmBooking: builder.mutation<any, number>({
      query: (id) => ({
        url: `/bookings/confirm/${id}`,
        method: "PATCH",
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),

    //   deleteBooking: builder.mutation<void, number>({
    //     query: (id) => ({
    //       url: `/bookings/${id}`,
    //       method: "DELETE",
    //     }),
    //     invalidatesTags: ["Booking"],
    //   }),
  }),
});

export const {
  useCreateBookingMutation,
  useFindAllBookingForAdminQuery,
  useFindAllBookingForUserQuery,
  useFindOneBookingForUserQuery,
  useUpdateBookingMutation,
  useConfirmBookingMutation,
  // useDeleteBookingMutation,
} = bookingApi;
