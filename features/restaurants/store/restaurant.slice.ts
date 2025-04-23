import { createSlice } from "@reduxjs/toolkit";
import { restaurantApi } from "../api/restaurant.api";
import { RestaurantState } from "../interfaces/restaurant-state.interface";
import { PAGE, PAGE_SIZE } from "@/constants/constants";

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
    setCurrentRestaurant: (state, { payload }) => {
      state.currentRestaurant = payload;
    },
    setLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
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
    builder.addMatcher(
      restaurantApi.endpoints.findAllRestaurantsForAdmin.matchPending,
      (state) => {
        state.is_loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.findAllRestaurantsForAdmin.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.restaurants = payload.data.results;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.findAllRestaurantsForAdmin.matchRejected,
      (state, { error }) => {
        state.is_loading = false;
        state.error =
          error.message || "An error occurred while fetching restaurants.";
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.findAllRestaurantsForUser.matchPending,
      (state) => {
        state.is_loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.findAllRestaurantsForUser.matchFulfilled,
      (state, { payload }) => {
        state.is_loading = false;
        state.restaurants = payload.data.results;
      }
    );
    builder.addMatcher(
      restaurantApi.endpoints.findAllRestaurantsForUser.matchRejected,
      (state, { error }) => {
        state.is_loading = false;
        state.error =
          error.message || "An error occurred while fetching restaurants.";
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

        restaurantApi.endpoints.findAllRestaurantsForAdmin.initiate({
          page: PAGE,
          limit: PAGE_SIZE,
          filterText: "",
        });
      }
    );
  },
});

export const { setRestaurants, setCurrentRestaurant, setLoading, setError } =
  restaurantSlice.actions;
export const restaurantReducer = restaurantSlice.reducer;
