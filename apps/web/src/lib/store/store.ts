import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./reducers/user/user.slice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(webSocketMiddleware),
});

export type GlobalState = ReturnType<typeof store.getState>;
