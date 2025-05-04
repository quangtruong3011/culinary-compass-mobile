import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "@/shared/base.api";
import { CreateCommentDto } from "../interfaces/create-comment.interface";
import { GetAllCommentForRestaurant } from "../interfaces/get-all-comment-by-restaurant.interface";
import { GetAllCommentForRestaurantParams } from "../interfaces/get-all-comment-by-restaurant-params.interface";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    createComment: builder.mutation<any, CreateCommentDto>({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
    }),

    findAllCommentsForRestaurant: builder.query<
      GetAllCommentForRestaurant,
      GetAllCommentForRestaurantParams
    >({
      query: (options: GetAllCommentForRestaurantParams) => ({
        url: "/comments",
        method: "GET",
        params: {
          page: options.page,
          limit: options.limit,
          filterText: options.filterText,
          restaurantId: options.restaurantId,
        },
      }),
      providesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useFindAllCommentsForRestaurantQuery,
} = commentApi;
