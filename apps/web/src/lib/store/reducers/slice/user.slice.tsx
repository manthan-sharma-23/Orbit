import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "htttp" }),
  endpoints: (build) => ({
    getUser: build.query<{ message: string; token: string }, void>(),
  }),
});
