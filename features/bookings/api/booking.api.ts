import { BASE_URL } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import {
  Booking,
  PaginationOptions,
  PaginationResult,
  UpdateBookingDto,
} from "../interfaces/booking.interface";
import baseQueryWithReauth from "@/shared/base.api";
import { CreateBookingDto } from "../interfaces/create-booking.interface";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    createBooking: builder.mutation<any, CreateBookingDto>({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    getAllBookings: builder.query<PaginationResult<Booking>, PaginationOptions>({
      query: (params) => ({
        url: "/bookings",
        method: "GET",
        params,
      }),
      providesTags: ["Booking"],
    }),

    getBookingsByUser: builder.query<
      PaginationResult<Booking>,
      { userId: number; options?: PaginationOptions }
    >({
      query: ({ userId, options }) => ({
        url: `/bookings/user/${userId}`,
        method: "GET",
        params: options,
      }),
      providesTags: ["Booking"],
    }),

    getBookingDetail: builder.query<Booking, number>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),

    updateBooking: builder.mutation<Booking, { id: number; data: UpdateBookingDto }>({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Booking", id }],
    }),

    deleteBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingsByUserQuery,
  useGetBookingDetailQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;