import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/store/auth.slice";
import { authApi } from "@/features/auth/api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { userApi } from "@/features/users/api/user.api";
import { restaurantApi } from "@/features/restaurants/api/restaurant.api";
import { restaurantReducer } from "@/features/restaurants/store/restaurant.slice";
import { tableApi } from "@/features/tables/api/table.api";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [restaurantApi.reducerPath]: restaurantApi.reducer,
  restaurant: restaurantReducer,
  [tableApi.reducerPath]: tableApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(authApi.middleware, userApi.middleware, restaurantApi.middleware, tableApi.middleware),

  // devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
