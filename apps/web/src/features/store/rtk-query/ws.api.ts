import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getWebSocketMessages: builder.query({
      query: () => "/",
      async onCacheEntryAdded({ updateCachedData, cacheDataLoaded }) {
        const ws = new WebSocket("ws://localhost:3100");

        await cacheDataLoaded;

        ws.addEventListener("message", (event) => {
          const data = JSON.parse(event.data); // Parse incoming message data
          console.log(data);
        });
      },
    }),
  }),
});

export const { useGetWebSocketMessagesQuery } = chatApi;
