import { configureStore } from "@reduxjs/toolkit";
import { advertisementApi } from "./api/advertismentApi";
import { authenticationApi } from "./api/authenticationApi";
import { mainApi } from "./api/mainApi";
import { subscriptionApi } from "./api/subscriptionApi";
import { profileApi } from "./api/profileApi";
import { categoryApi } from "./api/categoryApi";
export const store = configureStore({
  reducer: {
    [advertisementApi.reducerPath]: advertisementApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      advertisementApi.middleware,
      authenticationApi.middleware,
      mainApi.middleware,
      subscriptionApi.middleware,
      profileApi.middleware,
      categoryApi.middleware
    ),
});
