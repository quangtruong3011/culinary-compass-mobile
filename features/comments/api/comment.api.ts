import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "@/shared/base.api";
import { CreateOrEditCommentDto } from "../interfaces/create-or-edit-comment.interface";
import { GetAllCommentForRestaurant } from "../interfaces/get-all-comment-by-restaurant.interface";
import { GetAllCommentForRestaurantParams } from "../interfaces/get-all-comment-by-restaurant-params.interface";
import { GetCommentDto } from "../interfaces/get-comment.interface";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserComment", "AdminComment","LikeStatus"],
  endpoints: (builder) => ({
    createComment: builder.mutation<any, CreateOrEditCommentDto>({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
    }),

    findAllCommentsForUser: builder.query<
      GetAllCommentForRestaurant,
      GetAllCommentForRestaurantParams
    >({
      query: (options: GetAllCommentForRestaurantParams) => ({
        url: "/comments/find-all-for-user",
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
          restaurantId: options.restaurantId,
        },
      }),
      providesTags: ["UserComment"],
    }),

    findAllCommentsForAdmin: builder.query<
      GetAllCommentForRestaurant,
      GetAllCommentForRestaurantParams
    >({
      query: (options: GetAllCommentForRestaurantParams) => ({
        url: "/comments/find-all-for-admin",
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
          restaurantId: options.restaurantId,
        },
      }),
      providesTags: ["AdminComment"],
    }),

    findOneCommentByBookingId: builder.query<GetCommentDto, number>({
      query: (bookingId) => ({
        url: `/comments/${bookingId}`,
        method: "GET",
      }),
      providesTags: (result, error, bookingId) => [
        { type: "UserComment", bookingId },
      ],
    }),

    updateComment: builder.mutation<
      GetCommentDto,
      { id: number; body: CreateOrEditCommentDto }
    >({
      query: ({ id, body }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "UserComment", id }],
    }),

    isUserLikedComment: builder.query<boolean, { id: number; userId: number }>({
      query: ({ id, userId }) => ({
        url: `/comments/is-liked`,
        method: "GET",
        params: { id, userId },
      }),
      providesTags: (result, error, { id, userId }) => [
        { type: "LikeStatus", id, userId },
      ],
    }),

    likeComment: builder.mutation<any, { id: number; userId: number }>({
      query: ({ id, userId }) => ({
        url: `/comments/${id}/like`,
        method: "PATCH",
        body: { userId },
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useFindAllCommentsForUserQuery,
  useFindAllCommentsForAdminQuery,
  useFindOneCommentByBookingIdQuery,
  useUpdateCommentMutation,
  useIsUserLikedCommentQuery,
  useLikeCommentMutation,
} = commentApi;
