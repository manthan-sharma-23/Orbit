import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./reducers/slice/user.slice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type GlobalState = ReturnType<typeof store.getState>;
