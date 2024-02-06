import { configureStore } from "@reduxjs/toolkit";
import { friendsApi } from "./rtk-query/friends.api";
import { userApi } from "./rtk-query/user.api";
import { chatApi } from "./rtk-query/ws.api";

export const store = configureStore({
  reducer: {
    [friendsApi.reducerPath]: friendsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (gDM) =>
    gDM()
      .concat(friendsApi.middleware)
      .concat(chatApi.middleware)
      .concat(userApi.middleware)
});

export type GlobalState = ReturnType<typeof store.getState>;
