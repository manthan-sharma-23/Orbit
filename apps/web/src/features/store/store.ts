import { configureStore } from "@reduxjs/toolkit";
import { friendsApi } from "./rtk-query/friends.api";
import { userApi } from "./rtk-query/user.api";
import { messageApi } from "./rtk-query/message.api";

export const store = configureStore({
  reducer: {
    [friendsApi.reducerPath]: friendsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (gDM) =>
    gDM()
      .concat(friendsApi.middleware)
      .concat(userApi.middleware)
      .concat(messageApi.middleware),
});

export type GlobalState = ReturnType<typeof store.getState>;
