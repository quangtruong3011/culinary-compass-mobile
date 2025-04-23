import { BASE_URL } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import { Booking } from "../interfaces/booking.interface";
import baseQueryWithReauth from "@/shared/base.api";
import { CreateOrEditBookingDto } from "../interfaces/create-or-edit-booking.interface";
import { GetAllBookingForUser } from "../interfaces/get-all-booking-for-user";
import { BookingParam } from "../interfaces/booking-param.interface";
import { GetBooking } from "../interfaces/get-booking.interface";
import { GetAllBooking } from "../interfaces/get-all-booking.interface";

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

    getAllBookings: builder.query<GetAllBooking, void>({
      query: () => ({
        url: "/bookings",
        method: "GET",
        params: {
          page: 1,
          limit: 10,
        },
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),

    getBookingsByUser: builder.query<GetAllBookingForUser, BookingParam>({
      query: (options: BookingParam) => ({
        url: `/bookings/user`,
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
          userId: options.userId,
        },
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),

    findBookingForUser: builder.query<GetBooking, number>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),

      transformResponse: (response: any) => {
        return response;
      },
    }),

    updateBooking: builder.mutation<
      any,
      { id: number; data: CreateOrEditBookingDto }
    >({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: data,
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
  useGetAllBookingsQuery,
  useGetBookingsByUserQuery,
  useFindBookingForUserQuery,
  useUpdateBookingMutation,
  useConfirmBookingMutation,
  // useDeleteBookingMutation,
} = bookingApi;
