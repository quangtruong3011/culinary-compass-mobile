import { BASE_URL } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import {
  Booking,
  CreateBookingDto,
  PaginationOptions,
  PaginationResult,
  UpdateBookingDto,
} from "../interface/booking.interface";

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
        const { access_token, refresh_token } = refreshResult.data as any;
        // Lưu token mới vào storage nếu cần
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    createBooking: builder.mutation<Booking, CreateBookingDto>({
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