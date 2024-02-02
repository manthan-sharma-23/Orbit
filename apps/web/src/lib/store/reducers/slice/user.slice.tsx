import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../../constants/config";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    getUser: build.query<
      {
        message: string;
        user: { name: string; email: string; image: any; emailVerified: Date };
      },
      void
    >({
      query: () => ({
        url: "/api/user",
        method: "GET",
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }),
    }),
    loginUser: build.mutation<
      { message?: string; token: string },
      { email: string; password: string }
    >({
      query: (input) => ({
        url: "/api/user/login",
        method: "POST",
        body: input,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginUserMutation } = userApi;
