import { createSlice } from "@reduxjs/toolkit";
import { commentApi } from "../api/comment.api";
import { CommentState } from "../interfaces/comment-state.interface";

const initialState: CommentState = {
  comments: null,
  currentComment: null,
  isLoading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    setCurrentComment(state, action) {
      state.currentComment = action.payload;
    },
    clearCurrentComment(state) {
      state.currentComment = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      commentApi.endpoints.findAllCommentsForRestaurant.matchFulfilled,
      (state, { payload }) => {
        state.comments = payload.data.results;
      }
    );
  },
});

export const {
  setComments,
  setCurrentComment,
  clearCurrentComment,
  setLoading,
  setError,
} = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
