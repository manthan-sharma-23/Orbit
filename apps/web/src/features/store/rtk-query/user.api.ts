import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { INPUT_LOGIN_FORM, OUTPUT_GET_USER, OUTPUT_LOGIN_FORM } from "typings";
import { SERVER_URL } from "../../../utils/constants/config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    getUser: build.query<OUTPUT_GET_USER, void>({
      query: () => ({
        url: "/api/user",
        method: "GET",
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }),
    }),
    loginUser: build.mutation<OUTPUT_LOGIN_FORM, INPUT_LOGIN_FORM>({
      query: (input) => ({
        url: "/api/user/login",
        method: "POST",
        body: input,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: OUTPUT_LOGIN_FORM, meta, arg) => {
        console.log("Tranform Response : ", response);
        window.localStorage.setItem("token", response.token);
        return response;
      },
    }),
    registerUser: build.mutation<OUTPUT_LOGIN_FORM, INPUT_LOGIN_FORM>({
      query: (input) => ({
        url: "/api/user/register",
        method: "POST",
        body: input,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: OUTPUT_LOGIN_FORM, meta, arg) => {
        console.log("Tranform Response : ", response);
        window.localStorage.setItem("token", response.token);
        return response;
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = userApi;
