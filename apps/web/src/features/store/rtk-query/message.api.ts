import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../../utils/constants/config";
import { TEXT } from "typings";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    getMessages: build.query<TEXT[], { roomId: string }>({
      query: ({ roomId }) => ({
        url: "/api/messages/getmessages/" + roomId,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }),
    }),
    sendMessage: build.mutation<any, { message: TEXT; roomId: string }>({
      query: ({ message, roomId }) => ({
        url: "/api/messages/sendmessage",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, roomId }),
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;
