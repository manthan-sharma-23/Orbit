import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../../utils/constants/config";
import { FRIEND } from "typings";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    getFriends: build.query<{ message: string; friends: FRIEND[] }, void>({
      query: () => ({
        url: "/api/feature/friends",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetFriendsQuery } = friendsApi;
