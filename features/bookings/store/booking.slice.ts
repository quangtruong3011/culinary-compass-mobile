import { createSlice } from "@reduxjs/toolkit";
import { bookingApi } from "../api/booking.api";
import { BookingState } from "../interfaces/booking-state.interface";

const initialState: Partial<BookingState> = {
  bookings: null,
  currentBooking: null,
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    setCurrentBooking(state, action) {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking(state) {
      state.currentBooking = null;
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
      bookingApi.endpoints.findOneBookingForUser.matchFulfilled,
      (state, { payload }) => {
        state.currentBooking = payload.data;
      }
    );
  },
});

export const {
  setBookings,
  setCurrentBooking,
  clearCurrentBooking,
  setLoading,
  setError,
} = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
