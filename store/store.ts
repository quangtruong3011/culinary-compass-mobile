import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/store/auth.slice";
import { authApi } from "@/features/auth/api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { userApi } from "@/features/users/api/user.api";
import { restaurantApi } from "@/features/restaurants/api/restaurant.api";
import { restaurantReducer } from "@/features/restaurants/store/restaurant.slice";
import { tableApi } from "@/features/tables/api/table.api";
import { bookingApi } from "@/features/bookings/api/booking.api";
import { bookingReducer } from "@/features/bookings/store/booking.slice";
import { commentApi } from "@/features/comments/api/comment.api";
import { tableReducer } from "@/features/tables/store/table.slice";
import { userReducer } from "@/features/users/store/user.slice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  // user: userReducer,
  [restaurantApi.reducerPath]: restaurantApi.reducer,
  restaurant: restaurantReducer,
  [tableApi.reducerPath]: tableApi.reducer,
  table: tableReducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  booking: bookingReducer,
  [commentApi.reducerPath]: commentApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      restaurantApi.middleware,
      tableApi.middleware,
      bookingApi.middleware,
      commentApi.middleware
    ),

  // devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
