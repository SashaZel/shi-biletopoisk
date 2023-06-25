import { configureStore } from "@reduxjs/toolkit";
import { biletopoiskApi } from "./biletopoiskApiService";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [biletopoiskApi.reducerPath]: biletopoiskApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(biletopoiskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
