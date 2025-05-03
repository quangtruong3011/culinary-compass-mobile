import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "@/shared/base.api";
import { CreateOrEditBookingDto } from "../interfaces/create-or-edit-booking.interface";
import { GetAllBookingForUser } from "../interfaces/get-all-booking-for-user.interface";
import { GetBookingDto } from "../interfaces/get-booking.interface";
import { PaginationOptions } from "@/shared/pagination.interface";
import { GetAllBookingForAdminParams } from "../interfaces/get-all-booking-for-admin-params.interface";
import { GetTableAvailableRequest } from "../interfaces/get-table-available.interface";
import { GetAllBookingForAdmin } from "../interfaces/get-all-booking-for-admin.interface";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserBooking", "AdminBooking", "BookingDetailsForAdmin"],
  endpoints: (builder) => ({
    createBooking: builder.mutation<any, CreateOrEditBookingDto>({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
    }),

    findAllBookingForAdmin: builder.query<
      GetAllBookingForAdmin,
      GetAllBookingForAdminParams
    >({
      query: (options: GetAllBookingForAdminParams) => ({
        url: "/bookings/find-all-for-admin",
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
          restaurantId: options.restaurantId,
        },
      }),
      providesTags: ["AdminBooking"],
    }),

    findOneBookingForAdmin: builder.query<GetBookingDto, number>({
      query: (id) => ({
        url: `/bookings/find-one-for-admin/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "BookingDetailsForAdmin", id },
      ],
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
      providesTags: ["UserBooking"],
    }),

    findOneBookingForUser: builder.query<GetBookingDto, number>({
      query: (id) => ({
        url: `/bookings/find-one-for-user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "UserBooking", id }],
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
      invalidatesTags: (result, error, { id }) => [
        { type: "UserBooking", id },
      ],
    }),

    updateBookingStatus: builder.mutation<any, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/bookings/${id}/status-booking`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["AdminBooking", "BookingDetailsForAdmin"],
    }),

    availableTableForBooking: builder.query<any, GetTableAvailableRequest>({
      query: (params: GetTableAvailableRequest) => ({
        url: `/bookings/available-table`,
        method: "GET",
        params: {
          restaurantId: params.restaurantId,
          date: params.date,
          startTime: params.startTime,
          endTime: params.endTime,
        },
      }),
    }),

    assignTableToBooking: builder.mutation<
      any,
      { id: number; tableIds: number[] }
    >({
      query: ({ id, tableIds }) => ({
        url: `/bookings/${id}/assign-tables`,
        method: "PATCH",
        body: { tableIds },
      }),
    }),

    getDashboardData: builder.query({
      query: () => "/bookings/dashboard",
      transformResponse: (response: any) => {
        // Xử lý response có nested data
        const data = response.data || response;
        return {
          todayBookings: data.todayBookings || [],
          top5MonthlyBookings: data.top5MonthlyBookings || [],
          top5QuarterlyBookings: data.top5QuarterlyBookings || []
        };
      }
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useFindAllBookingForAdminQuery,
  useFindAllBookingForUserQuery,
  useFindOneBookingForUserQuery,
  useUpdateBookingMutation,
  useUpdateBookingStatusMutation,
  useAvailableTableForBookingQuery,
  useAssignTableToBookingMutation,
  useGetDashboardDataQuery,
} = bookingApi;
