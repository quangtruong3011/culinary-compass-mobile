import { BASE_URL } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import { Booking } from "../interfaces/booking.interface";
import baseQueryWithReauth from "@/shared/base.api";
import { CreateOrEditBookingDto } from "../interfaces/create-or-edit-booking.interface";
import { GetAllBookingForUser } from "../interfaces/get-all-booking-for-user";
import { BookingParam } from "../interfaces/booking-param.interface";
import { GetBooking } from "../interfaces/get-booking.interface";

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

    //   getAllBookings: builder.query<PaginationResult<Booking>, PaginationOptions>({
    //     query: (params) => ({
    //       url: "/bookings",
    //       method: "GET",
    //       params,
    //     }),
    //     providesTags: ["Booking"],
    //   }),

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
  // useGetAllBookingsQuery,
  useGetBookingsByUserQuery,
  useFindBookingForUserQuery,
  useUpdateBookingMutation,
  // useDeleteBookingMutation,
} = bookingApi;
