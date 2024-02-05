import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./rtk-query/user.api";
import { chatApi } from "./rtk-query/websocket/ws.slice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(userApi.middleware).concat(chatApi.middleware),
});

export type GlobalState = ReturnType<typeof store.getState>;
