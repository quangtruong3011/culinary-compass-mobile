import { createSlice } from "@reduxjs/toolkit";
import { restaurantApi } from "../api/restaurant.api";
import { RestaurantState } from "../interfaces/restaurant-state.interface";

const initialState: Readonly<RestaurantState> = {
  restaurants: null,
  currentRestaurant: null,
  is_loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    clearRestaurants: (state) => {
      state.restaurants = null;
    },
    setCurrentRestaurant: (state, { payload }) => {
      state.currentRestaurant = payload;
    },
    clearCurrentRestaurant: (state) => {
      state.currentRestaurant = null;
    },
    setLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create restaurant
    builder.addMatcher(
      restaurantApi.endpoints.createRestaurant.matchPending,
      (state) => {
        state.is_loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.createRestaurant.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        // state.restaurants.push(payload.data);
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.createRestaurant.matchRejected,
      (state, { error }) => {
        state.is_loading = false;
        state.error =
          error.message || "An error occurred while creating the restaurant.";
      }
    );
    // Find all restaurants for admin
    builder.addMatcher(
      restaurantApi.endpoints.findAllRestaurantsForAdmin.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
      }
    );
    // Find all restaurants for user
    builder.addMatcher(
      restaurantApi.endpoints.findAllRestaurantsForUser.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
      }
    );

    // Find one restaurant for admin
    builder.addMatcher(
      restaurantApi.endpoints.findOneRestaurantForAdmin.matchPending,
      (state) => {
        state.is_loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.findOneRestaurantForAdmin.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.currentRestaurant = payload.data;
      }
    );
    //Update restaurant
    builder.addMatcher(
      restaurantApi.endpoints.updateRestaurant.matchPending,
      (state) => {
        state.is_loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.updateRestaurant.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.currentRestaurant = payload.data;
      }
    );
    //Find one restaurant for user
    builder.addMatcher(
      restaurantApi.endpoints.findOneRestaurantForUser.matchPending,
      (state) => {
        state.is_loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.findOneRestaurantForUser.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.currentRestaurant = payload.data;
      }
    );
    // Delete restaurant
    builder.addMatcher(
      restaurantApi.endpoints.removeRestaurant.matchPending,
      (state) => {
        state.is_loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.removeRestaurant.matchFulfilled,
      (state) => {
        state.is_loading = false;
      }
    );
  },
});

export const {
  setRestaurants,
  clearRestaurants,
  setCurrentRestaurant,
  clearCurrentRestaurant,
  setLoading,
  setError,
} = restaurantSlice.actions;
export const restaurantReducer = restaurantSlice.reducer;
